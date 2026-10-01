import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/server";
import { emailHasSubscription } from "@/lib/payment";

export const dynamic = "force-dynamic";

const looksLikeEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

// Egyszerű, folyamaton belüli korlát, hogy a végpontot ne lehessen e-mail-címek kipróbálására használni.
const hits = new Map<string, { n: number; until: number }>();
function limited(key: string, max = 20, windowMs = 15 * 60_000) {
  const now = Date.now();
  const h = hits.get(key);
  if (!h || h.until < now) {
    hits.set(key, { n: 1, until: now + windowMs });
    return false;
  }
  h.n++;
  return h.n > max;
}

/**
 * Fizetés előtti ellenőrzés: ha ehhez az e-mail-címhez már tartozik élő Elmeszint-előfizetés,
 * nem engedünk második előfizetést kötni (409, „alreadySubscribed”).
 */
export async function POST(request: Request) {
  const raw = ((await request.json().catch(() => null)) ?? {}) as Record<string, unknown>;
  const lang: Locale = typeof raw.lang === "string" && isLocale(raw.lang) ? raw.lang : "hu";
  const t = getDict(lang);
  const email = typeof raw.email === "string" ? raw.email.trim().slice(0, 200) : "";
  if (!looksLikeEmail(email)) return Response.json({ error: t.paywall.invalidEmail, code: "invalidEmail" }, { status: 400 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  if (limited(ip)) return Response.json({ error: t.api.unavailable, code: "rateLimited" }, { status: 429 });

  try {
    if (await emailHasSubscription(email)) return Response.json({ code: "alreadySubscribed" }, { status: 409 });
  } catch (e) {
    // Ha a Stripe most nem válaszol, nem tartjuk fel a fizetést – a Stripe maga úgyis ellenőriz.
    console.error("E-mail-ellenőrzés hiba:", e);
  }
  return Response.json({ ok: true });
}
