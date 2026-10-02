import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/server";
import { finishLogin } from "@/lib/login";
import { clientIp, limited } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

/** A belépés 2. lépése: a kód ellenőrzése; siker esetén az előfizetői süti beállítása. */
export async function POST(request: Request) {
  const raw = ((await request.json().catch(() => null)) ?? {}) as Record<string, unknown>;
  const lang: Locale = typeof raw.lang === "string" && isLocale(raw.lang) ? raw.lang : "hu";
  const e = getDict(lang).auth.errors;
  if (limited(`verify-ip:${clientIp(request)}`, 20, 15 * 60_000)) return Response.json({ error: e.rateLimited }, { status: 429 });
  try {
    const result = await finishLogin(typeof raw.code === "string" ? raw.code.slice(0, 20) : "");
    if (result === "ok") return Response.json({ signedIn: true });
    const msg = { invalid: e.codeInvalid, expired: e.codeExpired, locked: e.codeLocked }[result];
    return Response.json({ error: msg }, { status: result === "invalid" ? 400 : 410 });
  } catch (err) {
    console.error("[auth/verify]", err);
    return Response.json({ error: e.unavailable }, { status: 503 });
  }
}
