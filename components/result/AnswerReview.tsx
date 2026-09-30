"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import MatrixBoard from "@/components/matrix/MatrixBoard";
import MatrixCell from "@/components/matrix/MatrixCell";
import { LETTERS } from "@/components/matrix/OptionButton";
import { DOMAINS } from "@/lib/meta";
import { useI18n } from "@/components/i18n/I18nProvider";
import type { Result } from "@/lib/scoring";

type Filter = "all" | "wrong" | "right";

function Mark({ ok, skipped }: { ok: boolean; skipped: boolean }) {
  const { t } = useI18n();
  const r = t.result.review;
  return (
    <span
      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${ok ? "bg-aqua/15 text-aqua" : skipped ? "bg-white/[0.06] text-mist" : "bg-flame/15 text-flame"}`}
      aria-label={ok ? r.ok : skipped ? r.skipped : r.bad}
    >
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
        {ok ? (
          <path d="m3.5 8.5 3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        ) : skipped ? (
          <path d="M4 8h8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        ) : (
          <path d="m4.5 4.5 7 7m0-7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        )}
      </svg>
    </span>
  );
}

export default function AnswerReview({ result }: { result: Result }) {
  const { t } = useI18n();
  const r = t.result.review;
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<string | null>(null);
  const items = result.perQuestion
    .map((p, i) => ({ ...p, i }))
    .filter((p) => (filter === "all" ? true : filter === "right" ? p.ok : !p.ok));
  const wrong = result.perQuestion.filter((p) => !p.ok).length;

  const tabs: { id: Filter; label: string; n: number }[] = [
    { id: "all", label: r.all, n: result.total },
    { id: "wrong", label: r.wrong, n: wrong },
    { id: "right", label: r.right, n: result.correct },
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-1 rounded-full border border-white/[0.07] bg-white/[0.02] p-1 sm:inline-flex">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setFilter(t.id)}
            className={`relative rounded-full px-4 py-2 text-sm transition-colors ${filter === t.id ? "text-white" : "text-mist hover:text-paper"}`}
          >
            {filter === t.id && <motion.span layoutId="rev-tab" className="absolute inset-0 -z-10 rounded-full bg-iris/30" />}
            {t.label} <span className="font-mono text-xs opacity-70">{t.n}</span>
          </button>
        ))}
      </div>

      <motion.ul layout className="mt-6 space-y-2.5">
        <AnimatePresence initial={false}>
          {items.map(({ q, picked, ok, i }) => {
            const isOpen = open === q.id;
            const skipped = picked == null;
            return (
              <motion.li
                key={q.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className={`overflow-hidden rounded-2xl border transition-colors ${isOpen ? "border-white/15 bg-white/[0.04]" : "border-white/[0.07] bg-white/[0.02]"}`}
              >
                <button type="button" onClick={() => setOpen(isOpen ? null : q.id)} aria-expanded={isOpen} className="flex w-full items-center gap-3 px-4 py-3.5 text-left sm:gap-4 sm:px-5">
                  <span className="w-6 font-mono text-sm text-mist">{String(i + 1).padStart(2, "0")}</span>
                  <Mark ok={ok} skipped={skipped} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[0.95rem]">{q.kind === "matrix" ? r.matrixItem : q.sequence ? `${q.prompt} ${q.sequence.join(", ")}` : q.prompt}</span>
                    <span className="mt-0.5 flex items-center gap-1.5 text-xs text-mist">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: DOMAINS[q.domain].color }} />
                      {t.domains[q.domain].short}
                    </span>
                  </span>
                  <span className="hidden font-mono text-xs text-mist sm:block">
                    {r.you} <span className={ok ? "text-aqua" : skipped ? "" : "text-flame"}>{skipped ? "–" : LETTERS[picked]}</span> · {r.good} <span className="text-paper">{LETTERS[q.answer]}</span>
                  </span>
                  <svg viewBox="0 0 16 16" className={`h-4 w-4 shrink-0 text-mist transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} aria-hidden>
                    <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="border-t border-white/[0.06] px-4 pt-5 pb-6 sm:px-5">
                        {q.kind === "matrix" ? (
                          <div className="grid gap-6 md:grid-cols-[minmax(0,260px)_1fr] md:items-start">
                            <MatrixBoard cells={q.cells} guide={q.guide} fill={q.options[q.answer]} state="correct" compact animateIn={false} />
                            <div>
                              <div className="grid grid-cols-6 gap-1.5">
                                {q.options.map((c, k) => (
                                  <div
                                    key={k}
                                    className={`relative aspect-square rounded-lg border p-1 ${
                                      k === q.answer ? "border-aqua/70 bg-aqua/10" : k === picked ? "border-flame/70 bg-flame/10" : "border-white/[0.07] opacity-50"
                                    }`}
                                  >
                                    <span className="absolute top-0.5 left-1 font-mono text-[0.55rem] text-mist">{LETTERS[k]}</span>
                                    <MatrixCell cell={c} guide={q.guide} className="h-full w-full" />
                                  </div>
                                ))}
                              </div>
                              <p className="mt-4 leading-relaxed text-haze">{q.explain}</p>
                            </div>
                          </div>
                        ) : (
                          <div>
                            {q.sequence && <p className="mb-3 font-mono text-haze">{q.sequence.join(" · ")}</p>}
                            <div className="grid gap-2 sm:grid-cols-2">
                              {q.options.map((o, k) => (
                                <div
                                  key={k}
                                  className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 text-sm ${
                                    k === q.answer ? "border-aqua/60 bg-aqua/10" : k === picked ? "border-flame/60 bg-flame/10" : "border-white/[0.06] text-mist"
                                  }`}
                                >
                                  <span className="font-mono text-xs">{LETTERS[k]}</span>
                                  {o}
                                </div>
                              ))}
                            </div>
                            <p className="mt-4 leading-relaxed text-haze">{q.explain}</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
