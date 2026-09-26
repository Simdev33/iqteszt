// Mátrix-feladatok (Raven-típusú) leíró adatmodellje és a rajzoló segédfüggvények.
// Minden cella 100×100-as koordináta-rendszerben rajzolt alakzatok listája.
// Böngészőbe is mehet: megoldókulcs nincs benne (az a szerveroldali lib/matrix.ts-ben van).

export type Kind =
  | "circle"
  | "poly" // szabályos sokszög, csúccsal felfelé (n oldal)
  | "square"
  | "diamond"
  | "triangle"
  | "star"
  | "plus"
  | "arrow"
  | "line" // középpontos szakasz, s = félhossz
  | "hand"; // óramutató: a középpontból indul, r = 0 → felfelé

export type Fill = "solid" | "outline" | "hatch" | "half";
export type Tone = "ink" | "iris" | "flame" | "aqua";

export type Shape = {
  k: Kind;
  x?: number;
  y?: number;
  s?: number;
  r?: number;
  n?: number;
  f?: Fill;
  t?: Tone;
  w?: number; // vonalvastagság
};

export type Cell = Shape[];
export type Guide = "frame" | "clock";

export type MatrixSpec = {
  cells: Cell[]; // az első 8 cella, soronként
  answer: Cell;
  distractors: Cell[]; // 5 rossz válasz
  guide?: Guide;
};

/* ------------------------------------------------------------------ */
/* Segédfüggvények                                                     */
/* ------------------------------------------------------------------ */

export const S = (k: Kind, o: Omit<Shape, "k"> = {}): Shape => ({ k, ...o });

export const LAYOUT: Record<number, [number, number][]> = {
  1: [[50, 50]],
  2: [[31, 50], [69, 50]],
  3: [[50, 30], [29, 69], [71, 69]],
  4: [[31, 31], [69, 31], [31, 69], [69, 69]],
  5: [[27, 27], [73, 27], [50, 50], [27, 73], [73, 73]],
  6: [[26, 34], [50, 34], [74, 34], [26, 66], [50, 66], [74, 66]],
};
export const sizeFor = (n: number) => (n === 1 ? 24 : n === 2 ? 15 : n === 3 ? 13 : n === 4 ? 12 : 9.5);

/** n darab egyforma alakzat szabályos elrendezésben. */
export function many(n: number, k: Kind, o: Omit<Shape, "k" | "x" | "y"> = {}): Cell {
  return LAYOUT[n].map(([x, y]) => S(k, { x, y, s: sizeFor(n), ...o }));
}

/** Egyetlen, középre tett alakzat. */
export const one = (k: Kind, o: Omit<Shape, "k"> = {}): Cell => [S(k, { s: 24, ...o })];

// Vonalszakaszok a keret-feladatokhoz (20..80-as négyzeten belül).
export const SEG = {
  top: S("line", { x: 50, y: 20, s: 30, r: 0 }),
  bottom: S("line", { x: 50, y: 80, s: 30, r: 0 }),
  left: S("line", { x: 20, y: 50, s: 30, r: 90 }),
  right: S("line", { x: 80, y: 50, s: 30, r: 90 }),
  midH: S("line", { x: 50, y: 50, s: 30, r: 0 }),
  midV: S("line", { x: 50, y: 50, s: 30, r: 90 }),
  d1: S("line", { x: 50, y: 50, s: 42.4, r: 45 }),
  d2: S("line", { x: 50, y: 50, s: 42.4, r: -45 }),
};
export type Seg = keyof typeof SEG;
export const segs = (...names: Seg[]): Cell => names.map((n) => SEG[n]);

// Sarok- és élközép-pozíciók a mozgó elemes feladathoz.
export const CORNER = { TL: [28, 28], TR: [72, 28], BR: [72, 72], BL: [28, 72] } as const;
export const MID = { T: [50, 28], R: [72, 50], B: [50, 72], L: [28, 50] } as const;
export function walker(c: keyof typeof CORNER, m: keyof typeof MID): Cell {
  return [
    S("circle", { x: CORNER[c][0], y: CORNER[c][1], s: 7, f: "solid", t: "flame" }),
    S("circle", { x: MID[m][0], y: MID[m][1], s: 6.5, f: "outline", t: "iris", w: 3 }),
  ];
}

export function nested(outer: Kind, inner: Kind, innerRot = 0): Cell {
  return [
    S(outer, { s: 33, f: "outline", t: "ink" }),
    S(inner, { s: 11, f: "solid", t: "flame", r: innerRot }),
  ];
}

export function clock(long: number, short: number): Cell {
  return [
    S("hand", { s: 30, r: long, t: "ink", w: 3.4 }),
    S("hand", { s: 19, r: short, t: "flame", w: 5 }),
  ];
}

export const mod = (n: number, m: number) => ((n % m) + m) % m;

// 8 pozíció a keret mentén, az óramutató járásával egyezően: BF, F, JF, J, JL, L, BL, B
export const RING8: [number, number][] = [
  [28, 28], [50, 28], [72, 28], [72, 50], [72, 72], [50, 72], [28, 72], [28, 50],
];
export function orbit(dot: number, ring: number): Cell {
  const [dx, dy] = RING8[mod(dot, 8)];
  const [rx, ry] = RING8[mod(ring, 8)];
  return [
    S("circle", { x: dx, y: dy, s: 7, f: "solid", t: "flame" }),
    S("circle", { x: rx, y: ry, s: 6.5, f: "outline", t: "iris", w: 3 }),
  ];
}

// Négy negyed (BF, JF, JL, BL – óramutató szerint); a: lila, b: narancs kitöltésű negyed
export const QUAD: [number, number][] = [[35, 35], [65, 35], [65, 65], [35, 65]];
export function quads(a: number, b: number): Cell {
  return QUAD.map(([x, y], k) =>
    k === mod(a, 4)
      ? S("square", { x, y, s: 13, f: "solid", t: "iris" })
      : k === mod(b, 4)
        ? S("square", { x, y, s: 13, f: "solid", t: "flame" })
        : S("square", { x, y, s: 13, f: "outline", t: "ink", w: 2 }),
  );
}

// Pontok a sarkokban és középen
export const PT = { TL: [30, 30], TR: [70, 30], BL: [30, 70], BR: [70, 70], C: [50, 50] } as const;
export type Pt = keyof typeof PT;
export const dots = (t: Tone, ...ps: Pt[]): Cell => ps.map((p) => S("circle", { x: PT[p][0], y: PT[p][1], s: 8, f: "solid", t }));

// Kis pöttyök egy körvonalas alakzat belsejében
export const INNER: Record<number, [number, number][]> = {
  1: [[50, 51]],
  2: [[42, 51], [58, 51]],
  3: [[50, 44], [42, 57], [58, 57]],
};
export function withDots(outer: Shape, n: number): Cell {
  return [outer, ...INNER[n].map(([x, y]) => S("circle", { x, y, s: 4.5, f: "solid", t: "flame" }))];
}

export const hex = (o: Omit<Shape, "k"> = {}) => S("poly", { n: 6, ...o });

/* ------------------------------------------------------------------ */
/* Determinisztikus keverés – szerveren és kliensen ugyanazt adja        */
/* ------------------------------------------------------------------ */

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function seededShuffle<T>(items: T[], seed: string): T[] {
  const r = rng(hash(seed));
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** A helyes válasz és a zavaró válaszok összekeverve; visszaadja a helyes indexet is. */
export function matrixOptions(id: string, spec: MatrixSpec) {
  const tagged = [
    { cell: spec.answer, ok: true },
    ...spec.distractors.map((cell) => ({ cell, ok: false })),
  ];
  const mixed = seededShuffle(tagged, id);
  return { options: mixed.map((m) => m.cell), answer: mixed.findIndex((m) => m.ok) };
}
