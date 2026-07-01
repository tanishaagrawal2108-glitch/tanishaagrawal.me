"use client";

import {
  geoContains,
  geoGraticule10,
  geoOrthographic,
  geoPath,
} from "d3-geo";
import type { FeatureCollection } from "geojson";
import { useEffect, useRef } from "react";

/**
 * "The world, as points" — real continents rendered as a rotating halftone
 * dot globe. Land geometry (Natural Earth 110m) is vendored locally and dots
 * are sampled inside it; the palette matches the site (teal dots, brighter
 * toward the centre, faint graticule). Purely decorative (aria-hidden) and
 * honours prefers-reduced-motion by drawing a single still frame.
 */
const BRAND = "14,110,106"; // #0E6E6A
const TILT = -20; // northern-hemisphere tilt
const STEP = 2.2; // degrees between sampled dots (density)

export function Globe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const projection = geoOrthographic().clipAngle(90);

    let dots: [number, number][] = [];
    let rotation = 0;
    let raf = 0;
    let cancelled = false;

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
          const R = Math.min(w, h) * 0.46;
          const cx = w / 2;
          const cy = h / 2;
          projection.scale(R).translate([cx, cy]).rotate([rotation, TILT]);

          // Faint graticule (lat/long grid), clipped to the front hemisphere.
          const path = geoPath(projection, ctx);
          ctx.beginPath();
          path(geoGraticule10());
          ctx.strokeStyle = "rgba(26,26,26,0.07)";
          ctx.lineWidth = 1;
          ctx.stroke();

          // Teal land dots, brighter toward the centre (nearer the viewer).
          for (const dot of dots) {
            const p = projection(dot);
            if (!p) continue; // back hemisphere is clipped away
            const rr = Math.hypot(p[0] - cx, p[1] - cy) / R; // 0 centre .. 1 limb
            const depth = Math.sqrt(Math.max(0, 1 - rr * rr));
            ctx.beginPath();
            ctx.arc(p[0], p[1], 0.7 + depth * 1.5, 0, 6.2832);
            ctx.fillStyle = `rgba(${BRAND},${0.14 + depth * depth * 0.6})`;
            ctx.fill();
          }
        }
      }
      if (!reduce && !cancelled) {
        rotation += 0.16;
        raf = requestAnimationFrame(draw);
      }
    };

    fetch("/geo/ne_110m_land.json")
      .then((r) => r.json())
      .then((land: FeatureCollection) => {
        if (cancelled) return;
        for (let lat = -84; lat <= 84; lat += STEP) {
          for (let lng = -180; lng <= 180; lng += STEP) {
            if (geoContains(land, [lng, lat])) dots.push([lng, lat]);
          }
        }
        draw();
      })
      .catch(() => {
        /* decorative — leave blank on failure */
      });

    return () => {
      cancelled = true;
      dots = [];
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
