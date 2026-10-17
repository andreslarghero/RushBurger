"use client";

import { useRef, useState, useSyncExternalStore } from "react";

type Props = { mobile: string; desktop: string; poster: string };

/** Video de fondo sin audio. Se carga tras el contenido crítico; respeta reduced-motion y ahorro de datos. */
export function HeroVideo({ mobile, desktop, poster }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const allowed = useSyncExternalStore(
    () => () => {},
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
      return !reduced && !conn?.saveData;
    },
    () => false,
  );
  const [playing, setPlaying] = useState(true);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
    setPlaying(!v.paused);
  };

  return (
    <>
      {allowed && (
        <video
          ref={ref}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          aria-hidden="true"
        >
          <source src={mobile} type="video/mp4" media="(max-width: 767px)" />
          <source src={desktop} type="video/mp4" />
        </video>
      )}
      {allowed && (
        <button
          type="button"
          onClick={toggle}
          aria-pressed={!playing}
          className="absolute bottom-4 right-4 z-20 min-h-11 rounded-full bg-ink/70 px-4 text-sm font-semibold text-cream backdrop-blur hover:bg-ink"
        >
          {playing ? "Pausar movimiento" : "Reanudar movimiento"}
        </button>
      )}
    </>
  );
}
