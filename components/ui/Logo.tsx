"use client";

import Link from "next/link";
import { useId } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";
import { fmt, path } from "@/lib/i18n/config";
import { brand } from "@/lib/site";

/**
 * Logójel (= favicon, app/icon.svg): három fehér négyzet és egy türkiz kör – a mátrixfeladat
 * megtalált eleme. A színátmenet azonosítója egyedi, mert egy oldalon több logó is lehet (fejléc + lábléc).
 */
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  const id = `tma-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a596ff" />
          <stop offset="1" stopColor="#4a36e8" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill={`url(#${id})`} />
      <rect x="13" y="13" width="16" height="16" rx="4.5" fill="#fff" />
      <rect x="35" y="13" width="16" height="16" rx="4.5" fill="#fff" />
      <rect x="13" y="35" width="16" height="16" rx="4.5" fill="#fff" />
      <circle cx="43" cy="43" r="8.5" fill="#45e3c4" />
    </svg>
  );
}

/** Kéttónusú szóvédjegy: „TestMy” + „Abilities”. */
function Wordmark() {
  const cut = brand.name.indexOf("Abilities");
  if (cut <= 0) return <>{brand.name}</>;
  return (
    <>
      {brand.name.slice(0, cut)}
      <span className="text-iris-soft">{brand.name.slice(cut)}</span>
    </>
  );
}

export default function Logo({ className = "" }: { className?: string }) {
  const { lang, t } = useI18n();
  return (
    <Link href={path(lang, "home")} className={`group inline-flex items-center gap-2.5 ${className}`} aria-label={fmt(t.brand.home, { brand: brand.name })}>
      <LogoMark className="h-8 w-8 shrink-0 shadow-[0_6px_18px_-6px_rgb(107_85_255/0.8)] [border-radius:25%] transition-transform duration-500 ease-[var(--ease-luxe)] group-hover:rotate-90" />
      <span className="font-display text-[0.92rem] font-semibold tracking-[-0.02em] sm:text-[1.02rem]">
        <Wordmark />
      </span>
    </Link>
  );
}
