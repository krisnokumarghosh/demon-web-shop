import HeroSection from "@/components/homepage/HeroSection";
import LatestDropsSection from "@/components/homepage/LatestDropsSection";
import SaleSection from "@/components/homepage/SaleSection";
import Image from "next/image";

export default function Home() {
  return (
    <div>
    <HeroSection/>
    <SaleSection/>
    <LatestDropsSection/>
    </div>
  );
}
