/**
 * Carta de Rush. Fuentes: destacados "Menú" y "Burgers" de @rushburger.uy (jul 2026) y capturas del catálogo de
 * WhatsApp de Rush (compartidas por el usuario el 2026-10-17); coinciden en precios. Precios en UYU. Pueden haber cambiado: el sitio avisa que se confirman al pedir.
 */
export type PriceOption = { label: string; amountUYU: number };

export type Product = {
  id: string;
  name: string;
  /** Descripción publicada por el comercio. */
  description: string;
  options: PriceOption[];
  image?: { src: string; width: number; height: number; alt: string };
  note?: string;
  /** Miniatura del catálogo de WhatsApp de Rush (74×74, provisional). */
  thumb?: string;
};

const photo = (id: string, alt: string) => ({ src: `/products/${id}.jpg`, width: 480, height: 853, alt });

export const burgers: Product[] = [
  {
    id: "cheese",
    name: "Cheese",
    description: "Carne 100 g, cheddar, ketchup y mayonesa.",
    options: [{ label: "Simple", amountUYU: 360 }, { label: "Doble", amountUYU: 420 }],
    image: photo("cheese", "Hamburguesa Cheese con doble carne smash, cheddar, ketchup y mayonesa"),
  },
  {
    id: "cuarto",
    name: "Cuarto",
    description: "Carne 100 g, cheddar, cebolla en brunoise, ketchup, mayonesa y un toque de mostaza.",
    options: [{ label: "Simple", amountUYU: 400 }, { label: "Doble", amountUYU: 460 }],
    image: photo("cuarto", "Hamburguesa Cuarto con cheddar, cebolla morada, ketchup y mostaza"),
  },
  {
    id: "american",
    name: "American",
    description: "Carne 100 g, cheddar, lechuga, tomate, cebolla en juliana y salsa Rush.",
    options: [{ label: "Simple", amountUYU: 400 }, { label: "Doble", amountUYU: 460 }],
    image: photo("american", "Hamburguesa American con lechuga, tomate, cebolla y salsa Rush"),
  },
  {
    id: "chimi",
    name: "Chimi",
    description: "Carne 100 g, cheddar, huevo frito, panceta y mayochimi.",
    options: [{ label: "Simple", amountUYU: 400 }, { label: "Doble", amountUYU: 460 }],
    image: photo("chimi", "Hamburguesa Chimi con cheddar, huevo frito y panceta"),
  },
  {
    id: "oklahoma",
    name: "Oklahoma",
    description: "Carne 100 g, cheddar, cebolla smasheada, panceta y salsa Rush.",
    options: [{ label: "Simple", amountUYU: 400 }, { label: "Doble", amountUYU: 460 }],
    image: photo("oklahoma", "Hamburguesa Oklahoma con cebolla smasheada y cheddar"),
  },
  {
    id: "crispy",
    name: "Crispy",
    description: "Carne 100 g, cheddar, panceta, cebolla crispy y honey mustard.",
    options: [{ label: "Simple", amountUYU: 440 }, { label: "Doble", amountUYU: 500 }],
    image: photo("crispy", "Hamburguesa Crispy con panceta, cebolla crispy y honey mustard"),
  },
  {
    id: "caprese",
    name: "Caprese",
    description: "Carne 100 g, queso parrillero, tomate cherry, albahaca y alioli.",
    options: [{ label: "Simple", amountUYU: 420 }, { label: "Doble", amountUYU: 480 }],
    image: photo("caprese", "Hamburguesa Caprese con queso parrillero, tomate cherry y albahaca"),
  },
  {
    id: "big",
    name: "Big",
    description: "Carne 100 g, queso emmental, mermelada de panceta y salsa Emmy.",
    options: [{ label: "Simple", amountUYU: 490 }, { label: "Doble", amountUYU: 550 }],
    image: photo("big", "Hamburguesa Big con queso emmental y mermelada de panceta"),
  },
  {
    id: "kid",
    name: "Kid",
    description: "Burger con cheddar, mayonesa y fritas, o 6 nuggets con fritas.",
    options: [{ label: "Burger", amountUYU: 350 }, { label: "Nuggets", amountUYU: 250 }],
  },
];

export const burgerNotes = [
  "Todas las burgers vienen con papas.",
  "Veggie: cualquiera de las burgers se puede pedir en versión veggie, sin costo extra.",
];

const t = (n: string) => `/products/thumbs/${n}.png`;
const one = (id: string, name: string, amountUYU: number, thumb?: string, description = ""): Product => ({
  id, name, description, options: [{ label: "Precio", amountUYU }], thumb: thumb ? t(thumb) : undefined,
});

export const sides: Product[] = [
  one("fritas", "Porción de fritas", 200, "fritas"),
  one("fritas-cheddar", "Porción de fritas + cheddar", 260, "fritas-cheddar"),
  one("fritas-cheddar-panceta", "Porción de fritas con cheddar y panceta", 300, "fritas-cheddar-panceta"),
  one("rusticas", "Porción de rústicas", 250, "rusticas"),
  one("rusticas-cheddar", "Porción de rústicas con cheddar", 300, "rusticas-cheddar"),
  one("rusticas-cheddar-panceta", "Porción de rústicas con cheddar y panceta", 350, "rusticas-cheddar-panceta"),
  one("fritas-rush", "Fritas Rush", 400, "fritas-rush", "Fritas, burger con cheddar, panceta y salsa Rush."),
  one("aros", "Aros de cebolla", 140, "aros"),
  one("muzza", "Bastones de muzzarella", 250, "muzza", "10 bastones de muzzarella."),
];

export const extras: Product[] = [
  one("extra-carne", "Extra carne", 80, "extra-carne"),
  one("extra-cheddar", "Extra cheddar (burger)", 50, "extra-cheddar"),
  one("extra-panceta", "Extra panceta (burger)", 50, "extra-panceta"),
  one("extra-cheddar-fritas", "Extra cheddar (fritas)", 60, "papas-cheddar"),
  one("extra-cheddar-panceta-fritas", "Extra cheddar y panceta (fritas)", 100, "papas-cheddar-panceta"),
];

/** Latas y refrescos. El catálogo no muestra precio para Paso de los Toros, Mirinda y 7Up 1,5 L: se usa el de la lámina "Menú" ($200). */
export const drinks: Product[] = [
  one("pepsi", "Lata de Pepsi", 80, "pepsi"),
  one("pepsi-black", "Lata Pepsi Black", 80, "pepsi-black"),
  one("guarana", "Lata de Guaraná", 80, "guarana"),
  one("pepsi-15", "Pepsi 1,5 L", 200, "pepsi-15"),
  one("pepsi-black-15", "Pepsi Black 1,5 L", 200, "pepsi-black-15"),
  one("paso-15", "Paso de los Toros 1,5 L", 200, "paso-15"),
  one("mirinda-15", "Mirinda 1,5 L", 200, "mirinda-15"),
  one("7up-15", "7Up 1,5 L", 200, "7up-15"),
];

export const formatUYU = (n: number) => `$${n.toLocaleString("es-UY")}`;
