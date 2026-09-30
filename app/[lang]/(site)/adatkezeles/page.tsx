import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { LOCALES, path } from "@/lib/i18n/config";
import { legalDoc } from "@/lib/i18n/legal";
import { getDict, langOf } from "@/lib/i18n/server";

export async function generateMetadata({ params }: PageProps<"/[lang]/adatkezeles">): Promise<Metadata> {
  const lang = await langOf(params);
  return {
    title: getDict(lang).meta.privacyTitle,
    alternates: { canonical: path(lang, "privacy"), languages: Object.fromEntries(LOCALES.map((l) => [l, path(l, "privacy")])) },
  };
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/adatkezeles">) {
  const lang = await langOf(params);
  return <LegalPage lang={lang} doc={legalDoc(lang, "privacy")} eyebrow={getDict(lang).footer.privacy} />;
}
