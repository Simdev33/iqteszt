"use client";

import { motion } from "motion/react";
import Gauge from "@/components/charts/Gauge";
import { Reveal, SplitLines, TiltCard } from "@/components/ui/motion";
import { DOMAINS, PRICE_LABEL } from "@/lib/meta";

const SAMPLE = [
  { d: "matrix", pct: 0.86 },
  { d: "numeric", pct: 0.67 },
  { d: "verbal", pct: 0.8 },
  { d: "logic", pct: 0.6 },
] as const;

const POINTS = [
  { t: "IQ-becslés és percentilis", d: "Hol állsz a népességhez képest – egyetlen, érthető számmal." },
  { t: "Területenkénti bontás", d: "Mintázat, számok, szavak, logika: látod, mi az erősséged." },
  { t: "Megoldások magyarázattal", d: "Mind a 30 feladat helyes válasza, levezetéssel." },
  { t: "Megosztható link", d: "Egy kattintással elküldheted a barátaidnak – ők is kipróbálhatják." },
];

export default function ResultPreview() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="absolute top-1/2 left-[20%] -z-10 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(107_85_255/0.22),transparent)]" />
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <TiltCard max={8} className="group mx-auto max-w-md rounded-[2rem]">
            <div className="glass ring-gradient rounded-[2rem] p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="eyebrow">Minta-eredmény</span>
                <span className="chip !py-1 text-xs">Magas · 92. percentilis</span>
              </div>
              <Gauge value={121} label="IQ-becslés" sub="Jobb, mint a népesség 92%-a" className="mx-auto mt-4 max-w-[300px]" />
              <div className="mt-2 space-y-3.5">
                {SAMPLE.map((s, i) => (
                  <div key={s.d}>
                    <div className="flex justify-between text-sm">
                      <span className="text-haze">{DOMAINS[s.d].name}</span>
                      <span className="font-mono text-mist">{Math.round(s.pct * 100)}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: DOMAINS[s.d].color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.pct * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, delay: 0.6 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TiltCard>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow">Az eredményed</p>
          </Reveal>
          <SplitLines
            className="mt-5 font-display text-[clamp(2.1rem,5vw,3.8rem)] leading-[1.02] font-semibold tracking-[-0.04em]"
            lines={[<span key="l1">Nem csak egy szám –</span>, <span key="l2" className="text-gradient">egy teljes profil.</span>]}
          />
          <ul className="mt-10 space-y-3">
            {POINTS.map((p, i) => (
              <Reveal as="li" key={p.t} delay={0.08 * i} className="flex gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-iris/15 text-iris-soft">
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
                    <path d="m3.5 8.5 3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>
                  <span className="block font-medium">{p.t}</span>
                  <span className="mt-0.5 block text-sm text-mist">{p.d}</span>
                </span>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.3}>
            <p className="mt-6 text-sm text-mist">
              A kitöltés ingyenes. A teljes eredmény egyszeri <span className="font-medium text-paper">{PRICE_LABEL}</span> – nincs előfizetés,
              nincs ismétlődő terhelés.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
