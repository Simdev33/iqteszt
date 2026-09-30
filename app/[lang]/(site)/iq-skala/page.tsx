import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import PercentileCalc from "@/components/scale/PercentileCalc";
import Rich from "@/components/i18n/Rich";
import { Reveal, SplitLines } from "@/components/ui/motion";
import { LOCALES, fmtNum, path } from "@/lib/i18n/config";
import { getDict, langOf } from "@/lib/i18n/server";
import { SCALE_BANDS } from "@/lib/scale";

export async function generateMetadata({ params }: PageProps<"/[lang]/iq-skala">): Promise<Metadata> {
  const lang = await langOf(params);
  const t = getDict(lang);
  return {
    title: t.meta.scaleTitle,
    description: t.meta.scaleDescription,
    alternates: { canonical: path(lang, "scale"), languages: Object.fromEntries(LOCALES.map((l) => [l, path(l, "scale")])) },
  };
}

export default async function ScalePage({ params }: PageProps<"/[lang]/iq-skala">) {
  const lang = await langOf(params);
  const t = getDict(lang);
  const s = t.scalePage;
  return (
    <>
      <PageHeader eyebrow={s.eyebrow} title={s.title.map((l, i) => <Rich key={i} text={l} />)} lead={s.lead} />

      <section className="relative pb-20 sm:pb-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <PercentileCalc />
          </Reveal>
        </div>
      </section>

      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow">{s.bandsEyebrow}</p>
          </Reveal>
          <SplitLines
            className="mt-5 font-display text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.04] font-semibold tracking-[-0.04em]"
            lines={s.bandsTitle.map((l, i) => <span key={i}>{l}</span>)}
          />
          <div className="mt-12 overflow-hidden rounded-[1.75rem] border border-white/[0.07]">
            {[...SCALE_BANDS].reverse().map((b, i) => {
              const share = b.share < 1 ? fmtNum(lang, b.share) : String(Math.round(b.share));
              return (
                <Reveal
                  key={b.id}
                  delay={i * 0.04}
                  className="grid gap-3 border-b border-white/[0.06] bg-white/[0.015] px-5 py-6 last:border-b-0 sm:grid-cols-[9rem_12rem_1fr_6rem] sm:items-center sm:gap-6 sm:px-8"
                >
                  <span className="flex items-center gap-3 font-mono text-lg">
                    <span className="h-3 w-3 rounded-full" style={{ background: b.color }} />
                    {b.range}
                  </span>
                  <span className="font-display text-lg font-semibold tracking-tight">{t.scaleBands[b.id].label}</span>
                  <span className="text-sm leading-relaxed text-mist">{t.scaleBands[b.id].desc}</span>
                  <span className="font-mono text-sm text-haze sm:text-right">~{share}%</span>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 sm:px-8 md:grid-cols-3">
          {s.topics.map((tp, i) => (
            <Reveal key={tp.t} delay={i * 0.08} className="panel rounded-[1.75rem] p-7">
              <span className="font-mono text-xs text-iris">0{i + 1}</span>
              <h2 className="mt-4 font-display text-xl font-semibold tracking-tight">{tp.t}</h2>
              <p className="mt-3 leading-relaxed text-mist">{tp.d}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14 flex justify-center px-5">
          <Link href={path(lang, "test")} className="btn-primary text-base">
            {s.cta}
          </Link>
        </Reveal>
      </section>
    </>
  );
}
