"use client";

import { useEffect, useState } from "react";
import { getStatus } from "./hours";

/** Estado abierto/cerrado según la hora de Montevideo; null hasta montar en el cliente. */
export function useOpenStatus() {
  const [status, setStatus] = useState<ReturnType<typeof getStatus> | null>(null);

  useEffect(() => {
    const tick = () => setStatus(getStatus(new Date()));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  return status;
}
