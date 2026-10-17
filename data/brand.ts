/**
 * Datos comerciales de Rush Burgers. Fuente: perfil de Instagram @rushburger.uy
 * (revisado 2026-10-17). Ver docs/brand-audit.md. Lo `null` está pendiente de confirmar:
 * no se muestra públicamente ni se reemplaza con texto inventado.
 */
export const brand = {
  name: "Rush Burgers",
  slogan: "Alta dosis de burger",
  instagram: { handle: "rushburger.uy", url: "https://www.instagram.com/rushburger.uy/" },
  /** Número internacional sin "+" (del enlace wa.me de la bio). */
  whatsappNumber: "59897700788",
  whatsappDisplay: "097 700 788",
  modalities: ["Take away", "Delivery"],
  openedOn: "24 de julio de 2026",
  /** Horarios según la bio. "Lun - Mar - jue" interpretado como lunes, martes y jueves. */
  hours: [
    { days: "Lunes y martes", time: "20:00 a 23:30" },
    { days: "Miércoles", time: "Cerrado" },
    { days: "Jueves", time: "20:00 a 23:30" },
    { days: "Viernes a domingo", time: "20:00 a 00:00" },
  ],
  /** Pendientes: contradicción Pinamar/Neptunia, dirección, zonas, costos, pagos. */
  address: null,
  /** Envíos según el destacado "Info" (jul 2026). Costo en UYU; 0 = gratis. */
  deliveryZones: [
    { zone: "Desde el peaje de Neptunia hasta El Fortín", costUYU: 0 },
    { zone: "El Pinar (hasta Pérez Butler)", costUYU: 70 },
    { zone: "Villa Argentina", costUYU: 50 },
    { zone: "Atlántida", costUYU: 80 },
    { zone: "Las Toscas", costUYU: 100 },
    { zone: "Estación Atlántida", costUYU: 120 },
    { zone: "Parque del Plata", costUYU: 150 },
  ],
  payments: null,
  /** Video del hero: pendiente (ver docs/video-shotlist.md). */
  heroVideo: null as null | { mobile: string; desktop: string; poster: string },
  heroImage: {
    src: "/provisional/big-2026-10-12.jpg",
    width: 512,
    height: 640,
    alt: "Hamburguesa Big sobre fondo naranja y negro",
  },
} as const;
