import Image from "next/image";
import { brand } from "@/data/brand";
import { Bolt } from "./Bolt";
import { OrderButton } from "./OrderButton";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink">
      <Bolt className="bolt-flash pointer-events-none absolute -right-6 -top-4 h-72 text-rush/25" />
      <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-20">
        <p className="font-display text-7xl uppercase leading-[0.9] sm:text-9xl">
          ¿Tenés <span className="text-rush">hambre</span>?
        </p>
        <p className="mt-4 max-w-md text-lg text-cream/85">Escribinos por WhatsApp, elegí tu burger y Rush te confirma todo.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <OrderButton label="Pedí por WhatsApp" />
          <a href="#menu" className="inline-flex min-h-12 items-center rounded-full border-2 border-cream px-6 font-bold hover:bg-cream hover:text-ink">
            Ver menú
          </a>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-white/15 pt-8 text-sm text-cream/75">
          <div className="flex items-center gap-3">
            {/* Avatar provisional (150 px): reemplazar por el logo original. */}
            <Image src="/provisional/avatar-150.jpg" alt="Logo de Rush Burgers" width={48} height={48} className="rounded-full" />
            <div>
              <p className="font-display text-xl uppercase text-cream">{brand.name}</p>
              <p>{brand.slogan}</p>
            </div>
          </div>
          <p>
            <a className="underline" href={brand.instagram.url} target="_blank" rel="noopener noreferrer">
              Instagram @{brand.instagram.handle}
            </a>
            <br />
            WhatsApp {brand.whatsappDisplay}
          </p>
        </div>
      </div>
    </footer>
  );
}
