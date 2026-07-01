"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProjectMap } from "@/content/projects";
import { Kicker } from "./kicker";

export function ProjectGallery({ maps }: { maps: ProjectMap[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (d: number) =>
      setIndex((i) => (i === null ? i : (i + d + maps.length) % maps.length)),
    [maps.length],
  );

  const openAt = (i: number) => {
    lastFocused.current = document.activeElement as HTMLElement;
    setIndex(i);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    // Move focus into the dialog and lock background scroll.
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      lastFocused.current?.focus();
    };
  }, [open, close, step]);

  const current = open ? maps[index] : null;

  return (
    <section className="mx-auto max-w-[1280px] px-6 py-14 sm:px-10">
      <Kicker className="mb-2 text-[11px] tracking-[0.12em]">
        Maps &amp; results
      </Kicker>
      <h2 className="mb-7 font-display text-[30px] font-normal tracking-[-0.01em]">
        Click any map to enlarge
      </h2>

      <div className="flex flex-col gap-9">
        {maps.map((m, i) => {
          const fig = String(i + 1).padStart(2, "0");
          return (
            <figure key={i} className="m-0">
              <button
                type="button"
                onClick={() => openAt(i)}
                aria-label={`Enlarge figure ${fig}: ${m.alt}`}
                className="relative block aspect-[16/9] w-full cursor-zoom-in overflow-hidden rounded-xl border border-hairline hatch-strong outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand"
              >
                {m.src && (
                  <Image
                    src={m.src}
                    alt={m.alt}
                    fill
                    sizes="(max-width: 1280px) 100vw, 1200px"
                    className="object-cover"
                  />
                )}
                <span className="absolute left-3.5 top-3.5 rounded-[5px] bg-paper/80 px-[9px] py-[5px] font-mono text-[11px] tracking-[0.06em] text-soft">
                  Fig. {fig}
                </span>
                <span className="absolute bottom-3.5 right-3.5 rounded-full bg-paper/85 px-[11px] py-[5px] font-mono text-[10.5px] uppercase tracking-[0.08em] text-brand">
                  ⚲ Enlarge
                </span>
              </button>
              <figcaption className="mt-3 text-[14px] italic text-muted-ink">
                {m.caption}
              </figcaption>
            </figure>
          );
        })}
      </div>

      {open && current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Figure ${index! + 1} of ${maps.length}: ${current.alt}`}
          onClick={close}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[rgba(20,20,18,0.86)] p-6 backdrop-blur-[6px] sm:p-12"
          style={{ animation: "lbIn .18s ease" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[min(1100px,90vw)]"
            style={{ animation: "lbCard .22s ease" }}
          >
            <div className="relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-[10px] bg-[#101010]">
              {current.src ? (
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              ) : (
                <span className="px-6 text-center font-mono text-[13px] uppercase tracking-[0.12em] text-white/50">
                  {current.alt}
                </span>
              )}
            </div>
            <div className="mt-[18px] flex items-center justify-between gap-5">
              <p className="m-0 max-w-[70%] text-[15px] text-white/90">
                {current.caption}
              </p>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[12px] text-white/50">
                  {index! + 1} / {maps.length}
                </span>
                <button
                  ref={closeRef}
                  type="button"
                  aria-label="Previous map"
                  onClick={() => step(-1)}
                  className="flex h-[38px] w-[38px] items-center justify-center rounded-lg border border-white/20 text-white outline-offset-2 focus-visible:outline-2 focus-visible:outline-white"
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label="Next map"
                  onClick={() => step(1)}
                  className="flex h-[38px] w-[38px] items-center justify-center rounded-lg border border-white/20 text-white outline-offset-2 focus-visible:outline-2 focus-visible:outline-white"
                >
                  →
                </button>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={close}
                  className="ml-1 flex h-[38px] w-[38px] items-center justify-center rounded-lg border border-white/20 text-white outline-offset-2 focus-visible:outline-2 focus-visible:outline-white"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
          <div className="absolute right-7 top-6 font-mono text-[11px] tracking-[0.1em] text-white/45">
            ESC TO CLOSE · ← → TO NAVIGATE
          </div>
        </div>
      )}
    </section>
  );
}
