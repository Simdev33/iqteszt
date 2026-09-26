import { many, matrixOptions, nested, one, type MatrixSpec } from "./shapes";
import type { MatrixQuestion } from "./types";

// Csak bemutatásra készült mátrixok a főoldalra – egyik sincs benne a tesztbankban,
// így nyugodtan „megoldhatók” a látogató szeme előtt.

const size = (k: "diamond" | "circle" | "star", s: number, f: "solid" | "hatch" | "outline", t: "iris" | "ink" | "flame") =>
  one(k, { s, f, t });

export const DEMOS = {
  // Próbafeladat: soronként azonos alakzat, balról jobbra nő a méret
  tryIt: {
    cells: [
      size("diamond", 12, "solid", "iris"),
      size("diamond", 19, "solid", "iris"),
      size("diamond", 27, "solid", "iris"),
      size("circle", 12, "hatch", "ink"),
      size("circle", 19, "hatch", "ink"),
      size("circle", 27, "hatch", "ink"),
      size("star", 12, "outline", "flame"),
      size("star", 19, "outline", "flame"),
    ],
    answer: size("star", 27, "outline", "flame"),
    distractors: [
      size("star", 19, "outline", "flame"),
      size("star", 27, "solid", "flame"),
      one("circle", { s: 27, f: "outline", t: "flame" }),
      size("star", 12, "outline", "flame"),
      one("diamond", { s: 27, f: "outline", t: "flame" }),
    ],
  },

  // Két latin négyzet: külső (rombusz, kör, hatszög) és belső (háromszög, csillag, plusz)
  nested: {
    cells: [
      nested("diamond", "triangle"),
      nested("circle", "star"),
      nested("poly", "plus"),
      nested("circle", "plus"),
      nested("poly", "triangle"),
      nested("diamond", "star"),
      nested("poly", "star"),
      nested("diamond", "plus"),
    ].map((c) => c.map((s) => (s.k === "poly" ? { ...s, n: 6 } : s))),
    answer: nested("circle", "triangle"),
    distractors: [nested("circle", "star"), nested("circle", "plus"), nested("diamond", "triangle"), nested("circle", "triangle", 180), nested("square", "triangle")],
  },

  // Soronként 1. + 2. = 3.
  sum: {
    cells: [
      many(1, "plus", { f: "solid", t: "ink" }),
      many(1, "plus", { f: "solid", t: "ink" }),
      many(2, "plus", { f: "solid", t: "ink" }),
      many(2, "diamond", { f: "solid", t: "iris" }),
      many(2, "diamond", { f: "solid", t: "iris" }),
      many(4, "diamond", { f: "solid", t: "iris" }),
      many(1, "circle", { f: "hatch", t: "aqua" }),
      many(4, "circle", { f: "hatch", t: "aqua" }),
    ],
    answer: many(5, "circle", { f: "hatch", t: "aqua" }),
    distractors: [many(4, "circle", { f: "hatch", t: "aqua" }), many(6, "circle", { f: "hatch", t: "aqua" }), many(3, "circle", { f: "hatch", t: "aqua" })],
  },

  // Forgás: lépésenként +90°, a sorok 45°-kal eltolva indulnak
  rotate: {
    cells: [45, 135, 225, 135, 225, 315, 225, 315].map((r) => one("arrow", { r, f: "solid", t: "aqua", s: 26 })),
    answer: one("arrow", { r: 45, f: "solid", t: "aqua", s: 26 }),
    distractors: [135, 315, 0].map((r) => one("arrow", { r, f: "solid", t: "aqua", s: 26 })),
  },

  // Soronként alakzat, oszloponként kitöltés: teli, félig, üres
  fill: {
    cells: [
      one("star", { f: "solid", t: "flame" }),
      one("star", { f: "half", t: "flame" }),
      one("star", { f: "outline", t: "flame" }),
      one("poly", { n: 6, f: "solid", t: "ink" }),
      one("poly", { n: 6, f: "half", t: "ink" }),
      one("poly", { n: 6, f: "outline", t: "ink" }),
      one("circle", { f: "solid", t: "iris" }),
      one("circle", { f: "half", t: "iris" }),
    ],
    answer: one("circle", { f: "outline", t: "iris" }),
    distractors: [one("circle", { f: "half", t: "iris" }), one("circle", { f: "solid", t: "iris" }), one("star", { f: "outline", t: "iris" })],
  },

  // Latin négyzet az alakzatból, soronként egy kitöltés
  latin: {
    cells: [
      one("star", { f: "outline", t: "ink" }),
      one("diamond", { f: "outline", t: "ink" }),
      one("poly", { n: 6, f: "outline", t: "ink" }),
      one("diamond", { f: "hatch", t: "aqua" }),
      one("poly", { n: 6, f: "hatch", t: "aqua" }),
      one("star", { f: "hatch", t: "aqua" }),
      one("poly", { n: 6, f: "solid", t: "iris" }),
      one("star", { f: "solid", t: "iris" }),
    ],
    answer: one("diamond", { f: "solid", t: "iris" }),
    distractors: [one("diamond", { f: "hatch", t: "iris" })],
  },
} satisfies Record<string, MatrixSpec>;

/** A főoldali próbafeladat kérdésként (helyes válasszal – nem része a tesztnek). */
export const DEMO: MatrixQuestion = (() => {
  const { options, answer } = matrixOptions("demo", DEMOS.tryIt);
  return {
    id: "demo",
    kind: "matrix",
    domain: "matrix",
    difficulty: 1,
    prompt: "Melyik ábra illik a kérdőjel helyére?",
    cells: DEMOS.tryIt.cells,
    options,
    answer,
    explain: "Soronként azonos az alakzat és a kitöltés, balról jobbra pedig nő a méret: kicsi, közepes, nagy. A hiányzó elem a nagy, üres csillag.",
  };
})();
