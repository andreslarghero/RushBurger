"use client";

import { brand } from "@/data/brand";
import { weekSchedule } from "@/lib/hours";
import { useOpenStatus } from "@/lib/use-open-status";
import { OrderButton } from "./OrderButton";

const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const order = [1, 2, 3, 4, 5, 6, 0];
const fmt = (m: number) => `${String(Math.floor(m / 60) % 24).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

export function Hours() {
  const status = useOpenStatus();

  return (
    <section id="horarios" className="bg-rush text-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em]">Horarios y pedidos</p>
          <h2 className="mt-2 font-display text-5xl uppercase leading-none sm:text-7xl">Abrimos de noche</h2>
          <p
            role="status"
            className={`mt-6 inline-flex min-h-11 items-center gap-2 rounded-full px-5 font-bold ${status ? (status.open ? "bg-ink text-cream" : "bg-ink/15") : "bg-ink/15"}`}
          >
            <span aria-hidden="true" className={`h-3 w-3 rounded-full ${status?.open ? "bg-green-400" : "bg-ink/50"}`} />
            {status ? status.label : "Mirá los horarios"}
          </p>
          <p className="mt-6 text-lg">
            Modalidad: {brand.modalities.join(" o ")}. Medios de pago: consultalos por WhatsApp.
          </p>
          <h3 id="envios" className="mt-6 scroll-mt-24 font-display text-3xl uppercase">Envíos</h3>
          <ul className="mt-2 max-w-md divide-y divide-ink/25">
            {brand.deliveryZones.map((z) => (
              <li key={z.zone} className="flex justify-between gap-4 py-2">
                <span>{z.zone}</span>
                <strong>{z.costUYU === 0 ? "Gratis" : `$${z.costUYU}`}</strong>
              </li>
            ))}
          </ul>
          <OrderButton
            className="mt-6 !bg-ink !text-cream hover:!bg-cream hover:!text-ink"
            label="Consultá por WhatsApp"
            message="Hola Rush! ¿Hacen entregas en mi zona y cuánto sale el envío?"
          />
        </div>

        <ul className="divide-y divide-ink/25 self-center rounded-3xl bg-cream p-2">
          {order.map((d) => {
            const s = weekSchedule[d];
            const isToday = status?.day === d;
            return (
              <li
                key={d}
                className={`flex items-center justify-between gap-4 rounded-2xl px-4 py-3 ${isToday ? "bg-ink text-cream" : ""}`}
                aria-current={isToday ? "date" : undefined}
              >
                <span className="font-bold">
                  {days[d]}
                  {isToday && <span className="ml-2 text-sm font-semibold text-rush">hoy</span>}
                </span>
                <span className={s ? "font-mono" : "font-bold text-[#b8460a]"}>{s ? `${fmt(s.open)} a ${fmt(s.close)}` : "Cerrado"}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
