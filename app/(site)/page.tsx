import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import Domains from "@/components/home/Domains";
import Steps from "@/components/home/Steps";
import TryIt from "@/components/home/TryIt";
import ScaleSection from "@/components/home/ScaleSection";
import ResultPreview from "@/components/home/ResultPreview";
import Faq from "@/components/home/Faq";
import FinalCta from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Domains />
      <Steps />
      <TryIt />
      <ScaleSection />
      <ResultPreview />
      <Faq />
      <FinalCta />
    </>
  );
}
