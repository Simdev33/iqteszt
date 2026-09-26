import { TOTAL, VARIANTS_PER_SLOT } from "./meta";
import type { Answers } from "./types";

// Egy kitöltés tömör kódolása: helyenként a változat sorszáma (k) és a válasz betűje (v).
// A fizetéskor ez utazik a Stripe-hoz, és ebből számolja újra a szerver az eredményt.

export const LETTERS = "abcdef";

/** Helyenként a kiválasztott változat sorszáma, számjegyekkel (pl. „0210…”). */
export function encodeVariants(variants: number[]) {
  return Array.from({ length: TOTAL }, (_, i) => String(variants[i] ?? 0)).join("");
}

export function decodeVariants(k: string | undefined): number[] | null {
  if (!k || k.length !== TOTAL) return null;
  const out: number[] = [];
  for (let i = 0; i < k.length; i++) {
    const n = Number(k[i]);
    if (!Number.isInteger(n) || n < 0 || n >= VARIANTS_PER_SLOT) return null;
    out.push(n);
  }
  return out;
}

export function encodeAnswers(answers: Answers) {
  return Array.from({ length: TOTAL }, (_, i) => {
    const a = answers[i];
    return a == null ? "-" : LETTERS[a];
  }).join("");
}
