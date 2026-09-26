import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { PRICE_HUF } from "./meta";

// Fizetés: Stripe Checkout, külön npm-csomag nélkül (a Stripe REST API-ja form-kódolt kéréseket vár).
// Adatbázis nem kell: a kitöltés kódja a Checkout Session metaadataiban utazik, és az eredményoldal
// a Stripe-tól kérdezi le, hogy a munkamenet tényleg ki van-e fizetve.
//
// Stripe-kulcs nélkül, fejlesztői módban egy aláírt „demó” token helyettesíti a fizetést,
// hogy a teljes folyamat kipróbálható legyen. Éles módban kulcs nélkül a fizetés le van tiltva.

export type TestPayload = { k: string; v: string; a: string; t: string };

const STRIPE_API = "https://api.stripe.com/v1";
const secretKey = () => process.env.STRIPE_SECRET_KEY?.trim() || "";

export const paymentMode = (): "stripe" | "demo" | "off" =>
  secretKey() ? "stripe" : process.env.NODE_ENV !== "production" ? "demo" : "off";

async function stripe<T>(path: string, init?: { method?: string; body?: URLSearchParams }): Promise<T> {
  const res = await fetch(`${STRIPE_API}${path}`, {
    method: init?.method ?? "GET",
    headers: {
      Authorization: `Bearer ${secretKey()}`,
      ...(init?.body ? { "Content-Type": "application/x-www-form-urlencoded" } : {}),
    },
    body: init?.body,
    cache: "no-store",
  });
  const json = (await res.json()) as T & { error?: { message?: string } };
  if (!res.ok) throw new Error(json.error?.message ?? `Stripe-hiba (${res.status})`);
  return json;
}

type Session = {
  id: string;
  url: string | null;
  payment_status: "paid" | "unpaid" | "no_payment_required";
  metadata: Partial<TestPayload> | null;
};

/** Stripe Checkout munkamenet az eredmény egyszeri díjával. */
export async function createCheckout(payload: TestPayload, origin: string) {
  const body = new URLSearchParams({
    mode: "payment",
    locale: "hu",
    "payment_method_types[0]": "card",
    "line_items[0][quantity]": "1",
    "line_items[0][price_data][currency]": "huf",
    // A Stripe a forintot kétjegyű tizedes pénznemként kezeli: 1 990 Ft = 199000.
    "line_items[0][price_data][unit_amount]": String(PRICE_HUF * 100),
    "line_items[0][price_data][product_data][name]": "IQ-teszt eredmény",
    "line_items[0][price_data][product_data][description]":
      "IQ-becslés percentilissel, területenkénti bontással és a feladatok megoldásával. Egyszeri díj, nincs előfizetés.",
    success_url: `${origin}/eredmeny?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/teszt?fizetes=megszakitva`,
    "metadata[k]": payload.k,
    "metadata[v]": payload.v,
    "metadata[a]": payload.a,
    "metadata[t]": payload.t,
  });
  const session = await stripe<Session>("/checkout/sessions", { method: "POST", body });
  if (!session.url) throw new Error("A Stripe nem adott vissza fizetési oldalt.");
  return session.url;
}

/** A kifizetett munkamenet kitöltés-adatai; nem fizetett vagy ismeretlen munkamenetnél null. */
export async function paidPayload(sessionId: string): Promise<{ status: "paid"; payload: TestPayload } | { status: "unpaid" | "invalid" }> {
  if (paymentMode() !== "stripe" || !/^cs_[A-Za-z0-9_]+$/.test(sessionId)) return { status: "invalid" };
  try {
    const s = await stripe<Session>(`/checkout/sessions/${encodeURIComponent(sessionId)}`);
    if (s.payment_status !== "paid") return { status: "unpaid" };
    const m = s.metadata ?? {};
    return { status: "paid", payload: { k: m.k ?? "", v: m.v ?? "", a: m.a ?? "", t: m.t ?? "0" } };
  } catch {
    return { status: "invalid" };
  }
}

/* ---------------- Fejlesztői szimuláció (csak Stripe-kulcs nélkül, nem éles módban) ---------------- */

const demoSecret = () => process.env.PAYMENT_DEMO_SECRET || "elmeszint-fejlesztoi-demo";
const b64 = (s: string) => Buffer.from(s).toString("base64url");
const sign = (data: string) => createHmac("sha256", demoSecret()).update(data).digest("base64url");

/** Aláírt token a demó fizetéshez (stage: „pending” = fizetésre vár, „paid” = kifizetve). */
export function demoToken(payload: TestPayload, stage: "pending" | "paid") {
  const data = b64(JSON.stringify({ ...payload, s: stage }));
  return `${data}.${sign(data)}`;
}

export function readDemoToken(token: string | undefined, stage: "pending" | "paid"): TestPayload | null {
  if (paymentMode() !== "demo" || !token) return null;
  const [data, sig] = token.split(".");
  if (!data || !sig) return null;
  const expected = Buffer.from(sign(data));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  try {
    const p = JSON.parse(Buffer.from(data, "base64url").toString()) as TestPayload & { s: string };
    if (p.s !== stage) return null;
    return { k: p.k, v: p.v, a: p.a, t: p.t };
  } catch {
    return null;
  }
}
