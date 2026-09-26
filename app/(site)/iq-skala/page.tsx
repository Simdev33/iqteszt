import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import PercentileCalc from "@/components/scale/PercentileCalc";
import { Reveal, SplitLines } from "@/components/ui/motion";
import { SCALE_BANDS } from "@/lib/scale";

export const metadata: Metadata = {
  title: "IQ-skála és percentilis-kalkulátor",
  description: "Mit jelent egy IQ-érték? Az IQ-skála sávjai, a népességen belüli arányok és egy percentilis-kalkulátor – érthetően, magyarul.",
};

const TOPICS = [
  {
    t: "Miért éppen 100 az átlag?",
    d: "Az IQ viszonyszám. A teszteket nagy mintán kalibrálják úgy, hogy az átlagos teljesítmény 100 pontot, egy szórásnyi eltérés 15 pontot érjen. Így bármely érték azonnal lefordítható arra, hogy a népesség hány százalékánál jobb.",
  },
  {
    t: "Mit mér – és mit nem?",
    d: "Az IQ-tesztek az elvont gondolkodást, a mintázatfelismerést, a munkamemóriát és a nyelvi-logikai következtetést mérik. Nem mérik a kreativitást, az érzelmi intelligenciát, a szorgalmat vagy a szakmai tudást – pedig ezek legalább annyira számítanak.",
  },
  {
    t: "A Flynn-hatás",
    d: "A 20. század során a nyers teszteredmények évtizedenként kb. 3 ponttal javultak a fejlett országokban. Ezért kell a normákat rendszeresen újraszámolni – egy régi normával mért IQ felfelé torzít.",
  },
];

export default function ScalePage() {
  return (
    <>
      <PageHeader
        eyebrow="IQ-skála"
        title={[<span key="1">Mit jelent</span>, <span key="2" className="text-gradient">egy IQ-érték?</span>]}
        lead="Az IQ azt mutatja meg, hol helyezkedsz el a népesség eloszlásában. Húzd a csúszkát, és nézd meg, melyik érték hány százalékot jelent."
      />

      <section className="relative pb-20 sm:pb-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <PercentileCalc />
          </Reveal>
        </div>
      </section>

      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow">A sávok</p>
          </Reveal>
          <SplitLines
            className="mt-5 font-display text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.04] font-semibold tracking-[-0.04em]"
            lines={[<span key="1">Az IQ-skála</span>, <span key="2">sávonként.</span>]}
          />
          <div className="mt-12 overflow-hidden rounded-[1.75rem] border border-white/[0.07]">
            {[...SCALE_BANDS].reverse().map((b, i) => {
              const share = b.share < 1 ? b.share.toFixed(1).replace(".", ",") : String(Math.round(b.share));
              return (
                <Reveal
                  key={b.label}
                  delay={i * 0.04}
                  className="grid gap-3 border-b border-white/[0.06] bg-white/[0.015] px-5 py-6 last:border-b-0 sm:grid-cols-[9rem_12rem_1fr_6rem] sm:items-center sm:gap-6 sm:px-8"
                >
                  <span className="flex items-center gap-3 font-mono text-lg">
                    <span className="h-3 w-3 rounded-full" style={{ background: b.color }} />
                    {b.range}
                  </span>
                  <span className="font-display text-lg font-semibold tracking-tight">{b.label}</span>
                  <span className="text-sm leading-relaxed text-mist">{b.desc}</span>
                  <span className="font-mono text-sm text-haze sm:text-right">~{share}%</span>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 sm:px-8 md:grid-cols-3">
          {TOPICS.map((t, i) => (
            <Reveal key={t.t} delay={i * 0.08} className="panel rounded-[1.75rem] p-7">
              <span className="font-mono text-xs text-iris">0{i + 1}</span>
              <h2 className="mt-4 font-display text-xl font-semibold tracking-tight">{t.t}</h2>
              <p className="mt-3 leading-relaxed text-mist">{t.d}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14 flex justify-center px-5">
          <Link href="/teszt" className="btn-primary text-base">
            Mérd fel a sajátodat
          </Link>
        </Reveal>
      </section>
    </>
  );
}
