import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/server";
import { EmailError } from "@/lib/email";
import { isEmail, normalizeEmail, startLogin } from "@/lib/login";
import { clientIp, limited } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

/** A belépés 1. lépése: kód e-mailben (csak élő előfizetőnek; a válasz mindkét esetben ugyanaz). */
export async function POST(request: Request) {
  const raw = ((await request.json().catch(() => null)) ?? {}) as Record<string, unknown>;
  const lang: Locale = typeof raw.lang === "string" && isLocale(raw.lang) ? raw.lang : "hu";
  const e = getDict(lang).auth.errors;
  const email = normalizeEmail(typeof raw.email === "string" ? raw.email : "");
  if (!isEmail(email)) return Response.json({ error: e.invalidEmail }, { status: 400 });
  if (limited(`login-ip:${clientIp(request)}`, 10, 15 * 60_000) || limited(`login-mail:${email}`, 4, 15 * 60_000)) {
    return Response.json({ error: e.rateLimited }, { status: 429 });
  }
  try {
    await startLogin(email, lang);
    return Response.json({ sent: true });
  } catch (err) {
    console.error("[auth/request]", err);
    return Response.json({ error: err instanceof EmailError ? e.emailFailed : e.unavailable }, { status: err instanceof EmailError ? 502 : 503 });
  }
}
