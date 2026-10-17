import { About } from "@/components/About";
import { Checkout } from "@/components/Checkout";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Hours } from "@/components/Hours";
import { Menu } from "@/components/Menu";
import { MobileBar } from "@/components/MobileBar";
import { brand } from "@/data/brand";

// Sólo datos confirmados: sin dirección, rating ni url canónica.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: brand.name,
  telephone: `+${brand.whatsappNumber}`,
  sameAs: [brand.instagram.url],
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Thursday"], opens: "20:00", closes: "23:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Friday", "Saturday", "Sunday"], opens: "20:00", closes: "00:00" },
  ],
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="pb-24 sm:pb-0">
        <Hero />
        <Menu />
        <Hours />
        <About />
      </main>
      <Footer />
      <MobileBar />
      <Checkout />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
