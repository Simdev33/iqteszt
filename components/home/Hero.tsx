"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import NeuralField from "./NeuralField";
import HeroMatrix from "./HeroMatrix";
import { Magnetic } from "@/components/ui/motion";
import { POOL_SIZE, TOTAL } from "@/lib/meta";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yBoard = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  // Parallax csak széles kijelzőn – mobilon egymás alatt vannak a blokkok, ott egymásra tolná őket
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const facts = [
    { k: String(TOTAL), v: "feladat" },
    { k: "~12", v: "perc" },
    { k: "4", v: "képességterület" },
  ];

  return (
    <section ref={ref} className="grain relative isolate overflow-hidden pt-28 pb-24 sm:pt-36 lg:min-h-[100svh] lg:pb-32">
      {/* Háttér: rács, fényfoltok, neuronháló */}
      <div aria-hidden className="grid-lines grid-fade absolute inset-0 -z-10" />
      <div aria-hidden className="absolute -top-40 left-1/2 -z-10 h-[620px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(107_85_255/0.35),transparent)]" />
      <div aria-hidden className="absolute top-1/3 -right-40 -z-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgb(69_227_196/0.14),transparent)]" />
      <div aria-hidden className="absolute bottom-0 -left-32 -z-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgb(255_125_77/0.12),transparent)]" />
      <NeuralField className="absolute inset-0 -z-10 h-full w-full" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.08fr_1fr] lg:gap-10">
        <motion.div style={wide ? { y: yText, opacity: fade } : undefined}>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.2 }} className="chip">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aqua opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-aqua" />
            </span>
            Online IQ-teszt · azonnali eredmény
          </motion.p>

          <h1 className="mt-7 font-display text-[clamp(2.7rem,7.4vw,5.6rem)] leading-[0.98] font-semibold tracking-[-0.045em]">
            {[
              <>Mennyi</>,
              <>
                az <span className="text-gradient text-gradient-anim">IQ-d?</span>
              </>,
            ].map((line, i) => (
              <span key={i} className="-mt-[0.2em] -mb-[0.08em] block overflow-hidden pt-[0.2em] pb-[0.08em]">
                <motion.span
                  className="block"
                  initial={{ y: "110%", rotate: 2 }}
                  animate={{ y: "0%", rotate: 0 }}
                  transition={{ duration: 1.1, ease, delay: 0.3 + i * 0.12 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease, delay: 0.65 }}
            className="mt-7 max-w-xl text-[1.08rem] leading-relaxed text-haze sm:text-lg"
          >
            Egy {POOL_SIZE} feladatos bankból minden kitöltésnél {TOTAL} új kérdést kapsz mintázatfelismerésből, számsorokból,
            szavakból és logikából. A végén azonnali IQ-becslés, percentilis és területenkénti bontás – regisztráció nélkül.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.8 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic strength={0.25}>
              <Link href="/teszt" className="btn-primary text-base">
                Teszt indítása
                <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
                  <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </Magnetic>
            <Link href="/#probafeladat" className="btn-ghost">
              Próbáld ki egy feladaton
            </Link>
          </motion.div>

          <motion.dl
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 1 } } }}
            className="mt-12 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/[0.07] pt-7"
          >
            {facts.map((f) => (
              <motion.div
                key={f.v}
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
              >
                <dt className="sr-only">{f.v}</dt>
                <dd className="font-display text-2xl font-semibold tracking-tight">{f.k}</dd>
                <dd className="mt-1 text-sm text-mist">{f.v}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          style={wide ? { y: yBoard } : undefined}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease, delay: 0.4 }}
          className="relative"
        >
          <HeroMatrix />
        </motion.div>
      </div>

      {/* Görgetésjelző */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] tracking-[0.25em] text-mist uppercase lg:flex"
      >
        Görgess
        <span className="relative h-9 w-[1px] overflow-hidden bg-white/10">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent to-iris"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
