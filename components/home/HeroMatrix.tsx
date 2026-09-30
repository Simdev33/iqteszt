"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import MatrixBoard from "@/components/matrix/MatrixBoard";
import MatrixCell from "@/components/matrix/MatrixCell";
import { DEMOS } from "@/lib/demo-matrices";
import { useI18n } from "@/components/i18n/I18nProvider";
import type { MatrixSpec } from "@/lib/shapes";

const SHOWCASE: { spec: MatrixSpec; rule: "nested" | "sum" | "rotate" | "fill" }[] = [
  { spec: DEMOS.nested, rule: "nested" },
  { spec: DEMOS.sum, rule: "sum" },
  { spec: DEMOS.rotate, rule: "rotate" },
  { spec: DEMOS.fill, rule: "fill" },
];

/** A hero lebegő, 3D-ben billenő mátrixa, ami magától „megoldja” a feladatokat. */
export default function HeroMatrix() {
  const { t } = useI18n();
  const [idx, setIdx] = useState(0);
  const [probe, setProbe] = useState(-1); // melyik jelöltet próbálja épp; 5 = helyes
  const [solved, setSolved] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-1, 1], [14, -6]), { stiffness: 90, damping: 18 });
  const ry = useSpring(useTransform(px, [-1, 1], [-20, 8]), { stiffness: 90, damping: 18 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      px.set((e.clientX / window.innerWidth) * 2 - 1);
      py.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py]);

  // Megoldási ciklus: 3 rossz jelölt → helyes → tartás → következő feladat
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));
    at(1300, () => setProbe(0));
    at(1850, () => setProbe(1));
    at(2400, () => setProbe(2));
    at(2950, () => {
      setProbe(5);
      setSolved(true);
    });
    at(5600, () => {
      setProbe(-1);
      setSolved(false);
      setIdx((i) => (i + 1) % SHOWCASE.length);
    });
    return () => timers.forEach(clearTimeout);
  }, [idx]);

  const { spec, rule } = SHOWCASE[idx];
  const fill = probe === 5 ? spec.answer : probe >= 0 ? spec.distractors[probe] : null;

  return (
    <div ref={wrap} className="relative mx-auto w-full max-w-[460px] [perspective:1400px]">
      {/* Keringő gyűrűk a tábla mögött */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[128%] -translate-x-1/2 -translate-y-1/2">
        <svg viewBox="0 0 200 200" className="h-full w-full animate-spin-slow opacity-60">
          <defs>
            <linearGradient id="orbit-g" x1="0" x2="1">
              <stop offset="0" stopColor="#8b7bff" stopOpacity="0" />
              <stop offset="0.5" stopColor="#8b7bff" stopOpacity="0.8" />
              <stop offset="1" stopColor="#45e3c4" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="96" fill="none" stroke="url(#orbit-g)" strokeWidth="0.5" />
          <circle cx="100" cy="4" r="1.6" fill="#b3a8ff" />
          <circle cx="100" cy="100" r="80" fill="none" stroke="rgb(255 255 255 / 0.06)" strokeWidth="0.4" strokeDasharray="1 3" />
        </svg>
      </div>
      <div aria-hidden className="absolute left-1/2 top-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-iris/30 blur-[90px]" />

      <motion.div style={{ rotateX: rx, rotateY: ry }} className="relative [transform-style:preserve-3d]">
        <motion.div className="animate-float">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24, rotateX: -18, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -24, rotateX: 18, filter: "blur(10px)" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <MatrixBoard cells={spec.cells} guide={spec.guide} fill={fill} state={solved ? "correct" : "idle"} className="glass" />
            </motion.div>
          </AnimatePresence>

          {/* Lebegő jelöltek a tábla mellett (mélységben előrébb) */}
          <div className="pointer-events-none absolute top-[14%] left-full ml-5 hidden flex-col gap-2.5 xl:flex" style={{ transform: "translateZ(60px)" }}>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`${idx}-${i}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: probe === i ? 1 : solved ? 0.25 : 0.7, x: 0, scale: probe === i ? 1.08 : 1 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                className={`glass h-14 w-14 rounded-xl p-1.5 ${probe === i ? "ring-1 ring-flame/70" : ""}`}
              >
                <MatrixCell cell={spec.distractors[i]} guide={spec.guide} className="h-full w-full" />
              </motion.div>
            ))}
          </div>

          {/* Megoldva jelvény */}
          <AnimatePresence>
            {solved && (
              <motion.div
                key={`ok-${idx}`}
                initial={{ opacity: 0, y: 12, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="glass absolute -bottom-5 left-4 flex items-center gap-2.5 rounded-full py-2 pr-4 pl-2 text-sm sm:-left-6"
                style={{ transform: "translateZ(80px)" }}
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-aqua text-ink-950">
                  <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
                    <path d="m3.5 8.5 3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-haze">
                  {t.home.hero.ruleLabel} <span className="font-medium text-paper">{t.home.hero.rules[rule]}</span>
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
