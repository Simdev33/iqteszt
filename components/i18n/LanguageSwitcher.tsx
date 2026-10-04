"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "./I18nProvider";
import { LOCALES, LOCALE_COOKIE, LOCALE_NAMES, isLocale, path, routeOfSlug, type Locale } from "@/lib/i18n/config";
import { THANK_YOU } from "@/lib/thank-you";

/** Az aktuális oldal címe egy másik nyelven (a lekérdezés és a horgony megmarad). */
export function localizedHref(pathname: string, to: Locale) {
  // A köszönőoldal címe nyelvfüggetlen: a nyelvet a (váltáskor beállított) süti adja.
  if (pathname === THANK_YOU) return THANK_YOU;
  const [, seg, ...rest] = pathname.split("/");
  const from = isLocale(seg) ? seg : null;
  const key = from ? routeOfSlug(from, rest.join("/")) : null;
  const base = key ? path(to, key) : path(to, "home");
  if (typeof window === "undefined") return base;
  return `${base}${window.location.search}${window.location.hash}`;
}

/** A választott nyelv megjegyzése (a proxy ebből irányít, ha előtag nélküli címre jön a látogató). */
function rememberLang(to: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${to}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
}

/** Nyelvválasztó: kompakt lenyíló (fejléc) vagy teljes lista (mobilmenü). */
export default function LanguageSwitcher({ variant = "menu", className = "" }: { variant?: "menu" | "list"; className?: string }) {
  const { lang, t } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (to: Locale) => {
    rememberLang(to);
    // Teljes betöltés: a szótár és a kérdések a szerverről jönnek az új nyelven.
    window.location.assign(localizedHref(pathname, to));
  };

  if (variant === "list") {
    return (
      <div className={`grid grid-cols-6 gap-1.5 ${className}`} role="group" aria-label={t.nav.language}>
        {LOCALES.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => l !== lang && go(l)}
            aria-current={l === lang ? "true" : undefined}
            lang={l}
            className={`rounded-full border py-2 text-center font-mono text-xs uppercase transition-colors ${
              l === lang ? "border-iris/60 bg-iris/20 text-paper" : "border-white/10 text-mist hover:border-white/25 hover:text-paper"
            }`}
          >
            {l}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={wrap} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${t.nav.language}: ${LOCALE_NAMES[lang]}`}
        className="flex h-10 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 font-mono text-xs uppercase text-haze transition-colors hover:border-white/25 hover:text-paper"
      >
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
          <circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.3" />
          <path d="M1.8 8h12.4M8 1.8c1.8 1.7 2.7 3.8 2.7 6.2S9.8 12.5 8 14.2C6.2 12.5 5.3 10.4 5.3 8S6.2 3.5 8 1.8Z" fill="none" stroke="currentColor" strokeWidth="1.3" />
        </svg>
        {lang}
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label={t.nav.language}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="glass absolute right-0 z-50 mt-2 w-44 origin-top-right rounded-2xl bg-ink-900/95 p-1.5"
          >
            {LOCALES.map((l) => (
              <li key={l} role="option" aria-selected={l === lang}>
                <button
                  type="button"
                  lang={l}
                  onClick={() => (l === lang ? setOpen(false) : go(l))}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                    l === lang ? "bg-white/[0.07] text-paper" : "text-haze hover:bg-white/5 hover:text-paper"
                  }`}
                >
                  {LOCALE_NAMES[l]}
                  <span className="font-mono text-[0.68rem] uppercase text-mist">{l}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
