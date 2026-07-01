"use client";

import { useEffect, useRef } from "react";

/**
 * "The world, as points" — a rotating Fibonacci-sphere point cloud.
 * Ported verbatim from the design mockup's canvas logic. Purely decorative
 * (aria-hidden); honours prefers-reduced-motion by rendering a single frame.
 */
export function Globe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const N = 820;
    const pts: [number, number, number][] = [];
    const off = 2 / N;
    const inc = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = i * off - 1 + off / 2;
      const r = Math.sqrt(1 - y * y);
      const phi = i * inc;
      pts.push([Math.cos(phi) * r, y, Math.sin(phi) * r]);
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let ang = 0;
    let raf = 0;

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w > 0 && h > 0) {
        if (canvas.width !== Math.round(w * dpr)) canvas.width = Math.round(w * dpr);
        if (canvas.height !== Math.round(h * dpr)) canvas.height = Math.round(h * dpr);
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          ctx.clearRect(0, 0, w, h);
          const R = Math.min(w, h) * 0.42;
          const cx = w / 2;
          const cy = h / 2;
          ang += 0.0024;
          const a = ang;
          const ca = Math.cos(a);
          const sa = Math.sin(a);
          const tilt = -0.42;
          const ct = Math.cos(tilt);
          const st = Math.sin(tilt);
          for (const p of pts) {
            const x = p[0] * ca - p[2] * sa;
            const z = p[0] * sa + p[2] * ca;
            const y = p[1];
            const y2 = y * ct - z * st;
            const z2 = y * st + z * ct;
            const sx = cx + x * R;
            const sy = cy + y2 * R;
            const depth = (z2 + 1) / 2; // 0 back .. 1 front
            const rad = 0.7 + depth * 1.7;
            const al = 0.1 + depth * depth * 0.62;
            ctx.beginPath();
            ctx.arc(sx, sy, rad, 0, 6.2832);
            ctx.fillStyle =
              depth > 0.55
                ? `rgba(14,110,106,${al})`
                : `rgba(26,26,26,${al * 0.5})`;
            ctx.fill();
          }
        }
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="relative flex h-[420px] items-center justify-center sm:h-[520px]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(14,110,106,0.06),transparent_62%)]" />
      <canvas ref={canvasRef} className="block h-full w-full" />
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
        Fig. 0 — the world, as points
      </div>
    </div>
  );
}
