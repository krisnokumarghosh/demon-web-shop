"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { antonFont } from "@/lib/fonts";

const aboutItems = [
  {
    label: "What Demon Is",
    text: "Demon Web Shop is an Australian anime streetwear brand.",
  },
  {
    label: "Founded",
    text: "Demon Web Shop was founded in 2024.",
  },
  {
    label: "What We Make",
    text: "Demon Web Shop makes limited-edition anime-inspired graphic tees in 100% heavyweight 240gsm cotton.",
  },
  {
    label: "Shipping",
    text: "Demon Web Shop ships Australia-wide, with free shipping on orders over $100 and standard delivery in 1-2 weeks.",
  },
  {
    label: "Restocks",
    text: "Demon Web Shop products are limited edition. There are no restocks, ever — once a piece sells out it is gone for good.",
  },
  {
    label: "Pricing",
    text: "Demon Web Shop tees are $39.99, with selected pieces on sale at $33.99.",
  },
  {
    label: "Influences",
    text: "Demon Web Shop draws on samurai discipline, Japanese iconography and modern anime art.",
  },
  {
    label: "Based In",
    text: "Demon Web Shop is based in Australia and ships to every Australian state and territory, including Sydney, Melbourne, Brisbane, Perth and Adelaide.",
  },
  {
    label: "Anime Inspiration",
    text: "Demon Web Shop designs are inspired by series including Jujutsu Kaisen, Demon Slayer, Naruto, One Piece and Dragon Ball, alongside original samurai artwork. Anime character artwork is licensed for commercial use.",
  },
  {
    label: "Next Drop",
    text: "The Origin Drop is in stock and shipping now, with selected pieces on sale at 15% off.",
  },
];

// Shared stagger/entrance variants used across the page's sections.
const fadeUpContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const OurStoryPage = () => {
  return (
    <main className="w-full bg-black text-white">
      {/* ---------------- 1. Hero ---------------- */}
      <section className="px-6 md:px-10 pt-32 md:pt-40 pb-16 md:pb-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUpContainer}
          className="max-w-4xl mx-auto "
        >
          <motion.p
            variants={fadeUpItem}
            className="text-red-500 text-xs font-bold uppercase tracking-[0.3em] mb-3"
          >
            About // Demon
          </motion.p>
          <motion.span
            variants={fadeUpItem}
            className="block w-10 h-0.5 bg-red-500 mb-8"
          />

          <motion.h1
            variants={fadeUpItem}
            className={`${antonFont.className} font-black uppercase  text-4xl sm:text-5xl md:text-7xl mb-12`}
          >
            Anime Streetwear Australia <br />
            Born From The Warrior Spirit.
          </motion.h1>

          <motion.div
            variants={fadeUpContainer}
            className="space-y-6 font-mono text-sm md:text-base text-white/60 leading-relaxed max-w-2xl"
          >
            <motion.p variants={fadeUpItem}>
              Demon began with one belief: what you wear should tell a story.
            </motion.p>
            <motion.p variants={fadeUpItem}>
              Inspired by samurai discipline, anime art and modern street
              culture, we create premium streetwear for those who choose their
              own path.
            </motion.p>
            <motion.p variants={fadeUpItem}>
              Every Demon piece combines Japanese-inspired artwork, powerful
              symbolism and oversized silhouettes to express courage, creativity
              and individuality.
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* ---------------- 2. Quote + CTA ---------------- */}
      <section className="px-6 md:px-10 pb-20 md:pb-28">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUpContainer}
          className="max-w-4xl mx-auto "
        >
          <motion.blockquote
            variants={fadeUpItem}
            className="border-l-2 border-red-600 pl-5 md:pl-6 mb-10 text-left"
          >
            <p className="font-mono italic text-sm md:text-base text-white/70 leading-relaxed">
              Demon is more than a name on a shirt. It represents the warrior
              within, the part of us that keeps moving forward, stays true to
              itself and refuses to fade into the crowd.
            </p>
          </motion.blockquote>

          <motion.p
            variants={fadeUpItem}
            className="font-mono text-sm md:text-base text-white/60 leading-relaxed mb-10"
          >
            We design for the dreamers, fighters, creators and outsiders shaping
            their own future.
          </motion.p>

          <motion.h2
            variants={fadeUpItem}
            className={`${antonFont.className} font-black uppercase text-2xl sm:text-3xl md:text-4xl leading-tight mb-8`}
          >
            Wear Your Story. Wear Your Spirit. Wear Demon.
          </motion.h2>

          <motion.p
            variants={fadeUpItem}
            className="text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-8"
          >
            For The Dreamers. Fighters. Creators. Outsiders.
          </motion.p>

          <motion.div variants={fadeUpItem}>
            <Link
              href="/collection"
              className="inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest text-white border-b border-white pb-1 hover:text-red-500 hover:border-red-500 transition-colors duration-200"
            >
              Explore The Collection &rarr;
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <div className="border-t border-white/10" />

      {/* ---------------- 3. About (structured facts) ---------------- */}
      <section className="px-6 md:px-10 py-16 md:py-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            variants={fadeUpItem}
            className={`${antonFont.className} font-black uppercase text-2xl sm:text-3xl md:text-4xl mb-10 md:mb-12`}
          >
            About Demon
          </motion.h2>

          <div className="w-full divide-y divide-white/10">
            {aboutItems.map((item) => (
              <motion.div
                key={item.label}
                variants={fadeUpItem}
                className="py-5"
              >
                <p className="text-red-500 text-[11px] font-bold uppercase tracking-[0.2em] mb-2">
                  {item.label}
                </p>
                <p className="font-mono text-sm md:text-[15px] text-white/60 leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default OurStoryPage;
