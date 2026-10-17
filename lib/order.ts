import { formatUYU } from "@/data/menu";

export type CartLine = { id: string; name: string; option: string | null; unit: number; qty: number };

export type OrderDetails = {
  lines: CartLine[];
  mode: "delivery" | "retiro";
  zone?: { zone: string; costUYU: number } | null;
  address?: string;
  name?: string;
  notes?: string;
};

export function lineLabel(name: string, option: string | null): string {
  if (!option || option === "Precio" || option === "Sola") return name;
  return `${name} ${option.toLowerCase()}`;
}

export const subtotal = (lines: CartLine[]) => lines.reduce((sum, l) => sum + l.unit * l.qty, 0);
export const itemCount = (lines: CartLine[]) => lines.reduce((sum, l) => sum + l.qty, 0);

export function shipping(o: Pick<OrderDetails, "mode" | "zone">): number | null {
  if (o.mode !== "delivery" || !o.zone) return null;
  return o.zone.costUYU;
}

export function buildOrderMessage(o: OrderDetails): string {
  const out: string[] = ["Hola Rush! Quiero hacer este pedido:", ""];
  for (const l of o.lines) {
    out.push(`• ${l.qty} x ${lineLabel(l.name, l.option)} — ${formatUYU(l.unit * l.qty)}`);
  }
  const sub = subtotal(o.lines);
  out.push("", `Subtotal: ${formatUYU(sub)}`);
  out.push(`Modalidad: ${o.mode === "delivery" ? "Delivery" : "Retiro (take away)"}`);
  if (o.mode === "delivery") {
    if (o.zone) {
      out.push(`Zona: ${o.zone.zone} (envío ${o.zone.costUYU === 0 ? "gratis" : formatUYU(o.zone.costUYU)})`);
    } else {
      out.push("Zona: otra / a consultar");
    }
    if (o.address?.trim()) out.push(`Dirección: ${o.address.trim()}`);
  }
  if (o.name?.trim()) out.push(`Nombre: ${o.name.trim()}`);
  if (o.notes?.trim()) out.push(`Notas: ${o.notes.trim()}`);
  const ship = shipping(o);
  if (ship !== null) out.push(`Total estimado: ${formatUYU(sub + ship)}`);
  else out.push(`Total estimado de productos: ${formatUYU(sub)}${o.mode === "delivery" ? " (más envío a confirmar)" : ""}`);
  out.push("", "¿Me confirman disponibilidad, tiempo de entrega y total? Gracias!");
  return out.join("\n");
}
