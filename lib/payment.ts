import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";
import { fmt, path, type Locale } from "./i18n/config";
import type { Dict } from "./i18n/dict/hu";
import { PRICING, eurCents, prices } from "./pricing";

// Fizetés: Stripe Checkout, külön npm-csomag nélkül (a Stripe REST API-ja form-kódolt kéréseket vár).
// Adatbázis nem kell: a kitöltés kódja a Checkout Session metaadataiban utazik, és az eredményoldal
// a Stripe-tól kérdezi le, hogy a munkamenet tényleg ki van-e fizetve.
//
// Egy csomag: 7 napos teljes hozzáférés 3,90 €-ért (azonnal terhelve), a 8. naptól 9,90 €/hó, amíg le nem mondják.
// A fizetési űrlap Stripe Checkout Elements (ui_mode: elements): a munkamenet a fizetési képernyővel együtt jön
// létre, az e-mail-mező, az expressz gombok és a kártyaűrlap eleve nyitva vannak (a DoneSignIn mintájára).
// A Stripe-fiók közös más alkalmazásokkal, ezért minden saját objektum metadata.app = "testmyabilities" jelölést kap.
// Az előfizetőt egy aláírt, httpOnly süti (a Stripe ügyfél-azonosítójával) ismeri fel; a későbbi
// tesztek eredményét a szerver aláírt linkkel adja ki, ha a Stripe szerint az előfizetés aktív.
//
// Stripe-kulcs nélkül, fejlesztői módban egy aláírt „demó” token helyettesíti a fizetést,
// hogy a teljes folyamat kipróbálható legyen. Éles módban kulcs nélkül a fizetés le van tiltva.

export type TestPayload = { k: string; v: string; a: string; t: string };

const STRIPE_API = "https://api.stripe.com/v1";
/** Rögzített API-verzió: a Checkout Elements (ui_mode „elements”) ennél a verziónál ezen a néven él. */
const STRIPE_VERSION = "2026-08-26.dahlia";
export const APP = "testmyabilities";
const secretKey = () => process.env.STRIPE_SECRET_KEY?.trim() || "";

export const paymentMode = (): "stripe" | "demo" | "off" =>
  secretKey() ? "stripe" : process.env.NODE_ENV !== "production" ? "demo" : "off";

async function stripe<T>(p: string, init?: { method?: string; body?: URLSearchParams }): Promise<T> {
  const res = await fetch(`${STRIPE_API}${p}`, {
    method: init?.method ?? "GET",
    headers: {
      Authorization: `Bearer ${secretKey()}`,
      "Stripe-Version": STRIPE_VERSION,
      ...(init?.body ? { "Content-Type": "application/x-www-form-urlencoded" } : {}),
    },
    body: init?.body,
    cache: "no-store",
  });
  const json = (await res.json()) as T & { error?: { message?: string } };
  if (!res.ok) throw new Error(json.error?.message ?? `Stripe-hiba (${res.status})`);
  return json;
}

/* ---------------- Aláírt tokenek (eredménylink, süti, demó) ---------------- */

/** Aláíró kulcs: RESULT_SECRET, vagy a Stripe-kulcsból származtatva, vagy fejlesztői alapérték. */
function signingSecret() {
  if (process.env.RESULT_SECRET) return process.env.RESULT_SECRET;
  if (secretKey()) return createHash("sha256").update(`elmeszint-result:${secretKey()}`).digest("hex");
  return process.env.PAYMENT_DEMO_SECRET || "elmeszint-fejlesztoi-demo";
}
const b64 = (s: string) => Buffer.from(s).toString("base64url");
const sign = (data: string) => createHmac("sha256", signingSecret()).update(data).digest("base64url");
/** Kulcsolt lenyomat (pl. a belépési kódé) – visszafejthetetlen, és csak a mi kulcsunkkal ellenőrizhető. */
export const keyedHash = (value: string) => sign(`hash:${value}`);

export function signToken(obj: object) {
  const data = b64(JSON.stringify(obj));
  return `${data}.${sign(data)}`;
}
export function readToken<T>(token: string | undefined): T | null {
  if (!token) return null;
  const [data, sig] = token.split(".");
  if (!data || !sig) return null;
  const expected = Buffer.from(sign(data));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  try {
    return JSON.parse(Buffer.from(data, "base64url").toString()) as T;
  } catch {
    return null;
  }
}

/**
 * Eredmény-token: „member” = aktív előfizető kapta (bármely módban érvényes),
 * „pending”/„paid” = fejlesztői szimuláció (csak demó módban érvényes).
 */
type Stage = "member" | "pending" | "paid";
export function resultToken(payload: TestPayload, stage: Stage) {
  return signToken({ k: payload.k, v: payload.v, a: payload.a, t: payload.t, s: stage });
}
export function readResultToken(token: string | undefined, stage: Stage): TestPayload | null {
  if (stage !== "member" && paymentMode() !== "demo") return null;
  const p = readToken<TestPayload & { s: string }>(token);
  if (!p || p.s !== stage || typeof p.k !== "string" || typeof p.v !== "string") return null;
  return { k: p.k, v: p.v, a: p.a ?? "", t: p.t ?? "0" };
}

/* ---------------- Előfizetői süti ---------------- */

export const MEMBER_COOKIE = "elm_sub";
export const memberCookieValue = (customer: string) => signToken({ c: customer });
export const memberCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 400,
};

/** A böngésző sütijéből a Stripe ügyfél-azonosító (demó módban „demo”); ha nincs vagy hamis, null. */
export async function memberCustomer(): Promise<string | null> {
  const raw = (await cookies()).get(MEMBER_COOKIE)?.value;
  const c = readToken<{ c: string }>(raw)?.c;
  if (!c) return null;
  if (c === "demo") return paymentMode() === "demo" ? c : null;
  return /^cus_[A-Za-z0-9]+$/.test(c) ? c : null;
}

/* ---------------- Checkout ---------------- */

type Session = {
  id: string;
  client_secret: string | null;
  mode: "payment" | "subscription";
  status: "open" | "complete" | "expired";
  payment_status: "paid" | "unpaid" | "no_payment_required";
  customer: string | null;
  metadata: Partial<TestPayload> | null;
};

/**
 * Stripe Checkout munkamenet a saját fizetési felülethez (Checkout Elements): a 7 napos hozzáférés díja az első
 * (próbaidős) számlán azonnal terhelődik, utána havidíj. A fizetési képernyő megnyitásakor jön létre, ügyfél
 * nélkül – az e-mail-címet a fizetés gombja adja át, az ügyfelet a Stripe hozza létre.
 */
export async function createCheckout(payload: TestPayload, lang: Locale, t: Dict, origin: string, customer?: string | null) {
  const p = prices(lang);
  const body = new URLSearchParams({
    mode: "subscription",
    ui_mode: "elements",
    billing_address_collection: "auto",
    // Csak akkor használja, ha egy fizetési mód átirányítást kér (pl. 3D Secure banki oldal).
    return_url: `${origin}/api/stripe/return?lang=${lang}&session_id={CHECKOUT_SESSION_ID}`,
    "metadata[app]": APP,
    "metadata[k]": payload.k,
    "metadata[v]": payload.v,
    "metadata[a]": payload.a,
    "metadata[t]": payload.t,
    "metadata[lang]": lang,
    // Havidíj az első 7 nap után…
    "line_items[0][quantity]": "1",
    "line_items[0][price_data][currency]": "eur",
    "line_items[0][price_data][unit_amount]": String(eurCents(PRICING.monthlyEur)),
    "line_items[0][price_data][recurring][interval]": "month",
    "line_items[0][price_data][product_data][name]": t.stripe.subName,
    "line_items[0][price_data][product_data][description]": t.stripe.subDesc,
    // …és a 7 napos hozzáférés díja, amit a Stripe az első számlán azonnal terhel.
    "line_items[1][quantity]": "1",
    "line_items[1][price_data][currency]": "eur",
    "line_items[1][price_data][unit_amount]": String(eurCents(PRICING.trialEur)),
    "line_items[1][price_data][product_data][name]": fmt(t.stripe.trialName, { days: p.days }),
    "subscription_data[trial_period_days]": String(PRICING.trialDays),
    "subscription_data[metadata][lang]": lang,
    "subscription_data[metadata][app]": APP,
  });
  if (customer && customer !== "demo") body.set("customer", customer);

  const session = await stripe<Session>("/checkout/sessions", { method: "POST", body });
  if (!session.client_secret) throw new Error("A Stripe nem adott vissza fizetési űrlapot.");
  return session.client_secret;
}

export async function getSession(sessionId: string): Promise<Session | null> {
  if (paymentMode() !== "stripe" || !/^cs_[A-Za-z0-9_]+$/.test(sessionId)) return null;
  try {
    return await stripe<Session>(`/checkout/sessions/${encodeURIComponent(sessionId)}`);
  } catch {
    return null;
  }
}

/** A kifizetett munkamenet kitöltés-adatai. */
export async function paidPayload(
  sessionId: string,
): Promise<{ status: "paid"; payload: TestPayload; subscription: boolean } | { status: "unpaid" | "invalid" }> {
  const s = await getSession(sessionId);
  if (!s) return { status: "invalid" };
  const paid =
    s.status === "complete" && (s.payment_status === "paid" || (s.mode === "subscription" && s.payment_status === "no_payment_required"));
  if (!paid) return { status: "unpaid" };
  const m = s.metadata ?? {};
  return { status: "paid", payload: { k: m.k ?? "", v: m.v ?? "", a: m.a ?? "", t: m.t ?? "0" }, subscription: s.mode === "subscription" };
}

/* ---------------- Előfizetés állapota ---------------- */

type StripeSub = {
  id: string;
  status: "trialing" | "active" | "past_due" | "canceled" | "unpaid" | "incomplete" | "incomplete_expired" | "paused";
  created: number;
  trial_end: number | null;
  cancel_at_period_end: boolean;
  cancel_at: number | null;
  current_period_end?: number;
  metadata?: Record<string, string> | null;
  items: { data: { current_period_end?: number; price?: { unit_amount: number | null; currency: string } }[] };
};

export type SubInfo = {
  status: StripeSub["status"];
  /** Az aktuális (próba)időszak vége, másodpercben. */
  periodEnd: number | null;
  trialEnd: number | null;
  /** Lemondva: a periódus végén megszűnik. */
  canceling: boolean;
  /** Havidíj a legkisebb egységben. */
  amount: number | null;
  currency: string | null;
};

const LIVE: StripeSub["status"][] = ["trialing", "active", "past_due"];

/** Az ügyfél legfontosabb (élő, különben a legutóbbi) előfizetése. */
export async function subscriptionOf(customer: string): Promise<SubInfo | null> {
  if (customer === "demo") {
    return { status: "trialing", periodEnd: null, trialEnd: null, canceling: false, amount: eurCents(PRICING.monthlyEur), currency: "eur" };
  }
  if (paymentMode() !== "stripe") return null;
  const list = await stripe<{ data: StripeSub[] }>(`/subscriptions?customer=${encodeURIComponent(customer)}&status=all&limit=20`);
  // Közös Stripe-fiók: csak a saját előfizetés számít (a jelölés nélküliek a jelölés bevezetése előttiek).
  const own = list.data.filter((x) => !x.metadata?.app || x.metadata.app === APP);
  const subs = [...own].sort((a, b) => Number(LIVE.includes(b.status)) - Number(LIVE.includes(a.status)) || b.created - a.created);
  const s = subs[0];
  if (!s) return null;
  const item = s.items?.data?.[0];
  return {
    status: s.status,
    periodEnd: s.current_period_end ?? item?.current_period_end ?? null,
    trialEnd: s.trial_end,
    canceling: s.cancel_at_period_end || s.cancel_at != null,
    amount: item?.price?.unit_amount ?? null,
    currency: item?.price?.currency ?? null,
  };
}

/** Jár-e most hozzáférés (próbaidőben vagy fizetve; lemondva is a periódus végéig). */
export const isActive = (s: SubInfo | null) => !!s && (s.status === "trialing" || s.status === "active");

/**
 * Van-e már élő TestMyAbilities-előfizetés ehhez az e-mail-címhez (más eszközön vásárolva) – ilyenkor nem
 * engedünk második előfizetést kötni. Más alkalmazások előfizetései nem számítanak.
 */
export async function emailHasSubscription(email: string): Promise<boolean> {
  return (await activeCustomerFor(email)) !== null;
}

/** Az e-mail-címhez tartozó Stripe-ügyfél, akinek élő TestMyAbilities-előfizetése van (különben null). */
export async function activeCustomerFor(email: string): Promise<string | null> {
  if (paymentMode() !== "stripe") return null;
  const q = `email:'${email.replace(/'/g, "\\'")}'`;
  const found = await stripe<{ data: { id: string }[] }>(`/customers/search?query=${encodeURIComponent(q)}&limit=10`);
  for (const c of found.data) if (isActive(await subscriptionOf(c.id))) return c.id;
  return null;
}

/* ---------------- Ügyfél-metaadatok (a belépési kódhoz) ---------------- */

export type CustomerMeta = { id: string; email: string | null; deleted?: boolean; metadata: Record<string, string> };

export async function getCustomer(id: string): Promise<CustomerMeta | null> {
  if (paymentMode() !== "stripe" || !/^cus_[A-Za-z0-9]+$/.test(id)) return null;
  const c = await stripe<CustomerMeta>(`/customers/${id}`);
  return c.deleted ? null : c;
}

/** Metaadatok írása; üres szöveg törli a kulcsot. */
export async function setCustomerMeta(id: string, meta: Record<string, string>) {
  const body = new URLSearchParams();
  for (const [k, v] of Object.entries(meta)) body.set(`metadata[${k}]`, v);
  await stripe(`/customers/${id}`, { method: "POST", body });
}

/* ---------------- Ügyfélportál ---------------- */

type PortalConfig = {
  id: string;
  metadata: Record<string, string> | null;
  default_return_url: string | null;
  login_page: { enabled: boolean; url: string | null } | null;
};
let portalConfig: Promise<PortalConfig> | null = null;

/** A saját portál-beállítás (lemondás a periódus végén, kártyacsere, számlák, e-mailes belépés); ha nincs, létrehozzuk. */
function ensurePortalConfig(origin: string): Promise<PortalConfig> {
  portalConfig ??= (async () => {
    const list = await stripe<{ data: PortalConfig[] }>("/billing_portal/configurations?active=true&limit=100");
    const found = list.data.find((c) => c.metadata?.app === APP);
    if (found && found.default_return_url === `${origin}/` && found.login_page?.enabled) return found;
    const body = new URLSearchParams({
      "business_profile[headline]": "TestMyAbilities",
      default_return_url: `${origin}/`,
      "features[invoice_history][enabled]": "true",
      "features[payment_method_update][enabled]": "true",
      "features[subscription_cancel][enabled]": "true",
      "features[subscription_cancel][mode]": "at_period_end",
      "features[subscription_cancel][cancellation_reason][enabled]": "true",
      "features[subscription_cancel][cancellation_reason][options][0]": "too_expensive",
      "features[subscription_cancel][cancellation_reason][options][1]": "unused",
      "features[subscription_cancel][cancellation_reason][options][2]": "other",
      "login_page[enabled]": "true",
      "metadata[app]": APP,
    });
    if (origin.startsWith("https://")) {
      body.set("business_profile[privacy_policy_url]", `${origin}${path("en", "privacy")}`);
      body.set("business_profile[terms_of_service_url]", `${origin}${path("en", "terms")}`);
    }
    return stripe<PortalConfig>(found ? `/billing_portal/configurations/${found.id}` : "/billing_portal/configurations", { method: "POST", body });
  })().catch((e) => {
    portalConfig = null;
    throw e;
  });
  return portalConfig;
}

/** Az ügyfélportál egy ügyfélnek (lemondás, kártyacsere, számlák). */
export async function portalUrl(customer: string, lang: Locale, origin: string) {
  const config = await ensurePortalConfig(origin);
  const body = new URLSearchParams({
    customer,
    configuration: config.id,
    locale: lang,
    return_url: `${origin}${path(lang, "subscription")}`,
  });
  return (await stripe<{ url: string }>("/billing_portal/sessions", { method: "POST", body })).url;
}

/** Az ügyfélportál e-mailes belépőoldala (más eszközön vásárolt előfizetéshez). */
export async function portalLoginUrl(origin: string): Promise<string | null> {
  if (paymentMode() !== "stripe") return null;
  try {
    return (await ensurePortalConfig(origin)).login_page?.url ?? null;
  } catch {
    return null;
  }
}

/**
 * Az oldal nyilvános címe (a Stripe ide irányít vissza). Élesben a SITE_URL a mérvadó; enélkül a kérés
 * Host-fejléceiből számoljuk (proxy mögött a request.url belső címet mutathat).
 */
function originFrom(h: Headers, fallback: string) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  const host = h.get("x-forwarded-host")?.split(",")[0].trim() || h.get("host");
  if (!host) return fallback;
  const proto = h.get("x-forwarded-proto")?.split(",")[0].trim() || (/^(localhost|127\.|\[::1\])/.test(host) ? "http" : "https");
  return `${proto}://${host}`;
}
export const siteOrigin = (request: Request) => originFrom(request.headers, new URL(request.url).origin);

/** Ugyanez szerverkomponensből. */
export async function requestOrigin() {
  return originFrom(await headers(), "http://localhost");
}
