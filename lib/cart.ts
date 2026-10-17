"use client";

import { useSyncExternalStore } from "react";
import type { CartLine } from "./order";

type State = { lines: CartLine[]; open: boolean };

const EMPTY: State = { lines: [], open: false };
let state: State = EMPTY;
const listeners = new Set<() => void>();

const set = (next: State) => {
  state = next;
  listeners.forEach((l) => l());
};

export const cart = {
  subscribe(l: () => void) {
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  },
  get: () => state,
  getServer: () => EMPTY,
  /** Fija la cantidad de una línea; 0 la quita. */
  setQty(line: Omit<CartLine, "qty">, qty: number) {
    const rest = state.lines.filter((l) => l.id !== line.id);
    const lines = qty > 0 ? [...rest, { ...line, qty }] : rest;
    // Mantiene el orden en que se agregaron las líneas existentes.
    const ordered = state.lines.some((l) => l.id === line.id)
      ? state.lines.flatMap((l) => (l.id === line.id ? (qty > 0 ? [{ ...l, qty }] : []) : [l]))
      : lines;
    set({ ...state, lines: ordered, open: ordered.length === 0 ? false : state.open });
  },
  /** Suma o resta cantidad sobre el valor actual (seguro ante toques rápidos). */
  change(line: Omit<CartLine, "qty">, delta: number) {
    cart.setQty(line, Math.max(0, qtyOf(state, line.id) + delta));
  },
  clear: () => set({ lines: [], open: false }),
  openCheckout: () => set({ ...state, open: state.lines.length > 0 }),
  closeCheckout: () => set({ ...state, open: false }),
};

export const useCart = () => useSyncExternalStore(cart.subscribe, cart.get, cart.getServer);

export const qtyOf = (s: State, id: string) => s.lines.find((l) => l.id === id)?.qty ?? 0;
