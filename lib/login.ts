import "server-only";
import { randomInt, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import type { Locale } from "./i18n/config";
import { sendLoginCode } from "./email";
import {
  MEMBER_COOKIE,
  activeCustomerFor,
  getCustomer,
  keyedHash,
  memberCookieOptions,
  memberCookieValue,
  paymentMode,
  readToken,
  setCustomerMeta,
  signToken,
} from "./payment";

// Jelszó nélküli belépés 6 jegyű e-mailes kóddal (a DoneSignIn mintájára). Csak élő előfizetéssel
// lehet belépni. A kód lenyomata, lejárata és a próbálkozások száma a Stripe-ügyfél metaadataiban van,
// így nem kell adatbázis, és a találgatás szerverpéldányoktól függetlenül korlátos.
// Siker után a böngésző megkapja az előfizetői sütit – ugyanazt, amit a fizetés után.

export const CODE_MINUTES = 10;
const MAX_ATTEMPTS = 5;
const LOGIN_COOKIE = "tma_login";

type PendingLogin = { c: string | null; e: string; x: number };
export type LoginResult = "ok" | "invalid" | "expired" | "locked";

export const normalizeEmail = (email: string) => email.trim().toLowerCase().slice(0, 254);
export const isEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

const loginCookieOptions = (maxAge: number) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge,
});

/** 1. lépés: kódot küld, ha a cím élő előfizetőé – a válasz sosem árulja el, hogy az-e. */
export async function startLogin(rawEmail: string, lang: Locale) {
  const email = normalizeEmail(rawEmail);
  const exp = Date.now() + CODE_MINUTES * 60_000;
  const customer = paymentMode() === "stripe" ? await activeCustomerFor(email) : null;
  if (customer) {
    const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
    await setCustomerMeta(customer, {
      login_code: keyedHash(`${customer}:${code}`),
      login_expires: String(Math.floor(exp / 1000)),
      login_attempts: "0",
    });
    await sendLoginCode(email, code, lang, CODE_MINUTES);
  }
  const pending: PendingLogin = { c: customer, e: email, x: exp };
  (await cookies()).set(LOGIN_COOKIE, signToken(pending), loginCookieOptions(CODE_MINUTES * 60));
}

const same = (a: string, b: string) => a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));

/** 2. lépés: a kód ellenőrzése; siker esetén előfizetői süti. */
export async function finishLogin(rawCode: string): Promise<LoginResult> {
  const jar = await cookies();
  const pending = readToken<PendingLogin>(jar.get(LOGIN_COOKIE)?.value);
  if (!pending || pending.x < Date.now()) return "expired";
  const code = rawCode.replace(/\D/g, "");
  if (!pending.c || code.length !== 6) return "invalid";

  const customer = await getCustomer(pending.c);
  if (!customer) return "invalid";
  const meta = customer.metadata ?? {};
  if (!meta.login_code || Number(meta.login_expires) * 1000 < Date.now()) return "expired";
  const attempts = Number(meta.login_attempts || 0);
  if (attempts >= MAX_ATTEMPTS) return "locked";

  if (!same(keyedHash(`${customer.id}:${code}`), meta.login_code)) {
    await setCustomerMeta(customer.id, { login_attempts: String(attempts + 1) });
    return attempts + 1 >= MAX_ATTEMPTS ? "locked" : "invalid";
  }

  await setCustomerMeta(customer.id, { login_code: "", login_expires: "", login_attempts: "" });
  jar.set(MEMBER_COOKIE, memberCookieValue(customer.id), memberCookieOptions);
  jar.set(LOGIN_COOKIE, "", loginCookieOptions(0));
  return "ok";
}

/** Kijelentkezés ezen az eszközön. */
export async function logout() {
  (await cookies()).set(MEMBER_COOKIE, "", { ...memberCookieOptions, maxAge: 0 });
}
