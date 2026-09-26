"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function PageHeader({ eyebrow, title, lead }: { eyebrow: string; title: ReactNode[]; lead: string }) {
  return (
    <section className="grain relative isolate overflow-hidden pt-32 pb-14 sm:pt-44 sm:pb-20">
      <div aria-hidden className="grid-lines grid-fade absolute inset-0 -z-10" />
      <div aria-hidden className="absolute -top-48 left-1/2 -z-10 h-[560px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(107_85_255/0.3),transparent)]" />
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.15 }} className="eyebrow">
          {eyebrow}
        </motion.p>
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.4rem,6.4vw,4.8rem)] leading-[1.0] font-semibold tracking-[-0.045em]">
          {title.map((l, i) => (
            <span key={i} className="-mt-[0.2em] -mb-[0.08em] block overflow-hidden pt-[0.2em] pb-[0.08em]">
              <motion.span className="block" initial={{ y: "110%", rotate: 2 }} animate={{ y: 0, rotate: 0 }} transition={{ duration: 1.05, ease, delay: 0.25 + i * 0.1 }}>
                {l}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease, delay: 0.55 }}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-haze"
        >
          {lead}
        </motion.p>
      </div>
    </section>
  );
}
