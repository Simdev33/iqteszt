"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Rich from "@/components/i18n/Rich";
import { useI18n } from "@/components/i18n/I18nProvider";
import { fmt, path } from "@/lib/i18n/config";
import { DOMAINS, DOMAIN_KEYS, TOTAL } from "@/lib/meta";
import { formatDuration } from "@/lib/norms";
import type { Pending } from "./pending";
import StripeCheckout, { stripeConfigured, type CheckoutPrices } from "./StripeCheckout";
import LoginForm, { requestLoginCode } from "@/components/account/LoginForm";

const ease = [0.22, 1, 0.36, 1] as const;

/** Zárolt, elmosott mérőóra – valódi érték nélkül, csak jelzi, hogy az eredmény kész. */
function LockedGauge() {
  return (
    <div className="relative mx-auto aspect-[320/250] w-full max-w-[300px]">
      <svg viewBox="-10 -10 320 250" className="absolute inset-0 h-full w-full blur-[6px]" aria-hidden>
        <defs>
          <linearGradient id="lock-g" x1="0" x2="1">
            <stop offset="0" stopColor="#ff7d4d" />
            <stop offset="0.4" stopColor="#ffcf5c" />
            <stop offset="0.7" stopColor="#8b7bff" />
            <stop offset="1" stopColor="#45e3c4" />
          </linearGradient>
        </defs>
        <path d="M 47.81 209 A 118 118 0 1 1 252.19 209" fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="16" strokeLinecap="round" />
        <path d="M 47.81 209 A 118 118 0 0 1 250 91" fill="none" stroke="url(#lock-g)" strokeWidth="16" strokeLinecap="round" />
        <text x="150" y="170" textAnchor="middle" className="fill-paper font-display text-[84px] font-semibold">
          ???
        </text>
      </svg>
      <div className="absolute inset-0 grid place-items-center pt-6">
        <span className="grid h-16 w-16 place-items-center rounded-2xl border border-white/15 bg-ink-900/70 shadow-[0_10px_40px_-10px_rgb(0_0_0/0.8)] backdrop-blur">
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-iris-soft" aria-hidden>
            <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
            <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </span>
      </div>
    </div>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" className="mt-1 h-4 w-4 shrink-0 text-aqua" aria-hidden>
      <path d="m3.5 8.5 3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const TRUST_ICONS = [
  <svg key="0" viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
    <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" strokeWidth="1.8" />
  </svg>,
  <svg key="1" viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
    <path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>,
  <svg key="2" viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
    <path d="m3.5 8.5 3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
];

export default function Paywall({
  pending,
  cancelled,
  onRestart,
}: {
  pending: Pending;
  cancelled: boolean;
  onRestart: () => void;
}) {
  const { lang, t, prices } = useI18n();
  const s = t.paywall;
  const [consent, setConsent] = useState(false);
  const [consentWarning, setConsentWarning] = useState(false);
  const [email, setEmail] = useState("");
  const [emailWarning, setEmailWarning] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  /** Fizetés helyett belépés (előfizetőnek); a megjegyzés a „már előfizető” esetet magyarázza. */
  const [login, setLogin] = useState<{ email: string; codeSent: boolean; note: boolean } | null>(null);
  const [member, setMember] = useState(false);
  /** A Stripe Checkout munkamenet titka (a fizetési űrlaphoz), vagy fejlesztői módban a szimulált fizetés címe. */
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [demoUrl, setDemoUrl] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const requested = useRef(false);

  const request = async (plan: "sub" | "member") => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ k: pending.k, v: pending.v, a: pending.a, t: pending.t, lang, plan }),
    });
    const json = (await res.json()) as { url?: string; clientSecret?: string; error?: string };
    if (!res.ok || (!json.url && !json.clientSecret)) throw new Error(json.error ?? s.unknownError);
    return json;
  };

  // Aktív előfizetőnek nem kell újra fizetnie (a szerver a sütije alapján dönt). Mindenki másnak a fizetés
  // rögtön látszik: a Checkout Session a képernyővel együtt jön létre (StrictMode alatt is csak egyszer).
  useEffect(() => {
    if (requested.current) return;
    requested.current = true;
    (async () => {
      const active = await fetch("/api/subscription", { cache: "no-store" })
        .then((r) => r.json() as Promise<{ active?: boolean }>)
        .then((j) => !!j.active)
        .catch(() => false);
      if (active) return setMember(true);
      try {
        const json = await request("sub");
        if (json.clientSecret) setClientSecret(json.clientSecret);
        else if (json.url) setDemoUrl(json.url);
      } catch (e) {
        setError(e instanceof Error ? e.message : s.unknownError);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkEmail = async (address: string) => {
    setError(null);
    try {
      const res = await fetch("/api/checkout/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: address, lang }),
      });
      if (res.ok) return true;
      const json = (await res.json().catch(() => ({}))) as { code?: string; error?: string };
      if (json.code === "alreadySubscribed") {
        // Ezzel a címmel már fizet: második előfizetés helyett belépési kódot küldünk, és belép.
        const sent = await requestLoginCode(address, lang).then(() => true, () => false);
        setLogin({ email: address, codeSent: sent, note: true });
      }
      else if (json.code === "invalidEmail") setEmailWarning(true);
      else setError(json.error ?? s.unknownError);
      return false;
    } catch {
      // Hálózati hiba esetén nem tartjuk fel a fizetést – a Stripe úgyis ellenőriz.
      return true;
    }
  };

  const emailMissing = () => {
    setEmailWarning(true);
    emailRef.current?.focus();
  };

  /** Sikeres fizetés: a visszatérési útvonal beállítja az előfizetői sütit, és a köszönőoldalra (/thank-you) irányít. */
  const paid = (sessionId: string) => {
    // Teljes oldalbetöltés kell: az API-útvonal sütit állít, majd átirányít.
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.location.assign(`/api/stripe/return?lang=${lang}&session_id=${encodeURIComponent(sessionId)}`);
  };

  const payDemo = () => {
    if (!consent) return setConsentWarning(true);
    if (demoUrl) window.location.assign(demoUrl);
  };

  const openAsMember = async () => {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const json = await request("member");
      if (json.url) window.location.assign(json.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : s.unknownError);
      setBusy(false);
    }
  };

  const seconds = Number(pending.t) || 0;
  const links = { terms: path(lang, "terms"), privacy: path(lang, "privacy"), subscription: path(lang, "subscription") };

  const priceRow = (today: string) => (
    <div className="flex items-center justify-between gap-4 border-y border-white/[0.08] py-5">
      <span className="font-semibold">{s.accessName}</span>
      <span className="font-display text-3xl font-semibold tracking-tight whitespace-nowrap">{today}</span>
    </div>
  );

  /** Az ár sora, az e-mail-mező, a nyilatkozat és a „Fizetési mód” felirat – az űrlap fölött. */
  const header = (p: CheckoutPrices, withEmail = true) => (
    <>
      {priceRow(p.today)}
      {withEmail && (
        <label className="block space-y-1.5 pt-3">
          <span className="text-[0.8rem] font-medium text-haze">{s.email}</span>
          <input
            ref={emailRef}
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder={s.emailPlaceholder}
            value={email}
            aria-invalid={emailWarning}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailWarning(false);
            }}
            className={`h-12 w-full rounded-xl border bg-ink-850 px-4 text-[0.95rem] text-paper placeholder:text-mist/60 focus:border-iris/70 focus:outline-none ${
              emailWarning ? "border-flame/60" : "border-white/[0.12]"
            }`}
          />
          <span className={`block text-xs ${emailWarning ? "text-flame" : "text-mist"}`}>{emailWarning ? s.invalidEmail : s.emailHint}</span>
        </label>
      )}
      <label
        className={`mt-1 flex cursor-pointer gap-3 rounded-2xl border p-4 text-sm leading-snug text-haze ${
          consentWarning && !consent ? "border-flame/50 bg-flame/[0.06]" : "border-white/[0.08] bg-white/[0.03]"
        }`}
      >
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => {
            setConsent(e.target.checked);
            setConsentWarning(false);
          }}
          className="mt-0.5 h-4.5 w-4.5 shrink-0 cursor-pointer accent-[var(--color-iris)]"
        />
        <span>
          <Rich text={s.consent} links={links} />
        </span>
      </label>
      {consentWarning && !consent && <p className="text-sm text-flame">{s.consentNeeded}</p>}
      <p className="pt-2 font-mono text-[0.7rem] tracking-[0.18em] text-mist uppercase">{s.methodLabel}</p>
    </>
  );

  return (
    <div className="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
      {/* Elmosott előnézet */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease }}
        className="glass ring-gradient relative overflow-hidden rounded-[2rem] p-5 sm:p-8 lg:sticky lg:top-24"
      >
        <div aria-hidden className="absolute inset-x-10 top-6 -z-10 h-40 rounded-full bg-iris/30 blur-3xl" />
        <p className="eyebrow">{s.preview}</p>
        <LockedGauge />
        <div className="mt-2 hidden space-y-3.5 sm:block" aria-hidden>
          {DOMAIN_KEYS.map((d) => (
            <div key={d}>
              <div className="flex justify-between text-sm">
                <span className="text-haze">{t.domains[d].name}</span>
                <span className="font-mono text-mist blur-[4px] select-none">00%</span>
              </div>
              {/* Helyőrző sáv – szándékosan erősen elmosva, nem valódi adat */}
              <div className="mt-1.5 h-2 rounded-full opacity-70 blur-[6px]" style={{ background: `linear-gradient(90deg, ${DOMAINS[d].color}, transparent)` }} />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Ajánlat */}
      <div>
        <AnimatePresence>
          {cancelled && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 rounded-2xl border border-sun/30 bg-sun/10 px-4 py-3 text-sm text-paper"
            >
              {s.cancelled}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="eyebrow">
          {s.eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="mt-5 font-display text-[clamp(2.1rem,5vw,3.4rem)] leading-[1.04] font-semibold tracking-[-0.04em]"
        >
          <Rich text={s.title} />
        </motion.h1>
        <p className="mt-4 text-lg text-haze">
          {fmt(s.summary, {
            a: pending.answered,
            total: TOTAL,
            time: seconds > 0 ? fmt(s.summaryTime, { t: formatDuration(seconds) }) : "",
          })}
        </p>

        <p className="mt-7 text-sm font-semibold">{s.includes}</p>
        <ul className="mt-3 space-y-2">
          {s.perks.map((p, i) => (
            <motion.li
              key={p.t}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.06, duration: 0.5, ease }}
              className="flex gap-2.5 text-[0.95rem]"
            >
              <Check />
              <span>
                <span className="font-medium">{fmt(p.t, { total: TOTAL })}</span>
                <span className="text-mist"> – {p.d}</span>
              </span>
            </motion.li>
          ))}
        </ul>

        {member ? (
          <div className="panel mt-8 rounded-3xl border border-aqua/30 p-5 sm:p-6">
            <p className="flex items-center gap-2 font-display text-xl font-semibold tracking-tight">
              <span className="h-2.5 w-2.5 rounded-full bg-aqua" aria-hidden />
              {s.member.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-haze">{s.member.text}</p>
            <button type="button" onClick={openAsMember} disabled={busy} className="btn-primary mt-5 w-full text-base">
              {busy ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden /> : s.member.cta}
            </button>
            {error && <p className="mt-3 rounded-xl border border-flame/40 bg-flame/10 px-3 py-2 text-sm text-paper">{error}</p>}
            <Link href={links.subscription} className="mt-4 block text-center text-sm text-mist underline decoration-white/20 underline-offset-4 hover:text-paper">
              {s.member.manage}
            </Link>
          </div>
        ) : (
          <div className="mt-6">
            {login && (
              <div className="space-y-4">
                {priceRow(prices.trial)}
                {login.note && (
                  <p className="rounded-2xl border border-aqua/30 bg-aqua/[0.08] p-4 text-sm leading-relaxed text-paper">{t.auth.alreadyNote}</p>
                )}
                <LoginForm initialEmail={login.email} codeSent={login.codeSent} onSuccess={() => void openAsMember()} />
                <button type="button" className="text-sm text-iris-soft hover:underline" onClick={() => setLogin(null)}>
                  {t.auth.backToPay}
                </button>
              </div>
            )}

            {/* Belépés közben is csatolva marad, hogy a „Vissza a fizetéshez” ugyanazt a fizetést mutassa. */}
            <div hidden={!!login}>
            {clientSecret && stripeConfigured() ? (
              <StripeCheckout
                clientSecret={clientSecret}
                consent={consent}
                onConsentMissing={() => setConsentWarning(true)}
                email={email}
                onEmailMissing={emailMissing}
                checkEmail={checkEmail}
                onPaid={paid}
                renderHeader={header}
              />
            ) : demoUrl ? (
              <>
                {header({ today: prices.trial, monthly: prices.monthly }, false)}
                <button type="button" onClick={payDemo} className="btn-primary mt-3 w-full text-base">
                  {fmt(s.pay, { amount: prices.trial })}
                </button>
              </>
            ) : (
              <>
                {priceRow(prices.trial)}
                {!error && (
                  <p className="flex items-center gap-2 py-6 text-sm text-mist">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
                    {s.loading}
                  </p>
                )}
              </>
            )}
            {stripeConfigured() && (
              <p className="mt-4 text-center text-sm text-mist">
                {t.auth.haveAccount}{" "}
                <button type="button" className="font-medium text-iris-soft hover:underline" onClick={() => setLogin({ email: email.trim(), codeSent: false, note: false })}>
                  {t.auth.login}
                </button>
              </p>
            )}
            </div>
            {error && <p className="mt-3 rounded-xl border border-flame/40 bg-flame/10 px-3 py-2 text-sm text-paper">{error}</p>}

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-white/[0.08] pt-5 text-xs text-mist">
              {s.trust.map((x, i) => (
                <span key={x} className="flex items-center gap-1.5">
                  {TRUST_ICONS[i]}
                  {x}
                </span>
              ))}
            </div>

            <p className="mt-5 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 text-[0.8rem] leading-relaxed text-haze">
              <Rich text={fmt(s.renewal, prices)} links={links} />
            </p>
          </div>
        )}

        <button type="button" onClick={onRestart} className="mt-5 text-sm text-mist underline decoration-white/20 underline-offset-4 hover:text-paper">
          {s.restart}
        </button>
      </div>
    </div>
  );
}
