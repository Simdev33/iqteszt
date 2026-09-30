import Link from "next/link";
import { Fragment, type ReactNode } from "react";

/**
 * A szótár egyszerű jelöléseinek megjelenítése:
 *   *szöveg*        → kiemelt rész (alapból színátmenetes)
 *   [szöveg](kulcs) → hivatkozás a links[kulcs] címre
 */
export default function Rich({
  text,
  links = {},
  em = "text-gradient",
  linkClass = "text-iris-soft underline decoration-iris/40 underline-offset-4 hover:decoration-iris",
}: {
  text: string;
  links?: Record<string, string>;
  em?: string;
  linkClass?: string;
}) {
  const out: ReactNode[] = [];
  const re = /\*([^*]+)\*|\[([^\]]+)\]\((\w+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(<Fragment key={k++}>{text.slice(last, m.index)}</Fragment>);
    if (m[1] != null) {
      out.push(
        <span key={k++} className={em}>
          {m[1]}
        </span>,
      );
    } else {
      const href = links[m[3]];
      out.push(
        href ? (
          <Link key={k++} href={href} className={linkClass} target={href.startsWith("http") ? "_blank" : undefined}>
            {m[2]}
          </Link>
        ) : (
          <Fragment key={k++}>{m[2]}</Fragment>
        ),
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(<Fragment key={k++}>{text.slice(last)}</Fragment>);
  return <>{out}</>;
}

/** A jelölések nélküli, sima szöveg (pl. metaadatokhoz, aria-címkékhez). */
export const plain = (text: string) => text.replace(/\*([^*]+)\*/g, "$1").replace(/\[([^\]]+)\]\((\w+)\)/g, "$1");
