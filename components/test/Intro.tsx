"use client";

import { motion } from "motion/react";
import { AGE_GROUPS } from "@/lib/norms";
import { DOMAINS, DOMAIN_COUNTS, POOL_SIZE, TOTAL, type Domain } from "@/lib/meta";

const ease = [0.22, 1, 0.36, 1] as const;

const RULES = [
  { k: String(TOTAL), v: `feladat, a ${POOL_SIZE} feladatos bankból válogatva` },
  { k: "~12", v: "perc az átlagos kitöltési idő" },
  { k: "∞", v: "nincs időkorlát, az idő nem számít" },
  { k: "←", v: "visszaléphetsz és átugorhatsz" },
];

export default function Intro({
  age,
  setAge,
  onStart,
  saved,
  onResume,
  pending,
  onUnlock,
}: {
  age: string;
  setAge: (a: string) => void;
  onStart: () => void;
  saved: { answered: number } | null;
  onResume: () => void;
  pending: { answered: number } | null;
  onUnlock: () => void;
}) {
  return (
    <div className="mx-auto max-w-4xl">
      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="eyebrow">
        Mielőtt belevágsz
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease, delay: 0.05 }}
        className="mt-5 font-display text-[clamp(2.2rem,6vw,4rem)] leading-[1.02] font-semibold tracking-[-0.045em]"
      >
        Keress egy csendes <span className="text-gradient">sarkot.</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.15 }}
        className="mt-5 max-w-2xl text-lg leading-relaxed text-haze"
      >
        Kapcsold ki az értesítéseket, és oldd meg a feladatokat segítség nélkül. Papír és ceruza használható – számológép és internetes
        keresés nem.
      </motion.p>

      {pending && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
          className="mt-8 flex flex-col gap-4 rounded-3xl border border-aqua/30 bg-aqua/[0.07] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
        >
          <div>
            <p className="font-medium">Egy befejezett teszted eredménye már vár rád.</p>
            <p className="mt-1 text-sm text-haze">
              {pending.answered} / {TOTAL} kérdésre válaszoltál. Az eredményt bármikor feloldhatod.
            </p>
          </div>
          <button type="button" onClick={onUnlock} className="btn-primary shrink-0 !py-3">
            Eredmény feloldása
          </button>
        </motion.div>
      )}

      {saved && saved.answered > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
          className="mt-8 flex flex-col gap-4 rounded-3xl border border-iris/30 bg-iris/[0.07] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
        >
          <div>
            <p className="font-medium">Van egy félbehagyott teszted.</p>
            <p className="mt-1 text-sm text-haze">
              {saved.answered} / {TOTAL} kérdésre már válaszoltál. Folytathatod, ahol abbahagytad.
            </p>
          </div>
          <button type="button" onClick={onResume} className="btn-primary shrink-0 !py-3">
            Folytatás
          </button>
        </motion.div>
      )}

      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } } }}
        className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4"
      >
        {RULES.map((r) => (
          <motion.div
            key={r.v}
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
            className="panel rounded-3xl p-5"
          >
            <p className="font-display text-3xl font-semibold tracking-tight">{r.k}</p>
            <p className="mt-2 text-sm leading-snug text-mist">{r.v}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.45 }}
        className="panel mt-3 rounded-3xl p-5 sm:p-7"
      >
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {(Object.keys(DOMAINS) as Domain[]).map((d) => (
            <span key={d} className="flex items-center gap-2 text-sm text-haze">
              <span className="h-2 w-2 rounded-full" style={{ background: DOMAINS[d].color }} />
              {DOMAINS[d].name}
              <span className="font-mono text-mist">×{DOMAIN_COUNTS[d]}</span>
            </span>
          ))}
        </div>

        <div className="mt-7 border-t border-white/[0.06] pt-6">
          <p className="font-medium">
            Korcsoport <span className="font-normal text-mist">– a viszonyítási alaphoz (nem kötelező)</span>
          </p>
          <div className="mt-4 flex flex-wrap gap-2" role="radiogroup" aria-label="Korcsoport">
            {AGE_GROUPS.map((a) => {
              const on = age === a.id;
              return (
                <button
                  key={a.id}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setAge(on ? "" : a.id)}
                  className={`relative rounded-full border px-4 py-2.5 text-sm transition-colors duration-300 ${
                    on ? "border-iris/70 text-white" : "border-white/10 bg-white/[0.03] text-haze hover:border-white/25 hover:text-paper"
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="age-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-iris/25"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  {a.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-mist">
            Tipp: a <span className="kbd">A</span>–<span className="kbd">F</span> billentyűkkel válaszolhatsz, a nyilakkal lapozhatsz.
          </p>
          <button type="button" onClick={onStart} className="btn-primary text-base">
            {saved && saved.answered > 0 ? "Új teszt indítása" : "Kezdés"}
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
              <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
