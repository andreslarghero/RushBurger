import Image from "next/image";
import { brand } from "@/data/brand";
import { story } from "@/data/story";

export function About() {
  return (
    <section id="nosotros" className="py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-rush">Nuestra historia</p>
        <h2 className="mt-2 font-display text-5xl uppercase leading-none sm:text-7xl">
          Esto es <span className="text-rush">Rush</span>
        </h2>
        <p className="mt-4 max-w-xl text-lg text-cream/85">
          Rush se activó el {brand.openedOn}. Antes hubo tres semanas de cuenta regresiva, personajes propios y un solo plan: burgers con energía para el bajón, por take away o delivery.
        </p>

        <ol className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {story.map((s) => (
            <li key={s.title} className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-2">
              <Image
                src={s.image.src}
                alt={s.image.alt}
                width={s.image.width}
                height={s.image.height}
                loading="lazy"
                sizes="(min-width: 1024px) 368px, (min-width: 640px) 45vw, 46vw"
                className="aspect-square w-full object-cover sm:aspect-[4/3]"
              />
              <div className="flex flex-1 flex-col p-3 sm:p-4">
                <p className="text-[0.7rem] font-bold uppercase tracking-widest text-rush sm:text-xs">{s.date}</p>
                <h3 className="mt-1 font-display text-xl uppercase leading-tight sm:text-2xl">{s.title}</h3>
                <p className="mt-1 flex-1 text-sm text-cream/85">{s.text}</p>
                {s.link && (
                  <a
                    href={s.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex min-h-11 items-center self-start rounded-full border-2 border-cream px-4 text-sm font-bold hover:bg-cream hover:text-ink"
                  >
                    ▶ Ver reel
                    <span className="sr-only">: {s.link.label} (abre Instagram en una pestaña nueva)</span>
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={brand.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center rounded-full bg-cream px-6 font-bold text-ink hover:bg-rush"
          >
            Seguinos en @{brand.instagram.handle}
            <span className="sr-only"> (abre Instagram en una pestaña nueva)</span>
          </a>
          <p className="text-sm text-cream/70">Fotos de la cuenta oficial. Las promos de esas fechas ya no están vigentes.</p>
        </div>
      </div>
    </section>
  );
}
