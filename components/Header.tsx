import Image from "next/image";

const links = [
  { href: "#menu", label: "Menú" },
  { href: "#horarios", label: "Horarios y envíos" },
  { href: "#nosotros", label: "Historia" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ink/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <a href="#top" aria-label="Rush Burgers, inicio" className="flex items-center gap-2">
          {/* Avatar provisional (150 px): reemplazar por el logo original. */}
          <Image src="/provisional/avatar-150.jpg" alt="" width={40} height={40} className="rounded-full" />
          <span className="font-display text-xl uppercase leading-none tracking-wide">Rush Burgers</span>
        </a>
        <nav aria-label="Principal" className="flex items-center gap-4 text-sm font-semibold sm:gap-6">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hidden min-h-11 items-center hover:text-rush sm:inline-flex">
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
