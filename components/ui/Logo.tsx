"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n/I18nProvider";
import { fmt, path } from "@/lib/i18n/config";
import { brand } from "@/lib/site";

/** Logójel: 3×3-as pontrács, a kilencedik helyén egy gyűrű – a mátrixfeladat „kérdőjele”. */
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  const dots = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#b3a8ff" />
          <stop offset="0.55" stopColor="#8b7bff" />
          <stop offset="1" stopColor="#45e3c4" />
        </linearGradient>
      </defs>
      <rect x="0.5" y="0.5" width="31" height="31" rx="9" fill="#1d2242" stroke="rgb(255 255 255 / 0.12)" />
      {dots.map((i) => (
        <circle key={i} cx={8 + (i % 3) * 8} cy={8 + Math.floor(i / 3) * 8} r={i === 4 ? 2.3 : 1.7} fill={i === 4 ? "url(#logo-g)" : "#c9cdea"} opacity={i === 4 ? 1 : 0.75} />
      ))}
      <circle cx="24" cy="24" r="3.1" fill="none" stroke="url(#logo-g)" strokeWidth="1.8" />
    </svg>
  );
}

export default function Logo({ className = "" }: { className?: string }) {
  const { lang, t } = useI18n();
  return (
    <Link href={path(lang, "home")} className={`group inline-flex items-center gap-2.5 ${className}`} aria-label={fmt(t.brand.home, { brand: brand.name })}>
      <LogoMark className="h-8 w-8 transition-transform duration-500 ease-[var(--ease-luxe)] group-hover:rotate-90" />
      <span className="font-display text-[1.02rem] font-semibold tracking-[-0.02em]">
        {brand.name}
        <span className="text-iris">.</span>
      </span>
    </Link>
  );
}
