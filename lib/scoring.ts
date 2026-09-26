import "server-only";
import { DOMAINS, TOTAL, type Domain } from "./meta";
import { AGE_GROUPS, BANDS, IQ_MAX, IQ_MIN, NORM, WEIGHT, bandOf, percentileOf } from "./norms";
import { LETTERS } from "./codec";
import { buildTest } from "./questions";
import type { Answers, Question } from "./types";

// Pontozás – csak a szerveren, mert a megoldókulcsot használja.

export type DomainScore = { domain: Domain; name: string; correct: number; total: number; pct: number };

export type Result = {
  iq: number;
  percentile: number;
  band: (typeof BANDS)[number];
  correct: number;
  total: number;
  weighted: number;
  domains: DomainScore[];
  seconds: number;
  age: string;
  variants: number[];
  perQuestion: { q: Question; picked: number | null; ok: boolean }[];
};

export function score(answers: Answers, age: string, seconds: number, variants: number[]): Result {
  const shift = AGE_GROUPS.find((a) => a.id === age)?.shift ?? 0;
  let w = 0;
  let maxW = 0;
  let correct = 0;
  const perQuestion = buildTest(variants).map((q, i) => {
    const picked = answers[i] ?? null;
    const ok = picked === q.answer;
    maxW += WEIGHT[q.difficulty];
    if (ok) {
      w += WEIGHT[q.difficulty];
      correct++;
    }
    return { q, picked, ok };
  });
  const s = w / maxW;
  const z = (s - (NORM.mean + shift)) / NORM.sd;
  const iq = Math.round(Math.min(IQ_MAX, Math.max(IQ_MIN, 100 + 15 * z)));

  const domains = (Object.keys(DOMAINS) as Domain[]).map((d) => {
    const items = perQuestion.filter((p) => p.q.domain === d);
    const c = items.filter((p) => p.ok).length;
    return { domain: d, name: DOMAINS[d].name, correct: c, total: items.length, pct: items.length ? c / items.length : 0 };
  });

  return {
    iq,
    percentile: percentileOf(iq),
    band: bandOf(iq),
    correct,
    total: perQuestion.length,
    weighted: s,
    domains,
    seconds,
    age,
    variants,
    perQuestion,
  };
}

/** A válaszkód visszafejtése; érvénytelen betűnél vagy hossznál null. */
export function decodeAnswers(v: string | undefined, variants: number[]): Answers | null {
  if (!v || v.length !== TOTAL) return null;
  const questions = buildTest(variants);
  const out: Answers = [];
  for (let i = 0; i < v.length; i++) {
    const ch = v[i];
    if (ch === "-") out.push(null);
    else {
      const idx = LETTERS.indexOf(ch);
      if (idx < 0 || idx >= questions[i].options.length) return null;
      out.push(idx);
    }
  }
  return out;
}
