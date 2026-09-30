"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Dict } from "@/lib/i18n/dict/hu";
import type { Prices } from "@/lib/pricing";

type I18n = { lang: Locale; t: Dict; prices: Prices };

const Ctx = createContext<I18n | null>(null);

/** A nyelv, a szótár és a formázott árak a kliens-komponenseknek (a szerveres layout adja át). */
export function I18nProvider({ lang, t, prices, children }: I18n & { children: ReactNode }) {
  return <Ctx.Provider value={{ lang, t, prices }}>{children}</Ctx.Provider>;
}

export function useI18n(): I18n {
  const v = useContext(Ctx);
  if (!v) throw new Error("useI18n: hiányzik az I18nProvider.");
  return v;
}
