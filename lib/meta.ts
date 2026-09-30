// A teszt nyilvános alapadatai – böngészőben is használható, megoldókulcs nincs benne.
// A számokat a szerveroldali lib/questions.ts betöltéskor ellenőrzi, eltérésnél hibát dob.

export type Domain = "matrix" | "numeric" | "verbal" | "logic";
export type Difficulty = 1 | 2 | 3;

/** A négy terület színe (a nevek és leírások a szótárban: t.domains). */
export const DOMAINS: Record<Domain, { color: string }> = {
  matrix: { color: "var(--color-iris)" },
  numeric: { color: "var(--color-aqua)" },
  verbal: { color: "var(--color-flame)" },
  logic: { color: "var(--color-sun)" },
};
export const DOMAIN_KEYS = Object.keys(DOMAINS) as Domain[];

/** A nehézség szótárkulcsa (t.difficulty[...]). */
export const DIFF_KEY = { 1: "easy", 2: "medium", 3: "hard" } as const;

/** Egy teszt hossza (helyek száma). */
export const TOTAL = 30;
/** Változatok száma helyenként. */
export const VARIANTS_PER_SLOT = 3;
/** A teljes feladatbank mérete. */
export const POOL_SIZE = TOTAL * VARIANTS_PER_SLOT;

/** Egy teszt területenkénti összetétele (minden összeállításnál ugyanaz). */
export const DOMAIN_COUNTS: Record<Domain, number> = { matrix: 14, numeric: 6, verbal: 5, logic: 5 };
/** A feladatbank területenkénti mérete. */
export const DOMAIN_POOL_COUNTS: Record<Domain, number> = { matrix: 42, numeric: 18, verbal: 15, logic: 15 };
/** Egy teszt nehézség szerinti összetétele. */
export const DIFFICULTY_COUNTS: Record<Difficulty, number> = { 1: 8, 2: 12, 3: 10 };
