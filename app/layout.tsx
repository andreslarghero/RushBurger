import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import { brand } from "@/data/brand";
import "./globals.css";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const description = `${brand.slogan}. ${brand.modalities.join(" y ")}. Mirá el menú y pedí por WhatsApp.`;

export const metadata: Metadata = {
  title: `${brand.name} — ${brand.slogan}`,
  description,
  openGraph: {
    title: `${brand.name} — ${brand.slogan}`,
    description,
    locale: "es_UY",
    type: "website",
    images: [{ url: brand.heroImage.src, width: brand.heroImage.width, height: brand.heroImage.height, alt: brand.heroImage.alt }],
  },
};

export const viewport: Viewport = { themeColor: "#0b0b0b", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-UY" className={`${anton.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
