"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { DOMAINS } from "@/lib/meta";
import { useI18n } from "@/components/i18n/I18nProvider";
import type { DomainScore } from "@/lib/scoring";

const C = 150;
const R = 104;
const r2 = (n: number) => Math.round(n * 100) / 100;

/** Négytengelyű pókháló-diagram a területenkénti eredményhez. */
export default function DomainRadar({ domains }: { domains: DomainScore[] }) {
  const { t } = useI18n();
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const n = domains.length;
  const angle = (i: number) => (-90 + (360 / n) * i) * (Math.PI / 180);
  const point = (i: number, f: number) => [r2(C + Math.cos(angle(i)) * R * f), r2(C + Math.sin(angle(i)) * R * f)] as const;
  const poly = domains.map((d, i) => point(i, Math.max(0.06, d.pct)).join(",")).join(" ");

  return (
    <svg ref={ref} viewBox="0 0 300 300" className="h-auto w-full overflow-visible" role="img" aria-label={t.charts.radarAria}>
      <defs>
        <radialGradient id="radar-fill">
          <stop offset="0" stopColor="#8b7bff" stopOpacity="0.15" />
          <stop offset="1" stopColor="#8b7bff" stopOpacity="0.5" />
        </radialGradient>
      </defs>
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <polygon
          key={f}
          points={domains.map((_, i) => point(i, f).join(",")).join(" ")}
          fill="none"
          stroke="rgb(255 255 255 / 0.08)"
          strokeDasharray={f === 1 ? undefined : "2 4"}
        />
      ))}
      {domains.map((_, i) => {
        const [x, y] = point(i, 1);
        return <line key={i} x1={C} y1={C} x2={x} y2={y} stroke="rgb(255 255 255 / 0.08)" />;
      })}

      <motion.polygon
        points={poly}
        fill="url(#radar-fill)"
        stroke="#b3a8ff"
        strokeWidth={2}
        strokeLinejoin="round"
        style={{ transformOrigin: `${C}px ${C}px` }}
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.3 }}
      />
      {domains.map((d, i) => {
        const [x, y] = point(i, Math.max(0.06, d.pct));
        return (
          <motion.circle
            key={d.domain}
            cx={x}
            cy={y}
            r={5}
            fill={DOMAINS[d.domain].color}
            stroke="#1a1f3b"
            strokeWidth={2}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 + i * 0.08 }}
          />
        );
      })}
      {domains.map((d, i) => {
        const [x, y] = point(i, 1.22);
        const anchor = Math.abs(x - C) < 5 ? "middle" : x > C ? "start" : "end";
        return (
          <g key={`l-${d.domain}`}>
            <text x={x} y={y - 4} textAnchor={anchor} className="fill-haze text-[11px]">
              {t.domains[d.domain].short}
            </text>
            <text x={x} y={y + 11} textAnchor={anchor} className="fill-paper font-mono text-[11px] font-semibold">
              {Math.round(d.pct * 100)}%
            </text>
          </g>
        );
      })}
    </svg>
  );
}
