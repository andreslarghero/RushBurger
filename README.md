# Rush Burgers — sitio web

Next.js (App Router) + TypeScript estricto + Tailwind. Sin base de datos ni pagos: el cliente arma su pedido en el menú (pestañas Todo, Burgers, Guarniciones, Extras y Bebidas) y se abre WhatsApp con el detalle, la modalidad, la zona y la dirección. Rush confirma disponibilidad y total; el sitio nunca muestra "pedido confirmado".

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck && npm run lint && npm test && npm run build
```

## Actualizar contenido
- `data/brand.ts`: contacto, horarios, modalidades. Lo `null` está pendiente y no se muestra.
- `data/menu.ts`: productos. `priceUYU: null` muestra "Consultá precio"; `publishable: false` oculta un producto.
- Imágenes provisionales en `public/provisional/` (baja resolución, de Instagram, sin autorización formal): reemplazar por originales y actualizar rutas en los datos.
- Video del hero: completar `heroVideo` en `data/brand.ts` cuando existan los archivos (ver `docs/video-shotlist.md`). Todavía no hay componente de video: se agrega con pausa accesible al recibir el material.

## Documentos
`docs/brand-audit.md`, `docs/assets-manifest.md`, `docs/foda.md`, `docs/video-shotlist.md`.

## Pendiente
Ver la lista al final de `docs/brand-audit.md` (localidad Pinamar/Neptunia, dirección, delivery, pagos, precios vigentes, carta completa, logo y fotos originales). `metadataBase` y la imagen Open Graph quedan sin dominio hasta que exista uno real. No se ha publicado ni desplegado nada.
