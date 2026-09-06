"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { antonFont } from "@/lib/fonts";

// Swap this for your own image path (place the file in /public/images/).
const BACKGROUND_IMAGE = "/images/banner-2.jpg";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const ManifestoSection = () => {
  return (
    <section className="relative w-full min-h-[85vh] md:min-h-screen overflow-hidden bg-black">
      {/* Background image — replace BACKGROUND_IMAGE above with your own path */}
      <Image
        src={BACKGROUND_IMAGE}
        alt="The Zenji Ethos"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Dark overlay — stronger on the left where the text sits, fading
          out toward the right so the photography still reads clearly */}
      <div className="absolute inset-0 bg-linear-to-r from-black/95 via-black/60 to-black/20" />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/30" />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 h-full min-h-[85vh] md:min-h-screen flex items-center px-6 md:px-16"
      >
        <div className="max-w-xl">
          {/* Label + accent underline */}
          <motion.div variants={item} className="mb-5">
            <p className="text-red-600 text-xs font-bold uppercase tracking-[0.3em] mb-3">
              Manifesto_001
            </p>
            <span className="block w-10 h-0.5 bg-red-600" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={item}
            className={`${antonFont.className} font-black uppercase  text-6xl sm:text-7xl md:text-8xl tracking-tight`}
          >
            <span className="block text-white">The</span>
            <span className="block text-red-600">Zenji</span>
            <span className="block text-white">Ethos</span>
          </motion.h2>

          {/* Body copy */}
          <motion.p
            variants={item}
            className="mt-8 max-w-md font-mono text-sm md:text-[15px] leading-relaxed text-white/70"
          >
            We exist at the intersection of technical precision and cultural
            expression. Our garments are engineered for those navigating an
            increasingly fragmented world, built from Japanese craftsmanship,
            anime culture and modern Australian streetwear.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};

export default ManifestoSection;
