import Image from "next/image";
import { brand } from "@/data/brand";
import { Bolt } from "./Bolt";
import { HeroVideo } from "./HeroVideo";
import { OpenStatus } from "./OpenStatus";

const ticker = "ALTA DOSIS DE BURGER ⚡ TAKE AWAY ⚡ DELIVERY ⚡ ";

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* Fondo: negro con degradados naranjas en movimiento lento (solo CSS). */}
      <div aria-hidden="true" className="hero-bg absolute inset-0 -z-10 overflow-hidden">
        <div className="hero-orb hero-orb-a" />
        <div className="hero-orb hero-orb-b" />
        <div className="hero-orb hero-orb-c" />
        <div className="hero-streak" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
        {brand.heroVideo && <HeroVideo {...brand.heroVideo} />}
      </div>

      <Bolt className="bolt-flash pointer-events-none absolute -left-8 top-6 h-64 text-rush sm:left-[38%] sm:h-[32rem]" />

      <div className="relative mx-auto grid min-h-[80svh] max-w-6xl items-center gap-8 px-4 py-12 sm:py-20 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="rise mb-3 text-sm font-bold uppercase tracking-[0.2em] text-rush" style={{ animationDelay: "0.05s" }}>
            Take away · Delivery
          </p>
          <h1 className="font-display text-6xl uppercase leading-[0.92] sm:text-8xl lg:text-9xl">
            <span className="block">
              <span className="typewriter" style={{ "--n": 10, "--dur": "0.9s", "--delay": "0.2s" } as React.CSSProperties}>
                Alta dosis
              </span>
            </span>
            <span className="block">
              <span className="typewriter typewriter-caret" style={{ "--n": 9, "--dur": "0.8s", "--delay": "1.2s" } as React.CSSProperties}>
                de <span className="text-rush">burger</span>
              </span>
            </span>
          </h1>
          <p className="rise mt-5 max-w-md text-lg text-cream/90" style={{ animationDelay: "0.5s" }}>
            Mirá el menú y pedí por WhatsApp. Abrimos desde las 20:00.
          </p>
          <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "0.65s" }}>
            <a href="#menu" className="inline-flex min-h-12 items-center rounded-full bg-cream px-6 font-bold text-ink transition-colors hover:bg-rush">
              Ver menú
            </a>
          </div>
          <div className="rise mt-5 flex flex-wrap items-center gap-x-5 gap-y-2" style={{ animationDelay: "0.8s" }}>
            <OpenStatus />
            <a href="#envios" className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4 hover:text-rush">
              Ver zonas de envío
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div aria-hidden="true" className="glow absolute inset-6 -z-10 rounded-full bg-rush/40 blur-3xl" />
          <Image
            src={brand.heroImage.src}
            alt={brand.heroImage.alt}
            width={brand.heroImage.width}
            height={brand.heroImage.height}
            priority
            sizes="(min-width: 768px) 384px, 90vw"
            className="float-slow w-full rounded-2xl shadow-2xl shadow-black/60"
          />
        </div>
      </div>

      <div aria-hidden="true" className="relative overflow-hidden border-y border-white/10 bg-rush py-2 text-ink">
        <div className="marquee flex w-max whitespace-nowrap font-display text-xl uppercase tracking-wider">
          <span>{ticker.repeat(6)}</span>
          <span>{ticker.repeat(6)}</span>
        </div>
      </div>
    </section>
  );
}
