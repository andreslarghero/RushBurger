"use client";

import { useOpenStatus } from "@/lib/use-open-status";

export function OpenStatus({ className = "", bare = false }: { className?: string; bare?: boolean }) {
  const status = useOpenStatus();
  return (
    <p
      role="status"
      className={`inline-flex items-center gap-2 text-sm font-bold ${bare ? "" : "min-h-11 rounded-full border border-white/20 bg-ink/70 px-4 backdrop-blur"} ${className}`}
    >
      <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${status?.open ? "bg-green-400" : "bg-cream/50"}`} />
      {status ? status.label : "Mirá los horarios"}
    </p>
  );
}
