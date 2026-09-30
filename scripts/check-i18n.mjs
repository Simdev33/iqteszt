// A fordítások szerkezeti ellenőrzése a magyar forráshoz képest:
//   node scripts/check-i18n.mjs            → minden nyelv
//   node scripts/check-i18n.mjs en de      → csak ezek
// Ellenőrzi: kulcsok, tömbhosszak, {helyőrzők}, *kiemelések*, [hivatkozások](kulcs), a feladatok opcióinak száma,
// és hogy a szöveg tényleg le van-e fordítva (nem maradt magyarul).
// Node 22.18+ / 24 kell (a .ts fájlokat típus-eltávolítással tölti be).

import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const load = async (p) => (await import(pathToFileURL(resolve(ROOT, p)).href)).default;
const LANGS = process.argv.slice(2).length ? process.argv.slice(2) : ["en", "de", "fr", "it", "es"];
/** Ezeknél a tömböknél a hossz nyelvenként eltérhet. */
const FREE_LENGTH = new Set(["meta.keywords", "home.marquee"]);
/** Ezek a szövegek nyelvtől függetlenül azonosak lehetnek. */
const SAME_OK = /^(home\.hero\.rules\.sum|home\.domains\.people\.\d|ordinal|paywall\.methods\.\d|footer\.companyId|footer\.taxId)$/;

const placeholders = (s) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(",");
const links = (s) => [...s.matchAll(/\]\((\w+)\)/g)].map((m) => m[1]).sort().join(",");
const stars = (s) => (s.match(/\*/g) ?? []).length;

let errors = 0;
const err = (lang, where, msg) => {
  errors++;
  console.log(`  [${lang}] ${where}: ${msg}`);
};

function compare(lang, a, b, where, opts = {}) {
  if (typeof a === "string") {
    if (typeof b !== "string") return err(lang, where, "nem szöveg");
    if (!b.trim() && a.trim()) return err(lang, where, "üres");
    if (placeholders(a) !== placeholders(b)) err(lang, where, `helyőrzők: {${placeholders(a)}} ≠ {${placeholders(b)}}`);
    if (links(a) !== links(b)) err(lang, where, `hivatkozások: (${links(a)}) ≠ (${links(b)})`);
    if (stars(a) !== stars(b)) err(lang, where, `*kiemelés* száma: ${stars(a)} ≠ ${stars(b)}`);
    if (a.startsWith("- ") !== b.startsWith("- ")) err(lang, where, "a „- ” felsorolásjel eltér");
    if (opts.untranslated && a === b && a.length > 12 && !/^[\d\s.,:+\-–=%°²/×·()?]+$/.test(a) && !SAME_OK.test(where) && !/[{}]/.test(a.replace(/\{\w+\}/g, "")))
      err(lang, where, `lefordítatlannak tűnik: "${a.slice(0, 50)}"`);
    return;
  }
  if (typeof a === "boolean") return typeof b === "boolean" ? undefined : err(lang, where, "nem logikai érték");
  if (Array.isArray(a)) {
    if (!Array.isArray(b)) return err(lang, where, "nem tömb");
    if (!FREE_LENGTH.has(where) && a.length !== b.length) err(lang, where, `hossz: ${a.length} ≠ ${b.length}`);
    a.forEach((x, i) => b[i] !== undefined && compare(lang, x, b[i], `${where}.${i}`, opts));
    return;
  }
  if (a && typeof a === "object") {
    if (!b || typeof b !== "object") return err(lang, where, "nem objektum");
    for (const k of Object.keys(a)) {
      if (!(k in b)) err(lang, `${where}.${k}`, "hiányzik");
      else compare(lang, a[k], b[k], where ? `${where}.${k}` : k, opts);
    }
    for (const k of Object.keys(b)) if (!(k in a)) err(lang, `${where}.${k}`, "felesleges kulcs");
  }
}

const huDict = await load("lib/i18n/dict/hu.ts");
const huQ = await load("lib/i18n/questions/hu.ts");
const huLegal = await load("lib/i18n/legal/hu.ts");

for (const lang of LANGS) {
  console.log(`— ${lang}`);
  const before = errors;
  try {
    compare(lang, huDict, await load(`lib/i18n/dict/${lang}.ts`), "", { untranslated: true });
  } catch (e) {
    err(lang, "dict", `betöltési hiba: ${e.message}`);
  }
  try {
    const q = await load(`lib/i18n/questions/${lang}.ts`);
    if (!q.matrixPrompt) err(lang, "questions.matrixPrompt", "hiányzik");
    for (const [id, item] of Object.entries(huQ.items)) {
      const t = q.items?.[id];
      if (!t) {
        err(lang, `questions.${id}`, "hiányzik");
        continue;
      }
      if (!t.explain) err(lang, `questions.${id}.explain`, "hiányzik");
      if (item.explain === t.explain) err(lang, `questions.${id}.explain`, "lefordítatlan");
      if (item.prompt !== undefined) {
        if (!t.prompt) err(lang, `questions.${id}.prompt`, "hiányzik");
        if (!Array.isArray(t.options) || t.options.length !== item.options.length) err(lang, `questions.${id}.options`, `${t.options?.length} opció, ${item.options.length} kellene`);
        else if (new Set(t.options).size !== t.options.length) err(lang, `questions.${id}.options`, "ismétlődő opció");
      } else if (t.prompt || t.options) err(lang, `questions.${id}`, "mátrixfeladatnál csak explain lehet");
    }
    for (const id of Object.keys(q.items ?? {})) if (!(id in huQ.items)) err(lang, `questions.${id}`, "ismeretlen azonosító");
  } catch (e) {
    err(lang, "questions", `betöltési hiba: ${e.message}`);
  }
  try {
    const l = await load(`lib/i18n/legal/${lang}.ts`);
    for (const doc of ["terms", "privacy"]) {
      const a = huLegal[doc];
      const b = l[doc];
      if (!b) {
        err(lang, `legal.${doc}`, "hiányzik");
        continue;
      }
      if (a.sections.length !== b.sections.length) err(lang, `legal.${doc}`, `${b.sections.length} fejezet, ${a.sections.length} kellene`);
      compare(lang, { title: a.title, lead: a.lead }, { title: b.title, lead: b.lead }, `legal.${doc}`);
      a.sections.forEach((s, i) => {
        const t = b.sections[i];
        if (!t) return;
        if (!t.h) err(lang, `legal.${doc}.${i}.h`, "hiányzik");
        // A bekezdések száma eltérhet (pl. országspecifikus hatóság), de a helyőrzők és hivatkozások összesen egyezzenek.
        const all = (ps) => ps.join("\n");
        if (links(all(s.p)) !== links(all(t.p))) err(lang, `legal.${doc}.${i}`, `hivatkozások: (${links(all(s.p))}) ≠ (${links(all(t.p))})`);
        const need = new Set(placeholders(all(s.p)).split(",").filter(Boolean));
        const got = new Set(placeholders(all(t.p)).split(",").filter(Boolean));
        for (const k of need) if (!got.has(k)) err(lang, `legal.${doc}.${i}`, `hiányzó helyőrző: {${k}}`);
        for (const k of got) if (!need.has(k)) err(lang, `legal.${doc}.${i}`, `ismeretlen helyőrző: {${k}}`);
      });
    }
  } catch (e) {
    err(lang, "legal", `betöltési hiba: ${e.message}`);
  }
  console.log(errors === before ? "  rendben" : `  ${errors - before} hiba`);
}
process.exit(errors ? 1 : 0);
