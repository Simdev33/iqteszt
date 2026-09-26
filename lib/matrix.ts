import "server-only";
import {
  S,
  clock,
  dots,
  hex,
  many,
  nested,
  one,
  orbit,
  quads,
  segs,
  walker,
  withDots,
  type Fill,
  type Kind,
  type MatrixSpec,
} from "./shapes";

// A teszt mátrixfeladatai a helyes válasszal – csak a szerveren fut, a böngészőbe nem kerül.

export const MATRICES = {
  // 1 – darabszám nő balról jobbra, soronként más alakzat
  count: {
    cells: [
      ...[1, 2, 3].map((n) => many(n, "circle", { f: "solid", t: "ink" })),
      ...[1, 2, 3].map((n) => many(n, "square", { f: "solid", t: "iris" })),
      ...[1, 2].map((n) => many(n, "triangle", { f: "solid", t: "flame" })),
    ],
    answer: many(3, "triangle", { f: "solid", t: "flame" }),
    distractors: [
      many(2, "triangle", { f: "solid", t: "flame" }),
      many(4, "triangle", { f: "solid", t: "flame" }),
      many(3, "square", { f: "solid", t: "iris" }),
      many(3, "circle", { f: "solid", t: "flame" }),
      many(3, "triangle", { f: "outline", t: "flame" }),
    ],
  },

  // 2 – soronként alakzat, oszloponként kitöltés
  fillColumns: {
    cells: [
      one("square", { f: "outline", t: "ink" }),
      one("square", { f: "hatch", t: "ink" }),
      one("square", { f: "solid", t: "ink" }),
      one("circle", { f: "outline", t: "iris" }),
      one("circle", { f: "hatch", t: "iris" }),
      one("circle", { f: "solid", t: "iris" }),
      one("star", { f: "outline", t: "flame" }),
      one("star", { f: "hatch", t: "flame" }),
    ],
    answer: one("star", { f: "solid", t: "flame" }),
    distractors: [
      one("star", { f: "outline", t: "flame" }),
      one("star", { f: "half", t: "flame" }),
      one("circle", { f: "solid", t: "flame" }),
      one("star", { f: "hatch", t: "flame" }),
      one("square", { f: "solid", t: "flame" }),
    ],
  },

  // 3 – forgás: lépésenként +45°, soronként +90°-kal indul
  rotation: {
    cells: [0, 45, 90, 90, 135, 180, 180, 225].map((r) => one("arrow", { r, f: "solid", t: "iris", s: 26 })),
    answer: one("arrow", { r: 270, f: "solid", t: "iris", s: 26 }),
    distractors: [0, 90, 180, 225, 315].map((r) => one("arrow", { r, f: "solid", t: "iris", s: 26 })),
  },

  // 4 – latin négyzet: minden sorban és oszlopban minden alakzat egyszer; soronként egy kitöltés
  latin: {
    cells: [
      one("circle", { f: "outline", t: "ink" }),
      one("square", { f: "outline", t: "ink" }),
      one("triangle", { f: "outline", t: "ink" }),
      one("square", { f: "hatch", t: "aqua" }),
      one("triangle", { f: "hatch", t: "aqua" }),
      one("circle", { f: "hatch", t: "aqua" }),
      one("triangle", { f: "solid", t: "iris" }),
      one("circle", { f: "solid", t: "iris" }),
    ],
    answer: one("square", { f: "solid", t: "iris" }),
    distractors: [
      one("square", { f: "hatch", t: "aqua" }),
      one("circle", { f: "solid", t: "iris" }),
      one("triangle", { f: "solid", t: "iris" }),
      one("square", { f: "outline", t: "iris" }),
      one("diamond", { f: "solid", t: "iris" }),
    ],
  },

  // 5 – a pont az óramutató járásával egyezően sarokról sarokra lép, a gyűrű ellentétesen az élközepeken
  walker: {
    guide: "frame",
    cells: [
      walker("TL", "T"),
      walker("TR", "L"),
      walker("BR", "B"),
      walker("BL", "R"),
      walker("TL", "T"),
      walker("TR", "L"),
      walker("BR", "B"),
      walker("BL", "R"),
    ],
    answer: walker("TL", "T"),
    distractors: [walker("TR", "T"), walker("TL", "L"), walker("BL", "T"), walker("TL", "R"), walker("TL", "B")],
  },

  // 6 – összeadás: a harmadik oszlop az első kettő egymásra helyezése
  union: {
    guide: "frame",
    cells: [
      segs("top"),
      segs("left"),
      segs("top", "left"),
      segs("d1"),
      segs("right", "bottom"),
      segs("d1", "right", "bottom"),
      segs("midV", "top"),
      segs("midH"),
    ],
    answer: segs("midV", "top", "midH"),
    distractors: [
      segs("midV", "midH"),
      segs("midV", "top"),
      segs("top", "midH"),
      segs("midV", "top", "midH", "bottom"),
      segs("midV", "top", "d2"),
    ],
  },

  // 7 – kizáró vagy: csak az a vonal marad, ami a két cellából pontosan egyben szerepel
  xor: {
    guide: "frame",
    cells: [
      segs("top", "left", "d1"),
      segs("top", "right"),
      segs("left", "d1", "right"),
      segs("midH", "midV"),
      segs("midV", "bottom", "d2"),
      segs("midH", "bottom", "d2"),
      segs("left", "right", "top"),
      segs("right", "bottom", "midH"),
    ],
    answer: segs("left", "top", "bottom", "midH"),
    distractors: [
      segs("left", "right", "top", "bottom", "midH"),
      segs("right"),
      segs("left", "top", "bottom"),
      segs("top", "bottom", "midH", "right"),
      segs("left", "top", "midH"),
    ],
  },

  // 8 – darabszám-összeadás soronként: 1. + 2. = 3.
  countSum: {
    cells: [
      many(1, "star", { f: "solid", t: "flame" }),
      many(3, "star", { f: "solid", t: "flame" }),
      many(4, "star", { f: "solid", t: "flame" }),
      many(2, "poly", { n: 6, f: "outline", t: "ink" }),
      many(1, "poly", { n: 6, f: "outline", t: "ink" }),
      many(3, "poly", { n: 6, f: "outline", t: "ink" }),
      many(3, "triangle", { f: "hatch", t: "iris" }),
      many(2, "triangle", { f: "hatch", t: "iris" }),
    ],
    answer: many(5, "triangle", { f: "hatch", t: "iris" }),
    distractors: [
      many(4, "triangle", { f: "hatch", t: "iris" }),
      many(6, "triangle", { f: "hatch", t: "iris" }),
      many(1, "triangle", { f: "hatch", t: "iris" }),
      many(5, "poly", { n: 6, f: "hatch", t: "iris" }),
      many(5, "triangle", { f: "solid", t: "iris" }),
    ],
  },

  // 9 – oldalszám: balra-jobbra +1 oldal, lefelé +1 oldal; soronként más kitöltés
  sides: {
    cells: [
      one("poly", { n: 3, f: "outline", t: "ink", s: 28 }),
      one("poly", { n: 4, f: "outline", t: "ink", s: 28 }),
      one("poly", { n: 5, f: "outline", t: "ink", s: 28 }),
      one("poly", { n: 4, f: "hatch", t: "aqua", s: 28 }),
      one("poly", { n: 5, f: "hatch", t: "aqua", s: 28 }),
      one("poly", { n: 6, f: "hatch", t: "aqua", s: 28 }),
      one("poly", { n: 5, f: "solid", t: "iris", s: 28 }),
      one("poly", { n: 6, f: "solid", t: "iris", s: 28 }),
    ],
    answer: one("poly", { n: 7, f: "solid", t: "iris", s: 28 }),
    distractors: [
      one("poly", { n: 7, f: "hatch", t: "aqua", s: 28 }),
      one("poly", { n: 6, f: "solid", t: "iris", s: 28 }),
      one("poly", { n: 8, f: "solid", t: "iris", s: 28 }),
      one("poly", { n: 7, f: "outline", t: "ink", s: 28 }),
      one("poly", { n: 5, f: "solid", t: "iris", s: 28 }),
    ],
  },

  // 10 – két független latin négyzet: külső és belső alakzat
  nestedLatin: {
    cells: [
      nested("circle", "triangle"),
      nested("square", "circle"),
      nested("poly", "square"),
      nested("square", "square"),
      nested("poly", "triangle"),
      nested("circle", "circle"),
      nested("poly", "circle"),
      nested("circle", "square"),
    ].map((c) => c.map((s) => (s.k === "poly" ? { ...s, n: 6 } : s))),
    answer: nested("square", "triangle"),
    distractors: [
      nested("square", "circle"),
      nested("square", "square"),
      nested("poly", "triangle").map((s) => (s.k === "poly" ? { ...s, n: 6 } : s)),
      nested("circle", "triangle"),
      nested("square", "triangle", 180),
    ],
  },

  // 11 – forgás + kitöltés: soronként 90°-os fordulat, minden sorban/oszlopban minden kitöltés egyszer
  rotateFill: {
    cells: (
      [
        [0, "outline"],
        [90, "solid"],
        [180, "hatch"],
        [90, "hatch"],
        [180, "outline"],
        [270, "solid"],
        [180, "solid"],
        [270, "hatch"],
      ] as [number, Fill][]
    ).map(([r, f]) => one("triangle", { r, f, t: "aqua", s: 28 })),
    answer: one("triangle", { r: 0, f: "outline", t: "aqua", s: 28 }),
    distractors: (
      [
        [0, "solid"],
        [0, "hatch"],
        [270, "outline"],
        [180, "outline"],
        [90, "outline"],
      ] as [number, Fill][]
    ).map(([r, f]) => one("triangle", { r, f, t: "aqua", s: 28 })),
  },

  // 12 – a 3. oszlop külső alakja az 1. oszlopból, belső alakja a 2. oszlopból jön
  combine: {
    cells: [
      nested("circle", "square"),
      nested("triangle", "star"),
      nested("circle", "star"),
      nested("poly", "circle"),
      nested("square", "triangle"),
      nested("poly", "triangle"),
      nested("square", "circle"),
      nested("circle", "diamond"),
    ].map((c) => c.map((s) => (s.k === "poly" ? { ...s, n: 6 } : s))),
    answer: nested("square", "diamond"),
    distractors: [
      nested("circle", "diamond"),
      nested("square", "circle"),
      nested("circle", "circle"),
      nested("square", "square"),
      nested("diamond", "circle"),
    ],
  },

  // 13 – két mutató: a hosszú lépésenként +90°, a rövid −45° (olvasási sorrendben végig)
  clock: {
    guide: "clock",
    cells: [
      clock(0, 90),
      clock(90, 45),
      clock(180, 0),
      clock(270, -45),
      clock(0, -90),
      clock(90, -135),
      clock(180, -180),
      clock(270, -225),
    ],
    answer: clock(0, 90),
    distractors: [clock(0, 45), clock(90, 90), clock(0, 135), clock(270, 90), clock(0, 0)],
  },

  // 14 – két egymásra merőleges latin négyzet: alakzat (+ hozzá tartozó kitöltés) és darabszám
  tripleLatin: {
    cells: (
      [
        ["circle", 3, "solid"],
        ["triangle", 1, "hatch"],
        ["square", 2, "outline"],
        ["triangle", 2, "hatch"],
        ["square", 3, "outline"],
        ["circle", 1, "solid"],
        ["square", 1, "outline"],
        ["circle", 2, "solid"],
      ] as [Kind, number, Fill][]
    ).map(([k, n, f]) => many(n, k, { f, t: "iris" })),
    answer: many(3, "triangle", { f: "hatch", t: "iris" }),
    distractors: [
      many(3, "triangle", { f: "solid", t: "iris" }),
      many(2, "triangle", { f: "hatch", t: "iris" }),
      many(3, "square", { f: "hatch", t: "iris" }),
      many(1, "triangle", { f: "hatch", t: "iris" }),
      many(3, "triangle", { f: "outline", t: "iris" }),
    ],
  },

  /* ---------------- Változatok (azonos szabálycsalád, azonos nehézség) ---------------- */

  // 1b – darabszám csökken balról jobbra: 3, 2, 1
  countDown: {
    cells: [
      ...[3, 2, 1].map((n) => many(n, "star", { f: "solid", t: "ink" })),
      ...[3, 2, 1].map((n) => many(n, "diamond", { f: "solid", t: "iris" })),
      ...[3, 2].map((n) => many(n, "poly", { n: 6, f: "solid", t: "aqua" })),
    ],
    answer: many(1, "poly", { n: 6, f: "solid", t: "aqua" }),
    distractors: [
      many(2, "poly", { n: 6, f: "solid", t: "aqua" }),
      many(1, "diamond", { f: "solid", t: "aqua" }),
      many(1, "poly", { n: 6, f: "outline", t: "aqua" }),
      many(3, "poly", { n: 6, f: "solid", t: "aqua" }),
      many(1, "circle", { f: "solid", t: "aqua" }),
    ],
  },

  // 1c – oszloponként egy alakzat, lefelé nő a darabszám: 2, 3, 4
  countRows: {
    cells: [
      many(2, "plus", { f: "solid", t: "ink" }),
      many(2, "star", { f: "solid", t: "flame" }),
      many(2, "diamond", { f: "solid", t: "iris" }),
      many(3, "plus", { f: "solid", t: "ink" }),
      many(3, "star", { f: "solid", t: "flame" }),
      many(3, "diamond", { f: "solid", t: "iris" }),
      many(4, "plus", { f: "solid", t: "ink" }),
      many(4, "star", { f: "solid", t: "flame" }),
    ],
    answer: many(4, "diamond", { f: "solid", t: "iris" }),
    distractors: [
      many(3, "diamond", { f: "solid", t: "iris" }),
      many(4, "star", { f: "solid", t: "iris" }),
      many(4, "diamond", { f: "solid", t: "flame" }),
      many(5, "diamond", { f: "solid", t: "iris" }),
      many(4, "diamond", { f: "outline", t: "iris" }),
    ],
  },

  // 2b – oszloponként alakzat, soronként kitöltés (üres, félig, teli)
  fillRows: {
    cells: [
      one("triangle", { f: "outline", t: "aqua" }),
      one("poly", { n: 6, f: "outline", t: "ink" }),
      one("plus", { f: "outline", t: "flame" }),
      one("triangle", { f: "half", t: "aqua" }),
      one("poly", { n: 6, f: "half", t: "ink" }),
      one("plus", { f: "half", t: "flame" }),
      one("triangle", { f: "solid", t: "aqua" }),
      one("poly", { n: 6, f: "solid", t: "ink" }),
    ],
    answer: one("plus", { f: "solid", t: "flame" }),
    distractors: [
      one("plus", { f: "half", t: "flame" }),
      one("plus", { f: "outline", t: "flame" }),
      one("poly", { n: 6, f: "solid", t: "flame" }),
      one("triangle", { f: "solid", t: "flame" }),
      one("plus", { f: "hatch", t: "flame" }),
    ],
  },

  // 2c – soronként alakzat, oszloponként kitöltés fordított sorrendben (teli, vonalkázott, üres)
  fillReverse: {
    cells: [
      one("diamond", { f: "solid", t: "iris" }),
      one("diamond", { f: "hatch", t: "iris" }),
      one("diamond", { f: "outline", t: "iris" }),
      one("circle", { f: "solid", t: "flame" }),
      one("circle", { f: "hatch", t: "flame" }),
      one("circle", { f: "outline", t: "flame" }),
      one("square", { f: "solid", t: "aqua" }),
      one("square", { f: "hatch", t: "aqua" }),
    ],
    answer: one("square", { f: "outline", t: "aqua" }),
    distractors: [
      one("square", { f: "hatch", t: "aqua" }),
      one("square", { f: "solid", t: "aqua" }),
      one("circle", { f: "outline", t: "aqua" }),
      one("square", { f: "half", t: "aqua" }),
      one("diamond", { f: "outline", t: "aqua" }),
    ],
  },

  // 3b – forgás: lépésenként −45° (balra), a sorok 0°, 90°, 180°-ról indulnak
  rotationBack: {
    cells: [0, 315, 270, 90, 45, 0, 180, 135].map((r) => one("arrow", { r, f: "solid", t: "flame", s: 26 })),
    answer: one("arrow", { r: 90, f: "solid", t: "flame", s: 26 }),
    distractors: [45, 135, 180, 270, 0].map((r) => one("arrow", { r, f: "solid", t: "flame", s: 26 })),
  },

  // 3c – egyetlen mutató: lépésenként +90°, a sorok 90°, 135°, 180°-ról indulnak
  rotationHand: {
    guide: "clock",
    cells: [90, 180, 270, 135, 225, 315, 180, 270].map((r) => [S("hand", { s: 30, r, t: "iris", w: 4.5 })]),
    answer: [S("hand", { s: 30, r: 0, t: "iris", w: 4.5 })],
    distractors: [90, 180, 270, 45, 315].map((r) => [S("hand", { s: 30, r, t: "iris", w: 4.5 })]),
  },

  // 4b – latin négyzet a kitöltésből, soronként azonos alakzat
  latinFill: {
    cells: [
      one("poly", { n: 6, f: "solid", t: "ink" }),
      one("poly", { n: 6, f: "hatch", t: "ink" }),
      one("poly", { n: 6, f: "outline", t: "ink" }),
      one("star", { f: "hatch", t: "flame" }),
      one("star", { f: "outline", t: "flame" }),
      one("star", { f: "solid", t: "flame" }),
      one("diamond", { f: "outline", t: "aqua" }),
      one("diamond", { f: "solid", t: "aqua" }),
    ],
    answer: one("diamond", { f: "hatch", t: "aqua" }),
    distractors: [
      one("diamond", { f: "solid", t: "aqua" }),
      one("diamond", { f: "outline", t: "aqua" }),
      one("star", { f: "hatch", t: "aqua" }),
      one("diamond", { f: "half", t: "aqua" }),
      one("poly", { n: 6, f: "hatch", t: "aqua" }),
    ],
  },

  // 4c – latin négyzet a darabszámból, soronként azonos alakzat
  latinCount: {
    cells: [
      many(2, "square", { f: "solid", t: "iris" }),
      many(3, "square", { f: "solid", t: "iris" }),
      many(1, "square", { f: "solid", t: "iris" }),
      many(3, "triangle", { f: "solid", t: "aqua" }),
      many(1, "triangle", { f: "solid", t: "aqua" }),
      many(2, "triangle", { f: "solid", t: "aqua" }),
      many(1, "star", { f: "solid", t: "flame" }),
      many(2, "star", { f: "solid", t: "flame" }),
    ],
    answer: many(3, "star", { f: "solid", t: "flame" }),
    distractors: [
      many(1, "star", { f: "solid", t: "flame" }),
      many(2, "star", { f: "solid", t: "flame" }),
      many(3, "triangle", { f: "solid", t: "flame" }),
      many(4, "star", { f: "solid", t: "flame" }),
      many(3, "star", { f: "outline", t: "flame" }),
    ],
  },

  // 5b – a pont a keret mentén 1 lépést tesz óramutató szerint, a gyűrű 1-et ellenkezőleg
  orbit: {
    guide: "frame",
    cells: [0, 1, 2, 3, 4, 5, 6, 7].map((i) => orbit(1 + i, 4 - i)),
    answer: orbit(1, 4),
    distractors: [orbit(2, 4), orbit(1, 3), orbit(1, 5), orbit(0, 4), orbit(5, 1)],
  },

  // 5c – a lila negyed óramutató szerint, a narancs ellentétesen lép negyedről negyedre
  quadrants: {
    cells: [0, 1, 2, 3, 4, 5, 6, 7].map((i) => quads(i, 1 - i)),
    answer: quads(0, 1),
    distractors: [quads(1, 0), quads(0, 2), quads(3, 1), quads(0, 3), quads(1, 2)],
  },

  // 6b – összeadás vonalakkal
  unionLines: {
    guide: "frame",
    cells: [
      segs("d1"),
      segs("d2"),
      segs("d1", "d2"),
      segs("top", "bottom"),
      segs("midV"),
      segs("top", "bottom", "midV"),
      segs("left"),
      segs("right", "midH"),
    ],
    answer: segs("left", "right", "midH"),
    distractors: [
      segs("left", "right"),
      segs("right", "midH"),
      segs("left", "midH"),
      segs("left", "right", "midH", "top"),
      segs("left", "right", "midV"),
    ],
  },

  // 6c – összeadás pontokkal
  unionDots: {
    guide: "frame",
    cells: [
      dots("iris", "TL"),
      dots("iris", "BR"),
      dots("iris", "TL", "BR"),
      dots("iris", "TL", "TR"),
      dots("iris", "C"),
      dots("iris", "TL", "TR", "C"),
      dots("iris", "BL", "C"),
      dots("iris", "TR", "BR"),
    ],
    answer: dots("iris", "BL", "C", "TR", "BR"),
    distractors: [
      dots("iris", "BL", "C"),
      dots("iris", "TR", "BR"),
      dots("iris", "BL", "TR", "BR"),
      dots("iris", "BL", "C", "TR", "BR", "TL"),
      dots("iris", "BL", "C", "TR"),
    ],
  },

  // 8b – kivonás: 1. − 2. = 3.
  countDiff: {
    cells: [
      many(5, "diamond", { f: "solid", t: "iris" }),
      many(1, "diamond", { f: "solid", t: "iris" }),
      many(4, "diamond", { f: "solid", t: "iris" }),
      many(6, "circle", { f: "outline", t: "ink" }),
      many(4, "circle", { f: "outline", t: "ink" }),
      many(2, "circle", { f: "outline", t: "ink" }),
      many(4, "star", { f: "solid", t: "flame" }),
      many(1, "star", { f: "solid", t: "flame" }),
    ],
    answer: many(3, "star", { f: "solid", t: "flame" }),
    distractors: [
      many(5, "star", { f: "solid", t: "flame" }),
      many(4, "star", { f: "solid", t: "flame" }),
      many(2, "star", { f: "solid", t: "flame" }),
      many(3, "diamond", { f: "solid", t: "flame" }),
      many(3, "star", { f: "outline", t: "flame" }),
    ],
  },

  // 8c – oszloponként összeadás: 1. sor + 2. sor = 3. sor
  countColumns: {
    cells: [
      many(1, "circle", { f: "solid", t: "ink" }),
      many(2, "plus", { f: "solid", t: "flame" }),
      many(1, "diamond", { f: "solid", t: "iris" }),
      many(1, "circle", { f: "solid", t: "ink" }),
      many(3, "plus", { f: "solid", t: "flame" }),
      many(3, "diamond", { f: "solid", t: "iris" }),
      many(2, "circle", { f: "solid", t: "ink" }),
      many(5, "plus", { f: "solid", t: "flame" }),
    ],
    answer: many(4, "diamond", { f: "solid", t: "iris" }),
    distractors: [
      many(3, "diamond", { f: "solid", t: "iris" }),
      many(5, "diamond", { f: "solid", t: "iris" }),
      many(2, "diamond", { f: "solid", t: "iris" }),
      many(4, "plus", { f: "solid", t: "iris" }),
      many(4, "diamond", { f: "hatch", t: "iris" }),
    ],
  },

  // 9b – oldalszám oszloponként, pöttyök száma soronként nő
  sidesDots: {
    cells: [
      withDots(S("poly", { n: 3, s: 34, f: "outline", t: "ink" }), 1),
      withDots(S("poly", { n: 4, s: 34, f: "outline", t: "ink" }), 1),
      withDots(S("poly", { n: 5, s: 34, f: "outline", t: "ink" }), 1),
      withDots(S("poly", { n: 3, s: 34, f: "outline", t: "ink" }), 2),
      withDots(S("poly", { n: 4, s: 34, f: "outline", t: "ink" }), 2),
      withDots(S("poly", { n: 5, s: 34, f: "outline", t: "ink" }), 2),
      withDots(S("poly", { n: 3, s: 34, f: "outline", t: "ink" }), 3),
      withDots(S("poly", { n: 4, s: 34, f: "outline", t: "ink" }), 3),
    ],
    answer: withDots(S("poly", { n: 5, s: 34, f: "outline", t: "ink" }), 3),
    distractors: [
      withDots(S("poly", { n: 5, s: 34, f: "outline", t: "ink" }), 2),
      withDots(S("poly", { n: 6, s: 34, f: "outline", t: "ink" }), 3),
      withDots(S("poly", { n: 4, s: 34, f: "outline", t: "ink" }), 3),
      withDots(S("poly", { n: 5, s: 34, f: "outline", t: "ink" }), 1),
      withDots(S("poly", { n: 5, s: 34, f: "outline", t: "iris" }), 3),
    ],
  },

  // 9c – oldalszám balról jobbra eggyel csökken (7-6-5, 6-5-4, 5-4-3), oszloponként kitöltés
  sidesDown: {
    cells: (
      [
        [7, "outline"],
        [6, "hatch"],
        [5, "solid"],
        [6, "outline"],
        [5, "hatch"],
        [4, "solid"],
        [5, "outline"],
        [4, "hatch"],
      ] as [number, Fill][]
    ).map(([n, f]) => one("poly", { n, f, t: "aqua", s: 28 })),
    answer: one("poly", { n: 3, f: "solid", t: "aqua", s: 28 }),
    distractors: [
      one("poly", { n: 3, f: "hatch", t: "aqua", s: 28 }),
      one("poly", { n: 4, f: "solid", t: "aqua", s: 28 }),
      one("poly", { n: 3, f: "outline", t: "aqua", s: 28 }),
      one("poly", { n: 5, f: "solid", t: "aqua", s: 28 }),
      one("poly", { n: 6, f: "solid", t: "aqua", s: 28 }),
    ],
  },

  // 10b – két latin négyzet: külső (négyzet, háromszög, kör) és belső (plusz, csillag, rombusz)
  nestedLatin2: {
    cells: [
      nested("square", "plus"),
      nested("triangle", "star"),
      nested("circle", "diamond"),
      nested("triangle", "diamond"),
      nested("circle", "plus"),
      nested("square", "star"),
      nested("circle", "star"),
      nested("square", "diamond"),
    ],
    answer: nested("triangle", "plus"),
    distractors: [
      nested("triangle", "star"),
      nested("triangle", "diamond"),
      nested("square", "plus"),
      nested("circle", "plus"),
      nested("triangle", "plus", 45),
    ],
  },

  // 10c – latin négyzet a külső alakzatból és a pöttyök számából
  nestedCount: {
    cells: (
      [
        ["hex", 1],
        ["diamond", 2],
        ["circle", 3],
        ["diamond", 3],
        ["circle", 1],
        ["hex", 2],
        ["circle", 2],
        ["hex", 3],
      ] as ["hex" | "diamond" | "circle", number][]
    ).map(([k, n]) => withDots(k === "hex" ? hex({ s: 33, f: "outline", t: "ink" }) : S(k, { s: 33, f: "outline", t: "ink" }), n)),
    answer: withDots(S("diamond", { s: 33, f: "outline", t: "ink" }), 1),
    distractors: [
      withDots(S("diamond", { s: 33, f: "outline", t: "ink" }), 2),
      withDots(S("diamond", { s: 33, f: "outline", t: "ink" }), 3),
      withDots(hex({ s: 33, f: "outline", t: "ink" }), 1),
      withDots(S("circle", { s: 33, f: "outline", t: "ink" }), 1),
      withDots(S("square", { s: 33, f: "outline", t: "ink" }), 1),
    ],
  },

  // 11b – forgás + kitöltés nyíllal: soronként −90°, a kitöltés latin négyzet
  rotateFillArrow: {
    cells: (
      [
        [0, "hatch"],
        [270, "solid"],
        [180, "outline"],
        [90, "solid"],
        [0, "outline"],
        [270, "hatch"],
        [180, "outline"],
        [90, "hatch"],
      ] as [number, Fill][]
    ).map(([r, f]) => one("arrow", { r, f, t: "iris", s: 27 })),
    answer: one("arrow", { r: 0, f: "solid", t: "iris", s: 27 }),
    distractors: (
      [
        [0, "hatch"],
        [0, "outline"],
        [90, "solid"],
        [180, "solid"],
        [270, "solid"],
      ] as [number, Fill][]
    ).map(([r, f]) => one("arrow", { r, f, t: "iris", s: 27 })),
  },

  // 11c – félig kitöltött kör: a kitöltött fél 90°-onként fordul, a méret latin négyzet
  rotateSize: {
    cells: (
      [
        [0, 12],
        [90, 19],
        [180, 27],
        [90, 27],
        [180, 12],
        [270, 19],
        [180, 19],
        [270, 27],
      ] as [number, number][]
    ).map(([r, s]) => one("circle", { r, s, f: "half", t: "iris", w: 2.4 })),
    answer: one("circle", { r: 0, s: 12, f: "half", t: "iris", w: 2.4 }),
    distractors: (
      [
        [180, 12],
        [0, 19],
        [0, 27],
        [90, 12],
        [270, 12],
      ] as [number, number][]
    ).map(([r, s]) => one("circle", { r, s, f: "half", t: "iris", w: 2.4 })),
  },

  // 12b – a 3. oszlop a kitöltést az 1., az alakzatot a 2. oszloptól kapja
  combineFill: {
    cells: [
      one("poly", { n: 6, f: "solid", t: "flame" }),
      one("star", { f: "outline", t: "flame" }),
      one("star", { f: "solid", t: "flame" }),
      one("circle", { f: "hatch", t: "flame" }),
      one("diamond", { f: "solid", t: "flame" }),
      one("diamond", { f: "hatch", t: "flame" }),
      one("triangle", { f: "outline", t: "flame" }),
      one("square", { f: "hatch", t: "flame" }),
    ],
    answer: one("square", { f: "outline", t: "flame" }),
    distractors: [
      one("triangle", { f: "outline", t: "flame" }),
      one("square", { f: "hatch", t: "flame" }),
      one("triangle", { f: "hatch", t: "flame" }),
      one("square", { f: "solid", t: "flame" }),
      one("circle", { f: "outline", t: "flame" }),
    ],
  },

  // 12c – a 3. oszlop a darabszámot az 1., az alakzatot a 2. oszloptól kapja
  combineCount: {
    cells: [
      many(2, "circle", { f: "solid", t: "aqua" }),
      many(3, "square", { f: "solid", t: "aqua" }),
      many(2, "square", { f: "solid", t: "aqua" }),
      many(3, "star", { f: "solid", t: "aqua" }),
      many(1, "triangle", { f: "solid", t: "aqua" }),
      many(3, "triangle", { f: "solid", t: "aqua" }),
      many(1, "diamond", { f: "solid", t: "aqua" }),
      many(2, "poly", { n: 6, f: "solid", t: "aqua" }),
    ],
    answer: many(1, "poly", { n: 6, f: "solid", t: "aqua" }),
    distractors: [
      many(2, "poly", { n: 6, f: "solid", t: "aqua" }),
      many(1, "diamond", { f: "solid", t: "aqua" }),
      many(2, "diamond", { f: "solid", t: "aqua" }),
      many(3, "poly", { n: 6, f: "solid", t: "aqua" }),
      many(1, "circle", { f: "solid", t: "aqua" }),
    ],
  },

  // 13b – a hosszú mutató −90°, a rövid +45° lépésenként (olvasási sorrendben)
  clockBack: {
    guide: "clock",
    cells: [
      clock(0, 180),
      clock(270, 225),
      clock(180, 270),
      clock(90, 315),
      clock(0, 0),
      clock(270, 45),
      clock(180, 90),
      clock(90, 135),
    ],
    answer: clock(0, 180),
    distractors: [clock(0, 135), clock(0, 225), clock(90, 180), clock(270, 180), clock(180, 0)],
  },

  // 13c – a hosszú mutató +45°, a rövid −90° lépésenként (olvasási sorrendben)
  clockMixed: {
    guide: "clock",
    cells: [
      clock(180, 90),
      clock(225, 0),
      clock(270, 270),
      clock(315, 180),
      clock(0, 90),
      clock(45, 0),
      clock(90, 270),
      clock(135, 180),
    ],
    answer: clock(180, 90),
    distractors: [clock(135, 90), clock(225, 90), clock(180, 0), clock(180, 180), clock(90, 180)],
  },

  // 14b – alakzat (kitöltéssel) és darabszám két merőleges latin négyzetben
  tripleLatin2: {
    cells: (
      [
        ["star", 2, "solid"],
        ["diamond", 3, "hatch"],
        ["poly", 1, "outline"],
        ["diamond", 1, "hatch"],
        ["poly", 2, "outline"],
        ["star", 3, "solid"],
        ["poly", 3, "outline"],
        ["star", 1, "solid"],
      ] as [Kind, number, Fill][]
    ).map(([k, n, f]) => many(n, k, { f, t: "aqua", ...(k === "poly" ? { n: 6 } : {}) })),
    answer: many(2, "diamond", { f: "hatch", t: "aqua" }),
    distractors: [
      many(2, "diamond", { f: "solid", t: "aqua" }),
      many(3, "diamond", { f: "hatch", t: "aqua" }),
      many(1, "diamond", { f: "hatch", t: "aqua" }),
      many(2, "poly", { n: 6, f: "hatch", t: "aqua" }),
      many(2, "star", { f: "hatch", t: "aqua" }),
    ],
  },

  // 14c – alakzat és kitöltés két latin négyzet, a darabszám oszloponként 1-2-3
  tripleColumns: {
    cells: (
      [
        ["circle", 1, "outline"],
        ["square", 2, "solid"],
        ["triangle", 3, "hatch"],
        ["square", 1, "hatch"],
        ["triangle", 2, "outline"],
        ["circle", 3, "solid"],
        ["triangle", 1, "solid"],
        ["circle", 2, "hatch"],
      ] as [Kind, number, Fill][]
    ).map(([k, n, f]) => many(n, k, { f, t: "flame" })),
    answer: many(3, "square", { f: "outline", t: "flame" }),
    distractors: [
      many(3, "square", { f: "solid", t: "flame" }),
      many(3, "square", { f: "hatch", t: "flame" }),
      many(2, "square", { f: "outline", t: "flame" }),
      many(3, "circle", { f: "outline", t: "flame" }),
      many(3, "triangle", { f: "outline", t: "flame" }),
    ],
  },

  // 7b – kizáró vagy pontokkal
  xorDots: {
    guide: "frame",
    cells: [
      dots("aqua", "TL", "TR", "C"),
      dots("aqua", "TR", "BR"),
      dots("aqua", "TL", "C", "BR"),
      dots("aqua", "BL", "C"),
      dots("aqua", "C", "TR", "TL"),
      dots("aqua", "BL", "TR", "TL"),
      dots("aqua", "TL", "BL", "BR"),
      dots("aqua", "BL", "C", "TR"),
    ],
    answer: dots("aqua", "TL", "BR", "C", "TR"),
    distractors: [
      dots("aqua", "TL", "BL", "BR", "C", "TR"),
      dots("aqua", "BL"),
      dots("aqua", "TL", "BR", "C"),
      dots("aqua", "TL", "BR", "TR"),
      dots("aqua", "BL", "C", "TR", "TL"),
    ],
  },

  // 7c – kizáró vagy vonalakkal, átlókkal
  xorDiag: {
    guide: "frame",
    cells: [
      segs("d1", "d2", "top"),
      segs("d2", "bottom"),
      segs("d1", "top", "bottom"),
      segs("left", "midH"),
      segs("midH", "right", "midV"),
      segs("left", "right", "midV"),
      segs("top", "midV", "d1"),
      segs("midV", "left", "d2"),
    ],
    answer: segs("top", "d1", "left", "d2"),
    distractors: [
      segs("top", "midV", "d1", "left", "d2"),
      segs("midV"),
      segs("top", "d1", "left"),
      segs("top", "d1", "d2", "midV"),
      segs("top", "left", "d2"),
    ],
  },

} satisfies Record<string, MatrixSpec>;

export type MatrixId = keyof typeof MATRICES;

