// Süti-hozzájárulás (analitika és hirdetésmérés), a DoneSignIn mintájára. A döntés egy olvasható sütiben él
// 180 napig, utána újra kérdezünk. A Google-címke (components/ui/GoogleTag.tsx) erre figyel: csak „granted”
// esetén töltődik be.

export type Consent = "granted" | "denied";

const COOKIE = "tma_consent";
const MAX_AGE = 180 * 24 * 60 * 60;

/** Új döntés (detail: Consent). */
export const CONSENT_EVENT = "tma:consent";
/** A „Süti-beállítások” gomb újra megnyitja a sávot. */
export const CONSENT_OPEN_EVENT = "tma:consent-open";

export function readConsent(): Consent | null {
  if (typeof document === "undefined") return null;
  const value = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${COOKIE}=`))
    ?.slice(COOKIE.length + 1);
  return value === "granted" || value === "denied" ? value : null;
}

export function saveConsent(value: Consent) {
  document.cookie = `${COOKIE}=${value}; path=/; max-age=${MAX_AGE}; samesite=lax`;
  window.dispatchEvent(new CustomEvent<Consent>(CONSENT_EVENT, { detail: value }));
}

export const openConsentSettings = () => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
