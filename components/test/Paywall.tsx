"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { DOMAINS, PRICE_LABEL, TOTAL, type Domain } from "@/lib/meta";
import { formatDuration } from "@/lib/norms";
import type { Pending } from "./pending";

const ease = [0.22, 1, 0.36, 1] as const;

const PERKS = [
  { t: "IQ-becslés és percentilis", d: "Pontosan hol állsz a népességhez képest." },
  { t: "Területenkénti bontás", d: "Mintázat, számok, szavak, logika – melyik az erősséged." },
  { t: `Mind a ${TOTAL} feladat megoldása`, d: "A helyes válaszok levezetéssel, a saját válaszaid mellett." },
  { t: "Megosztható eredménylink", d: "Elküldheted bárkinek, bármikor újra megnyithatod." },
];

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

export default function Paywall({
  pending,
  cancelled,
  onRestart,
}: {
  pending: Pending;
  cancelled: boolean;
  onRestart: () => void;
}) {
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pay = async () => {
    if (!consent || busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ k: pending.k, v: pending.v, a: pending.a, t: pending.t }),
      });
      const json = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !json.url) throw new Error(json.error ?? "Ismeretlen hiba.");
      window.location.assign(json.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ismeretlen hiba.");
      setBusy(false);
    }
  };

  const seconds = Number(pending.t) || 0;

  return (
    <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
      {/* Elmosott előnézet */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease }}
        className="glass ring-gradient relative overflow-hidden rounded-[2rem] p-5 sm:p-8"
      >
        <div aria-hidden className="absolute inset-x-10 top-6 -z-10 h-40 rounded-full bg-iris/30 blur-3xl" />
        <p className="eyebrow">Az eredményed</p>
        <LockedGauge />
        <div className="mt-2 hidden space-y-3.5 sm:block" aria-hidden>
          {(Object.keys(DOMAINS) as Domain[]).map((d) => (
            <div key={d}>
              <div className="flex justify-between text-sm">
                <span className="text-haze">{DOMAINS[d].name}</span>
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
              A fizetés megszakadt – nem terheltünk semmit. Bármikor újrapróbálhatod.
            </motion.p>
          )}
        </AnimatePresence>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="eyebrow">
          Kész a kiértékelés
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="mt-5 font-display text-[clamp(2.1rem,5vw,3.4rem)] leading-[1.04] font-semibold tracking-[-0.04em]"
        >
          Az eredményed <span className="text-gradient">elkészült.</span>
        </motion.h1>
        <p className="mt-4 text-lg text-haze">
          {pending.answered} / {TOTAL} kérdésre válaszoltál{seconds > 0 ? `, ${formatDuration(seconds)} alatt` : ""}. Oldd fel, és nézd meg,
          hol állsz.
        </p>

        <ul className="mt-7 space-y-2.5">
          {PERKS.map((p, i) => (
            <motion.li
              key={p.t}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.06, duration: 0.5, ease }}
              className="flex gap-3"
            >
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-iris/15 text-iris-soft">
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
                  <path d="m3.5 8.5 3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>
                <span className="font-medium">{p.t}</span>
                <span className="text-mist"> – {p.d}</span>
              </span>
            </motion.li>
          ))}
        </ul>

        <div className="panel mt-8 rounded-3xl p-5 sm:p-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-display text-4xl font-semibold tracking-tight">{PRICE_LABEL}</p>
              <p className="mt-1 text-sm text-mist">egyszeri díj · nincs előfizetés, nincs ismétlődő terhelés</p>
            </div>
          </div>

          <label className="mt-5 flex cursor-pointer gap-3 text-sm leading-snug text-haze">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-[var(--color-iris)]"
            />
            <span>
              Kérem az eredmény azonnali megjelenítését, és tudomásul veszem, hogy a fizetés után – mivel a digitális tartalmat azonnal
              megkapom – a 14 napos elállási jogomat elveszítem.
            </span>
          </label>

          <button type="button" onClick={pay} disabled={!consent || busy} className="btn-primary mt-5 w-full text-base">
            {busy ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
                Átirányítás a fizetéshez…
              </>
            ) : (
              <>
                Eredmény feloldása – {PRICE_LABEL}
                <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
                  <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            )}
          </button>
          {!consent && <p className="mt-2 text-center text-xs text-mist">A folytatáshoz fogadd el a fenti nyilatkozatot.</p>}
          {error && <p className="mt-3 rounded-xl border border-flame/40 bg-flame/10 px-3 py-2 text-sm text-paper">{error}</p>}

          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-white/[0.06] pt-4 text-xs text-mist">
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
                <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" strokeWidth="1.8" />
              </svg>
              Biztonságos fizetés a Stripe-on keresztül
            </span>
            <span className="flex flex-wrap gap-1.5">
              {["Bankkártya", "Apple Pay", "Google Pay"].map((m) => (
                <span key={m} className="rounded-md border border-white/10 px-1.5 py-0.5 font-mono text-[0.65rem] text-haze">
                  {m}
                </span>
              ))}
            </span>
          </div>
        </div>

        <button type="button" onClick={onRestart} className="mt-5 text-sm text-mist underline decoration-white/20 underline-offset-4 hover:text-paper">
          Inkább új tesztet kezdek
        </button>
      </div>
    </div>
  );
}
