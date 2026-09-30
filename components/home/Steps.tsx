"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { Reveal, SplitLines } from "@/components/ui/motion";
import { useI18n } from "@/components/i18n/I18nProvider";
import { fmt } from "@/lib/i18n/config";
import { TOTAL } from "@/lib/meta";

const ICONS = [
  {
    n: "01",
    icon: (
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    ),
  },
  {
    n: "02",
    icon: (
      <>
        <rect x="4" y="4" width="6" height="6" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <rect x="14" y="4" width="6" height="6" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <rect x="4" y="14" width="6" height="6" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M17 14.5v5M14.5 17h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    n: "03",
    icon: <path d="M3 19.5h18M4.5 18c2.5 0 3.5-11 7.5-11s5 11 7.5 11M12 7v12.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  },
];

export default function Steps() {
  const { t } = useI18n();
  const s = t.home.steps;
  const STEPS = ICONS.map((ic, i) => ({ ...ic, title: fmt(s.items[i].title, { total: TOTAL }), text: s.items[i].text }));
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section className="relative py-24 sm:py-32">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow">{s.eyebrow}</p>
          </Reveal>
          <SplitLines
            className="mt-5 font-display text-[clamp(2.1rem,5vw,3.8rem)] leading-[1.02] font-semibold tracking-[-0.04em]"
            lines={s.title.map((l, i) => <span key={i}>{l}</span>)}
          />
        </div>

        <div ref={ref} className="relative mt-16 grid gap-6 md:grid-cols-3 md:gap-5">
          {/* Összekötő vonal, görgetésre töltődik */}
          <div aria-hidden className="absolute top-[2.35rem] right-[16%] left-[16%] hidden h-px bg-white/10 md:block">
            <motion.div style={{ scaleX: line }} className="h-full origin-left bg-gradient-to-r from-iris via-aqua to-sun" />
          </div>

          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.12} className="relative">
              <div className="relative z-10 mx-auto grid h-[4.7rem] w-[4.7rem] place-items-center rounded-full border border-white/10 bg-ink-900 shadow-[0_0_0_8px_var(--color-void)] md:mx-0 md:ml-[calc(50%-2.35rem)]">
                <div className="absolute inset-1.5 rounded-full bg-gradient-to-b from-white/[0.08] to-transparent" />
                <svg viewBox="0 0 24 24" className="relative h-7 w-7 text-iris-soft" aria-hidden>
                  {s.icon}
                </svg>
              </div>
              <div className="panel mt-6 rounded-3xl p-7 text-center md:text-left">
                <span className="font-mono text-xs tracking-[0.2em] text-iris">{s.n}</span>
                <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-mist">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
