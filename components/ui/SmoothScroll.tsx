"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

// Lenis sima görgetés: a Motion useScroll az ablak scrollját olvassa, ezért root módban fut.
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        duration: 1.2,
        smoothWheel: true,
        anchors: { offset: -84 },
        autoRaf: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
