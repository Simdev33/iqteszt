import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALES, LOCALE_COOKIE, ROUTES, isLocale, path, routeOfDir, routeOfSlug, type Locale } from "@/lib/i18n/config";

// Nyelvkezelés:
//  • előtag nélküli cím (/, /teszt, régi linkek) → a választott / böngésző szerinti nyelvre irányít;
//  • lokalizált cím (/en/result) → a belső mappára írja át (/en/eredmeny), a böngészőben a szép cím marad;
//  • más nyelv belső címe (/en/eredmeny) → a lokalizált címre irányít.

function detect(req: NextRequest): Locale {
  const saved = req.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(saved)) return saved;
  const header = req.headers.get("accept-language") ?? "";
  const wanted = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .filter((x) => x.lang && !Number.isNaN(x.q))
    .sort((a, b) => b.q - a.q);
  const hit = wanted.find((w) => isLocale(w.lang))?.lang;
  if (isLocale(hit)) return hit;
  // Nem támogatott böngészőnyelv (pl. lengyel) → angol; ha a böngésző nem küld nyelvet → magyar.
  return wanted.length ? "en" : DEFAULT_LOCALE;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const parts = pathname.split("/");
  const seg = parts[1];
  const rest = parts.slice(2).join("/").replace(/\/+$/, "");

  if (isLocale(seg)) {
    if (!rest) return NextResponse.next();
    const key = routeOfSlug(seg, rest);
    if (key) {
      if (ROUTES[key].dir === rest) return NextResponse.next();
      const url = req.nextUrl.clone();
      url.pathname = `/${seg}/${ROUTES[key].dir}`;
      return NextResponse.rewrite(url);
    }
    const internal = routeOfDir(rest);
    if (internal) {
      const url = req.nextUrl.clone();
      url.pathname = path(seg, internal);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Nincs nyelvi előtag
  const lang = detect(req);
  const clean = pathname.replace(/^\/+|\/+$/g, "");
  const key = clean ? (routeOfDir(clean) ?? LOCALES.map((l) => routeOfSlug(l, clean)).find(Boolean) ?? null) : "home";
  const url = req.nextUrl.clone();
  url.pathname = key ? path(lang, key) : `/${lang}/${clean}`;
  return NextResponse.redirect(url);
}

export const config = {
  // API, Next-belső fájlok, kiterjesztéses (statikus) fájlok és a generált iOS-ikon (/apple-icon) kimaradnak
  matcher: ["/((?!api|_next|apple-icon|.*\\..*).*)"],
};
