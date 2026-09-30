import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { path } from "@/lib/i18n/config";
import { getDict, langOf } from "@/lib/i18n/server";
import { readResultToken } from "@/lib/payment";
import { prices } from "@/lib/pricing";

export async function generateMetadata({ params }: PageProps<"/[lang]/fizetes/demo">): Promise<Metadata> {
  const lang = await langOf(params);
  return { title: getDict(lang).meta.demoTitle, robots: { index: false } };
}

/**
 * Fejlesztői fizetés-szimuláció: csak akkor él, ha nincs beállítva Stripe-kulcs és nem éles módban fut.
 * Élesben itt a Stripe fizetési oldala jelenik meg.
 */
export default async function DemoCheckout({ params, searchParams }: PageProps<"/[lang]/fizetes/demo">) {
  const lang = await langOf(params);
  const t = getDict(lang).demoPay;
  const sp = await searchParams;
  const token = typeof sp.d === "string" ? sp.d : undefined;
  const payload = readResultToken(token, "pending");
  if (!payload || !token) notFound();
  const p = prices(lang);
  const paidHref = `/api/stripe/return?lang=${lang}&demo=${encodeURIComponent(token)}`;

  return (
    <section className="relative grid min-h-[80svh] place-items-center px-5 pt-32 pb-20">
      <div className="panel ring-gradient w-full max-w-md rounded-[2rem] p-7 sm:p-9">
        <span className="chip !border-sun/40 !bg-sun/10 text-xs">{t.chip}</span>
        <h1 className="mt-5 font-display text-2xl font-semibold tracking-tight">{t.title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-mist">{t.text}</p>
        <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-4">
          <span className="text-haze">{t.item}</span>
          <span className="font-display text-xl font-semibold">{p.trial}</span>
        </div>
        <div className="mt-6 grid gap-3">
          <a href={paidHref} className="btn-primary">
            {t.pay}
          </a>
          <Link href={path(lang, "test", { canceled: "1" })} className="btn-ghost">
            {t.cancel}
          </Link>
        </div>
      </div>
    </section>
  );
}
