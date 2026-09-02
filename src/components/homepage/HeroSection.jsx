import Link from "next/link";
import { ArrowRight } from "@gravity-ui/icons";
import Marquee from "./Marquee";

const HeroSection = () => {
  return (
    // mt-10 pushes the hero below the 40px (h-10) marquee bar.
    // h-[calc(100vh-2.5rem)] makes marquee + hero add up to exactly one viewport.
    <section className="relative mt-10 h-[calc(100vh-2.5rem)] w-full overflow-hidden bg-black">
      <Marquee />

      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay so text stays readable over any footage */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/40" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-20 md:px-10 md:pb-28">
        <div className="flex items-center gap-2 mb-4">
          <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
          <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-red-500">
            The_Origin_Drop // Live Now
          </span>
        </div>

        <h1 className="font-black uppercase text-white leading-[0.9] text-5xl sm:text-6xl md:text-7xl lg:text-8xl max-w-2xl">
          Wear Your
          <br />
          Story
        </h1>

        <Link href="/drop" className="mt-8 w-fit">
          <span className="group inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold uppercase text-sm tracking-widest px-6 py-3.5 transition-colors duration-200">
            Shop The Drop
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;