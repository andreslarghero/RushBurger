/** Horarios por día de semana (0 = domingo), en minutos desde 00:00. null = cerrado. Fuente: bio de Instagram. */
export const weekSchedule: ({ open: number; close: number } | null)[] = [
  { open: 20 * 60, close: 24 * 60 }, // domingo
  { open: 20 * 60, close: 23 * 60 + 30 }, // lunes
  { open: 20 * 60, close: 23 * 60 + 30 }, // martes
  null, // miércoles
  { open: 20 * 60, close: 23 * 60 + 30 }, // jueves
  { open: 20 * 60, close: 24 * 60 }, // viernes
  { open: 20 * 60, close: 24 * 60 }, // sábado
];

const fmt = (m: number) => `${String(Math.floor(m / 60) % 24).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

export function montevideoNow(date: Date): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Montevideo",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

export function getStatus(date: Date): { open: boolean; label: string; day: number } {
  const { day, minutes } = montevideoNow(date);
  const today = weekSchedule[day] ?? null;
  if (today && minutes >= today.open && minutes < today.close) {
    return { open: true, day, label: `Abierto ahora · cerramos a las ${fmt(today.close)}` };
  }
  if (today && minutes < today.open) {
    return { open: false, day, label: `Cerrado · abrimos hoy a las ${fmt(today.open)}` };
  }
  for (let i = 1; i <= 7; i++) {
    const next = weekSchedule[(day + i) % 7];
    if (next) {
      const when = i === 1 ? "mañana" : ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"][(day + i) % 7];
      return { open: false, day, label: `Cerrado · abrimos ${when} a las ${fmt(next.open)}` };
    }
  }
  return { open: false, day, label: "Cerrado" };
}
