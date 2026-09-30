import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { LOCALES, path } from "@/lib/i18n/config";
import { legalDoc } from "@/lib/i18n/legal";
import { getDict, langOf } from "@/lib/i18n/server";

export async function generateMetadata({ params }: PageProps<"/[lang]/aszf">): Promise<Metadata> {
  const lang = await langOf(params);
  return {
    title: getDict(lang).meta.termsTitle,
    alternates: { canonical: path(lang, "terms"), languages: Object.fromEntries(LOCALES.map((l) => [l, path(l, "terms")])) },
  };
}

export default async function TermsPage({ params }: PageProps<"/[lang]/aszf">) {
  const lang = await langOf(params);
  return <LegalPage lang={lang} doc={legalDoc(lang, "terms")} eyebrow={getDict(lang).footer.terms} />;
}
