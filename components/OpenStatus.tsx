"use client";

import { useOpenStatus } from "@/lib/use-open-status";

export function OpenStatus({ className = "" }: { className?: string }) {
  const status = useOpenStatus();
  return (
    <p
      role="status"
      className={`inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-ink/70 px-4 text-sm font-bold backdrop-blur ${className}`}
    >
      <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${status?.open ? "bg-green-400" : "bg-cream/50"}`} />
      {status ? status.label : "Mirá los horarios"}
    </p>
  );
}
