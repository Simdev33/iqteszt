"use client";

import { animate, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";

/** Kiértékelő átvezető: forgó gyűrűk, számláló és pipálódó lépések. */
export default function Analyzing({ onDone, duration = 3.6 }: { onDone: () => void; duration?: number }) {
  const { t } = useI18n();
  const STEPS = t.test.analyzing.steps;
  const [pct, setPct] = useState(0);
  const done = useRef(onDone);
  useEffect(() => {
    done.current = onDone;
  }, [onDone]);

  useEffect(() => {
    const c = animate(0, 100, {
      duration,
      ease: [0.45, 0, 0.2, 1],
      onUpdate: (v) => setPct(Math.round(v)),
      onComplete: () => setTimeout(() => done.current(), 350),
    });
    return () => c.stop();
  }, [duration]);

  const doneSteps = Math.floor((pct / 100) * STEPS.length + 0.001);

  return (
    <div className="mx-auto flex max-w-md flex-col items-center py-6 text-center">
      <div className="relative h-56 w-56">
        <div aria-hidden className="absolute inset-6 rounded-full bg-iris/30 blur-3xl" />
        {[0, 1, 2].map((k) => (
          <motion.svg
            key={k}
            viewBox="0 0 200 200"
            className="absolute inset-0 h-full w-full"
            animate={{ rotate: k % 2 ? -360 : 360 }}
            transition={{ duration: 6 + k * 3, repeat: Infinity, ease: "linear" }}
            aria-hidden
          >
            <circle
              cx="100"
              cy="100"
              r={92 - k * 18}
              fill="none"
              stroke={["#8b7bff", "#45e3c4", "#ffcf5c"][k]}
              strokeOpacity={0.7 - k * 0.15}
              strokeWidth={k === 0 ? 2 : 1.4}
              strokeDasharray={k === 0 ? "60 520" : k === 1 ? "4 10" : "120 200"}
              strokeLinecap="round"
            />
          </motion.svg>
        ))}
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden>
          <circle cx="100" cy="100" r="92" fill="none" stroke="rgb(255 255 255 / 0.06)" strokeWidth="2" />
          <circle
            cx="100"
            cy="100"
            r="92"
            fill="none"
            stroke="url(#an-g)"
            strokeWidth="3"
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray={`${pct} 100`}
          />
          <defs>
            <linearGradient id="an-g" x1="0" x2="1">
              <stop offset="0" stopColor="#8b7bff" />
              <stop offset="1" stopColor="#45e3c4" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <span className="font-display text-5xl font-semibold tracking-tight tabular-nums">
            {pct}
            <span className="text-2xl text-mist">%</span>
          </span>
        </div>
      </div>

      <h2 className="mt-8 font-display text-2xl font-semibold tracking-tight">{t.test.analyzing.title}</h2>
      <ul className="mt-6 w-full space-y-2.5 text-left">
        {STEPS.map((s, i) => {
          const done = i < doneSteps;
          const active = i === doneSteps;
          return (
            <motion.li
              key={s}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: done || active ? 1 : 0.35, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm"
            >
              <span
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
                  done ? "bg-aqua text-ink-950" : active ? "border border-iris" : "border border-white/15"
                }`}
              >
                {done ? (
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
                    <path d="m3.5 8.5 3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : active ? (
                  <span className="h-2 w-2 animate-ping rounded-full bg-iris" />
                ) : null}
              </span>
              <span className={done ? "text-paper" : "text-haze"}>{s}</span>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
