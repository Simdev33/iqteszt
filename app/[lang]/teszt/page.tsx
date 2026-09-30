import type { Metadata } from "next";
import TestRunner from "@/components/test/TestRunner";
import { LOCALES, path } from "@/lib/i18n/config";
import { getDict, langOf } from "@/lib/i18n/server";
import { publicSlots } from "@/lib/questions";

export async function generateMetadata({ params }: PageProps<"/[lang]/teszt">): Promise<Metadata> {
  const lang = await langOf(params);
  const t = getDict(lang);
  return {
    title: t.meta.testTitle,
    description: t.meta.testDescription,
    alternates: { canonical: path(lang, "test"), languages: Object.fromEntries(LOCALES.map((l) => [l, path(l, "test")])) },
  };
}

export default async function TestPage({ params }: PageProps<"/[lang]/teszt">) {
  const lang = await langOf(params);
  // A böngésző csak a kérdéseket kapja meg – a helyes válaszok és a pontozás a szerveren maradnak.
  return <TestRunner slots={publicSlots(lang)} />;
}
