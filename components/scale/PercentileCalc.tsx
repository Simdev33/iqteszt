"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import BellCurve from "@/components/charts/BellCurve";
import { bandOf, fmtPct, percentileOf } from "@/lib/scoring";

/** Csúszkás percentilis-kalkulátor a haranggörbével. */
export default function PercentileCalc() {
  const [iq, setIq] = useState(115);
  const pct = percentileOf(iq);
  const band = bandOf(iq);
  const of100 = Math.round(pct);
  const fill = ((iq - 55) / 90) * 100;

  return (
    <div className="panel ring-gradient rounded-[2rem] p-5 sm:p-10">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-12">
        <div>
          <p className="eyebrow">Percentilis-kalkulátor</p>
          <div className="mt-6 flex items-end gap-4">
            <span className="font-display text-7xl leading-none font-semibold tracking-[-0.05em] tabular-nums">{iq}</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={band.label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="chip mb-2"
              >
                <span className="h-2 w-2 rounded-full" style={{ background: band.tone }} />
                {band.label}
              </motion.span>
            </AnimatePresence>
          </div>

          <label htmlFor="iq-range" className="sr-only">
            IQ-érték
          </label>
          <input
            id="iq-range"
            type="range"
            min={55}
            max={145}
            value={iq}
            onChange={(e) => setIq(Number(e.target.value))}
            className="iq-range mt-8 w-full"
            style={{ ["--fill" as string]: `${fill}%` }}
          />
          <div className="mt-2 flex justify-between font-mono text-xs text-mist">
            <span>55</span>
            <span>100</span>
            <span>145</span>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
              <p className="font-display text-2xl font-semibold">{fmtPct(pct)}.</p>
              <p className="mt-1 text-xs text-mist">percentilis</p>
            </div>
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
              <p className="font-display text-2xl font-semibold">{of100 >= 100 ? "~100" : of100 < 1 ? "<1" : of100} / 100</p>
              <p className="mt-1 text-xs text-mist">emberből ennyinél magasabb</p>
            </div>
          </div>
        </div>

        <BellCurve value={iq} />
      </div>
    </div>
  );
}
