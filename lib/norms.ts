// Normák, besorolás és formázás – böngészőben is használható (megoldókulcs nincs benne).

/* ------------------------------------------------------------------ */
/* Korcsoportok                                                         */
/* ------------------------------------------------------------------ */

export const AGE_GROUPS = [
  { id: "u16", label: null, shift: -0.05 },
  { id: "16", label: "16–24", shift: 0 },
  { id: "25", label: "25–34", shift: 0 },
  { id: "35", label: "35–44", shift: -0.01 },
  { id: "45", label: "45–54", shift: -0.02 },
  { id: "55", label: "55–64", shift: -0.04 },
  { id: "65", label: "65+", shift: -0.07 },
] as const;
export type AgeId = (typeof AGE_GROUPS)[number]["id"];
/** A korcsoport felirata; a „16 alatt” és a „nincs megadva” szövege a szótárból jön. */
export const ageLabel = (id: string, t: { u16: string; none: string }) => {
  const g = AGE_GROUPS.find((a) => a.id === id);
  if (!g) return t.none;
  return g.label ?? t.u16;
};

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

/** Eredmény-sávok; a feliratok és leírások a szótárban (t.bands[id]). */
export const BANDS = [
  { id: "top", min: 130, tone: "var(--color-aqua)" },
  { id: "high", min: 120, tone: "var(--color-iris)" },
  { id: "above", min: 110, tone: "var(--color-iris)" },
  { id: "avg", min: 90, tone: "var(--color-sun)" },
  { id: "below", min: 80, tone: "var(--color-flame)" },
  { id: "low", min: 70, tone: "var(--color-flame)" },
  { id: "vlow", min: 0, tone: "var(--color-flame)" },
] as const;
export type Band = (typeof BANDS)[number];
export const bandOf = (iq: number) => BANDS.find((b) => iq >= b.min) ?? BANDS[BANDS.length - 1];

/* ------------------------------------------------------------------ */
/* Pontozás                                                             */
/* ------------------------------------------------------------------ */

export const WEIGHT = { 1: 1, 2: 1.5, 3: 2 } as const;
/** Feltételezett népességi átlag és szórás a súlyozott, 0–1 közé normált pontszámra. */
export const NORM = { mean: 0.54, sd: 0.16 };
export const IQ_MIN = 55;
export const IQ_MAX = 145;

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
