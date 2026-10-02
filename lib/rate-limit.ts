import "server-only";

// Egyszerű, folyamaton belüli korlát (szerverpéldányonként). A belépési kód találgatását ezen felül
// a Stripe-ügyfél metaadataiban tárolt próbálkozásszám korlátozza, ami példányoktól független.

const hits = new Map<string, { n: number; until: number }>();

export function limited(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const h = hits.get(key);
  if (!h || h.until < now) {
    hits.set(key, { n: 1, until: now + windowMs });
    if (hits.size > 5000) for (const [k, v] of hits) if (v.until < now) hits.delete(k);
    return false;
  }
  h.n++;
  return h.n > max;
}

export const clientIp = (request: Request) => request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
