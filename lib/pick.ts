import type { PublicQuestion } from "./types";

/** A kiválasztott változatokból összeálló teszt (a böngésző megoldás nélküli adataiból). */
export function buildPublicTest(slots: PublicQuestion[][], variants: number[]): PublicQuestion[] {
  return slots.map((slot, i) => slot[variants[i] ?? 0] ?? slot[0]);
}

/**
 * Új összeállítás: helyenként a legkevésbé látott változatok közül véletlenszerűen.
 * Így három egymás utáni kitöltésnél egyetlen kérdés sem ismétlődik.
 */
export function pickVariants(slots: { id: string }[][], seen: Record<string, number> = {}, rand: () => number = Math.random): number[] {
  return slots.map((slot) => {
    const counts = slot.map((q) => seen[q.id] ?? 0);
    const min = Math.min(...counts);
    const candidates = counts.flatMap((c, k) => (c === min ? [k] : []));
    return candidates[Math.floor(rand() * candidates.length)];
  });
}
