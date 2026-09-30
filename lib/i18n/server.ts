import "server-only";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "./config";
import hu, { type Dict } from "./dict/hu";
import en from "./dict/en";
import de from "./dict/de";
import fr from "./dict/fr";
import it from "./dict/it";
import es from "./dict/es";

const DICTS: Record<Locale, Dict> = { hu, en, de, fr, it, es };

export const getDict = (lang: Locale): Dict => DICTS[lang];

/** A route [lang] paramétere; ismeretlen nyelvnél 404. */
export async function langOf(params: Promise<{ lang: string }>): Promise<Locale> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return lang;
}
