export function whatsappLink(number: string, message?: string): string {
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function productMessage(productName: string, variant?: string): string {
  const item = variant ? `${productName} ${variant.toLowerCase()}` : productName;
  return `Hola Rush! Quiero pedir ${item}. ¿Me confirman disponibilidad, precio y tiempo de entrega?`;
}
