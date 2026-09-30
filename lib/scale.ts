import { normCdf } from "./norms";

/** Az IQ-skála sávjai a haranggörbéhez, népességi arányokkal (feliratok: t.scaleBands[id]). */
export const SCALE_BANDS = (
  [
    { id: "vlow", a: 55, b: 70, range: "< 70", color: "#ff7d4d" },
    { id: "low", a: 70, b: 80, range: "70–79", color: "#ff9a6b" },
    { id: "below", a: 80, b: 90, range: "80–89", color: "#ffb98f" },
    { id: "avg", a: 90, b: 110, range: "90–109", color: "#ffcf5c" },
    { id: "above", a: 110, b: 120, range: "110–119", color: "#b3a8ff" },
    { id: "high", a: 120, b: 130, range: "120–129", color: "#8b7bff" },
    { id: "top", a: 130, b: 145, range: "130+", color: "#45e3c4" },
  ] as const
).map((band) => {
  const lo = band.a === 55 ? -Infinity : (band.a - 100) / 15;
  const hi = band.b === 145 ? Infinity : (band.b - 100) / 15;
  const share = (normCdf(hi) - normCdf(lo)) * 100;
  return { ...band, share };
});
