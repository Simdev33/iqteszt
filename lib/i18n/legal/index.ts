import "server-only";
import type { Locale } from "../config";
import { fmt } from "../config";
import { prices } from "../../pricing";
import { brand, company } from "../../site";
import type { LegalDoc, LegalTexts } from "./types";
import hu from "./hu";
import en from "./en";
import de from "./de";
import fr from "./fr";
import it from "./it";
import es from "./es";

const LEGAL: Record<Locale, LegalTexts> = { hu, en, de, fr, it, es };

/** A jogi szövegek hatálybalépésének napja. */
export const LEGAL_UPDATED = "2026-10-04";

/** A jogi dokumentum a cégadatokkal és az árakkal behelyettesítve. */
export function legalDoc(lang: Locale, which: keyof LegalTexts): LegalDoc {
  const vars = {
    company: company.name,
    address: company.address,
    country: company.country[lang],
    register: company.register,
    ico: company.ico,
    dic: company.dic,
    capital: company.capital,
    email: brand.email,
    site: brand.domain,
    ...prices(lang),
  };
  const doc = LEGAL[lang][which];
  return {
    title: doc.title,
    lead: fmt(doc.lead, vars),
    sections: doc.sections.map((s) => ({ h: fmt(s.h, vars), p: s.p.map((x) => fmt(x, vars)) })),
  };
}
