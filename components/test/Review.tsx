"use client";

import { motion } from "motion/react";
import { TOTAL } from "@/lib/meta";
import type { PublicQuestion as Question } from "@/lib/types";
import type { Answers } from "@/lib/types";
import { LETTERS } from "@/components/matrix/OptionButton";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Review({
  questions,
  answers,
  onJump,
  onSubmit,
}: {
  questions: Question[];
  answers: Answers;
  onJump: (i: number) => void;
  onSubmit: () => void;
}) {
  const answered = answers.filter((a) => a != null).length;
  const missing = TOTAL - answered;

  return (
    <div className="mx-auto max-w-3xl">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="eyebrow">
        Összesítő
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease }}
        className="mt-5 font-display text-[clamp(2rem,5vw,3.2rem)] leading-[1.05] font-semibold tracking-[-0.04em]"
      >
        {missing === 0 ? (
          <>
            Minden kérdésre <span className="text-gradient">válaszoltál.</span>
          </>
        ) : (
          <>
            Még {missing} kérdés <span className="text-gradient">nyitva van.</span>
          </>
        )}
      </motion.h1>
      <p className="mt-4 text-lg text-haze">
        {missing === 0
          ? "Ha szeretnél, még átnézheted a válaszaidat – egy kattintás a számra."
          : "A kihagyott kérdések rossz válasznak számítanak. Érdemes tippelni, ha bizonytalan vagy."}
      </p>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.015, delayChildren: 0.2 } } }}
        className="mt-10 grid grid-cols-5 gap-2 sm:grid-cols-10"
      >
        {questions.map((q, i) => {
          const a = answers[i];
          return (
            <motion.button
              key={q.id}
              type="button"
              onClick={() => onJump(i)}
              variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } }}
              whileHover={{ y: -2 }}
              className={`flex aspect-square flex-col items-center justify-center rounded-xl border text-sm transition-colors ${
                a == null ? "border-flame/50 bg-flame/10 text-flame" : "border-white/10 bg-white/[0.04] hover:border-iris/60"
              }`}
              aria-label={`${i + 1}. kérdés${a == null ? " – megválaszolatlan" : ` – ${LETTERS[a]} válasz`}`}
            >
              <span className="font-mono text-[0.7rem] text-mist">{i + 1}</span>
              <span className="font-display font-semibold">{a == null ? "–" : LETTERS[a]}</span>
            </motion.button>
          );
        })}
      </motion.div>

      <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <button type="button" onClick={() => onJump(answers.findIndex((a) => a == null) >= 0 ? answers.findIndex((a) => a == null) : TOTAL - 1)} className="btn-ghost">
          {missing ? "Kihagyott kérdésekhez" : "Vissza a kérdésekhez"}
        </button>
        <button type="button" onClick={onSubmit} className="btn-primary text-base">
          Kiértékelés
          <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
            <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
