import { brand } from "@/data/brand";
import { whatsappLink } from "@/lib/whatsapp";

export function OrderButton({
  message,
  label = "Pedí por WhatsApp",
  variant = "solid",
  className = "",
}: {
  message?: string;
  label?: string;
  variant?: "solid" | "outline";
  className?: string;
}) {
  const style =
    variant === "solid"
      ? "bg-rush text-ink hover:bg-cream"
      : "border-2 border-current hover:bg-cream hover:text-ink";
  return (
    <a
      href={whatsappLink(brand.whatsappNumber, message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 text-base font-bold transition-colors ${style} ${className}`}
    >
      {label}
      <span className="sr-only"> (abre WhatsApp en una pestaña nueva)</span>
    </a>
  );
}
