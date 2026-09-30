"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Reveal, SplitLines } from "@/components/ui/motion";
import { useI18n } from "@/components/i18n/I18nProvider";
import { fmt } from "@/lib/i18n/config";

export default function Faq() {
  const { t, prices } = useI18n();
  const s = t.home.faq;
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="gyik" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <p className="eyebrow">{s.eyebrow}</p>
          </Reveal>
          <SplitLines
            className="mt-5 font-display text-[clamp(2.1rem,5vw,3.4rem)] leading-[1.04] font-semibold tracking-[-0.04em]"
            lines={s.title.map((l, i) => <span key={i}>{l}</span>)}
          />
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-sm text-haze">{s.lead}</p>
          </Reveal>
        </div>

        <div className="space-y-3">
          {t.faq.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.04}>
                <div className={`rounded-2xl border transition-colors duration-300 ${isOpen ? "border-iris/30 bg-iris/[0.05]" : "border-white/[0.07] bg-white/[0.02]"}`}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left sm:px-6"
                  >
                    <span className="font-medium sm:text-lg">{f.q}</span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                        isOpen ? "rotate-45 border-iris/50 bg-iris text-white" : "border-white/15 text-haze"
                      }`}
                    >
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
                        <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-6 leading-relaxed text-haze sm:px-6">{fmt(f.a, prices)}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
