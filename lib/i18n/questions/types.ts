/** Egy nyelv feladatszövegei, a feladat belső azonosítója szerint (mátrixnál „m-” előtaggal). */
export type QuestionTexts = {
  /** A mátrixfeladatok közös kérdése. */
  matrixPrompt: string;
  items: Record<string, { prompt?: string; options?: string[]; explain: string }>;
};
