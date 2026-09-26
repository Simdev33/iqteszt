"use client";

import { motion } from "motion/react";
import MatrixBoard from "@/components/matrix/MatrixBoard";
import MatrixCell from "@/components/matrix/MatrixCell";
import OptionButton from "@/components/matrix/OptionButton";
import { DOMAINS, TOTAL, difficultyLabel } from "@/lib/meta";
import type { PublicQuestion as Question } from "@/lib/types";

function Meta({ q, index }: { q: Question; index: number }) {
  const d = DOMAINS[q.domain];
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <span className="font-mono text-sm text-mist">
        <span className="text-paper">{String(index + 1).padStart(2, "0")}</span> / {TOTAL}
      </span>
      <span className="chip !py-1 text-xs">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: d.color }} />
        {d.name}
      </span>
      <span className="chip !py-1 text-xs" title={`Nehézség: ${difficultyLabel(q.difficulty)}`}>
        <span className="flex gap-0.5" aria-hidden>
          {[1, 2, 3].map((k) => (
            <span key={k} className={`h-2.5 w-1 rounded-full ${k <= q.difficulty ? "bg-haze" : "bg-white/15"}`} />
          ))}
        </span>
        {difficultyLabel(q.difficulty)}
      </span>
    </div>
  );
}

export default function QuestionView({
  q,
  index,
  picked,
  onPick,
}: {
  q: Question;
  index: number;
  picked: number | null;
  onPick: (i: number) => void;
}) {
  if (q.kind === "matrix") {
    return (
      <div className="grid items-center gap-5 sm:gap-7 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div>
          <Meta q={q} index={index} />
          <h1 className="mt-3 font-display text-lg font-semibold tracking-tight sm:mt-4 sm:text-2xl">{q.prompt}</h1>
          <div className="mx-auto mt-4 w-full max-w-[min(440px,31svh)] sm:mt-6 sm:max-w-[min(440px,58svh)] lg:mx-0">
            <MatrixBoard cells={q.cells} guide={q.guide} fill={picked != null ? q.options[picked] : null} />
          </div>
        </div>
        <div>
          <p className="mb-3 hidden text-sm text-mist sm:block lg:mb-4">Válaszd ki a hiányzó elemet:</p>
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            {q.options.map((c, i) => (
              <OptionButton key={i} index={i} layoutGroup={q.id} selected={picked === i} onSelect={() => onPick(i)}>
                <MatrixCell cell={c} guide={q.guide} className="h-full w-full" />
              </OptionButton>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Meta q={q} index={index} />
      <h1 className="mt-5 font-display text-[clamp(1.45rem,3.6vw,2.2rem)] leading-[1.18] font-semibold tracking-[-0.025em] text-balance">{q.prompt}</h1>

      {q.sequence && (
        <div className="mt-8 flex flex-wrap gap-2 sm:gap-2.5">
          {q.sequence.map((s, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.06, type: "spring", stiffness: 300, damping: 22 }}
              className={`grid h-14 min-w-14 place-items-center rounded-2xl border px-3 font-display text-xl font-semibold sm:h-16 sm:min-w-16 sm:text-2xl ${
                s === "?"
                  ? "border-iris/60 bg-iris/10 text-gradient shadow-[0_0_40px_-8px_rgb(139_123_255/0.7)]"
                  : "border-white/10 bg-white/[0.04]"
              }`}
            >
              {s === "?" && picked != null ? <span className="text-iris-soft">{q.options[picked]}</span> : s}
            </motion.span>
          ))}
        </div>
      )}

      <div className="mt-8 grid gap-2.5 sm:grid-cols-2 sm:gap-3">
        {q.options.map((o, i) => (
          <OptionButton key={i} index={i} variant="row" layoutGroup={q.id} selected={picked === i} onSelect={() => onPick(i)}>
            {o}
          </OptionButton>
        ))}
      </div>
    </div>
  );
}
