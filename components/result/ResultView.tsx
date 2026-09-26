"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import Gauge from "@/components/charts/Gauge";
import BellCurve from "@/components/charts/BellCurve";
import DomainRadar from "./DomainRadar";
import AnswerReview from "./AnswerReview";
import { Reveal, SplitLines } from "@/components/ui/motion";
import { DOMAINS } from "@/lib/meta";
import { encodeAnswers, encodeVariants } from "@/lib/codec";
import { clearPending, loadPending } from "@/components/test/pending";
import { ageLabel, fmtPct, formatDuration } from "@/lib/norms";
import type { Result } from "@/lib/scoring";

const ease = [0.22, 1, 0.36, 1] as const;

function verdict(pct: number) {
  if (pct >= 0.85) return "Kiemelkedő";
  if (pct >= 0.65) return "Erős";
  if (pct >= 0.4) return "Átlagos";
  return "Fejleszthető";
}

function ShareButton({ iq }: { iq: number }) {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const url = window.location.href;
    const text = `${iq} lett az IQ-becslésem az Elmeszint tesztjén. Neked mennyi?`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Az IQ-eredményem", text, url });
        return;
      } catch {
        /* a felhasználó bezárta – vágólapra másolunk */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {}
  };
  return (
    <button type="button" onClick={share} className="btn-primary">
      <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
        <path d="M8 10V2.5M5 5l3-3 3 3M3 9v4h10V9" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {copied ? "Link másolva!" : "Eredmény megosztása"}
    </button>
  );
}

export default function ResultView({ result }: { result: Result }) {
  // A kifizetett kitöltés már nem „vár” – ha ez az eszköz fizetett érte, töröljük a függő állapotot.
  useEffect(() => {
    const p = loadPending();
    if (p && p.k === encodeVariants(result.variants) && p.v === encodeAnswers(result.perQuestion.map((x) => x.picked))) clearPending();
  }, [result]);

  const { iq, band, percentile } = result;
  const better = fmtPct(percentile);
  const top = fmtPct(100 - percentile);
  const strongest = [...result.domains].sort((a, b) => b.pct - a.pct)[0];

  const stats = [
    { k: `${result.correct}/${result.total}`, v: "helyes válasz" },
    { k: formatDuration(result.seconds), v: "kitöltési idő" },
    { k: `${better}%`, v: "percentilis" },
    { k: result.age ? ageLabel(result.age) : "–", v: "korcsoport" },
  ];

  return (
    <>
      {/* Eredmény-hero */}
      <section className="grain relative isolate overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div aria-hidden className="grid-lines grid-fade absolute inset-0 -z-10" />
        <div aria-hidden className="absolute -top-40 left-1/2 -z-10 h-[640px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(107_85_255/0.32),transparent)]" />

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease }}
            className="glass ring-gradient relative mx-auto w-full max-w-md rounded-[2.2rem] p-6 sm:p-9"
          >
            <div aria-hidden className="absolute inset-x-10 top-10 -z-10 h-40 rounded-full blur-3xl" style={{ background: band.tone, opacity: 0.25 }} />
            <Gauge value={iq} label="IQ-becslés" sub={`Jobb, mint a népesség ${better}%-a`} className="mx-auto max-w-[330px]" delay={0.5} />
            <div className="mt-2 flex justify-center">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2, duration: 0.6, ease }}
                className="chip !px-4 !py-1.5 text-sm"
              >
                <span className="h-2 w-2 rounded-full" style={{ background: band.tone }} />
                {band.label}
              </motion.span>
            </div>
          </motion.div>

          <div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="eyebrow">
              Az eredményed
            </motion.p>
            <h1 className="mt-5 font-display text-[clamp(2.3rem,5.6vw,4.2rem)] leading-[1.02] font-semibold tracking-[-0.045em]">
              {[
                <span key="a">IQ {iq} –</span>,
                <span key="b" className="text-gradient">
                  {band.label.toLowerCase()}.
                </span>,
              ].map((l, i) => (
                <span key={i} className="-mt-[0.2em] -mb-[0.08em] block overflow-hidden pt-[0.2em] pb-[0.08em]">
                  <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, ease, delay: 0.4 + i * 0.12 }}>
                    {l}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.7 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-haze"
            >
              {band.text} {percentile >= 50 ? `Nagyjából a legjobb ${top}%-ba tartozol.` : ""} A legerősebb területed:{" "}
              <span className="text-paper">{strongest.name.toLowerCase()}</span>.
            </motion.p>

            <motion.dl
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.9 } } }}
              className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4"
            >
              {stats.map((s) => (
                <motion.div
                  key={s.v}
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4"
                >
                  <dd className="font-display text-xl font-semibold tracking-tight">{s.k}</dd>
                  <dt className="mt-1 text-xs text-mist">{s.v}</dt>
                </motion.div>
              ))}
            </motion.dl>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-8 flex flex-wrap gap-3">
              <ShareButton iq={iq} />
              <Link href="/teszt" className="btn-ghost">
                Újra kitöltöm
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Haranggörbe */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <Reveal>
                <p className="eyebrow">Hol helyezkedsz el?</p>
              </Reveal>
              <SplitLines
                className="mt-5 font-display text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.04] font-semibold tracking-[-0.04em]"
                lines={[<span key="1">A népesség</span>, <span key="2">eloszlásában.</span>]}
              />
            </div>
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-haze">
                A satírozott terület azt mutatja, a népesség mekkora része ér el nálad alacsonyabb pontszámot: kb. {better}%.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="panel mt-12 rounded-[2rem] p-4 pt-10 sm:p-10 sm:pt-14">
            <BellCurve value={iq} />
          </Reveal>
        </div>
      </section>

      {/* Területek */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow">Területenkénti bontás</p>
          </Reveal>
          <SplitLines
            className="mt-5 font-display text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.04] font-semibold tracking-[-0.04em]"
            lines={[<span key="1">Ebben vagy</span>, <span key="2" className="text-gradient">a legerősebb.</span>]}
          />

          <div className="mt-12 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal className="panel flex items-center justify-center rounded-[2rem] p-8 sm:p-12">
              <div className="w-full max-w-[340px]">
                <DomainRadar domains={result.domains} />
              </div>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {result.domains.map((d, i) => (
                <Reveal key={d.domain} delay={i * 0.07} className="panel relative overflow-hidden rounded-[1.6rem] p-6">
                  <div aria-hidden className="absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-20 blur-2xl" style={{ background: DOMAINS[d.domain].color }} />
                  <div className="relative flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-haze">
                      <span className="h-2 w-2 rounded-full" style={{ background: DOMAINS[d.domain].color }} />
                      {DOMAINS[d.domain].short}
                    </span>
                    <span className="chip !py-0.5 text-xs">{verdict(d.pct)}</span>
                  </div>
                  <p className="relative mt-5 font-display text-4xl font-semibold tracking-tight">
                    {d.correct}
                    <span className="text-xl text-mist">/{d.total}</span>
                  </p>
                  <p className="relative mt-1 text-sm text-mist">{d.name}</p>
                  <div className="relative mt-5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: DOMAINS[d.domain].color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.max(2, d.pct * 100)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.3, delay: 0.3 + i * 0.1, ease }}
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Megoldások */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow">Megoldások</p>
          </Reveal>
          <SplitLines
            className="mt-5 font-display text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.04] font-semibold tracking-[-0.04em]"
            lines={[<span key="1">Minden feladat,</span>, <span key="2">levezetéssel.</span>]}
          />
          <Reveal delay={0.1} className="mt-10">
            <AnswerReview result={result} />
          </Reveal>

          <Reveal className="mt-14 rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6 text-sm leading-relaxed text-mist">
            <strong className="font-medium text-haze">Fontos:</strong> ez egy rövid, online feladatsoron alapuló becslés. Nem helyettesíti a
            pszichológus által felvett, standardizált intelligenciavizsgálatot, és orvosi vagy munkaügyi döntés alapjául nem szolgálhat. A
            számítás részletei a{" "}
            <Link href="/modszertan" className="text-iris-soft underline decoration-iris/40 underline-offset-4 hover:decoration-iris">
              Módszertan
            </Link>{" "}
            oldalon olvashatók.
          </Reveal>
        </div>
      </section>
    </>
  );
}
