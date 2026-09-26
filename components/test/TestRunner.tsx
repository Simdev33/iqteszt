"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import Logo from "@/components/ui/Logo";
import { TOTAL, buildTest } from "@/lib/questions";
import { formatDuration, resultHref } from "@/lib/scoring";
import { useTestState } from "./useTestState";
import QuestionView from "./QuestionView";
import Intro from "./Intro";
import Review from "./Review";
import Analyzing from "./Analyzing";

const ease = [0.22, 1, 0.36, 1] as const;

export default function TestRunner() {
  const router = useRouter();
  const s = useTestState();
  const { phase, index, answers, goTo, answer, setPhase } = s;
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const questions = useMemo(() => buildTest(s.variants), [s.variants]);
  const q = questions[index];
  const answered = answers.filter((a) => a != null).length;

  const next = useCallback(() => {
    if (index >= TOTAL - 1) setPhase("review");
    else goTo(index + 1);
  }, [index, goTo, setPhase]);

  const prev = useCallback(() => {
    if (index > 0) goTo(index - 1);
  }, [index, goTo]);

  const pick = useCallback(
    (i: number) => {
      answer(index, i);
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
      advanceTimer.current = setTimeout(next, 520);
    },
    [answer, index, next],
  );

  useEffect(() => () => void (advanceTimer.current && clearTimeout(advanceTimer.current)), []);
  // Kérdésváltáskor töröljük a függő automatikus továbblépést
  useEffect(() => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
  }, [index, phase]);

  // Kérdésváltáskor a lap tetejére (mobilon fontos)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [index, phase]);

  // Billentyűzet
  useEffect(() => {
    if (phase !== "quiz") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      const letter = "abcdef".indexOf(k);
      const digit = "123456".indexOf(k);
      const opt = letter >= 0 ? letter : digit;
      if (opt >= 0 && opt < q.options.length) {
        e.preventDefault();
        pick(opt);
      } else if (k === "arrowright" || (k === "enter" && answers[index] != null)) {
        e.preventDefault();
        next();
      } else if (k === "arrowleft") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, q, pick, next, prev, answers, index]);

  const finish = useCallback(() => {
    s.clearSaved();
    router.push(resultHref(answers, s.variants, s.age, s.elapsed));
  }, [s, router, answers]);

  const dir = s.dir.current;

  return (
    <div className="relative min-h-svh overflow-x-clip">
      {/* Háttér */}
      <div aria-hidden className="grid-lines grid-fade pointer-events-none fixed inset-0 -z-10 opacity-60" />
      <div aria-hidden className="pointer-events-none fixed -top-60 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(107_85_255/0.22),transparent)]" />
      <div aria-hidden className="pointer-events-none fixed -right-40 bottom-0 -z-10 h-[500px] w-[500px] rounded-full bg-[radial-gradient(closest-side,rgb(69_227_196/0.08),transparent)]" />

      {/* Felső sáv */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-void/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-8">
          <Logo />
          <div className="flex items-center gap-2 sm:gap-3">
            {(phase === "quiz" || phase === "review") && (
              <span className="chip font-mono tabular-nums" title="Eltelt idő">
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-mist" aria-hidden>
                  <circle cx="8" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M8 5.5v3l2 1.2M6.5 1.8h3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                {formatDuration(s.elapsed)}
              </span>
            )}
            <Link href="/" className="btn-ghost !px-4 !py-2 text-sm">
              Kilépés
            </Link>
          </div>
        </div>

        {/* Szegmentált haladásjelző – bármelyik kérdésre rá lehet ugrani */}
        {(phase === "quiz" || phase === "review") && (
          <div className="mx-auto max-w-6xl px-4 pb-3 sm:px-8">
            <div className="flex gap-[3px]" role="navigation" aria-label="Kérdések">
              {questions.map((qq, i) => {
                const cur = phase === "quiz" && i === index;
                const done = answers[i] != null;
                return (
                  <button
                    key={qq.id}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`${i + 1}. kérdés${done ? " (megválaszolva)" : ""}`}
                    aria-current={cur ? "step" : undefined}
                    className="group relative h-4 flex-1"
                  >
                    <span
                      className={`absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full transition-all duration-300 group-hover:h-2.5 ${
                        cur ? "bg-paper" : done ? "bg-iris" : "bg-white/10"
                      }`}
                    />
                    {cur && <motion.span layoutId="seg-glow" className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full shadow-[0_0_14px_2px_rgb(255_255_255/0.5)]" />}
                  </button>
                );
              })}
            </div>
            <div className="mt-1.5 flex justify-between font-mono text-[0.68rem] text-mist">
              <span>
                {answered} / {TOTAL} megválaszolva
              </span>
              <span>{Math.round((answered / TOTAL) * 100)}%</span>
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-4 pt-5 pb-36 sm:px-8 sm:pt-14">
        <AnimatePresence mode="wait" custom={dir}>
          {phase === "intro" && (
            <motion.div key="intro" exit={{ opacity: 0, y: -20, filter: "blur(8px)" }} transition={{ duration: 0.4 }}>
              <Intro
                age={s.age}
                setAge={s.setAge}
                onStart={s.start}
                saved={s.saved ? { answered: s.saved.answers.filter((a) => a != null).length } : null}
                onResume={s.resume}
              />
            </motion.div>
          )}

          {phase === "quiz" && (
            <motion.div
              key={`q-${index}`}
              custom={dir}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: 50 * d, filter: "blur(8px)" }),
                center: { opacity: 1, x: 0, filter: "blur(0px)" },
                exit: (d: number) => ({ opacity: 0, x: -50 * d, filter: "blur(8px)" }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38, ease }}
            >
              <QuestionView q={q} index={index} picked={answers[index]} onPick={pick} />
            </motion.div>
          )}

          {phase === "review" && (
            <motion.div key="review" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.45, ease }}>
              <Review questions={questions} answers={answers} onJump={goTo} onSubmit={() => setPhase("analyzing")} />
            </motion.div>
          )}

          {phase === "analyzing" && (
            <motion.div key="analyzing" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease }}>
              <Analyzing onDone={finish} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Alsó navigáció */}
      <AnimatePresence>
        {phase === "quiz" && (
          <motion.nav
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-6 sm:pb-5"
            aria-label="Lapozás"
          >
            <div className="glass mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-full p-2">
              <button type="button" onClick={prev} disabled={index === 0} className="btn-ghost !px-4 !py-2.5 text-sm disabled:opacity-30">
                <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
                  <path d="M13 8H4M7.5 4.5 4 8l3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Vissza
              </button>
              <p className="hidden items-center gap-1.5 text-xs text-mist md:flex">
                <span className="kbd">A</span>–<span className="kbd">{String.fromCharCode(64 + q.options.length)}</span> válasz ·
                <span className="kbd">←</span>
                <span className="kbd">→</span> lapozás
              </p>
              <button type="button" onClick={next} className={answers[index] != null ? "btn-primary !px-5 !py-2.5 text-sm" : "btn-ghost !px-5 !py-2.5 text-sm"}>
                {index === TOTAL - 1 ? "Összesítő" : answers[index] != null ? "Tovább" : "Kihagyom"}
                <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
                  <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
