"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { antonFont } from "@/lib/fonts";

const DATA_URL = "https://demon-web-shop.vercel.app/data.json";
const IMAGE_BASE = "https://demon-web-shop.vercel.app";

const FILTERS = ["All", "Front", "Back", "On Model"];

const resolveImage = (src) =>
  src?.startsWith("http") ? src : `${IMAGE_BASE}${src}`;

const gridContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const gridItem = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const LookBookPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      try {
        const res = await fetch(DATA_URL);
        const data = await res.json();
        if (!ignore) setProducts(data);
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

  const lookbookImages = useMemo(() => {
    return products.flatMap((product) => {
      const { id, name, images } = product;
      const entries = [];

      if (images?.[0]) {
        entries.push({ key: `${id}-front`, id, name, type: "Front", src: images[0] });
      }
      if (images?.[1]) {
        entries.push({ key: `${id}-back`, id, name, type: "Back", src: images[1] });
      }
      if (images?.[3]) {
        entries.push({ key: `${id}-model`, id, name, type: "On Model", src: images[3] });
      }

      return entries;
    });
  }, [products]);

  const filteredImages = useMemo(() => {
    if (activeFilter === "All") return lookbookImages;
    return lookbookImages.filter((img) => img.type === activeFilter);
  }, [lookbookImages, activeFilter]);

  return (
    <main className="w-full bg-white">
      <section className="relative w-full bg-black overflow-hidden">
        <div className="relative px-6 md:px-10 pt-32 md:pt-40 pb-10 md:pb-12">
          <span className="pointer-events-none select-none absolute top-24 md:top-32 right-6 md:right-10 text-white/4 font-black text-8xl md:text-9xl leading-none">
            2024
          </span>

          <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-red-500 mb-4">
            The_Origin_Drop // Editorial
          </p>

          <h1 className={`${antonFont.className} font-black uppercase text-white  text-4xl sm:text-5xl md:text-7xl max-w-4xl`}>
            Anime Streetwear —
            <br />
            Look
            <br />
            Book
          </h1>

          <p className="mt-6 text-sm md:text-base text-white/50">
            The Origin Drop, The Full Visual Archive
          </p>
        </div>

        <div className="border-t border-white/15" />

        <div className="px-6 md:px-10 py-4 flex flex-col sm:flex-row gap-2 sm:gap-0 items-start sm:items-center justify-between text-[11px] md:text-xs font-bold uppercase tracking-widest text-white/50">
          <span>
            {loading ? "—" : products.length} Pieces // The_Origin_Drop
          </span>
          <span>Anime Streetwear // Australia</span>
        </div>
      </section>

      <section className="px-6 md:px-10 py-10">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-8">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-[11px] md:text-xs font-bold uppercase tracking-widest border transition-colors duration-200 ${
                  activeFilter === filter
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-black/20 hover:border-black"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <span className="text-[11px] md:text-xs font-bold uppercase tracking-widest text-black/40">
            {filteredImages.length} Images
          </span>
        </div>

        {loading ? (
          <div className="py-24 flex items-center justify-center">
            <span className="text-xs font-bold uppercase tracking-widest text-black/40">
              Loading...
            </span>
          </div>
        ) : (
          <motion.div
            key={activeFilter}
            variants={gridContainer}
            initial="hidden"
            animate="show"
            className="columns-1 sm:columns-2 lg:columns-3 gap-1"
          >
            {filteredImages.map((img, index) => (
              <Link
                key={img.key}
                href={`/collection/${img.id}`}
                className="group block mb-1 break-inside-avoid"
              >
                <motion.div
                  variants={gridItem}
                  className={`relative overflow-hidden bg-neutral-100 ${
                    index % 3 === 1 ? "aspect-[3/4.6]" : "aspect-3/4"
                  }`}
                >
                  <Image
                    src={resolveImage(img.src)}
                    alt={`${img.name} — ${img.type}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white text-xs font-bold uppercase tracking-widest">
                      {img.name}
                    </p>
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">
                      {img.type}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        )}
      </section>

      <section className="w-full mt-10 bg-black py-20 md:py-28 flex flex-col items-center justify-center text-center px-6">
        <h2 className={`${antonFont.className} font-black uppercase text-white text-4xl sm:text-5xl md:text-6xl leading-none mb-4`}>
          Shop The Collection
        </h2>
        <p className="font-mono text-sm md:text-base text-white/40 mb-8">
          Every piece from The Origin Drop, limited stock.
        </p>
        <Link
          href="/collection"
          className="bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest text-sm px-10 py-4 transition-colors duration-200"
        >
          Shop Now
        </Link>
      </section>
    </main>
  );
};

export default LookBookPage;