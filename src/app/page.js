import HeroSection from "@/components/homepage/HeroSection";
import LatestDropsSection from "@/components/homepage/LatestDropsSection";
import ManifestoSection from "@/components/homepage/ManifestoSection";
import SaleSection from "@/components/homepage/SaleSection";
import Image from "next/image";

export default function Home() {
  return (
    <div>
    <HeroSection/>
    <SaleSection/>
    <LatestDropsSection/>
    <ManifestoSection/>
    </div>
  );
}
