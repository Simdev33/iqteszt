"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Rich from "@/components/i18n/Rich";
import { useI18n } from "@/components/i18n/I18nProvider";
import { loadPending } from "@/components/test/pending";
import { isLocale, path, routeOfSlug, type Locale } from "@/lib/i18n/config";
import { RESULT_URL_KEY, reportPurchase } from "@/lib/thank-you";

/**
 * A fizetés után tárolt eredménycím (lásd app/api/stripe/return), az aktuális nyelven – ha a köszönőoldalon
 * nyelvet vált, az eredmény is azon nyílik meg. Csak az eredményoldal címét fogadjuk el.
 */
function storedResult(lang: Locale): string | null {
  try {
    const raw = sessionStorage.getItem(RESULT_URL_KEY);
    if (!raw) return null;
    const url = new URL(raw, window.location.origin);
    const [, seg, ...rest] = url.pathname.split("/");
    if (url.origin !== window.location.origin || !isLocale(seg) || routeOfSlug(seg, rest.join("/")) !== "result" || !url.search) return null;
    return `${path(lang, "result")}${url.search}`;
  } catch {
    return null;
  }
}

/** Pipa egy türkiz–lila korongon; csak méretre animál (CSS), így megálló képkockázásnál is látszik. */
function SuccessMark() {
  return (
    <div className="relative mx-auto grid h-20 w-20 place-items-center">
      <span aria-hidden className="animate-ring absolute inset-0 rounded-full bg-aqua/30" />
      <span className="animate-pop relative grid h-20 w-20 place-items-center rounded-full bg-[linear-gradient(135deg,#45e3c4_0%,#8b7bff_70%,#5a45f2_100%)] shadow-[inset_0_1px_0_rgb(255_255_255/0.45),0_18px_50px_-12px_rgb(69_227_196/0.55)]">
        <svg viewBox="0 0 24 24" className="h-9 w-9 text-white" aria-hidden>
          <path d="m5.5 12.5 4.2 4.2 8.8-9.4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
}

/**
 * Köszönőoldal sikeres fizetés után (/thank-you) – a Google Ads ennek a címnek a betöltését méri konverzióként.
 * A gomb a fizetéskor kapott eredménylinkre visz; közvetlen megnyitáskor (nincs tárolt link) a teszt oldalára,
 * ahol a még meg nem nyitott eredmény feloldható (előfizetőnek fizetés nélkül), különben a főoldalra.
 */
export default function ThankYou() {
  const { lang, t } = useI18n();
  const s = t.thankYou;
  const [href, setHref] = useState(() => path(lang, "home"));

  useEffect(() => {
    // A sessionStorage és a localStorage csak a böngészőben olvasható.
    const stored = storedResult(lang);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHref(stored ?? (loadPending() ? path(lang, "test") : path(lang, "home")));
    // Konverzió csak fizetésből érkezve: a tárolt eredménylinkben ott a fizetés azonosítója.
    if (stored) {
      const params = new URL(stored, window.location.origin).searchParams;
      const transactionId = params.get("session_id") ?? params.get("r");
      if (transactionId) reportPurchase(transactionId);
    }
  }, [lang]);

  return (
    <section className="relative isolate grid min-h-[86svh] place-items-center overflow-hidden px-5 pt-32 pb-20 sm:pt-40">
      <div aria-hidden className="grid-lines grid-fade absolute inset-0 -z-10" />
      <div aria-hidden className="absolute -top-40 left-1/2 -z-10 h-[560px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(107_85_255/0.28),transparent)]" />
      <div aria-hidden className="absolute bottom-0 left-1/2 -z-10 h-[380px] w-[620px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(69_227_196/0.08),transparent)]" />

      <div className="panel ring-gradient w-full max-w-md rounded-[2rem] px-6 pt-10 pb-8 text-center sm:px-9">
        <SuccessMark />
        <h1 className="mt-8 font-display text-[clamp(2.2rem,8vw,3rem)] leading-none font-semibold tracking-[-0.04em]">{s.title}</h1>
        <p className="mt-5 text-lg text-paper">{s.lead}</p>
        <p className="mt-1.5 leading-relaxed text-haze">{s.unlocked}</p>

        <Link href={href} prefetch={false} className="btn-primary mt-8 w-full text-base">
          {s.cta}
          <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
            <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>

        <p className="mt-7 border-t border-white/[0.08] pt-5 text-sm leading-relaxed text-mist">
          <Rich text={s.cancel} links={{ subscription: path(lang, "subscription") }} />
        </p>
      </div>
    </section>
  );
}
