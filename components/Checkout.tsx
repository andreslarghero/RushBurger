"use client";

import { useEffect, useRef, useState } from "react";
import { brand } from "@/data/brand";
import { formatUYU } from "@/data/menu";
import { cart, useCart } from "@/lib/cart";
import { buildOrderMessage, itemCount, lineLabel, shipping, subtotal } from "@/lib/order";
import { whatsappLink } from "@/lib/whatsapp";

const OTHER = "otra";

export function Checkout() {
  const state = useCart();
  const ref = useRef<HTMLDialogElement>(null);
  const [mode, setMode] = useState<"delivery" | "retiro">("delivery");
  const [zoneKey, setZoneKey] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (state.open && !d.open) d.showModal();
    if (!state.open && d.open) d.close();
  }, [state.open]);

  const zone = brand.deliveryZones.find((z) => z.zone === zoneKey) ?? null;
  const sub = subtotal(state.lines);
  const ship = shipping({ mode, zone });

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "delivery" && !zoneKey) return setError("Elegí tu zona de entrega.");
    if (mode === "delivery" && !address.trim()) return setError("Escribí tu dirección para el delivery.");
    setError("");
    const msg = buildOrderMessage({ lines: state.lines, mode, zone, address, name, notes });
    window.open(whatsappLink(brand.whatsappNumber, msg), "_blank", "noopener,noreferrer");
  };

  const field = "mt-1 min-h-11 w-full rounded-xl border-2 border-ink/30 bg-white px-3 text-ink";

  return (
    <dialog
      ref={ref}
      onClose={cart.closeCheckout}
      aria-labelledby="checkout-title"
      className="m-auto max-h-[92svh] w-[min(92vw,34rem)] overflow-y-auto rounded-3xl bg-cream p-0 text-ink backdrop:bg-black/70"
    >
      <form onSubmit={send} className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 id="checkout-title" className="font-display text-4xl uppercase">Tu pedido</h2>
          <button type="button" onClick={cart.closeCheckout} aria-label="Cerrar" className="h-11 w-11 rounded-full border-2 border-ink text-xl font-bold">
            ×
          </button>
        </div>

        <ul className="mt-4 divide-y divide-ink/15">
          {state.lines.map((l) => (
            <li key={l.id} className="flex items-center justify-between gap-3 py-2">
              <span className="flex-1">
                <strong>{l.qty} ×</strong> {lineLabel(l.name, l.option)}
              </span>
              <span className="font-semibold">{formatUYU(l.unit * l.qty)}</span>
              <button
                type="button"
                onClick={() => cart.setQty(l, 0)}
                aria-label={`Quitar ${lineLabel(l.name, l.option)} del pedido`}
                className="h-11 w-11 rounded-full text-xl text-[#b8460a] hover:bg-ink/10"
              >
                ×
              </button>
            </li>
          ))}
        </ul>

        <fieldset className="mt-5">
          <legend className="font-bold">¿Cómo lo querés?</legend>
          <div className="mt-2 flex gap-2">
            {(["delivery", "retiro"] as const).map((m) => (
              <label key={m} className={`flex min-h-11 flex-1 cursor-pointer items-center justify-center rounded-full border-2 border-ink px-4 font-bold ${mode === m ? "bg-ink text-cream" : ""}`}>
                <input type="radio" name="mode" value={m} checked={mode === m} onChange={() => setMode(m)} className="sr-only" />
                {m === "delivery" ? "Delivery" : "Retiro"}
              </label>
            ))}
          </div>
        </fieldset>

        {mode === "delivery" && (
          <>
            <label className="mt-4 block font-bold">
              Zona
              <select value={zoneKey} onChange={(e) => setZoneKey(e.target.value)} className={field}>
                <option value="">Elegí tu zona</option>
                {brand.deliveryZones.map((z) => (
                  <option key={z.zone} value={z.zone}>
                    {z.zone} — {z.costUYU === 0 ? "gratis" : formatUYU(z.costUYU)}
                  </option>
                ))}
                <option value={OTHER}>Otra zona (consultar)</option>
              </select>
            </label>
            <label className="mt-4 block font-bold">
              Dirección
              <input value={address} onChange={(e) => setAddress(e.target.value)} autoComplete="street-address" placeholder="Calle, número, esquina, referencias" className={field} />
            </label>
          </>
        )}

        <label className="mt-4 block font-bold">
          Nombre (opcional)
          <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="given-name" className={field} />
        </label>
        <label className="mt-4 block font-bold">
          Aclaraciones (opcional)
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} placeholder="Sin cebolla, versión veggie, etc." className={`${field} py-2`} />
        </label>

        <dl className="mt-5 space-y-1">
          <div className="flex justify-between"><dt>Productos ({itemCount(state.lines)})</dt><dd className="font-semibold">{formatUYU(sub)}</dd></div>
          {mode === "delivery" && (
            <div className="flex justify-between">
              <dt>Envío</dt>
              <dd className="font-semibold">{ship === null ? "A confirmar" : ship === 0 ? "Gratis" : formatUYU(ship)}</dd>
            </div>
          )}
          <div className="flex justify-between text-lg"><dt className="font-bold">Total estimado</dt><dd className="font-bold">{formatUYU(sub + (ship ?? 0))}</dd></div>
        </dl>

        {error && <p role="alert" className="mt-3 font-bold text-[#b8460a]">{error}</p>}

        <button type="submit" className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-ink px-6 text-lg font-bold text-cream hover:bg-[#b8460a]">
          Enviar pedido por WhatsApp
        </button>
        <p className="mt-3 text-sm text-ink/80">
          Se abre WhatsApp con tu pedido listo para enviar. Rush confirma disponibilidad, tiempo de entrega y total final. El pedido no queda hecho hasta que lo confirmen.
        </p>
      </form>
    </dialog>
  );
}
