// A befejezett, de még ki nem fizetett kitöltés – a böngészőben marad, amíg a fizetés meg nem történik,
// így megszakított fizetés után is vissza lehet térni hozzá.

export type Pending = { k: string; v: string; a: string; t: string; answered: number };

const KEY = "elmeszint:pending";

export function loadPending(): Pending | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as Pending;
    return typeof p?.k === "string" && typeof p?.v === "string" ? p : null;
  } catch {
    return null;
  }
}

export function savePending(p: Pending) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {}
}

export function clearPending() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}
