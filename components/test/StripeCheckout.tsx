"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { CheckoutElementsProvider, ExpressCheckoutElement, PaymentElement, useCheckoutElements } from "@stripe/react-stripe-js/checkout";
import {
  loadStripe,
  type Appearance,
  type Stripe,
  type StripeConstructorOptions,
  type StripeExpressCheckoutElementConfirmEvent,
} from "@stripe/stripe-js";
import { useI18n } from "@/components/i18n/I18nProvider";
import { fmt, type Locale } from "@/lib/i18n/config";

// A DoneSignIn fizetési felületének mintájára: Checkout Elements, eleve kinyitott kártyaűrlappal.

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";
export const stripeConfigured = () => Boolean(PUBLISHABLE_KEY);

const stripes = new Map<Locale, Promise<Stripe | null>>();
function stripeFor(lang: Locale) {
  let promise = stripes.get(lang);
  if (!promise) {
    // developerTools: teszt-kulcsoknál a Stripe.js a „stripe >” segédjelvényt az oldal sarkába tenné.
    promise = loadStripe(PUBLISHABLE_KEY, { locale: lang as StripeConstructorOptions["locale"], developerTools: { assistant: { enabled: false } } });
    stripes.set(lang, promise);
  }
  return promise;
}

/** A Stripe iframe-jei nem látják a CSS-változóinkat, ezért a sötét arculat színeit átadjuk. */
function appearance(): Appearance {
  const css = getComputedStyle(document.documentElement);
  const token = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback;
  return {
    theme: "night",
    variables: {
      colorPrimary: token("--color-iris", "#8b7bff"),
      colorBackground: token("--color-ink-850", "#1f2544"),
      colorText: token("--color-paper", "#eef0ff"),
      colorTextSecondary: token("--color-mist", "#9ba2c8"),
      colorDanger: token("--color-flame", "#ff7d4d"),
      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
      borderRadius: "12px",
    },
    rules: {
      ".Input": { border: "1px solid rgb(255 255 255 / 0.12)", boxShadow: "none" },
      ".Tab": { border: "1px solid rgb(255 255 255 / 0.12)" },
    },
  };
}

export type CheckoutPrices = { today: string; monthly: string | null };

/** Elég a formai ellenőrzés – a szerver és a Stripe úgyis újra megnézi. */
export const looksLikeEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

type Props = {
  consent: boolean;
  onConsentMissing: () => void;
  /** A szülő e-mail-mezőjéből; a kártyás fizetés ezzel megy. */
  email: string;
  onEmailMissing: () => void;
  /** Fizetés előtt: false, ha ezzel a címmel nem kell fizetni (már előfizető), vagy hiba volt. */
  checkEmail: (email: string) => Promise<boolean>;
  onPaid: (sessionId: string) => void;
  /** Az ár sora, az e-mail-mező és a nyilatkozat – a Stripe által számolt összegekkel. */
  renderHeader: (prices: CheckoutPrices) => ReactNode;
};

/**
 * Egy Checkout Session fizetési módjai: expressz gombok (Apple Pay, Google Pay, Link) és az eleve
 * kinyitott kártyaűrlap. A nyilatkozat elfogadása nélkül egyik sem használható.
 */
export default function StripeCheckout({ clientSecret, ...props }: Props & { clientSecret: string }) {
  const { lang } = useI18n();
  const stripe = useMemo(() => stripeFor(lang), [lang]);
  const options = useMemo(() => ({ clientSecret, elementsOptions: { appearance: appearance() } }), [clientSecret]);
  return (
    <CheckoutElementsProvider stripe={stripe} options={options}>
      <PaymentMethods {...props} />
    </CheckoutElementsProvider>
  );
}

function Spinner() {
  return <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />;
}

function PaymentMethods({ consent, onConsentMissing, email, onEmailMissing, checkEmail, onPaid, renderHeader }: Props) {
  const state = useCheckoutElements();
  const { lang, t } = useI18n();
  const s = t.paywall;
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // A beírt címet a Stripe is megkapja, így a Link-mentés mezője kitöltve jelenik meg.
  const checkout = state.type === "success" ? state.checkout : null;
  useEffect(() => {
    const address = email.trim();
    if (!checkout || !looksLikeEmail(address)) return;
    const timer = setTimeout(() => {
      void checkout.updateEmail(address).then((r) => r.type === "error" && console.warn("[checkout] updateEmail:", r.error.message));
    }, 700);
    return () => clearTimeout(timer);
  }, [checkout, email]);

  if (state.type === "loading") {
    return (
      <p className="flex items-center gap-2 py-6 text-sm text-mist">
        <Spinner /> {s.loading}
      </p>
    );
  }
  if (state.type === "error" || !checkout) {
    return <p className="rounded-xl border border-flame/40 bg-flame/10 px-3 py-2 text-sm text-paper">{state.type === "error" ? state.error.message : s.unknownError}</p>;
  }

  // Az összegeket a Stripe számolja; a megjelenítést az oldal többi részével egyformán formázzuk.
  const money = (minor: number) => {
    const n = (minor / checkout.minorUnitsAmountDivisor).toFixed(2);
    return lang === "en" ? `€${n}` : `${n.replace(".", ",")} €`;
  };
  const prices: CheckoutPrices = {
    today: money(checkout.total.total.minorUnitsAmount),
    monthly: checkout.recurring ? money(checkout.recurring.dueNext.total.minorUnitsAmount) : null,
  };

  const finish = async (confirmation: Parameters<typeof checkout.confirm>[0]) => {
    const result = await checkout.confirm({ redirect: "if_required", ...confirmation });
    if (result.type === "error") {
      setError(result.error.message);
      setBusy(false);
      return;
    }
    onPaid(result.session.id);
  };

  const payByCard = async () => {
    if (!consent) return onConsentMissing();
    const address = email.trim();
    if (!looksLikeEmail(address)) return onEmailMissing();
    setBusy(true);
    setError(null);
    if (!(await checkEmail(address))) return setBusy(false);
    await finish({ email: address });
  };

  const payExpress = async (event: StripeExpressCheckoutElementConfirmEvent) => {
    // Az expressz fizetésnél a címet a pénztárca adja.
    const address = event.billingDetails?.email ?? email.trim();
    setBusy(true);
    setError(null);
    if (looksLikeEmail(address) && !(await checkEmail(address))) {
      event.paymentFailed({ reason: "fail" });
      return setBusy(false);
    }
    await finish({ expressCheckoutConfirmEvent: event });
  };

  return (
    <div className="space-y-3">
      {renderHeader(prices)}

      <div className="relative">
        {/* Az expressz gombokat nem lehet feltartóztatni, ezért a nyilatkozat elfogadásáig le vannak tiltva. */}
        <div className={`space-y-3 transition-opacity ${consent ? "" : "pointer-events-none opacity-45"}`} aria-disabled={!consent}>
          <ExpressCheckoutElement
            options={{
              buttonHeight: 48,
              buttonTheme: undefined,
              paymentMethods: undefined,
              buttonType: { applePay: "plain", googlePay: "plain" },
              layout: { maxColumns: 1, maxRows: 4, overflow: "never" },
              paymentMethodOrder: ["apple_pay", "google_pay", "link"],
            }}
            onConfirm={(event) => void payExpress(event)}
          />
          <div className="space-y-3 rounded-2xl border border-white/[0.08] bg-ink-850 p-4">
            <PaymentElement options={{ layout: "tabs" }} />
            <button type="button" className="btn-primary h-12 w-full !py-0 text-[0.95rem]" disabled={busy} onClick={() => void payByCard()}>
              {busy ? (
                <Spinner />
              ) : (
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                  <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              )}
              {fmt(s.pay, { amount: prices.today })}
            </button>
          </div>
        </div>
        {!consent && <button type="button" aria-label={s.consentNeeded} className="absolute inset-0 cursor-not-allowed" onClick={onConsentMissing} />}
      </div>

      {busy && !error && (
        <p className="flex items-center gap-2 text-sm text-mist">
          <Spinner /> {s.processing}
        </p>
      )}
      {error && <p className="rounded-xl border border-flame/40 bg-flame/10 px-3 py-2 text-sm text-paper">{error}</p>}
    </div>
  );
}
