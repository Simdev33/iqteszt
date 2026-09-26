import type { Metadata } from "next";
import Link from "next/link";
import { cache } from "react";
import ResultView from "@/components/result/ResultView";
import { decodeVariants } from "@/lib/codec";
import { paidPayload, readDemoToken, type TestPayload } from "@/lib/payment";
import { decodeAnswers, score } from "@/lib/scoring";

type SP = Record<string, string | string[] | undefined>;
const str = (v: SP[string]) => (typeof v === "string" ? v : undefined);

/**
 * Az eredmény csak kifizetett munkamenetből áll elő: a Stripe-tól lekérdezzük a Checkout Sessiont,
 * és a metaadataiban lévő kitöltést pontozzuk. (Fejlesztői módban aláírt demó token is elfogadott.)
 * A cache miatt a metaadat és az oldal ugyanazt az egy Stripe-lekérést használja.
 */
const loadResult = cache(async (sessionId?: string, demo?: string) => {
  let payload: TestPayload | null = null;
  let status: "paid" | "unpaid" | "invalid" = "invalid";
  if (sessionId) {
    const r = await paidPayload(sessionId);
    status = r.status;
    if (r.status === "paid") payload = r.payload;
  } else if (demo) {
    payload = readDemoToken(demo, "paid");
    status = payload ? "paid" : "invalid";
  }
  if (!payload) return { status: status === "paid" ? ("invalid" as const) : status };

  const variants = decodeVariants(payload.k);
  const answers = variants ? decodeAnswers(payload.v, variants) : null;
  if (!variants || !answers) return { status: "invalid" as const };
  const secs = Math.max(0, Math.min(24 * 3600, Number(payload.t) || 0));
  return { status: "paid" as const, result: score(answers, payload.a, secs, variants) };
});

export async function generateMetadata({ searchParams }: PageProps<"/eredmeny">): Promise<Metadata> {
  const sp = await searchParams;
  const r = await loadResult(str(sp.session_id), str(sp.demo));
  if (r.status !== "paid" || !("result" in r) || !r.result) return { title: "Eredmény", robots: { index: false } };
  return {
    title: `IQ ${r.result.iq} – ${r.result.band.label}`,
    description: `IQ-becslés: ${r.result.iq} (${r.result.band.label}). ${r.result.correct}/${r.result.total} helyes válasz. Töltsd ki te is a tesztet!`,
    robots: { index: false },
  };
}

export default async function ResultPage({ searchParams }: PageProps<"/eredmeny">) {
  const sp = await searchParams;
  const r = await loadResult(str(sp.session_id), str(sp.demo));

  if (r.status === "paid" && "result" in r && r.result) return <ResultView result={r.result} />;

  const unpaid = r.status === "unpaid";
  return (
    <section className="relative grid min-h-[80svh] place-items-center px-5 pt-28 text-center">
      <div>
        <p className="eyebrow justify-center">Eredmény</p>
        <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {unpaid ? "A fizetés még nem érkezett meg." : "Ehhez a linkhez nem tartozik eredmény."}
        </h1>
        <p className="mx-auto mt-5 max-w-md text-haze">
          {unpaid
            ? "Ha most fizettél, frissítsd az oldalt néhány másodperc múlva. Ha megszakítottad a fizetést, a teszt oldalán bármikor újrapróbálhatod."
            : "Lehet, hogy a link megsérült másolás közben. Ha már kitöltötted a tesztet, a teszt oldalán feloldhatod az eredményed."}
        </p>
        <Link href="/teszt" className="btn-primary mt-8">
          {unpaid ? "Vissza a teszthez" : "Teszt megnyitása"}
        </Link>
      </div>
    </section>
  );
}
