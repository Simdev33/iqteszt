"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TOTAL, VARIANTS_PER_SLOT } from "@/lib/meta";
import { pickVariants } from "@/lib/pick";
import { encodeAnswers, encodeVariants } from "@/lib/codec";
import type { Answers, PublicQuestion } from "@/lib/types";
import { clearPending, loadPending, savePending, type Pending } from "./pending";

export type Phase = "intro" | "quiz" | "review" | "analyzing" | "paywall";

type Saved = { answers: Answers; index: number; age: string; elapsed: number; variants: number[]; v: number };

const KEY = "elmeszint:progress";
const SEEN_KEY = "elmeszint:seen";
const VERSION = 2;
const DEFAULT_VARIANTS: number[] = Array(TOTAL).fill(0);

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

function markSeen(slots: PublicQuestion[][], variants: number[]) {
  try {
    const seen = loadSeen();
    const ids = new Set(slots.flat().map((q) => q.id));
    slots.forEach((slot, i) => {
      const id = slot[variants[i]]?.id;
      if (id) seen[id] = (seen[id] ?? 0) + 1;
    });
    // csak a ma is létező kérdéseket tartjuk meg
    for (const id of Object.keys(seen)) if (!ids.has(id)) delete seen[id];
    localStorage.setItem(SEEN_KEY, JSON.stringify(seen));
  } catch {}
}

const validVariants = (v: unknown): v is number[] =>
  Array.isArray(v) && v.length === TOTAL && v.every((n) => Number.isInteger(n) && n >= 0 && n < VARIANTS_PER_SLOT);

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
export function useTestState(slots: PublicQuestion[][]) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [answers, setAnswers] = useState<Answers>(() => Array(TOTAL).fill(null));
  const [index, setIndex] = useState(0);
  const [age, setAge] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [variants, setVariants] = useState<number[]>(DEFAULT_VARIANTS);
  const [saved, setSaved] = useState<Saved | null>(null);
  const [pending, setPending] = useState<Pending | null>(null);
  const [cancelled, setCancelled] = useState(false);
  const dir = useRef(1);

  // A mentett állapot csak kliensen olvasható. Ha a Stripe-ról megszakított fizetéssel jöttünk vissza,
  // egyből a fizetési képernyő jön.
  useEffect(() => {
    const p = loadPending();
    const back = new URLSearchParams(window.location.search).get("fizetes") === "megszakitva";
    /* eslint-disable react-hooks/set-state-in-effect */
    setSaved(load());
    setPending(p);
    if (p && back) {
      setCancelled(true);
      setPhase("paywall");
    }
    /* eslint-enable react-hooks/set-state-in-effect */
    if (back) window.history.replaceState(null, "", window.location.pathname);
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
    const next = pickVariants(slots, loadSeen());
    markSeen(slots, next);
    setVariants(next);
    setAnswers(Array(TOTAL).fill(null));
    setIndex(0);
    setElapsed(0);
    setCancelled(false);
    dir.current = 1;
    setPhase("quiz");
  }, [slots]);

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

  /** A kitöltés lezárása: a kész teszt fizetésre vár, a folyamatban lévő mentés törlődik. */
  const complete = useCallback(() => {
    const p: Pending = {
      k: encodeVariants(variants),
      v: encodeAnswers(answers),
      a: age,
      t: String(Math.round(elapsed)),
      answered: answers.filter((a) => a != null).length,
    };
    savePending(p);
    setPending(p);
    try {
      localStorage.removeItem(KEY);
    } catch {}
    setSaved(null);
    setCancelled(false);
    setPhase("paywall");
  }, [variants, answers, age, elapsed]);

  const openPaywall = useCallback(() => {
    if (pending) setPhase("paywall");
  }, [pending]);

  const discardPending = useCallback(() => {
    clearPending();
    setPending(null);
  }, []);

  return {
    phase,
    setPhase,
    answers,
    answer,
    index,
    goTo,
    age,
    setAge,
    elapsed,
    variants,
    saved,
    pending,
    cancelled,
    start,
    resume,
    complete,
    openPaywall,
    discardPending,
    dir,
  };
}
