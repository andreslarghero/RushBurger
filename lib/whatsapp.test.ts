import { describe, expect, it } from "vitest";
import { productMessage, whatsappLink } from "./whatsapp";

describe("whatsappLink", () => {
  it("usa el número internacional sin símbolos", () => {
    expect(whatsappLink("59897700788")).toBe("https://wa.me/59897700788");
  });
  it("codifica el mensaje", () => {
    const url = whatsappLink("59897700788", productMessage("Big"));
    expect(url).toContain("?text=Hola%20Rush!");
    expect(decodeURIComponent(url.split("text=")[1] ?? "")).toContain("Quiero pedir Big.");
  });
  it("incluye la variante", () => {
    expect(productMessage("Cheese Burger", "Doble")).toContain("Cheese Burger doble");
  });
});
