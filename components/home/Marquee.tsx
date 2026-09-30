import type { Locale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/server";

export default function Marquee({ lang }: { lang: Locale }) {
  const words = getDict(lang).home.marquee;
  const row = [...words, ...words];
  return (
    <div className="relative overflow-hidden border-y border-white/[0.06] bg-ink-950 py-5 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-lg font-medium tracking-tight text-haze/80 sm:text-xl">
            {w}
            <svg viewBox="0 0 12 12" className="h-3 w-3 text-iris" aria-hidden>
              {i % 3 === 0 ? (
                <circle cx="6" cy="6" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
              ) : i % 3 === 1 ? (
                <rect x="1.8" y="1.8" width="8.4" height="8.4" fill="currentColor" transform="rotate(45 6 6)" />
              ) : (
                <path d="M6 1.5 10.5 10h-9Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              )}
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
