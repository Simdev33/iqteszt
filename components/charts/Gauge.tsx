"use client";

import { animate, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

const LO = 55;
const HI = 145;
const START = 150; // fok, az óramutató járásával egyezően a +x tengelytől
const SWEEP = 240;
const CX = 150;
const CY = 150;
const R = 118;

const r2 = (n: number) => Math.round(n * 100) / 100;
function pt(deg: number, r = R) {
  const a = (deg * Math.PI) / 180;
  return [r2(CX + Math.cos(a) * r), r2(CY + Math.sin(a) * r)] as const;
}
function arc(from: number, to: number, r = R) {
  const [x1, y1] = pt(from, r);
  const [x2, y2] = pt(to, r);
  const large = to - from > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
}
const degOf = (iq: number) => START + ((Math.max(LO, Math.min(HI, iq)) - LO) / (HI - LO)) * SWEEP;

/** 240°-os ív-mérő a végső IQ-értékhez, felpörgő számmal. */
export default function Gauge({
  value,
  label,
  sub,
  className = "",
  delay = 0.2,
}: {
  value: number;
  label?: string;
  sub?: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [n, setN] = useState(LO);
  const target = (degOf(value) - START) / SWEEP;

  useEffect(() => {
    if (!inView) return;
    const c = animate(LO, value, { duration: 2.2, delay, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value, delay]);

  const [kx, ky] = pt(degOf(n), R);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div className="relative">
        <svg viewBox="-10 -10 320 250" className="h-auto w-full overflow-visible">
          <defs>
            <linearGradient id="gauge-g" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#ff7d4d" />
              <stop offset="0.38" stopColor="#ffcf5c" />
              <stop offset="0.68" stopColor="#8b7bff" />
              <stop offset="1" stopColor="#45e3c4" />
            </linearGradient>
            <filter id="gauge-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>

          {/* Alap ív + beosztás */}
          <path d={arc(START, START + SWEEP)} fill="none" stroke="rgb(255 255 255 / 0.07)" strokeWidth={16} strokeLinecap="round" />
          {Array.from({ length: 31 }, (_, i) => {
            const d = START + (SWEEP / 30) * i;
            const major = i % 5 === 0;
            const [x1, y1] = pt(d, R - 20);
            const [x2, y2] = pt(d, R - (major ? 30 : 25));
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgb(255 255 255 / 0.22)" strokeWidth={major ? 1.6 : 0.8} />;
          })}
          {[70, 85, 100, 115, 130].map((iq) => {
            const [x, y] = pt(degOf(iq), R + 21);
            return (
              <text key={iq} x={x} y={y + 4} textAnchor="middle" className="fill-mist font-mono text-[10px]">
                {iq}
              </text>
            );
          })}

          {/* Kitöltés */}
          <motion.path
            d={arc(START, START + SWEEP)}
            fill="none"
            stroke="url(#gauge-g)"
            strokeWidth={16}
            strokeLinecap="round"
            filter="url(#gauge-glow)"
            opacity={0.55}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: inView ? target : 0 }}
            transition={{ duration: 2.2, delay, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.path
            d={arc(START, START + SWEEP)}
            fill="none"
            stroke="url(#gauge-g)"
            strokeWidth={16}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: inView ? target : 0 }}
            transition={{ duration: 2.2, delay, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Mutató gömb */}
          <circle cx={kx} cy={ky} r={11} fill="#fff" opacity={inView ? 1 : 0} />
          <circle cx={kx} cy={ky} r={4.5} fill="#5a45f2" opacity={inView ? 1 : 0} />
        </svg>

        <div className="pointer-events-none absolute inset-x-0 top-[64%] flex -translate-y-1/2 flex-col items-center">
          {label && <span className="font-mono text-[0.66rem] tracking-[0.22em] text-mist uppercase">{label}</span>}
          <span className="mt-1 font-display text-[clamp(3rem,10vw,4.5rem)] leading-none font-semibold tracking-[-0.05em] tabular-nums">{n}</span>
        </div>
      </div>
      {sub && <p className="-mt-3 text-center text-sm text-haze">{sub}</p>}
    </div>
  );
}
