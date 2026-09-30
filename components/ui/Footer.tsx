import Link from "next/link";
import Logo from "./Logo";
import { path, type Locale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/server";
import { brand, company, nav } from "@/lib/site";

export default function Footer({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const f = t.footer;
  const link = "text-haze transition-colors hover:text-paper";
  return (
    <footer className="relative mt-10 border-t border-white/[0.06] bg-ink-950">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-mist">
            {t.brand.tagline}. {f.blurb}
          </p>
        </div>
        <div>
          <p className="eyebrow">{f.pages}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href={path(lang, "test")} className={link}>
                {f.takeTest}
              </Link>
            </li>
            {nav.map((n) => (
              <li key={n.key}>
                <Link href={`${path(lang, n.route)}${n.hash ? `#${n.hash}` : ""}`} className={link}>
                  {t.nav[n.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">{f.legal}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href={path(lang, "terms")} className={link}>
                {f.terms}
              </Link>
            </li>
            <li>
              <Link href={path(lang, "privacy")} className={link}>
                {f.privacy}
              </Link>
            </li>
            <li>
              <Link href={path(lang, "subscription")} className={link}>
                {f.subscription}
              </Link>
            </li>
            <li>
              <a href={`mailto:${brand.email}`} className={link}>
                {brand.email}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">{f.important}</p>
          <p className="mt-4 text-sm leading-relaxed text-mist">{f.disclaimer}</p>
        </div>
      </div>
      <div className="border-t border-white/[0.05]">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-xs text-mist sm:px-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-1">
            <p>
              © {new Date().getFullYear()} {brand.name} · {brand.domain}
            </p>
            <p>
              {f.operator}: {company.name}, {company.address}, {company.country[lang]} · {f.companyId}: {company.ico} · {f.taxId}: {company.dic}
            </p>
          </div>
          <p className="font-mono tracking-wide">μ = 100 · σ = 15</p>
        </div>
      </div>
    </footer>
  );
}
