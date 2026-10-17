import { describe, expect, it } from "vitest";
import { buildOrderMessage, itemCount, lineLabel, subtotal, type CartLine } from "./order";

const lines: CartLine[] = [
  { id: "big:Doble", name: "Big", option: "Doble", unit: 550, qty: 2 },
  { id: "fritas:Con cheddar", name: "Porción de fritas", option: "Con cheddar", unit: 260, qty: 1 },
  { id: "lata:Precio", name: "Lata de Pepsi", option: "Precio", unit: 80, qty: 3 },
];

describe("order", () => {
  it("calcula subtotal y cantidad", () => {
    expect(subtotal(lines)).toBe(550 * 2 + 260 + 240);
    expect(itemCount(lines)).toBe(6);
  });

  it("nombra las líneas", () => {
    expect(lineLabel("Big", "Doble")).toBe("Big doble");
    expect(lineLabel("Lata de Pepsi", "Precio")).toBe("Lata de Pepsi");
    expect(lineLabel("Porción de fritas", "Sola")).toBe("Porción de fritas");
  });

  it("arma el mensaje de delivery con dirección y total", () => {
    const msg = buildOrderMessage({
      lines,
      mode: "delivery",
      zone: { zone: "Atlántida", costUYU: 80 },
      address: "Calle 1 esq. 2",
      name: "Ana",
      notes: "Sin cebolla",
    });
    expect(msg).toContain("2 x Big doble");
    expect(msg).toContain("Zona: Atlántida (envío $80)");
    expect(msg).toContain("Dirección: Calle 1 esq. 2");
    expect(msg).toContain("Total estimado: $1.680");
    expect(msg).not.toContain("confirmado");
  });

  it("retiro no pide dirección ni zona", () => {
    const msg = buildOrderMessage({ lines, mode: "retiro" });
    expect(msg).toContain("Retiro (take away)");
    expect(msg).not.toContain("Dirección");
    expect(msg).not.toContain("Zona");
  });

  it("zona gratis y zona a consultar", () => {
    expect(buildOrderMessage({ lines, mode: "delivery", zone: { zone: "El Fortín", costUYU: 0 } })).toContain("envío gratis");
    expect(buildOrderMessage({ lines, mode: "delivery", zone: null })).toContain("más envío a confirmar");
  });
});
