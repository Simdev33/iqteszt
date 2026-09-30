import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Rich from "@/components/i18n/Rich";
import { Reveal } from "@/components/ui/motion";
import { LOCALES, fmt, fmtNum, path } from "@/lib/i18n/config";
import { getDict, langOf } from "@/lib/i18n/server";
import { DIFF_KEY, DIFFICULTY_COUNTS, DOMAINS, DOMAIN_COUNTS, DOMAIN_KEYS, DOMAIN_POOL_COUNTS, POOL_SIZE, TOTAL, VARIANTS_PER_SLOT } from "@/lib/meta";
import { AGE_GROUPS, IQ_MAX, IQ_MIN, NORM, WEIGHT } from "@/lib/norms";
import { prices } from "@/lib/pricing";

export async function generateMetadata({ params }: PageProps<"/[lang]/modszertan">): Promise<Metadata> {
  const lang = await langOf(params);
  const t = getDict(lang);
  return {
    title: t.meta.methodTitle,
    description: t.meta.methodDescription,
    alternates: { canonical: path(lang, "method"), languages: Object.fromEntries(LOCALES.map((l) => [l, path(l, "method")])) },
  };
}

function Block({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal className="grid gap-6 border-t border-white/[0.07] py-12 md:grid-cols-[14rem_1fr] md:gap-12 md:py-16">
      <div>
        <span className="font-mono text-xs text-iris">{n}</span>
        <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight">{title}</h2>
      </div>
      <div className="min-w-0 space-y-5 text-[1.02rem] leading-relaxed text-haze">{children}</div>
    </Reveal>
  );
}

export default async function MethodPage({ params }: PageProps<"/[lang]/modszertan">) {
  const lang = await langOf(params);
  const t = getDict(lang);
  const s = t.methodPage;
  const num = (x: number) => fmtNum(lang, x, 2);
  const norm = { mean: num(NORM.mean), sd: num(NORM.sd), min: IQ_MIN, max: IQ_MAX };
  return (
    <>
      <PageHeader eyebrow={s.eyebrow} title={s.title.map((l, i) => <Rich key={i} text={l} />)} lead={s.lead} />

      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <Block n="01" title={s.tasks.title}>
            <p>{fmt(s.tasks.p1, { pool: POOL_SIZE, total: TOTAL, variants: VARIANTS_PER_SLOT })}</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {DOMAIN_KEYS.map((d) => (
                <div key={d} className="flex items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-3.5">
                  <span className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full" style={{ background: DOMAINS[d].color }} />
                    {t.domains[d].name}
                  </span>
                  <span className="font-mono text-sm text-mist">
                    {DOMAIN_COUNTS[d]} / {DOMAIN_POOL_COUNTS[d]}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-sm text-mist">{s.tasks.pairNote}</p>
            <p>{fmt(s.tasks.p2, { easy: DIFFICULTY_COUNTS[1], medium: DIFFICULTY_COUNTS[2], hard: DIFFICULTY_COUNTS[3] })}</p>
            <p>{s.tasks.p3}</p>
          </Block>

          <Block n="02" title={s.scoring.title}>
            <p>{s.scoring.p1}</p>
            <div className="flex flex-wrap gap-2">
              {([1, 2, 3] as const).map((d) => (
                <span key={d} className="chip">
                  {fmt(s.scoring.points, { d: t.difficulty[DIFF_KEY[d]], w: num(WEIGHT[d]) })}
                </span>
              ))}
            </div>
            <p>{s.scoring.p2}</p>
            <pre className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-ink-950 p-5 font-mono text-sm leading-7 text-paper">
              {fmt(s.scoring.formula, norm)}
            </pre>
            <p>{fmt(s.scoring.p3, norm)}</p>
          </Block>

          <Block n="03" title={s.age.title}>
            <p>{s.age.p1}</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {AGE_GROUPS.map((a) => (
                <div key={a.id} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-3">
                  <p className="text-sm">{a.label ?? t.ages.u16}</p>
                  <p className="mt-1 font-mono text-sm text-mist">{a.shift === 0 ? "±0" : num(a.shift)}</p>
                </div>
              ))}
            </div>
          </Block>

          <Block n="04" title={s.limits.title}>
            <ul className="space-y-3">
              {s.limits.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-flame" />
                  {item}
                </li>
              ))}
            </ul>
          </Block>

          <Block n="05" title={s.payment.title}>
            <p>{fmt(s.payment.p1, prices(lang))}</p>
            <p>{s.payment.p2}</p>
            <Link href={path(lang, "test")} className="btn-primary">
              {s.payment.cta}
            </Link>
          </Block>
        </div>
      </section>
    </>
  );
}
