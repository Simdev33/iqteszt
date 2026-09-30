import type { Metadata } from "next";
import Link from "next/link";
import { cache } from "react";
import ResultView from "@/components/result/ResultView";
import { decodeVariants } from "@/lib/codec";
import { fmt, path, type Locale } from "@/lib/i18n/config";
import { getDict, langOf } from "@/lib/i18n/server";
import { paidPayload, readResultToken, type TestPayload } from "@/lib/payment";
import { decodeAnswers, score } from "@/lib/scoring";

type SP = Record<string, string | string[] | undefined>;
const str = (v: SP[string]) => (typeof v === "string" ? v : undefined);

/**
 * Az eredmény csak kifizetett munkamenetből vagy aláírt linkből áll elő:
 *  • ?session_id=… – a Stripe-tól lekérdezzük a Checkout Sessiont, és a metaadataiban lévő kitöltést pontozzuk;
 *  • ?r=… – aktív előfizetőnek kiadott (vagy fejlesztői módban szimulált) aláírt eredménylink.
 * A cache miatt a metaadat és az oldal ugyanazt az egy Stripe-lekérést használja.
 */
const loadResult = cache(async (lang: Locale, sessionId?: string, token?: string) => {
  let payload: TestPayload | null = null;
  let status: "paid" | "unpaid" | "invalid" = "invalid";
  let subscribed = false;
  if (sessionId) {
    const r = await paidPayload(sessionId);
    status = r.status;
    if (r.status === "paid") {
      payload = r.payload;
      subscribed = r.subscription;
    }
  } else if (token) {
    const member = readResultToken(token, "member");
    const demo = member ? null : readResultToken(token, "paid");
    payload = member ?? demo;
    subscribed = !!(member ?? demo);
    status = payload ? "paid" : "invalid";
  }
  if (!payload) return { status: status === "paid" ? ("invalid" as const) : status };

  const variants = decodeVariants(payload.k);
  const answers = variants ? decodeAnswers(payload.v, variants) : null;
  if (!variants || !answers) return { status: "invalid" as const };
  const secs = Math.max(0, Math.min(24 * 3600, Number(payload.t) || 0));
  return { status: "paid" as const, subscribed, result: score(answers, payload.a, secs, variants, lang) };
});

export async function generateMetadata({ params, searchParams }: PageProps<"/[lang]/eredmeny">): Promise<Metadata> {
  const lang = await langOf(params);
  const t = getDict(lang);
  const sp = await searchParams;
  const r = await loadResult(lang, str(sp.session_id), str(sp.r));
  if (r.status !== "paid" || !("result" in r) || !r.result) return { title: t.meta.resultTitle, robots: { index: false } };
  const band = t.bands[r.result.band.id].label;
  return {
    title: fmt(t.meta.resultTitleIq, { iq: r.result.iq, band }),
    description: fmt(t.meta.resultDescription, { iq: r.result.iq, band, correct: r.result.correct, total: r.result.total }),
    robots: { index: false },
  };
}

export default async function ResultPage({ params, searchParams }: PageProps<"/[lang]/eredmeny">) {
  const lang = await langOf(params);
  const t = getDict(lang).result.locked;
  const sp = await searchParams;
  const r = await loadResult(lang, str(sp.session_id), str(sp.r));

  if (r.status === "paid" && "result" in r && r.result) return <ResultView result={r.result} subscribed={r.subscribed} />;

  const unpaid = r.status === "unpaid";
  return (
    <section className="relative grid min-h-[80svh] place-items-center px-5 pt-28 text-center">
      <div>
        <p className="eyebrow justify-center">{t.eyebrow}</p>
        <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl">{unpaid ? t.unpaidTitle : t.invalidTitle}</h1>
        <p className="mx-auto mt-5 max-w-md text-haze">{unpaid ? t.unpaidText : t.invalidText}</p>
        <Link href={path(lang, "test")} className="btn-primary mt-8">
          {unpaid ? t.back : t.open}
        </Link>
      </div>
    </section>
  );
}
