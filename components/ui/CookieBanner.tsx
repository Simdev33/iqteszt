"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Rich from "@/components/i18n/Rich";
import { useI18n } from "@/components/i18n/I18nProvider";
import { CONSENT_OPEN_EVENT, openConsentSettings, readConsent, saveConsent, type Consent } from "@/lib/consent";
import { isLocale, path, routeOfSlug } from "@/lib/i18n/config";

/** Kitöltés közben (/hu/teszt, /en/test …) nem kérdezünk: a sáv eltakarná a válaszlehetőségeket. */
function onTestPage(pathname: string) {
  const [, seg, ...rest] = pathname.split("/");
  return isLocale(seg) && routeOfSlug(seg, rest.join("/")) === "test";
}

function CookieIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path d="M12 2.8a9.2 9.2 0 1 0 9.2 9.2 3.7 3.7 0 0 1-4.6-4.6A3.7 3.7 0 0 1 12 2.8Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <circle cx="8.6" cy="9.4" r="1.15" fill="currentColor" />
      <circle cx="12.2" cy="13" r="1" fill="currentColor" />
      <circle cx="8.2" cy="15" r="1" fill="currentColor" />
      <circle cx="15.6" cy="16.2" r="1.15" fill="currentColor" />
    </svg>
  );
}

/**
 * Süti-sáv a DoneSignIn mintájára: elfogadás és elutasítás egyformán egy kattintás, a döntés a „Süti-beállítások”
 * gombbal (lábléc) bármikor megváltoztatható. A belépő animáció csak eltolás (CSS), az átlátszóság nem animál,
 * így rejtett böngészőpanelen, megálló képkockázásnál is látszik.
 */
export default function CookieBanner() {
  const { lang, t } = useI18n();
  const s = t.cookies;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Csak a böngészőben tudjuk, döntött-e már (a süti a kliensen olvasható).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!readConsent()) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  if (!open || onTestPage(pathname)) return null;

  const choose = (value: Consent) => {
    saveConsent(value);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-label={s.title}
      className="glass animate-rise fixed inset-x-3 bottom-3 z-[60] rounded-[1.75rem] bg-ink-900/90 p-5 sm:inset-x-auto sm:bottom-5 sm:left-5 sm:w-[400px]"
    >
      <div className="flex items-start gap-3.5">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-iris/30 bg-iris/15 text-iris-soft">
          <CookieIcon />
        </span>
        <div className="min-w-0">
          <h2 className="font-display text-lg font-semibold tracking-tight">{s.title}</h2>
          <p className="mt-1.5 text-[0.82rem] leading-relaxed text-haze">
            <Rich text={s.text} links={{ privacy: path(lang, "privacy") }} />
          </p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button type="button" onClick={() => choose("denied")} className="btn-ghost h-11 !px-4 !py-0 text-sm">
          {s.reject}
        </button>
        <button type="button" onClick={() => choose("granted")} className="btn-primary h-11 !px-4 !py-0 text-sm">
          {s.accept}
        </button>
      </div>
    </div>
  );
}

/** Lábléc-gomb: a sütikkel kapcsolatos döntés bármikor megváltoztatható. */
export function CookieSettingsButton({ className = "" }: { className?: string }) {
  const { t } = useI18n();
  return (
    <button type="button" onClick={openConsentSettings} className={`cursor-pointer text-left ${className}`}>
      {t.cookies.settings}
    </button>
  );
}
