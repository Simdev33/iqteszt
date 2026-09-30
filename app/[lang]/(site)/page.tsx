import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import Domains from "@/components/home/Domains";
import Steps from "@/components/home/Steps";
import TryIt from "@/components/home/TryIt";
import ScaleSection from "@/components/home/ScaleSection";
import ResultPreview from "@/components/home/ResultPreview";
import Faq from "@/components/home/Faq";
import FinalCta from "@/components/home/FinalCta";
import { langOf } from "@/lib/i18n/server";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const lang = await langOf(params);
  return (
    <>
      <Hero />
      <Marquee lang={lang} />
      <Domains />
      <Steps />
      <TryIt />
      <ScaleSection lang={lang} />
      <ResultPreview />
      <Faq />
      <FinalCta lang={lang} />
    </>
  );
}
