import type { Locale } from "./i18n/config";

// Árak – böngészőben is használható. A Stripe-hoz a lib/payment.ts innen veszi az összegeket,
// a felület pedig a prices()-szal formázott szövegeket, így a kettő nem csúszhat el.

export const PRICING = {
  /** A hozzáférés első időszakának díja (azonnal terhelve), euróban. */
  trialEur: 3.9,
  /** Az első időszak hossza napokban. */
  trialDays: 7,
  /** Havidíj az első időszak után, euróban. */
  monthlyEur: 9.9,
} as const;

export const eurCents = (eur: number) => Math.round(eur * 100);

const NBSP = " ";

/** Ár a nyelv szokása szerint, determinisztikusan (szerveren és böngészőben ugyanaz a szöveg). */
export function money(lang: Locale, amount: number) {
  const n = amount.toFixed(2);
  return lang === "en" ? `€${n}` : `${n.replace(".", ",")}${NBSP}€`;
}

/** A felületen használt, formázott árak egy nyelvre. */
export function prices(lang: Locale) {
  return {
    trial: money(lang, PRICING.trialEur),
    monthly: money(lang, PRICING.monthlyEur),
    days: PRICING.trialDays,
    /** A havidíj első terhelésének napja (pl. „8.”). */
    nextDay: PRICING.trialDays + 1,
  };
}
export type Prices = ReturnType<typeof prices>;
