"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useMemo, useRef, useState } from "react";
import { normPdf } from "@/lib/scoring";
import { SCALE_BANDS } from "@/lib/scale";

const W = 800;
const H = 300;
const LO = 55;
const HI = 145;
const BASE = 256;
const TOP = 36;

const r1 = (n: number) => Math.round(n * 10) / 10;
const xOf = (iq: number) => r1(20 + ((iq - LO) / (HI - LO)) * (W - 40));
const yOf = (iq: number) => r1(BASE - (normPdf((iq - 100) / 15) / normPdf(0)) * (BASE - TOP));

function areaPath(a: number, b: number) {
  let d = `M ${xOf(a)} ${BASE}`;
  for (let iq = a; iq <= b; iq += 0.5) d += ` L ${xOf(iq)} ${yOf(iq)}`;
  d += ` L ${xOf(b)} ${yOf(b)} L ${xOf(b)} ${BASE} Z`;
  return d;
}


export default function BellCurve({
  value,
  interactive = false,
  className = "",
}: {
  value?: number;
  interactive?: boolean;
  className?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [hover, setHover] = useState<number | null>(null);

  const curve = useMemo(() => {
    let d = "";
    for (let iq = LO; iq <= HI; iq += 0.5) d += `${d ? " L" : "M"} ${xOf(iq)} ${yOf(iq)}`;
    return d;
  }, []);
  const bands = useMemo(() => SCALE_BANDS.map((b) => ({ ...b, d: areaPath(b.a, b.b) })), []);
  const v = value != null ? Math.max(LO, Math.min(HI, value)) : null;
  const shaded = useMemo(() => (v != null ? areaPath(LO, v) : null), [v]);
  const active = hover != null ? bands[hover] : null;

  return (
    <div className={`relative ${className}`}>
      {interactive && (
        <div className="pointer-events-none mb-3 flex h-10 items-center justify-center">
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active.label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="glass flex items-center gap-3 rounded-full px-4 py-2 text-sm"
              >
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: active.color }} />
                <span className="font-medium">{active.label}</span>
                <span className="font-mono text-mist">{active.range}</span>
                <span className="text-haze">· a népesség ~{active.share < 1 ? active.share.toFixed(1).replace(".", ",") : Math.round(active.share)}%-a</span>
              </motion.div>
            ) : (
              <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="chip">
                Vidd az egeret (vagy koppints) egy sávra
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}
      <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="h-auto w-full overflow-visible" role="img" aria-label="Az IQ-értékek normáleloszlása">
        <defs>
          <linearGradient id="bell-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8b7bff" stopOpacity="0.55" />
            <stop offset="1" stopColor="#8b7bff" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="bell-stroke" x1="0" x2="1">
            <stop offset="0" stopColor="#ff7d4d" />
            <stop offset="0.45" stopColor="#ffcf5c" />
            <stop offset="0.7" stopColor="#8b7bff" />
            <stop offset="1" stopColor="#45e3c4" />
          </linearGradient>
        </defs>

        {/* σ-vonalak */}
        {[55, 70, 85, 100, 115, 130, 145].map((iq) => (
          <g key={iq}>
            <line x1={xOf(iq)} x2={xOf(iq)} y1={TOP - 14} y2={BASE} stroke="rgb(255 255 255 / 0.06)" strokeDasharray="3 5" />
            <text x={xOf(iq)} y={BASE + 26} textAnchor="middle" className="fill-mist font-mono text-[13px]">
              {iq}
            </text>
          </g>
        ))}
        <line x1={20} x2={W - 20} y1={BASE} y2={BASE} stroke="rgb(255 255 255 / 0.15)" />

        {/* Sávok */}
        {bands.map((b, i) => (
          <motion.path
            key={b.label}
            d={b.d}
            fill={b.color}
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? (hover === i ? 0.42 : hover != null ? 0.06 : interactive ? 0.14 : 0.08) : 0 }}
            transition={{ duration: 0.4, delay: inView && hover == null ? 0.6 + i * 0.05 : 0 }}
            onPointerEnter={interactive ? () => setHover(i) : undefined}
            onPointerLeave={interactive ? () => setHover(null) : undefined}
            onClick={interactive ? () => setHover((h) => (h === i ? null : i)) : undefined}
            className={interactive ? "cursor-pointer" : ""}
          />
        ))}

        {shaded && (
          <motion.path
            d={shaded}
            fill="url(#bell-fill)"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="pointer-events-none"
          />
        )}

        <motion.path
          d={curve}
          fill="none"
          stroke="url(#bell-stroke)"
          strokeWidth={3}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: inView ? 1 : 0 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none"
        />

        {v != null && (
          <motion.g
            initial={{ opacity: 0, y: -30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 180, damping: 14, delay: 1.3 }}
            className="pointer-events-none"
          >
            <line x1={xOf(v)} x2={xOf(v)} y1={yOf(v) - 4} y2={BASE} stroke="#fff" strokeWidth={2} strokeDasharray="4 4" />
            <circle cx={xOf(v)} cy={yOf(v)} r={9} fill="#8b7bff" opacity={0.35} />
            <circle cx={xOf(v)} cy={yOf(v)} r={5.5} fill="#fff" />
            <g transform={`translate(${Math.min(W - 60, Math.max(60, xOf(v)))} ${Math.max(18, yOf(v) - 34)})`}>
              <rect x={-44} y={-18} width={88} height={30} rx={15} fill="#fff" />
              <text x={0} y={2} textAnchor="middle" className="fill-ink-950 font-display text-[14px] font-semibold">
                Te: {value}
              </text>
            </g>
          </motion.g>
        )}
      </svg>

    </div>
  );
}
