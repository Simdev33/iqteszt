import "server-only";
import { MATRICES, type MatrixId } from "./matrix";
import { matrixOptions, seededShuffle } from "./shapes";
import {
  DIFFICULTY_COUNTS,
  DOMAIN_COUNTS,
  DOMAIN_POOL_COUNTS,
  POOL_SIZE,
  TOTAL,
  VARIANTS_PER_SLOT,
  type Difficulty,
  type Domain,
} from "./meta";
import { LOCALES, type Locale } from "./i18n/config";
import type { QuestionTexts } from "./i18n/questions/types";
import huTexts from "./i18n/questions/hu";
import enTexts from "./i18n/questions/en";
import deTexts from "./i18n/questions/de";
import frTexts from "./i18n/questions/fr";
import itTexts from "./i18n/questions/it";
import esTexts from "./i18n/questions/es";
import type { PublicQuestion, Question } from "./types";

// A teljes feladatbank a helyes válaszokkal és a magyarázatokkal – csak a szerveren fut.
// A böngésző a publicSlots() megoldás nélküli változatát kapja.
//
// A szerkezet (terület, nehézség, a helyes válasz sorszáma, számsor) itt van, nyelvtől függetlenül;
// a kérdések, válaszlehetőségek és magyarázatok szövege nyelvenként a lib/i18n/questions/*.ts-ben.
// Így a válaszkód (melyik betűt választotta) minden nyelven ugyanazt jelenti.

const TEXTS: Record<Locale, QuestionTexts> = { hu: huTexts, en: enTexts, de: deTexts, fr: frTexts, it: itTexts, es: esTexts };

type Spec =
  | { kind: "matrix"; id: MatrixId; difficulty: Difficulty }
  | { kind: "text"; id: string; domain: Exclude<Domain, "matrix">; difficulty: Difficulty; answer: number; sequence?: string[] };

const m = (id: MatrixId, difficulty: Difficulty): Spec => ({ kind: "matrix", id, difficulty });

const t = (id: string, domain: Exclude<Domain, "matrix">, difficulty: Difficulty, answer: number, sequence?: string[]): Spec => ({
  kind: "text",
  id,
  domain,
  difficulty,
  answer,
  sequence,
});

/**
 * A feladatbank: 30 „hely”, mindegyiken 3 változat. Egy helyen belül a változatok azonos területről
 * és azonos nehézségűek, így bármelyik összeállítás ugyanolyan szerkezetű tesztet ad
 * (nagyjából növekvő nehézség, a négy terület váltakozva). Minden feladat saját fejlesztés.
 * Egy összeállítást helyenként a változat sorszáma ír le (0–2); a megosztható link ezt viszi magával.
 */
const RAW_SLOTS: Spec[][] = [
  [
    m("count", 1),
    m("countDown", 1),
    m("countRows", 1),
  ],
  [
    t("n-squares", "numeric", 1, 2, ["1", "4", "9", "16", "25", "?"]),
    t("n-add", "numeric", 1, 0, ["2", "5", "8", "11", "14", "?"]),
    t("n-halve", "numeric", 1, 3, ["96", "48", "24", "12", "?"]),
  ],
  [
    t("v-nest", "verbal", 1, 2),
    t("v-fish", "verbal", 1, 1),
    t("v-doctor", "verbal", 1, 1),
  ],
  [
    m("fillColumns", 1),
    m("fillRows", 1),
    m("fillReverse", 1),
  ],
  [
    t("l-days", "logic", 1, 1),
    t("l-days2", "logic", 1, 1),
    t("l-bell", "logic", 1, 1),
  ],
  [
    m("rotation", 1),
    m("rotationBack", 1),
    m("rotationHand", 1),
  ],
  [
    t("n-double", "numeric", 1, 2, ["3", "7", "15", "31", "?"]),
    t("n-triangular", "numeric", 1, 2, ["1", "3", "6", "10", "15", "?"]),
    t("n-primes", "numeric", 1, 1, ["2", "3", "5", "7", "11", "?"]),
  ],
  [
    t("v-opposite", "verbal", 1, 1),
    t("v-brave", "verbal", 1, 1),
    t("v-diligent", "verbal", 1, 1),
  ],
  [
    m("latin", 2),
    m("latinFill", 2),
    m("latinCount", 2),
  ],
  [
    t("l-painters", "logic", 2, 1),
    t("l-hens", "logic", 2, 1),
    t("l-snail", "logic", 2, 2),
  ],
  [
    m("walker", 2),
    m("orbit", 2),
    m("quadrants", 2),
  ],
  [
    t("n-alternate", "numeric", 2, 2, ["5", "10", "8", "16", "14", "?"]),
    t("n-interleave", "numeric", 2, 3, ["1", "12", "3", "10", "5", "8", "?"]),
    t("n-fibo", "numeric", 2, 1, ["2", "4", "6", "10", "16", "26", "?"]),
  ],
  [
    t("v-odd", "verbal", 2, 2),
    t("v-planet", "verbal", 2, 2),
    t("v-polygon", "verbal", 2, 2),
  ],
  [
    m("union", 2),
    m("unionLines", 2),
    m("unionDots", 2),
  ],
  [
    t("l-ages", "logic", 2, 2),
    t("l-queue", "logic", 2, 1),
    t("l-heights", "logic", 2, 1),
  ],
  [
    m("countSum", 2),
    m("countDiff", 2),
    m("countColumns", 2),
  ],
  [
    t("n-bat", "numeric", 2, 0),
    t("n-lily", "numeric", 2, 3),
    t("n-taps", "numeric", 2, 0),
  ],
  [
    m("sides", 2),
    m("sidesDots", 2),
    m("sidesDown", 2),
  ],
  [
    t("v-homonym", "verbal", 2, 1),
    t("v-feather", "verbal", 2, 1),
    t("v-pear", "verbal", 2, 1),
  ],
  [
    m("nestedLatin", 2),
    m("nestedLatin2", 2),
    m("nestedCount", 2),
  ],
  [
    t("l-cube", "logic", 3, 2),
    t("l-cube4", "logic", 3, 1),
    t("l-clock", "logic", 3, 1),
  ],
  [
    t("n-power", "numeric", 3, 2, ["2", "3", "5", "9", "17", "?"]),
    t("n-squareMinus", "numeric", 3, 1, ["3", "8", "15", "24", "35", "?"]),
    t("n-factorial", "numeric", 3, 3, ["1", "2", "6", "24", "120", "?"]),
  ],
  [
    m("xor", 3),
    m("xorDots", 3),
    m("xorDiag", 3),
  ],
  [
    t("v-symphony", "verbal", 3, 1),
    t("v-tadpole", "verbal", 3, 1),
    t("v-map", "verbal", 3, 1),
  ],
  [
    m("rotateFill", 3),
    m("rotateFillArrow", 3),
    m("rotateSize", 3),
  ],
  [
    t("l-syllogism", "logic", 3, 3),
    t("l-violin", "logic", 3, 0),
    t("l-boxes", "logic", 3, 1),
  ],
  [
    t("n-percent", "numeric", 3, 1),
    t("n-average", "numeric", 3, 2),
    t("n-speed", "numeric", 3, 0),
  ],
  [
    m("combine", 3),
    m("combineFill", 3),
    m("combineCount", 3),
  ],
  [
    m("clock", 3),
    m("clockBack", 3),
    m("clockMixed", 3),
  ],
  [
    m("tripleLatin", 3),
    m("tripleLatin2", 3),
    m("tripleColumns", 3),
  ],
];

/** Egy feladat összeállítása az adott nyelv szövegeivel. */
function compose(spec: Spec, lang: Locale): Question {
  const texts = TEXTS[lang];
  if (spec.kind === "matrix") {
    const mx = MATRICES[spec.id];
    const { options, answer } = matrixOptions(spec.id, mx);
    return {
      id: `m-${spec.id}`,
      kind: "matrix",
      domain: "matrix",
      difficulty: spec.difficulty,
      prompt: texts.matrixPrompt,
      cells: mx.cells,
      options,
      answer,
      guide: "guide" in mx ? mx.guide : undefined,
      explain: texts.items[`m-${spec.id}`]?.explain ?? "",
    };
  }
  const tx = texts.items[spec.id];
  return {
    id: spec.id,
    kind: "text",
    domain: spec.domain,
    difficulty: spec.difficulty,
    prompt: tx?.prompt ?? "",
    options: tx?.options ?? [],
    answer: spec.answer,
    explain: tx?.explain ?? "",
    sequence: spec.sequence,
  };
}

// A szavas és a névsoros feladatok válaszait kérdésenként (determinisztikusan) megkeverjük, hogy a helyes
// válasz ne mindig ugyanazon a betűn legyen. A számos és sorrendi opciók maradnak növekvő sorrendben.
// A keverés csak az azonosítótól és az opciók számától függ, így minden nyelven ugyanaz.
const SHUFFLE_LOGIC = new Set(["l-ages", "l-queue", "l-heights"]);
function withMixedOptions(q: Question): Question {
  if (q.kind !== "text" || (q.domain !== "verbal" && !SHUFFLE_LOGIC.has(q.id))) return q;
  const mixed = seededShuffle(
    q.options.map((o, i) => ({ o, ok: i === q.answer })),
    `opt-${q.id}`,
  );
  return { ...q, options: mixed.map((x) => x.o), answer: mixed.findIndex((x) => x.ok) };
}

const SLOTS = Object.fromEntries(LOCALES.map((l) => [l, RAW_SLOTS.map((slot) => slot.map((s) => withMixedOptions(compose(s, l))))])) as Record<
  Locale,
  Question[][]
>;

// Szerkezeti ellenőrzés: helyenként azonos terület és nehézség, egyedi azonosítók,
// a böngészőnek szóló lib/meta.ts számai egyeznek a valós bankkal, és minden nyelv minden feladatot kitölt.
{
  const fail = (msg: string) => {
    throw new Error(`Feladatbank: ${msg}`);
  };
  const base = SLOTS.hu;
  if (base.length !== TOTAL) fail(`${base.length} hely van, a meta ${TOTAL}-at vár.`);
  if (base.flat().length !== POOL_SIZE) fail(`${base.flat().length} kérdés van, a meta ${POOL_SIZE}-at vár.`);
  const ids = new Set<string>();
  const perTest: Record<string, number> = {};
  const perPool: Record<string, number> = {};
  const perDiff: Record<string, number> = {};
  base.forEach((slot, i) => {
    if (slot.length !== VARIANTS_PER_SLOT) fail(`a(z) ${i + 1}. helyen ${slot.length} változat van.`);
    perTest[slot[0].domain] = (perTest[slot[0].domain] ?? 0) + 1;
    perDiff[slot[0].difficulty] = (perDiff[slot[0].difficulty] ?? 0) + 1;
    for (const q of slot) {
      if (q.domain !== slot[0].domain || q.difficulty !== slot[0].difficulty) fail(`a(z) ${q.id} nem illik a(z) ${i + 1}. helyre.`);
      if (ids.has(q.id)) fail(`ismétlődő azonosító: ${q.id}`);
      ids.add(q.id);
      perPool[q.domain] = (perPool[q.domain] ?? 0) + 1;
    }
  });
  const same = (a: Record<string, number>, b: Record<string, number>) => Object.keys(b).every((k) => a[k] === b[k]);
  if (!same(perTest, DOMAIN_COUNTS)) fail("a területenkénti darabszám eltér a meta DOMAIN_COUNTS-tól.");
  if (!same(perPool, DOMAIN_POOL_COUNTS)) fail("a bank területenkénti mérete eltér a meta DOMAIN_POOL_COUNTS-tól.");
  if (!same(perDiff, DIFFICULTY_COUNTS)) fail("a nehézségi eloszlás eltér a meta DIFFICULTY_COUNTS-tól.");

  for (const lang of LOCALES) {
    const known = new Set(Object.keys(TEXTS[lang].items));
    if (!TEXTS[lang].matrixPrompt) fail(`[${lang}] hiányzik a mátrixkérdés szövege.`);
    SLOTS[lang].forEach((slot, i) =>
      slot.forEach((q, k) => {
        const ref = base[i][k];
        known.delete(q.id);
        if (!q.explain) fail(`[${lang}] ${q.id}: hiányzik a magyarázat.`);
        if (q.kind === "text" && ref.kind === "text") {
          if (!q.prompt) fail(`[${lang}] ${q.id}: hiányzik a kérdés.`);
          if (q.options.length !== ref.options.length) fail(`[${lang}] ${q.id}: ${q.options.length} opció van, ${ref.options.length} kellene.`);
          if (new Set(q.options).size !== q.options.length) fail(`[${lang}] ${q.id}: ismétlődő opció.`);
          if (q.answer !== ref.answer) fail(`[${lang}] ${q.id}: a helyes válasz helye eltér a magyartól.`);
        }
      }),
    );
    if (known.size) fail(`[${lang}] ismeretlen azonosítók: ${[...known].join(", ")}`);
  }
}

/** A kiválasztott változatokból összeálló 30 kérdés az adott nyelven. */
export function buildTest(variants: number[], lang: Locale): Question[] {
  return SLOTS[lang].map((slot, i) => slot[variants[i] ?? 0] ?? slot[0]);
}

/** Semleges nyilvános azonosító – a belső név (pl. „m-xorDots”) elárulná a feladat szabályát. */
function opaqueId(id: string) {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return `q${(h >>> 0).toString(36)}`;
}
if (new Set(SLOTS.hu.flat().map((q) => opaqueId(q.id))).size !== POOL_SIZE) throw new Error("Feladatbank: ütköző nyilvános azonosító.");

/** A bank a böngészőnek: helyes válasz, magyarázat és beszédes azonosító nélkül. */
export function publicSlots(lang: Locale): PublicQuestion[][] {
  return SLOTS[lang].map((slot) =>
    slot.map((q) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { answer, explain, ...pub } = q;
      return { ...pub, id: opaqueId(q.id) } as PublicQuestion;
    }),
  );
}
