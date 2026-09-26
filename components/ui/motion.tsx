"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { useEffect, useRef, useState, type ComponentProps, type ReactNode } from "react";

export const luxe = [0.22, 1, 0.36, 1] as const;

/** Görgetésre felúszó blokk. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  once = true,
  className = "",
  as = "div",
  ...rest
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
  className?: string;
  as?: "div" | "p" | "li" | "section" | "span" | "h2" | "h3" | "figure";
} & Omit<ComponentProps<typeof motion.div>, "children">) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      initial={{ opacity: 0, y, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease: luxe }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}

const lineWrap: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const line: Variants = {
  hidden: { y: "110%", rotate: 1.5 },
  show: { y: "0%", rotate: 0, transition: { duration: 1, ease: luxe } },
};

/** Soronként alulról felúszó cím. A maszk belső paddingja az ékezeteknek kell. */
export function SplitLines({
  lines,
  className = "",
  lineClass = "",
  delay = 0,
  as: Tag = "h2",
}: {
  lines: ReactNode[];
  className?: string;
  lineClass?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "div";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <Tag ref={ref} className={className}>
      <motion.span
        className="block"
        variants={lineWrap}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        transition={{ delayChildren: delay }}
      >
        {lines.map((l, i) => (
          <span key={i} className="-mt-[0.24em] -mb-[0.12em] block overflow-hidden pt-[0.24em] pb-[0.12em]">
            <motion.span className={`block origin-left ${lineClass}`} variants={line}>
              {l}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/** Szavanként beúszó bekezdés. */
export function SplitWords({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ staggerChildren: 0.022, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-baseline">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "100%", opacity: 0 },
              show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: luxe } },
            }}
          >
            {w}
          </motion.span>
        </span>
      )).flatMap((el, i) => (i < words.length - 1 ? [el, " "] : [el]))}
    </motion.p>
  );
}

/** Mágneses gomb-burok: a kurzor felé húzódik. */
export function Magnetic({ children, strength = 0.3, className = "inline-block" }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 16, mass: 0.4 });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** 3D-s billenő kártya: az egér pozíciója dönti. */
export function TiltCard({
  children,
  className = "",
  max = 7,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 150, damping: 18 });
  const gx = useTransform(px, [0, 1], ["0%", "100%"]);
  const gy = useTransform(py, [0, 1], ["0%", "100%"]);
  const glareBg = useTransform([gx, gy], ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.28), transparent 55%)`);
  return (
    <motion.div
      ref={ref}
      className={`relative [transform-style:preserve-3d] ${className}`}
      style={{ rotateX: rx, rotateY: ry, perspective: 1000 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current!.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  );
}

/** Felpörgő számláló. */
export function Counter({ value, suffix = "", className = "", duration = 1.8 }: { value: number; suffix?: string; className?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration, ease: luxe, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value, duration]);
  return (
    <span ref={ref} className={className}>
      {n}
      {suffix}
    </span>
  );
}

/** Vonalrajz-animáció SVG útvonalakhoz (pathLength). */
export const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.6, delay: 0.2 + i * 0.12, ease: luxe }, opacity: { duration: 0.3, delay: 0.2 + i * 0.12 } },
  }),
};
