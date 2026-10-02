import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/server";
import { emailHasSubscription } from "@/lib/payment";
import { clientIp, limited } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const looksLikeEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

/**
 * Fizetés előtti ellenőrzés: ha ehhez az e-mail-címhez már tartozik élő TestMyAbilities-előfizetés,
 * nem engedünk második előfizetést kötni (409, „alreadySubscribed”).
 */
export async function POST(request: Request) {
  const raw = ((await request.json().catch(() => null)) ?? {}) as Record<string, unknown>;
  const lang: Locale = typeof raw.lang === "string" && isLocale(raw.lang) ? raw.lang : "hu";
  const t = getDict(lang);
  const email = typeof raw.email === "string" ? raw.email.trim().slice(0, 200) : "";
  if (!looksLikeEmail(email)) return Response.json({ error: t.paywall.invalidEmail, code: "invalidEmail" }, { status: 400 });

  if (limited(`email-check:${clientIp(request)}`, 20, 15 * 60_000)) return Response.json({ error: t.api.unavailable, code: "rateLimited" }, { status: 429 });

  try {
    if (await emailHasSubscription(email)) return Response.json({ code: "alreadySubscribed" }, { status: 409 });
  } catch (e) {
    // Ha a Stripe most nem válaszol, nem tartjuk fel a fizetést – a Stripe maga úgyis ellenőriz.
    console.error("E-mail-ellenőrzés hiba:", e);
  }
  return Response.json({ ok: true });
}
