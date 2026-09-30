import { NextResponse } from "next/server";
import { isLocale, path, type Locale } from "@/lib/i18n/config";
import { MEMBER_COOKIE, getSession, memberCookieOptions, memberCookieValue, paymentMode, readResultToken, resultToken, siteOrigin } from "@/lib/payment";

/**
 * Visszatérés a fizetésből. Előfizetésnél itt kapja meg a böngésző az előfizetői sütit (a Stripe
 * ügyfél-azonosítójával), hogy a későbbi tesztek eredményét is lássa; utána az eredményoldalra irányít.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const l = url.searchParams.get("lang");
  const lang: Locale = isLocale(l) ? l : "hu";
  const sessionId = url.searchParams.get("session_id") ?? "";
  const demo = url.searchParams.get("demo") ?? undefined;
  const origin = siteOrigin(request);

  // Fejlesztői szimuláció: a „pending” tokenből „paid” lesz, és demó előfizetői süti.
  if (demo && paymentMode() === "demo") {
    const p = readResultToken(demo, "pending");
    if (!p) return NextResponse.redirect(new URL(path(lang, "result"), origin));
    const res = NextResponse.redirect(new URL(path(lang, "result", { r: resultToken(p, "paid") }), origin), 303);
    res.cookies.set(MEMBER_COOKIE, memberCookieValue("demo"), memberCookieOptions);
    return res;
  }

  const res = NextResponse.redirect(new URL(path(lang, "result", { session_id: sessionId }), origin), 303);
  const s = await getSession(sessionId);
  if (s && s.mode === "subscription" && s.status === "complete" && s.customer) {
    res.cookies.set(MEMBER_COOKIE, memberCookieValue(s.customer), memberCookieOptions);
  }
  return res;
}
