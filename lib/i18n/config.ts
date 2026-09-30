// Nyelvek és lokalizált útvonalak – böngészőben és a proxyban is használható (nincs benne szöveg).

export const LOCALES = ["hu", "en", "de", "fr", "it", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "hu";
export const LOCALE_COOKIE = "lang";

export const isLocale = (s: string | undefined | null): s is Locale => !!s && (LOCALES as readonly string[]).includes(s);

/** A nyelvválasztóban megjelenő nevek (mindig az adott nyelven). */
export const LOCALE_NAMES: Record<Locale, string> = {
  hu: "Magyar",
  en: "English",
  de: "Deutsch",
  fr: "Français",
  it: "Italiano",
  es: "Español",
};

/** Open Graph / Intl területi kód. */
export const LOCALE_TAGS: Record<Locale, string> = {
  hu: "hu-HU",
  en: "en-GB",
  de: "de-DE",
  fr: "fr-FR",
  it: "it-IT",
  es: "es-ES",
};

/**
 * Az oldalak belső (mappa-) neve és nyelvenkénti URL-részlete. A mappák a magyar nevet viselik
 * (app/[lang]/teszt …); a proxy a lokalizált címet erre írja át.
 */
export const ROUTES = {
  home: { dir: "", hu: "", en: "", de: "", fr: "", it: "", es: "" },
  test: { dir: "teszt", hu: "teszt", en: "test", de: "test", fr: "test", it: "test", es: "test" },
  result: { dir: "eredmeny", hu: "eredmeny", en: "result", de: "ergebnis", fr: "resultat", it: "risultato", es: "resultado" },
  scale: { dir: "iq-skala", hu: "iq-skala", en: "iq-scale", de: "iq-skala", fr: "echelle-qi", it: "scala-qi", es: "escala-ci" },
  method: { dir: "modszertan", hu: "modszertan", en: "methodology", de: "methodik", fr: "methodologie", it: "metodologia", es: "metodologia" },
  terms: { dir: "aszf", hu: "aszf", en: "terms", de: "agb", fr: "cgv", it: "termini", es: "terminos" },
  privacy: { dir: "adatkezeles", hu: "adatkezeles", en: "privacy", de: "datenschutz", fr: "confidentialite", it: "privacy", es: "privacidad" },
  subscription: { dir: "elofizetes", hu: "elofizetes", en: "subscription", de: "abo", fr: "abonnement", it: "abbonamento", es: "suscripcion" },
  demoPay: { dir: "fizetes/demo", hu: "fizetes/demo", en: "payment/demo", de: "zahlung/demo", fr: "paiement/demo", it: "pagamento/demo", es: "pago/demo" },
} as const satisfies Record<string, { dir: string } & Record<Locale, string>>;
export type RouteKey = keyof typeof ROUTES;

/** Egy oldal lokalizált címe, pl. path("en", "result") → "/en/result". */
export function path(lang: Locale, route: RouteKey, query?: Record<string, string>) {
  const slug = ROUTES[route][lang];
  const qs = query ? `?${new URLSearchParams(query)}` : "";
  return `/${lang}${slug ? `/${slug}` : ""}${qs}`;
}

/** Lokalizált URL-részletből (a nyelvkód utáni rész) az oldal kulcsa; ismeretlennél null. */
export function routeOfSlug(lang: Locale, rest: string): RouteKey | null {
  const clean = rest.replace(/^\/+|\/+$/g, "");
  for (const key of Object.keys(ROUTES) as RouteKey[]) if (ROUTES[key][lang] === clean) return key;
  return null;
}

/** Belső mappanévből az oldal kulcsa (a proxy átírásához és a régi, előtag nélküli címekhez). */
export function routeOfDir(rest: string): RouteKey | null {
  const clean = rest.replace(/^\/+|\/+$/g, "");
  for (const key of Object.keys(ROUTES) as RouteKey[]) if (ROUTES[key].dir === clean) return key;
  return null;
}

/** Tizedes szám a nyelv szokása szerint (pl. 0,5 / 0.5). */
export const fmtNum = (lang: Locale, n: number, digits = 1) =>
  new Intl.NumberFormat(LOCALE_TAGS[lang], { maximumFractionDigits: digits }).format(n);

/** Behelyettesítés: fmt("{n} kérdés", { n: 3 }) → "3 kérdés". */
export const fmt = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));

/** Sorszám (percentilishez): angolul 1st/2nd/3rd/84th, máshol a szótár mintája szerint (pl. „84.”). */
export function ordinal(lang: Locale, template: string, n: number) {
  if (lang !== "en") return fmt(template, { n });
  const tens = n % 100;
  const suffix = tens >= 11 && tens <= 13 ? "th" : ({ 1: "st", 2: "nd", 3: "rd" } as Record<number, string>)[n % 10] ?? "th";
  return `${n}${suffix}`;
}

/** Egyszerű többes szám: { one, other } közül választ. */
export type Plural = { one: string; other: string };
export const plural = (p: Plural, n: number) => fmt(n === 1 ? p.one : p.other, { n });
