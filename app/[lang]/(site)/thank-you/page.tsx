import type { Metadata } from "next";
import ThankYou from "@/components/result/ThankYou";
import { getDict, langOf } from "@/lib/i18n/server";
import { THANK_YOU } from "@/lib/thank-you";

export async function generateMetadata({ params }: PageProps<"/[lang]/thank-you">): Promise<Metadata> {
  const lang = await langOf(params);
  return {
    title: getDict(lang).meta.thankYouTitle,
    robots: { index: false, follow: false },
    // Minden nyelven ugyanazon a címen él (lásd proxy.ts) – a Google Ads ezt a címet méri konverzióként.
    alternates: { canonical: THANK_YOU },
  };
}

/** Köszönőoldal sikeres fizetés után; a böngészőben mindig /thank-you a címe, a nyelvet a proxy választja. */
export default function ThankYouPage() {
  return <ThankYou />;
}
