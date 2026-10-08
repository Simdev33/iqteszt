import { NextResponse } from "next/server";
import { LOCALE_COOKIE, LOCALE_COOKIE_OPTIONS, isLocale, path, type Locale } from "@/lib/i18n/config";
import {
  MEMBER_COOKIE,
  getSession,
  memberCookieOptions,
  memberCookieValue,
  paymentMode,
  readResultToken,
  resultToken,
  sessionPaid,
  siteOrigin,
} from "@/lib/payment";
import { RESULT_URL_KEY, THANK_YOU } from "@/lib/thank-you";

/**
 * Sikeres új fizetés után a köszönőoldal (/thank-you) jön az eredmény helyett. Annak címe pontosan /thank-you kell
 * maradjon (a Google Ads ezt méri), ezért az eredmény linkjét egy apró átmeneti oldal teszi a fül sessionStorage-ába,
 * a nyelvet pedig a nyelvi süti viszi át (a proxy ez alapján szolgálja ki). JavaScript nélkül egyből az eredmény jön.
 */
function thankYou(lang: Locale, resultUrl: string) {
  const js = (v: string) => JSON.stringify(v).replace(/</g, "\\u003c");
  const attr = resultUrl.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  const html =
    `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="robots" content="noindex">` +
    `<style>html{background:#13172d}</style>` +
    `<script>try{sessionStorage.setItem(${js(RESULT_URL_KEY)},${js(resultUrl)})}catch(e){}location.replace(${js(THANK_YOU)})</script>` +
    `<noscript><meta http-equiv="refresh" content="0;url=${attr}"></noscript></head></html>`;
  const res = new NextResponse(html, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
  res.cookies.set(LOCALE_COOKIE, lang, LOCALE_COOKIE_OPTIONS);
  return res;
}

/**
 * Visszatérés a fizetésből – a Stripe hosztolt fizetési oldala sikeres fizetés után ide irányít (success_url),
 * fejlesztői módban a szimulált fizetés gombja. Előfizetésnél itt kapja meg a böngésző az előfizetői sütit
 * (a Stripe ügyfél-azonosítójával), hogy a későbbi tesztek eredményét is lássa; utána a köszönőoldal jön.
 * Ki nem fizetett munkamenetnél az eredményoldal mondja meg, mi a helyzet (ott sincs eredmény fizetés nélkül).
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
    const res = thankYou(lang, path(lang, "result", { r: resultToken(p, "paid") }));
    res.cookies.set(MEMBER_COOKIE, memberCookieValue("demo"), memberCookieOptions);
    return res;
  }

  const resultUrl = path(lang, "result", { session_id: sessionId });
  const s = await getSession(sessionId);
  const res = s && sessionPaid(s) ? thankYou(lang, resultUrl) : NextResponse.redirect(new URL(resultUrl, origin), 303);
  if (s && s.mode === "subscription" && s.status === "complete" && s.customer) {
    res.cookies.set(MEMBER_COOKIE, memberCookieValue(s.customer), memberCookieOptions);
  }
  return res;
}
