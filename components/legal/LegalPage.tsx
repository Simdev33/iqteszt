import type { ReactNode } from "react";
import PageHeader from "@/components/ui/PageHeader";
import Rich from "@/components/i18n/Rich";
import { LOCALE_TAGS, fmt, path, type Locale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/server";
import { LEGAL_UPDATED } from "@/lib/i18n/legal";
import type { LegalDoc } from "@/lib/i18n/legal/types";

/** Jogi dokumentum (ÁSZF, adatkezelési tájékoztató): tartalomjegyzék + fejezetek; a „- ” bekezdésekből lista lesz. */
export default function LegalPage({ lang, doc, eyebrow }: { lang: Locale; doc: LegalDoc; eyebrow: string }) {
  const t = getDict(lang);
  const links = { terms: path(lang, "terms"), privacy: path(lang, "privacy"), subscription: path(lang, "subscription") };
  const updated = new Intl.DateTimeFormat(LOCALE_TAGS[lang], { year: "numeric", month: "long", day: "numeric" }).format(new Date(`${LEGAL_UPDATED}T12:00:00Z`));

  const body = (paras: string[]) => {
    const out: ReactNode[] = [];
    let list: string[] = [];
    const flush = () => {
      if (!list.length) return;
      out.push(
        <ul key={`l${out.length}`} className="space-y-2">
          {list.map((x) => (
            <li key={x} className="flex gap-3">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-iris" />
              <span>
                <Rich text={x} links={links} em="font-medium text-paper" />
              </span>
            </li>
          ))}
        </ul>,
      );
      list = [];
    };
    for (const p of paras) {
      if (p.startsWith("- ")) list.push(p.slice(2));
      else {
        flush();
        out.push(
          <p key={`p${out.length}`}>
            <Rich text={p} links={links} em="font-medium text-paper" />
          </p>,
        );
      }
    }
    flush();
    return out;
  };

  return (
    <>
      <PageHeader eyebrow={eyebrow} title={[<span key="t">{doc.title}</span>]} lead={doc.lead} />
      <section className="pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[15rem_1fr] lg:gap-14">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-xs text-mist">{fmt(t.legal.updated, { date: updated })}</p>
            <nav aria-label={t.legal.toc} className="mt-5 hidden lg:block">
              <p className="eyebrow">{t.legal.toc}</p>
              <ol className="mt-4 space-y-2 text-sm">
                {doc.sections.map((s, i) => (
                  <li key={s.h}>
                    <a href={`#s${i + 1}`} className="text-mist transition-colors hover:text-paper">
                      {s.h}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
          <div className="min-w-0">
            {doc.sections.map((s, i) => (
              <section key={s.h} id={`s${i + 1}`} className="scroll-mt-28 border-t border-white/[0.07] py-9 first:border-t-0 first:pt-0">
                <h2 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">{s.h}</h2>
                <div className="mt-4 space-y-4 leading-relaxed break-words text-haze">{body(s.p)}</div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
