import type { Locale } from "./i18n/config";

// Árak – böngészőben is használható. A Stripe-hoz a lib/payment.ts innen veszi az összegeket,
// a felület pedig a price()-szal formázott szövegeket, így a kettő nem csúszhat el.

export const PRICING = {
  /** Egyszeri feloldás magyar nyelven, forintban. */
  oneTimeHuf: 1990,
  /** Egyszeri feloldás a többi nyelven, euróban. */
  oneTimeEur: 4.9,
  /** Próbaidős hozzáférés díja (azonnal terhelve), euróban. */
  trialEur: 3.9,
  /** A próbaidő hossza napokban. */
  trialDays: 7,
  /** Havidíj a próbaidő után, euróban. */
  monthlyEur: 9.9,
} as const;

export type Plan = "sub" | "one";

/** A Stripe-nak küldött egyszeri díj: pénznem és összeg a legkisebb egységben. */
export function oneTimeCharge(lang: Locale): { currency: "huf" | "eur"; unitAmount: number } {
  // A Stripe a forintot is kétjegyű tizedes pénznemként kezeli: 1 990 Ft = 199000.
  return lang === "hu"
    ? { currency: "huf", unitAmount: PRICING.oneTimeHuf * 100 }
    : { currency: "eur", unitAmount: Math.round(PRICING.oneTimeEur * 100) };
}
export const eurCents = (eur: number) => Math.round(eur * 100);

const NBSP = " ";

/** Ár a nyelv szokása szerint, determinisztikusan (szerveren és böngészőben ugyanaz a szöveg). */
export function money(lang: Locale, amount: number, currency: "EUR" | "HUF") {
  if (currency === "HUF") return `${String(Math.round(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, NBSP)}${NBSP}Ft`;
  const n = amount.toFixed(2);
  return lang === "en" ? `€${n}` : `${n.replace(".", ",")}${NBSP}€`;
}

/** A felületen használt, formázott árak egy nyelvre. */
export function prices(lang: Locale) {
  return {
    oneTime: lang === "hu" ? money(lang, PRICING.oneTimeHuf, "HUF") : money(lang, PRICING.oneTimeEur, "EUR"),
    trial: money(lang, PRICING.trialEur, "EUR"),
    monthly: money(lang, PRICING.monthlyEur, "EUR"),
    days: PRICING.trialDays,
  };
}
export type Prices = ReturnType<typeof prices>;
