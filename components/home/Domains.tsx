"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import MatrixBoard from "@/components/matrix/MatrixBoard";
import { DEMOS } from "@/lib/demo-matrices";
import { DOMAINS, DOMAIN_COUNTS, type Domain } from "@/lib/meta";
import { Reveal, SplitLines } from "@/components/ui/motion";
import Rich from "@/components/i18n/Rich";
import { useI18n } from "@/components/i18n/I18nProvider";
import { fmt } from "@/lib/i18n/config";

const ease = [0.22, 1, 0.36, 1] as const;

/** Időzített ciklus, ami csak látható állapotban pörög. */
function useCycle(length: number, ms: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => setI((v) => (v + 1) % length), ms);
    return () => clearInterval(t);
  }, [inView, length, ms]);
  return { ref, i, inView };
}

function MatrixMini() {
  const { ref, i } = useCycle(2, 1900);
  const spec = DEMOS.latin;
  return (
    <div ref={ref} className="mx-auto w-full max-w-[300px]">
      <MatrixBoard cells={spec.cells} fill={i === 1 ? spec.answer : null} state={i === 1 ? "correct" : "idle"} animateIn={false} />
    </div>
  );
}

function NumberMini() {
  const seq = [1, 2, 4, 7, 11];
  const { ref, i } = useCycle(7, 700);
  const solved = i >= 5;
  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      <div className="flex h-7 items-end gap-1.5 font-mono text-xs text-aqua sm:gap-2">
        {seq.map((_, k) => (
          <motion.span
            key={k}
            animate={{ opacity: k < i ? 1 : 0.12, y: k < i ? 0 : 4 }}
            className="w-10 translate-x-[23px] text-center sm:w-11 sm:translate-x-[26px]"
          >
            +{k + 1}
          </motion.span>
        ))}
      </div>
      <div className="flex gap-1.5 sm:gap-2">
        {[...seq, null].map((n, k) => (
          <div
            key={k}
            className={`grid h-11 w-10 place-items-center rounded-xl border font-display text-lg font-semibold sm:w-11 ${
              n == null ? "border-aqua/50 bg-aqua/10" : "border-white/10 bg-white/[0.04]"
            }`}
          >
            {n ?? (
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={solved ? "a" : "q"}
                  initial={{ rotateX: -90, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  exit={{ rotateX: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={solved ? "text-aqua" : "text-mist"}
                >
                  {solved ? 16 : "?"}
                </motion.span>
              </AnimatePresence>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function WordMini() {
  const { t } = useI18n();
  const wd = t.home.domains.word;
  const words = wd.tries;
  const { ref, i } = useCycle(4, 1100);
  const w = words[Math.min(i, 2)];
  const ok = i >= 2;
  return (
    <div ref={ref} className="flex flex-col items-center gap-3 font-display text-[0.95rem] sm:text-lg">
      <div className="flex items-center gap-2.5">
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5">{wd.a}</span>
        <span className="text-mist">:</span>
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5">{wd.b}</span>
      </div>
      <div className="flex items-center gap-2.5">
        <span className="px-1 text-flame">=</span>
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5">{wd.c}</span>
        <span className="text-mist">:</span>
        <span
          className={`relative inline-grid min-w-[7.5rem] place-items-center overflow-hidden rounded-full border px-3.5 py-1.5 transition-colors duration-300 ${
            ok ? "border-flame/60 bg-flame/15 text-paper" : "border-dashed border-white/20 text-mist"
          }`}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span key={w} initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-100%", opacity: 0 }} transition={{ duration: 0.35, ease }}>
              {w}
            </motion.span>
          </AnimatePresence>
        </span>
      </div>
    </div>
  );
}

function LogicMini() {
  const { t } = useI18n();
  const ages = [1, 4, 2, 3];
  const people = t.home.domains.people.map((n, k) => ({ n, age: ages[k] }));
  const { ref, i } = useCycle(2, 2200);
  const list = i === 1 ? [...people].sort((a, b) => b.age - a.age) : people;
  return (
    <div ref={ref} className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {list.map((p, k) => (
          <motion.div key={p.n} layout transition={{ type: "spring", stiffness: 260, damping: 26 }} className="flex items-center gap-2">
            <span
              className={`rounded-full border px-3.5 py-1.5 font-display text-sm sm:text-base ${
                i === 1 && k === 0 ? "border-sun/60 bg-sun/15" : i === 1 && k === 3 ? "border-white/25 bg-white/10" : "border-white/10 bg-white/[0.04]"
              }`}
            >
              {p.n}
            </span>
            {k < 3 && <span className={`font-mono text-sm transition-opacity ${i === 1 ? "text-sun opacity-100" : "opacity-30"}`}>&gt;</span>}
          </motion.div>
        ))}
      </div>
      <p className="font-mono text-[0.7rem] tracking-[0.18em] text-mist uppercase">{i === 1 ? t.home.domains.sorted : t.home.domains.unsorted}</p>
    </div>
  );
}

function Card({
  domain,
  className = "",
  children,
  delay = 0,
  big = false,
}: {
  domain: Domain;
  className?: string;
  children: ReactNode;
  delay?: number;
  big?: boolean;
}) {
  const { t } = useI18n();
  const d = { ...DOMAINS[domain], ...t.domains[domain] };
  return (
    <Reveal delay={delay} className={`group panel relative flex flex-col overflow-hidden rounded-[1.75rem] p-6 sm:p-8 ${className}`}>
      <div
        aria-hidden
        className="absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-25 blur-3xl transition-opacity duration-700 group-hover:opacity-50"
        style={{ background: d.color }}
      />
      <div className="relative flex items-center justify-between">
        <span className="chip">
          <span className="h-2 w-2 rounded-full" style={{ background: d.color }} />
          {fmt(t.home.domains.count, { n: DOMAIN_COUNTS[domain] })}
        </span>
        <span className="font-mono text-xs text-mist">{d.short}</span>
      </div>
      <div className={`relative flex flex-1 items-center justify-center ${big ? "py-10" : "py-9"}`}>{children}</div>
      <div className="relative">
        <h3 className={`font-display font-semibold tracking-tight ${big ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}>{d.name}</h3>
        <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-mist">{d.blurb}</p>
      </div>
    </Reveal>
  );
}

export default function Domains() {
  const { t } = useI18n();
  const s = t.home.domains;
  return (
    <section id="teruletek" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <Reveal>
              <p className="eyebrow">{s.eyebrow}</p>
            </Reveal>
            <SplitLines
              className="mt-5 font-display text-[clamp(2.1rem,5vw,3.8rem)] leading-[1.02] font-semibold tracking-[-0.04em]"
              lines={s.title.map((l, i) => (
                <span key={i}>
                  <Rich text={l} />
                </span>
              ))}
            />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-md text-lg leading-relaxed text-haze">{s.lead}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-6 lg:grid-rows-[auto_auto]">
          <Card domain="matrix" big className="lg:col-span-3 lg:row-span-2">
            <MatrixMini />
          </Card>
          <Card domain="numeric" delay={0.08} className="lg:col-span-3">
            <NumberMini />
          </Card>
          <Card domain="verbal" delay={0.16} className="lg:col-span-3">
            <WordMini />
          </Card>
          <Card domain="logic" delay={0.1} className="lg:col-span-6">
            <LogicMini />
          </Card>
        </div>
      </div>
    </section>
  );
}
