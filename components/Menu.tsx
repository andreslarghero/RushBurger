"use client";

import Image from "next/image";
import { useState } from "react";
import { burgerNotes, burgers, drinks, extras, formatUYU, sides, type Product } from "@/data/menu";
import { cart, qtyOf, useCart } from "@/lib/cart";
import { lineLabel } from "@/lib/order";

const tabs = [
  { id: "todo", label: "Todo" },
  { id: "burgers", label: "Burgers" },
  { id: "guarniciones", label: "Guarniciones" },
  { id: "extras", label: "Extras" },
  { id: "bebidas", label: "Bebidas" },
] as const;
type TabId = (typeof tabs)[number]["id"];

/** Una opción de precio con sus controles de cantidad. */
function OptionRow({ product, option, unit, dark = false }: { product: Product; option: string; unit: number; dark?: boolean }) {
  const state = useCart();
  const id = `${product.id}:${option}`;
  const qty = qtyOf(state, id);
  const label = lineLabel(product.name, option);
  const line = { id, name: product.name, option, unit };
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
      <span className="leading-tight">
        {option !== "Precio" && <span className="block text-xs font-semibold opacity-80">{option}</span>}
        <strong className={`text-lg ${dark ? "text-rush" : "text-rush"}`}>{formatUYU(unit)}</strong>
      </span>
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => cart.change(line, -1)}
          disabled={qty === 0}
          aria-label={`Quitar ${label}`}
          className="h-11 w-11 rounded-full border-2 border-current text-xl font-bold disabled:opacity-30"
        >
          −
        </button>
        <output aria-live="polite" aria-label={`${label}: ${qty}`} className="w-7 text-center text-lg font-bold">
          {qty}
        </output>
        <button
          type="button"
          onClick={() => cart.change(line, 1)}
          aria-label={`Agregar ${label}`}
          className="h-11 w-11 rounded-full bg-rush text-xl font-bold text-ink hover:bg-cream"
        >
          +
        </button>
      </div>
    </div>
  );
}

/** Burger con foto: horizontal en celular, vertical desde sm. */
function BurgerCard({ p }: { p: Product }) {
  return (
    <li className="flex overflow-hidden rounded-3xl border border-white/10 bg-ink text-cream sm:flex-col">
      {p.image && (
        <div className="relative w-28 shrink-0 overflow-hidden bg-cream sm:aspect-[4/3] sm:w-auto">
          <Image
            src={p.image.src}
            alt={p.image.alt}
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 112px"
            className="origin-[50%_64%] scale-[1.7] object-cover object-[50%_66%] sm:scale-100"
          />
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-2 p-4">
        <h4 className="font-display text-3xl uppercase leading-none">{p.name}</h4>
        <p className="flex-1 text-sm text-cream/85">{p.description}</p>
        <div className="space-y-1">
          {p.options.map((o) => (
            <OptionRow key={o.label} product={p} option={o.label} unit={o.amountUYU} dark />
          ))}
        </div>
      </div>
    </li>
  );
}

/** Guarnición, extra o bebida: miniatura + datos + cantidad. */
function ItemCard({ p, className = "" }: { p: Product; className?: string }) {
  return (
    <li className={`flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 ${className}`}>
      {p.thumb ? (
        <Image src={p.thumb} alt="" width={74} height={74} loading="lazy" className="h-[74px] w-[74px] shrink-0 rounded-xl object-cover" />
      ) : (
        <div aria-hidden="true" className="flex h-[74px] w-[74px] shrink-0 items-center justify-center rounded-xl bg-rush text-3xl text-ink">
          ⚡
        </div>
      )}
      <div className="min-w-0 flex-1">
        <h4 className="font-display text-xl uppercase leading-tight">{p.name}</h4>
        {p.description && <p className="text-sm text-cream/80">{p.description}</p>}
        <div className="mt-1 space-y-1">
          {p.options.map((o) => (
            <OptionRow key={o.label} product={p} option={o.label} unit={o.amountUYU} />
          ))}
        </div>
      </div>
    </li>
  );
}

const grid = "grid gap-3 sm:grid-cols-2 lg:grid-cols-3";

function Burgers() {
  return (
    <div>
      <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {burgers.map((p) => (p.image ? <BurgerCard key={p.id} p={p} /> : <ItemCard key={p.id} p={p} className="lg:col-span-2" />))}
      </ul>
      <ul className="mt-3 space-y-1 text-sm text-cream/80">
        {burgerNotes.map((n) => <li key={n}>{n}</li>)}
      </ul>
    </div>
  );
}

const List = ({ items }: { items: Product[] }) => (
  <ul className={grid}>{items.map((p) => <ItemCard key={p.id} p={p} />)}</ul>
);

function Heading({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-3 mt-10 font-display text-3xl uppercase first:mt-0 sm:text-4xl">{children}</h3>;
}

export function Menu() {
  const [tab, setTab] = useState<TabId>("burgers");
  const select = (id: TabId) => {
    setTab(id);
    const panel = document.getElementById("menu-panel");
    if (panel && panel.getBoundingClientRect().top < 120) panel.scrollIntoView({ block: "start" });
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
    if (!next) return;
    select(next.id);
    document.getElementById(`tab-${next.id}`)?.focus();
  };

  return (
    <section id="menu" className="border-t border-white/10 bg-ink-2 text-cream">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-rush">Menú</p>
        <h2 className="mt-2 font-display text-5xl uppercase leading-none sm:text-7xl">Armá tu pedido</h2>
        <p className="mt-3 max-w-xl">
          Sumá lo que quieras con el +. Al final se abre WhatsApp con tu pedido completo, y Rush confirma disponibilidad, precio y entrega.
        </p>

        <div role="tablist" aria-label="Categorías del menú" className="sticky top-16 z-20 -mx-4 mt-4 flex gap-2 overflow-x-auto bg-ink-2/95 px-4 py-3 backdrop-blur">
          {tabs.map((t, i) => (
            <button
              key={t.id}
              id={`tab-${t.id}`}
              role="tab"
              type="button"
              aria-selected={tab === t.id}
              aria-controls="menu-panel"
              tabIndex={tab === t.id ? 0 : -1}
              onClick={() => select(t.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={`inline-flex min-h-11 shrink-0 items-center rounded-full border-2 border-cream/70 px-5 text-sm font-bold ${tab === t.id ? "bg-cream text-ink" : "hover:bg-white/10"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div id="menu-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="mt-4 scroll-mt-32">
          {tab === "todo" && (
            <>
              <Heading>Burgers</Heading>
              <Burgers />
              <Heading>Guarniciones</Heading>
              <List items={sides} />
              <Heading>Extras</Heading>
              <List items={extras} />
              <Heading>Bebidas</Heading>
              <List items={drinks} />
            </>
          )}
          {tab === "burgers" && <Burgers />}
          {tab === "guarniciones" && <List items={sides} />}
          {tab === "extras" && <List items={extras} />}
          {tab === "bebidas" && <List items={drinks} />}
        </div>

      </div>
    </section>
  );
}
