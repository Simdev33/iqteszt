// A teszt nyilvános alapadatai – böngészőben is használható, megoldókulcs nincs benne.
// A számokat a szerveroldali lib/questions.ts betöltéskor ellenőrzi, eltérésnél hibát dob.

export type Domain = "matrix" | "numeric" | "verbal" | "logic";
export type Difficulty = 1 | 2 | 3;

export const DOMAINS: Record<Domain, { name: string; short: string; blurb: string; color: string }> = {
  matrix: {
    name: "Mintázatfelismerés",
    short: "Mátrixok",
    blurb: "Vizuális szabályok felismerése 3×3-as ábrarácsokban – ez a fluid intelligencia legtisztább mérője.",
    color: "var(--color-iris)",
  },
  numeric: {
    name: "Számbeli gondolkodás",
    short: "Számok",
    blurb: "Számsorok törvényszerűségei, arányok és rövid szöveges feladatok fejszámolással.",
    color: "var(--color-aqua)",
  },
  verbal: {
    name: "Verbális gondolkodás",
    short: "Szavak",
    blurb: "Analógiák, ellentétek és kakukktojások – a fogalmak közti kapcsolatok felismerése.",
    color: "var(--color-flame)",
  },
  logic: {
    name: "Logikai következtetés",
    short: "Logika",
    blurb: "Sorrendek, idő, térlátás és szillogizmusok – a lépésenkénti, szabálykövető gondolkodás.",
    color: "var(--color-sun)",
  },
};

const DIFF_LABEL: Record<Difficulty, string> = { 1: "Könnyű", 2: "Közepes", 3: "Nehéz" };
export const difficultyLabel = (d: Difficulty) => DIFF_LABEL[d];

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

/** Az eredmény ára forintban (egyszeri díj). */
export const PRICE_HUF = 1990;
export const PRICE_LABEL = `${String(PRICE_HUF).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Ft`;
