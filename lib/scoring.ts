import { DEFAULT_VARIANTS, DOMAINS, SLOTS, TOTAL, buildTest, type Domain, type Question } from "./questions";

/* ------------------------------------------------------------------ */
/* Korcsoportok                                                         */
/* ------------------------------------------------------------------ */

export const AGE_GROUPS = [
  { id: "u16", label: "16 év alatt", shift: -0.05 },
  { id: "16", label: "16–24", shift: 0 },
  { id: "25", label: "25–34", shift: 0 },
  { id: "35", label: "35–44", shift: -0.01 },
  { id: "45", label: "45–54", shift: -0.02 },
  { id: "55", label: "55–64", shift: -0.04 },
  { id: "65", label: "65+", shift: -0.07 },
] as const;
export type AgeId = (typeof AGE_GROUPS)[number]["id"];
export const ageLabel = (id: string) => AGE_GROUPS.find((a) => a.id === id)?.label ?? "nincs megadva";

/* ------------------------------------------------------------------ */
/* Normáleloszlás                                                       */
/* ------------------------------------------------------------------ */

function erf(x: number) {
  // Abramowitz–Stegun 7.1.26
  const s = Math.sign(x);
  x = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * x);
  const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
  return s * y;
}
export const normCdf = (z: number) => 0.5 * (1 + erf(z / Math.SQRT2));
export const normPdf = (z: number) => Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);

/** Az IQ-érték percentilise (0–100), a népességre vetítve. */
export const percentileOf = (iq: number) => normCdf((iq - 100) / 15) * 100;

/* ------------------------------------------------------------------ */
/* Besorolás                                                            */
/* ------------------------------------------------------------------ */

export const BANDS = [
  { min: 130, max: 160, label: "Kiemelkedően magas", short: "Kiemelkedő", tone: "var(--color-aqua)", text: "A népesség nagyjából 2%-a ér el ilyen eredményt. Az elvont szabályokat gyorsan és megbízhatóan ismered fel, még összetett helyzetekben is." },
  { min: 120, max: 129, label: "Magas", short: "Magas", tone: "var(--color-iris)", text: "Jól az átlag fölött teljesítettél: a bonyolultabb, több szabályt egyszerre követő feladatok is jól mennek neked." },
  { min: 110, max: 119, label: "Átlag feletti", short: "Átlag feletti", tone: "var(--color-iris)", text: "Az emberek többségénél jobban boldogultál. Az új mintázatokat gyorsan átlátod, és jól tartod fejben a részleteket." },
  { min: 90, max: 109, label: "Átlagos", short: "Átlagos", tone: "var(--color-sun)", text: "Ebbe a sávba tartozik a népesség fele. Stabil, kiegyensúlyozott gondolkodási profil." },
  { min: 80, max: 89, label: "Átlag alatti", short: "Átlag alatti", tone: "var(--color-flame)", text: "Egy online teszt eredménye sok mindentől függ – fáradtság, figyelem, időnyomás. Érdemes kipihenten újra próbálni." },
  { min: 70, max: 79, label: "Alacsony", short: "Alacsony", tone: "var(--color-flame)", text: "Ez az eredmény egy rövid online feladatsoron született, ezért messzemenő következtetést ne vonj le belőle." },
  { min: 0, max: 69, label: "Nagyon alacsony", short: "Nagyon alacsony", tone: "var(--color-flame)", text: "Egy rövid online feladatsor nem alkalmas diagnózisra. Ha valódi mérésre van szükség, szakember által felvett teszt a megoldás." },
] as const;
export const bandOf = (iq: number) => BANDS.find((b) => iq >= b.min) ?? BANDS[BANDS.length - 1];

/* ------------------------------------------------------------------ */
/* Pontozás                                                             */
/* ------------------------------------------------------------------ */

export const WEIGHT = { 1: 1, 2: 1.5, 3: 2 } as const;
/** Feltételezett népességi átlag és szórás a súlyozott, 0–1 közé normált pontszámra. */
export const NORM = { mean: 0.54, sd: 0.16 };
export const IQ_MIN = 55;
export const IQ_MAX = 145;

export type Answers = (number | null)[];

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

export function score(answers: Answers, age: string, seconds: number, variants: number[] = DEFAULT_VARIANTS): Result {
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

/* ------------------------------------------------------------------ */
/* Megosztható link: /eredmeny?k=<változatok>&v=<válaszok>&a=<kor>&t=<mp> */
/* ------------------------------------------------------------------ */

const LETTERS = "abcdef";

/** Helyenként a kiválasztott változat sorszáma, számjegyekkel (pl. „0210…”). */
export function encodeVariants(variants: number[]) {
  return SLOTS.map((_, i) => String(variants[i] ?? 0)).join("");
}

/** Hiányzó paraméternél (régi link) az eredeti összeállítást adja vissza. */
export function decodeVariants(k: string | undefined): number[] | null {
  if (!k) return DEFAULT_VARIANTS;
  if (k.length !== TOTAL) return null;
  const out: number[] = [];
  for (let i = 0; i < k.length; i++) {
    const n = Number(k[i]);
    if (!Number.isInteger(n) || n < 0 || n >= SLOTS[i].length) return null;
    out.push(n);
  }
  return out;
}

export function encodeAnswers(answers: Answers) {
  return SLOTS.map((_, i) => {
    const a = answers[i];
    return a == null ? "-" : LETTERS[a];
  }).join("");
}

export function decodeAnswers(v: string | undefined, variants: number[] = DEFAULT_VARIANTS): Answers | null {
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

export function resultHref(answers: Answers, variants: number[], age: string, seconds: number) {
  const p = new URLSearchParams({
    k: encodeVariants(variants),
    v: encodeAnswers(answers),
    a: age,
    t: String(Math.round(seconds)),
  });
  return `/eredmeny?${p.toString()}`;
}

export function formatDuration(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export const fmtPct = (p: number) => {
  if (p >= 99.5) return ">99";
  if (p < 1) return "<1";
  return String(Math.round(p));
};
