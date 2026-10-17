import { describe, expect, it } from "vitest";
import { getStatus } from "./hours";

// Montevideo es UTC-3 todo el año.
const at = (iso: string) => new Date(iso);

describe("getStatus", () => {
  it("abierto un viernes 21:00 local", () => {
    expect(getStatus(at("2026-10-16T21:00:00-03:00")).open).toBe(true);
  });
  it("cerrado el lunes a las 23:45", () => {
    const s = getStatus(at("2026-10-12T23:45:00-03:00"));
    expect(s.open).toBe(false);
    expect(s.label).toContain("mañana a las 20:00");
  });
  it("miércoles cerrado: abre el jueves", () => {
    const s = getStatus(at("2026-10-14T21:00:00-03:00"));
    expect(s.open).toBe(false);
    expect(s.label).toContain("mañana");
  });
  it("antes de abrir indica hora de hoy", () => {
    expect(getStatus(at("2026-10-15T18:00:00-03:00")).label).toContain("hoy a las 20:00");
  });
});
