import type { Cell, Guide, Shape, Tone } from "@/lib/matrix";

export const TONE: Record<Tone, string> = {
  ink: "#e9ebff",
  iris: "#a698ff",
  flame: "#ff8a5c",
  aqua: "#52e6c8",
};

const r2 = (n: number) => Math.round(n * 100) / 100;

function polyPath(n: number, R: number, startDeg = -90) {
  const pts: string[] = [];
  for (let i = 0; i < n; i++) {
    const a = ((startDeg + (360 / n) * i) * Math.PI) / 180;
    pts.push(`${r2(Math.cos(a) * R)} ${r2(Math.sin(a) * R)}`);
  }
  return `M ${pts.join(" L ")} Z`;
}

function starPath(R: number, r: number, points = 5) {
  const pts: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const rad = i % 2 === 0 ? R : r;
    const a = ((-90 + (180 / points) * i) * Math.PI) / 180;
    pts.push(`${r2(Math.cos(a) * rad)} ${r2(Math.sin(a) * rad)}`);
  }
  return `M ${pts.join(" L ")} Z`;
}

function shapePath(sh: Shape): { d: string; strokeOnly?: boolean } {
  const s = sh.s ?? 24;
  switch (sh.k) {
    case "circle":
      return { d: `M ${-s} 0 a ${s} ${s} 0 1 0 ${2 * s} 0 a ${s} ${s} 0 1 0 ${-2 * s} 0 Z` };
    case "poly":
      return { d: polyPath(sh.n ?? 6, s * 1.12) };
    case "square":
      return { d: polyPath(4, s * 1.22, -45) };
    case "diamond":
      return { d: polyPath(4, s * 1.25, -90) };
    case "triangle":
      return { d: polyPath(3, s * 1.28, -90) };
    case "star":
      return { d: starPath(s * 1.22, s * 0.5) };
    case "plus": {
      const a = s * 0.32;
      return {
        d: `M ${-a} ${-s} H ${a} V ${-a} H ${s} V ${a} H ${a} V ${s} H ${-a} V ${a} H ${-s} V ${-a} H ${-a} Z`,
      };
    }
    case "arrow": {
      const h = s * 0.72;
      const w = s * 0.26;
      return {
        d: `M 0 ${-s} L ${h} ${r2(-s * 0.12)} L ${w} ${r2(-s * 0.12)} L ${w} ${s} L ${-w} ${s} L ${-w} ${r2(-s * 0.12)} L ${-h} ${r2(-s * 0.12)} Z`,
      };
    }
    case "line":
      return { d: `M ${-s} 0 L ${s} 0`, strokeOnly: true };
    case "hand":
      return { d: `M 0 0 L 0 ${-s}`, strokeOnly: true };
  }
}

function ShapeEl({ sh }: { sh: Shape }) {
  const { d, strokeOnly } = shapePath(sh);
  const tone = sh.t ?? "ink";
  const c = TONE[tone];
  const f = sh.f ?? "solid";
  const fill = strokeOnly
    ? "none"
    : f === "solid"
      ? c
      : f === "hatch"
        ? `url(#iq-hatch-${tone})`
        : f === "half"
          ? `url(#iq-half-${tone})`
          : "none";
  return (
    <path
      d={d}
      transform={`translate(${sh.x ?? 50} ${sh.y ?? 50}) rotate(${sh.r ?? 0})`}
      fill={fill}
      stroke={c}
      strokeWidth={sh.w ?? (strokeOnly ? 4 : 2.6)}
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  );
}

function GuideEl({ guide }: { guide: Guide }) {
  if (guide === "frame")
    return (
      <rect x={20} y={20} width={60} height={60} rx={2} fill="none" stroke="rgb(255 255 255 / 0.13)" strokeWidth={1.2} strokeDasharray="3 3" />
    );
  return (
    <g stroke="rgb(255 255 255 / 0.16)" fill="none">
      <circle cx={50} cy={50} r={37} strokeWidth={1.4} />
      {[0, 90, 180, 270].map((a) => (
        <line key={a} x1={50} y1={16} x2={50} y2={20.5} strokeWidth={2} transform={`rotate(${a} 50 50)`} />
      ))}
    </g>
  );
}

export default function MatrixCell({
  cell,
  guide,
  className = "",
  title,
}: {
  cell: Cell;
  guide?: Guide;
  className?: string;
  title?: string;
}) {
  return (
    <svg viewBox="0 0 100 100" className={className} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      {guide && <GuideEl guide={guide} />}
      {cell.map((sh, i) => (
        <ShapeEl key={i} sh={sh} />
      ))}
      {guide === "clock" && <circle cx={50} cy={50} r={3.4} fill={TONE.ink} />}
    </svg>
  );
}

/** Közös SVG-mintázatok (vonalkázás, félig kitöltés) – egyszer a dokumentumban. */
export function MatrixDefs() {
  return (
    <svg width="0" height="0" aria-hidden style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
      <defs>
        {(Object.keys(TONE) as Tone[]).map((t) => (
          <g key={t}>
            <pattern id={`iq-hatch-${t}`} patternUnits="userSpaceOnUse" width="5.5" height="5.5" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="5.5" stroke={TONE[t]} strokeWidth="2" />
            </pattern>
            <linearGradient id={`iq-half-${t}`} x1="0" x2="1" y1="0" y2="0">
              <stop offset="0.5" stopColor={TONE[t]} />
              <stop offset="0.5" stopColor={TONE[t]} stopOpacity="0" />
            </linearGradient>
          </g>
        ))}
      </defs>
    </svg>
  );
}
