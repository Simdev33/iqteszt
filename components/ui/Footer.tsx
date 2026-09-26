import Link from "next/link";
import Logo from "./Logo";
import { brand, nav } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative mt-10 border-t border-white/[0.06] bg-ink-950">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-mist">
            {brand.tagline}. 30 saját fejlesztésű feladat négy képességterületen – regisztráció és e-mail-cím nélkül.
          </p>
        </div>
        <div>
          <p className="eyebrow">Oldalak</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/teszt" className="text-haze transition-colors hover:text-paper">
                IQ-teszt kitöltése
              </Link>
            </li>
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-haze transition-colors hover:text-paper">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Fontos</p>
          <p className="mt-4 text-sm leading-relaxed text-mist">
            Az eredmény tájékoztató jellegű becslés, nem orvosi vagy pszichológiai diagnózis. A kiértékelés a böngésződben fut, adatot nem
            tárolunk.
          </p>
        </div>
      </div>
      <div className="border-t border-white/[0.05]">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-mist sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} {brand.name} · {brand.domain}
          </p>
          <p className="font-mono tracking-wide">μ = 100 · σ = 15</p>
        </div>
      </div>
    </footer>
  );
}
