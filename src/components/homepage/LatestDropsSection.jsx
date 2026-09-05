"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ProductCard from "@/components/shared/ProductCard";
import { antonFont } from "@/lib/fonts";

const DATA_URL = "https://demon-web-shop.vercel.app/data.json";

// Stagger the cards in one after another as the section scrolls into view.
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const LatestDropsSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch + filter to latest:true items, capped at 4
  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      try {
        const res = await fetch(DATA_URL);
        const data = await res.json();
        const latestItems = data
          .filter((item) => item.latest === true)
          .slice(0, 4);
        if (!ignore) setProducts(latestItems);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchData();
    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return (
      <section className="w-full py-20 bg-white flex items-center justify-center">
        <span className="text-xs font-bold uppercase tracking-widest text-black/40">
          Loading drops...
        </span>
      </section>
    );
  }

  if (!products.length) return null;

  return (
    <section className="relative w-full py-16 md:py-20 bg-white">
      <div className="px-6 md:px-10 mb-10 flex items-end justify-between">
        <div>
          <p className={`${antonFont.className} text-xs font-bold uppercase tracking-widest text-red-600 mb-2`}>
            Collection // The_Origin_Drop
          </p>
          <h2 className={`${antonFont.className} font-black uppercase text-black text-4xl md:text-6xl leading-none`}>
            Latest_Drops
          </h2>
        </div>

        <Link
          href="/drop"
          className={`${antonFont.className} hidden md:inline-block border border-black px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-black hover:bg-black hover:text-white transition-colors duration-200`}
        >
          View_All
        </Link>
      </div>

      {/* --- Mobile: native scroll-snap swiper (below sm breakpoint) --- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sm:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 pl-6 pr-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {products.map((product) => (
          <div key={product.id} className="snap-center shrink-0 w-[78%]">
            <ProductCard product={product} />
          </div>
        ))}
      </motion.div>

      {/* --- sm and up: normal grid --- */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="hidden sm:grid px-6 md:px-10 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12"
      >
        {products.map((product) => (
          <motion.div key={product.id} variants={cardVariant}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default LatestDropsSection;