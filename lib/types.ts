import type { Difficulty, Domain } from "./meta";
import type { Cell, Guide } from "./shapes";

type Common = {
  id: string;
  domain: Domain;
  difficulty: Difficulty;
  prompt: string;
};

/** A böngészőnek küldött kérdés: a helyes válasz és a magyarázat nélkül. */
export type PublicMatrixQuestion = Common & {
  kind: "matrix";
  cells: Cell[];
  options: Cell[];
  guide?: Guide;
};

export type PublicTextQuestion = Common & {
  kind: "text";
  /** Kiemelt számsor / szópár a kérdés alatt, chipekben. */
  sequence?: string[];
  options: string[];
};

export type PublicQuestion = PublicMatrixQuestion | PublicTextQuestion;

/** Teljes kérdés – csak a szerveren és a kifizetett eredményoldalon. */
export type Question = PublicQuestion & { answer: number; explain: string };
export type MatrixQuestion = PublicMatrixQuestion & { answer: number; explain: string };
export type TextQuestion = PublicTextQuestion & { answer: number; explain: string };

export type Answers = (number | null)[];
