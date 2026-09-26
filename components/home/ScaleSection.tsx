import Link from "next/link";
import BellCurve from "@/components/charts/BellCurve";
import { SCALE_BANDS } from "@/lib/scale";
import { Reveal, SplitLines } from "@/components/ui/motion";

export default function ScaleSection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <div>
            <Reveal>
              <p className="eyebrow">Az IQ-skála</p>
            </Reveal>
            <SplitLines
              className="mt-5 font-display text-[clamp(2.1rem,5vw,3.8rem)] leading-[1.02] font-semibold tracking-[-0.04em]"
              lines={[<span key="l1">Az átlag 100.</span>, <span key="l2">A többség 85 és 115 között.</span>]}
            />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-md text-lg leading-relaxed text-haze">
              Az IQ nem abszolút mérték, hanem viszonyszám: azt mutatja, hol helyezkedsz el a népesség eloszlásában. A skála átlaga 100,
              szórása 15 – így az emberek kb. kétharmada 85 és 115 közé esik.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="panel mt-14 rounded-[2rem] p-4 pt-6 sm:p-10">
          <BellCurve interactive />
          <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
            {SCALE_BANDS.map((b) => (
              <div key={b.label} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3.5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: b.color }} />
                  <span className="font-mono text-xs text-mist">{b.range}</span>
                </div>
                <p className="mt-2 text-sm font-medium">{b.label}</p>
                <p className="mt-0.5 text-xs text-mist">~{b.share < 1 ? b.share.toFixed(1).replace(".", ",") : Math.round(b.share)}%</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link href="/iq-skala" className="btn-ghost text-sm">
              Részletes IQ-skála és percentilis-kalkulátor →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
