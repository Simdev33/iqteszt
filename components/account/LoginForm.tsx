"use client";

import { useState, type FormEvent } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";
import { fmt } from "@/lib/i18n/config";

export const fieldClass =
  "h-12 w-full rounded-xl border border-white/[0.12] bg-ink-850 px-4 text-[0.95rem] text-paper placeholder:text-mist/60 focus:border-iris/70 focus:outline-none";

const Spinner = () => <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />;

async function post(url: string, body: object) {
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const json = (await res.json().catch(() => ({}))) as { error?: string };
  if (!res.ok) throw new Error(json.error ?? "Error");
  return json;
}

/** Kódkérés (a fizetési képernyő is hívja, ha a cím már előfizetőé). */
export const requestLoginCode = (email: string, lang: string) => post("/api/auth/request", { email, lang });

/**
 * Jelszó nélküli belépés: e-mail → 6 jegyű kód. `codeSent` esetén rögtön a kódlépéssel indul
 * (a hívó már kért kódot, pl. a fizetésnél).
 */
export default function LoginForm({
  initialEmail = "",
  codeSent = false,
  onSuccess,
  showIntro = true,
  className = "",
}: {
  initialEmail?: string;
  codeSent?: boolean;
  onSuccess: () => void;
  /** Az e-mail-lépés rövid magyarázata (elhagyható, ha a hívó saját szöveget mutat). */
  showIntro?: boolean;
  className?: string;
}) {
  const { lang, t } = useI18n();
  const s = t.auth;
  const [step, setStep] = useState<"email" | "code">(codeSent ? "code" : "email");
  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async (action: () => Promise<void>) => {
    setBusy(true);
    setError(null);
    try {
      await action();
    } catch (e) {
      setError(e instanceof Error ? e.message : s.errors.unavailable);
    } finally {
      setBusy(false);
    }
  };

  const send = (e?: FormEvent) => {
    e?.preventDefault();
    void run(async () => {
      await requestLoginCode(email.trim(), lang);
      setCode("");
      setStep("code");
    });
  };

  const verify = (e: FormEvent) => {
    e.preventDefault();
    void run(async () => {
      await post("/api/auth/verify", { code, lang });
      onSuccess();
    });
  };

  if (step === "email") {
    return (
      <form onSubmit={send} className={`space-y-3 ${className}`}>
        {showIntro && <p className="text-sm leading-relaxed text-haze">{s.intro}</p>}
        <label className="block space-y-1.5">
          <span className="text-[0.8rem] font-medium text-haze">{s.email}</span>
          <input type="email" required autoComplete="email" inputMode="email" value={email} onChange={(e) => setEmail(e.target.value)} className={fieldClass} />
        </label>
        {error && <p className="rounded-xl border border-flame/40 bg-flame/10 px-3 py-2 text-sm text-paper">{error}</p>}
        <button type="submit" className="btn-primary h-12 w-full !py-0 text-[0.95rem]" disabled={busy || !email.trim()}>
          {busy ? (
            <Spinner />
          ) : (
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
              <rect x="3" y="5.5" width="18" height="13" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="m4 7.5 8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
          )}
          {s.sendCode}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={verify} className={`space-y-3 ${className}`}>
      <p className="text-sm leading-relaxed text-haze">{fmt(s.sent, { email: email.trim() })}</p>
      <label className="block space-y-1.5">
        <span className="text-[0.8rem] font-medium text-haze">{s.code}</span>
        <input
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="[0-9 ]*"
          maxLength={7}
          autoFocus
          required
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/[^\d ]/g, ""))}
          className={`${fieldClass} text-center font-mono text-xl tracking-[0.4em]`}
        />
      </label>
      {error && <p className="rounded-xl border border-flame/40 bg-flame/10 px-3 py-2 text-sm text-paper">{error}</p>}
      <button type="submit" className="btn-primary h-12 w-full !py-0 text-[0.95rem]" disabled={busy || code.replace(/\D/g, "").length !== 6}>
        {busy ? (
          <Spinner />
        ) : (
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
            <circle cx="8" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="M11.5 12H20m-3 0v3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        )}
        {s.verify}
      </button>
      <div className="flex flex-wrap justify-between gap-2 text-sm">
        <button type="button" className="text-iris-soft hover:underline disabled:opacity-50" onClick={() => send()} disabled={busy}>
          {s.resend}
        </button>
        <button type="button" className="text-mist hover:text-paper" onClick={() => setStep("email")} disabled={busy}>
          {s.otherEmail}
        </button>
      </div>
    </form>
  );
}
