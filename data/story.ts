/**
 * Historia pública de Rush, tomada de los captions de @rushburger.uy (jul–oct 2026).
 * Imágenes provisionales: ver docs/assets-manifest.md.
 */
export type StoryItem = {
  date: string;
  title: string;
  text: string;
  image: { src: string; width: number; height: number; alt: string };
  link?: { href: string; label: string };
};

export const story: StoryItem[] = [
  {
    date: "10 de julio de 2026",
    title: "Algo se está activando",
    text: "Energía, antojo y mucha burger: Rush empieza a tomar forma.",
    image: { src: "/provisional/proximamente-2026-07-10.jpg", width: 512, height: 640, alt: "Un hombre con gorra naranja de Rush muerde una hamburguesa, con rayos naranjas alrededor" },
  },
  {
    date: "14 de julio de 2026",
    title: "Rush empieza a tener cara",
    text: "Los personajes de Rush llegan para estar en pedidos, packaging e historias.",
    image: { src: "/provisional/personajes-2026-07-14.jpg", width: 512, height: 640, alt: "Pins de los personajes de Rush sobre una gorra naranja: un chico con gorra, un rayo con hamburguesa y una burger" },
  },
  {
    date: "22 de julio de 2026",
    title: "¿Listo para recargar energía?",
    text: "La cuenta regresiva seguía y el antojo ya se olía.",
    image: { src: "/provisional/cuenta-regresiva-2026-07-22.jpg", width: 512, height: 640, alt: "Hamburguesa con queso, huevo frito y panceta sobre fondo negro, con el texto Listo para recargar energía" },
  },
  {
    date: "24 de julio de 2026",
    title: "Se activa Rush",
    text: "Llegó el gran día: burgers, energía y promo de apertura para que el primer bajón viniera fuerte.",
    image: { src: "/provisional/apertura-2026-07-24.jpg", width: 512, height: 640, alt: "Cartel Hoy se activa Rush, en negro y naranja sobre fondo crema" },
  },
  {
    date: "8 de septiembre de 2026",
    title: "TDHA: Tengo Demasiada Hambre",
    text: "Diagnóstico: TDHA. Tratamiento: una RUSH cada 8 horas.",
    image: { src: "/provisional/tdha-reel-poster-2026-09-08.jpg", width: 360, height: 640, alt: "Carne smash sobre la plancha humeante, con la frase Tengo Demasiada Hambre" },
    link: { href: "https://www.instagram.com/rushburger.uy/reel/DdDCIfQAnB-/", label: "Mirá el reel en Instagram" },
  },
  {
    date: "12 de octubre de 2026",
    title: "Una de las favoritas: la Big",
    text: "Carne smash, queso emmental, mermelada de panceta y salsa Emmy.",
    image: { src: "/provisional/big-2026-10-12.jpg", width: 512, height: 640, alt: "Hamburguesa Big sobre fondo naranja y negro" },
  },
];
