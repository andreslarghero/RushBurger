/** Rayo decorativo genérico (no es el logo de la marca). */
export function Bolt({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 160" className={className} fill="currentColor">
      <path d="M62 0 8 90h36l-12 70L92 62H55z" />
    </svg>
  );
}
