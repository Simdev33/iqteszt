import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRICE_LABEL } from "@/lib/meta";
import { demoToken, readDemoToken } from "@/lib/payment";

export const metadata: Metadata = { title: "Fizetés (fejlesztői szimuláció)", robots: { index: false } };

/**
 * Fejlesztői fizetés-szimuláció: csak akkor él, ha nincs beállítva Stripe-kulcs és nem éles módban fut.
 * Élesben itt a Stripe fizetési oldala jelenik meg.
 */
export default async function DemoCheckout({ searchParams }: PageProps<"/fizetes/demo">) {
  const sp = await searchParams;
  const payload = readDemoToken(typeof sp.d === "string" ? sp.d : undefined, "pending");
  if (!payload) notFound();
  const paidHref = `/eredmeny?demo=${encodeURIComponent(demoToken(payload, "paid"))}`;

  return (
    <section className="relative grid min-h-[80svh] place-items-center px-5 pt-32 pb-20">
      <div className="panel ring-gradient w-full max-w-md rounded-[2rem] p-7 sm:p-9">
        <span className="chip !border-sun/40 !bg-sun/10 text-xs">Fejlesztői mód – nincs valódi fizetés</span>
        <h1 className="mt-5 font-display text-2xl font-semibold tracking-tight">Fizetés szimulálása</h1>
        <p className="mt-3 text-sm leading-relaxed text-mist">
          Nincs beállítva Stripe-kulcs, ezért ez az oldal helyettesíti a Stripe fizetési oldalát. A <code className="font-mono">STRIPE_SECRET_KEY</code>{" "}
          megadása után itt a valódi kártyás fizetés jelenik meg.
        </p>
        <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-4">
          <span className="text-haze">IQ-teszt eredmény</span>
          <span className="font-display text-xl font-semibold">{PRICE_LABEL}</span>
        </div>
        <div className="mt-6 grid gap-3">
          <Link href={paidHref} className="btn-primary">
            Sikeres fizetés szimulálása
          </Link>
          <Link href="/teszt?fizetes=megszakitva" className="btn-ghost">
            Fizetés megszakítása
          </Link>
        </div>
      </div>
    </section>
  );
}
