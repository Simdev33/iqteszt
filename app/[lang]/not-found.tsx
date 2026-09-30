import Link from "next/link";
import { lang as rootLang } from "next/root-params";
import { LogoMark } from "@/components/ui/Logo";
import { DEFAULT_LOCALE, isLocale, path } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/server";

/** Lokalizált 404-es oldal (ismeretlen cím vagy notFound() hívás a nyelvi szegmensen belül). */
export default async function NotFound() {
  const l = await rootLang();
  const lang = isLocale(l) ? l : DEFAULT_LOCALE;
  const t = getDict(lang).notFound;
  return (
    <main className="relative grid min-h-svh place-items-center px-5 text-center">
      <div aria-hidden className="grid-lines grid-fade pointer-events-none fixed inset-0 -z-10 opacity-60" />
      <div>
        <LogoMark className="mx-auto h-12 w-12" />
        <p className="mt-8 font-mono text-sm tracking-[0.3em] text-mist">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-5xl">{t.title}</h1>
        <p className="mx-auto mt-5 max-w-md text-haze">{t.text}</p>
        <Link href={path(lang, "home")} className="btn-primary mt-8">
          {t.home}
        </Link>
      </div>
    </main>
  );
}
