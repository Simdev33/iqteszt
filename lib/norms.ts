// Normák, besorolás és formázás – böngészőben is használható (megoldókulcs nincs benne).

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
