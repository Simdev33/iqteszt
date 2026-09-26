"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DEFAULT_VARIANTS, POOL, SLOTS, TOTAL, buildTest, pickVariants } from "@/lib/questions";
import type { Answers } from "@/lib/scoring";

export type Phase = "intro" | "quiz" | "review" | "analyzing";

type Saved = { answers: Answers; index: number; age: string; elapsed: number; variants: number[]; v: number };

const KEY = "elmeszint:progress";
const SEEN_KEY = "elmeszint:seen";
const VERSION = 2;

/** Melyik kérdést hányszor kapta már meg ez a böngésző. */
function loadSeen(): Record<string, number> {
  try {
    const raw = localStorage.getItem(SEEN_KEY);
    const parsed = raw ? (JSON.parse(raw) as Record<string, number>) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function markSeen(variants: number[]) {
  try {
    const seen = loadSeen();
    const ids = new Set(POOL.map((q) => q.id));
    for (const q of buildTest(variants)) seen[q.id] = (seen[q.id] ?? 0) + 1;
    // csak a ma is létező kérdéseket tartjuk meg
    for (const id of Object.keys(seen)) if (!ids.has(id)) delete seen[id];
    localStorage.setItem(SEEN_KEY, JSON.stringify(seen));
  } catch {}
}

const validVariants = (v: unknown): v is number[] =>
  Array.isArray(v) && v.length === TOTAL && v.every((n, i) => Number.isInteger(n) && n >= 0 && n < SLOTS[i].length);

function load(): Saved | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as Saved;
    if (s.v !== VERSION || !Array.isArray(s.answers) || s.answers.length !== TOTAL || !validVariants(s.variants)) return null;
    return s;
  } catch {
    return null;
  }
}

/** A teszt teljes állapota, localStorage-ba mentve, hogy frissítés után is folytatható legyen. */
export function useTestState() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [answers, setAnswers] = useState<Answers>(() => Array(TOTAL).fill(null));
  const [index, setIndex] = useState(0);
  const [age, setAge] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [variants, setVariants] = useState<number[]>(DEFAULT_VARIANTS);
  const [saved, setSaved] = useState<Saved | null>(null);
  const dir = useRef(1);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- a mentett állapot csak kliensen olvasható
    setSaved(load());
  }, []);

  // Stopper: csak kitöltés közben és látható lapon fut
  useEffect(() => {
    if (phase !== "quiz" && phase !== "review") return;
    const t = setInterval(() => {
      if (document.visibilityState === "visible") setElapsed((e) => e + 1);
    }, 1000);
    return () => clearInterval(t);
  }, [phase]);

  // Mentés
  useEffect(() => {
    if (phase !== "quiz" && phase !== "review") return;
    try {
      localStorage.setItem(KEY, JSON.stringify({ answers, index, age, elapsed, variants, v: VERSION } satisfies Saved));
    } catch {}
  }, [answers, index, age, elapsed, variants, phase]);

  const start = useCallback(() => {
    // Új összeállítás: helyenként a legkevésbé látott változatok közül
    const next = pickVariants(loadSeen());
    markSeen(next);
    setVariants(next);
    setAnswers(Array(TOTAL).fill(null));
    setIndex(0);
    setElapsed(0);
    dir.current = 1;
    setPhase("quiz");
  }, []);

  const resume = useCallback(() => {
    if (!saved) return;
    setAnswers(saved.answers);
    setIndex(Math.min(saved.index, TOTAL - 1));
    setAge(saved.age);
    setElapsed(saved.elapsed);
    setVariants(saved.variants);
    setPhase("quiz");
  }, [saved]);

  const goTo = useCallback(
    (i: number) => {
      const next = Math.max(0, Math.min(TOTAL - 1, i));
      dir.current = next >= index ? 1 : -1;
      setIndex(next);
      setPhase("quiz");
    },
    [index],
  );

  const answer = useCallback((q: number, opt: number) => {
    setAnswers((a) => {
      const n = [...a];
      n[q] = opt;
      return n;
    });
  }, []);

  const clearSaved = useCallback(() => {
    try {
      localStorage.removeItem(KEY);
    } catch {}
  }, []);

  return { phase, setPhase, answers, answer, index, goTo, age, setAge, elapsed, variants, saved, start, resume, dir, clearSaved };
}
