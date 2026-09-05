"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Layers,
  Shirt,
  Droplets,
  Palette,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { antonFont } from "@/lib/fonts";
import { ArrowRight, Heart } from "@gravity-ui/icons";

// Change this if your product images live in the local /public folder
// instead of being served from the API's own domain.
const IMAGE_BASE = "https://demon-web-shop.vercel.app";

// Static size-guide measurements (cm) — the API has no per-size
// measurement data, so this mirrors the reference design as a fixed
// reference table for all products.
const SIZE_GUIDE = [
  { size: "XS", chest: 42, length: 66, shoulder: 42 },
  { size: "S", chest: 47, length: 68, shoulder: 44 },
  { size: "M", chest: 52, length: 70, shoulder: 46 },
  { size: "L", chest: 57, length: 72, shoulder: 48 },
  { size: "XL", chest: 62, length: 74, shoulder: 50 },
  { size: "XXL", chest: 67, length: 76, shoulder: 52 },
];

const resolveImage = (src) =>
  src?.startsWith("http") ? src : `${IMAGE_BASE}${src}`;

// The `details` string always ends with the same handful of standard
// facts ("240gsm heavyweight cotton. Oversized fit. Garment washed.
// Anime graphic screenprint.") — pull those out into a proper spec
// grid instead of just dumping the whole sentence as a paragraph.
const extractSpecs = (detailLines) => {
  const find = (keyword) =>
    detailLines.find((l) => l.toLowerCase().includes(keyword));

  return [
    { icon: Layers, label: "Fabric", value: find("gsm") },
    { icon: Shirt, label: "Fit", value: find("fit") },
    { icon: Droplets, label: "Wash", value: find("washed") },
    { icon: Palette, label: "Print", value: find("screenprint") },
  ].filter((s) => s.value);
};

const ProductDetailsClient = ({ product }) => {
  const { name, ColorWay, price, qty, size, details, images, type } = product;

  const [selectedSize, setSelectedSize] = useState(null);
  const [openSection, setOpenSection] = useState(null); // "size" | "shipping" | null
  const [activeImage, setActiveImage] = useState(0);

  const imageBoxRef = useRef(null);
  const activeImageRef = useRef(0);
  const lockedRef = useRef(false);

  const inStock = qty > 0;
  const detailLines = details
    .split(". ")
    .map((line) => line.trim().replace(/\.$/, ""))
    .filter(Boolean);
  const storyLine = detailLines[0]; // the one creative/descriptive sentence
  const specs = extractSpecs(detailLines);

  const toggleSection = (section) =>
    setOpenSection((prev) => (prev === section ? null : section));

  // Keep a ref mirror of activeImage so the wheel handler (added once,
  // not re-bound on every image change) always reads the latest value.
  useEffect(() => {
    activeImageRef.current = activeImage;
  }, [activeImage]);

  // Image changes ONLY when the wheel/trackpad is used directly over
  // the image box — normal page scroll everywhere else is untouched.
  // One wheel "tick" moves exactly one image (locked for a short
  // cooldown so a trackpad's burst of tiny delta events doesn't skip
  // 2-3 images at once). At the first/last image, scrolling further
  // in that direction is NOT captured, so the page scrolls normally.
  useEffect(() => {
    const box = imageBoxRef.current;
    if (!box || images.length < 2) return;

    const handleWheel = (e) => {
      const goingForward = e.deltaY > 0;
      const atStart = activeImageRef.current === 0;
      const atEnd = activeImageRef.current === images.length - 1;

      // Let the page scroll normally past this element at the edges.
      if ((goingForward && atEnd) || (!goingForward && atStart)) {
        return;
      }

      e.preventDefault();
      if (lockedRef.current) return;

      lockedRef.current = true;
      setActiveImage((prev) =>
        goingForward
          ? Math.min(images.length - 1, prev + 1)
          : Math.max(0, prev - 1)
      );

      setTimeout(() => {
        lockedRef.current = false;
      }, 550);
    };

    box.addEventListener("wheel", handleWheel, { passive: false });
    return () => box.removeEventListener("wheel", handleWheel);
  }, [images.length]);

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-300 mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-black/45 mb-10">
          <Link
            href="/collection"
            className="hover:text-black transition-colors uppercase tracking-widest font-bold"
          >
            All
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-black/70 uppercase tracking-widest font-bold">
            {name}
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* ---------------- Sticky scroll-crossfade gallery ---------------- */}
          <div className="lg:sticky lg:top-24 self-start">
            <div
              ref={imageBoxRef}
              className="relative aspect-4/5 overflow-hidden bg-neutral-100 border-t-4 border-red-600"
            >
              {images.map((img, i) => (
                <div
                  key={i}
                  className="absolute inset-0 transition-opacity duration-500 ease-out"
                  style={{ opacity: activeImage === i ? 1 : 0 }}
                >
                  <Image
                    src={resolveImage(img)}
                    alt={`${name} ${i + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={i === 0}
                    className="object-cover"
                  />
                </div>
              ))}

              <span className="absolute top-5 left-5 text-[10.5px] font-bold tracking-widest uppercase bg-white/90 text-black px-3 py-1.5">
                {ColorWay}
              </span>

              {/* Progress dots — reflect scroll position, not clickable */}
              {images.length > 1 && (
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeImage === i
                          ? "w-6 bg-white"
                          : "w-1.5 bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ---------------- Details ---------------- */}
          <div>
            <p className="text-red-600 text-xs font-bold tracking-widest uppercase mb-3">
              {type}
            </p>
            <h1 className={`${antonFont.className} text-black font-black text-4xl md:text-5xl leading-none tracking-tight mb-3`}>
              {name}
            </h1>
            <p className={`${antonFont.className} text-2xl font-bold text-black mb-5`}>${price}</p>

            <div className="flex items-center gap-2 mb-6">
              <span
                className={`w-2 h-2 rounded-full ${
                  inStock ? "bg-amber-500" : "bg-red-500"
                }`}
              />
              <span className="text-xs font-bold uppercase tracking-widest text-black/60">
                {inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {storyLine && (
              <p className="text-black/55 text-sm leading-relaxed mb-8">
                {storyLine}.
              </p>
            )}

            {/* Size + actions */}
            <p className={`${antonFont.className} text-xs font-bold uppercase tracking-widest text-black mb-3`}>
              Select Size
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {size.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`w-14 h-14 border text-xs font-bold uppercase transition-colors duration-200 ${
                    selectedSize === s
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-black/20 hover:border-black"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className={`${antonFont.className} border border-black text-black text-xs font-bold uppercase tracking-widest py-3.5 flex items-center justify-center gap-1.5 hover:bg-black hover:text-white transition-colors duration-200`}>
                <Heart/> Wishlist
              </button>
              <button className={`${antonFont.className} bg-black text-white text-xs font-bold uppercase tracking-widest py-3.5 flex items-center justify-center gap-1.5 hover:bg-red-700 transition-colors duration-200`}>
                Add to Cart <ArrowRight></ArrowRight>
              </button>
            </div>

            {/* Specification grid */}
           

            {/* Product Details accordion trigger-free section */}
            <div className="mt-10 pt-8 border-t border-black/10">
              <h2 className={`${antonFont.className} text-xs font-bold tracking-widest uppercase text-black/50 mb-4`}>
                Product Details
              </h2>
              <p className="text-sm text-black/60 leading-relaxed">
                {details}
              </p>
            </div>

            {/* Accordion: Size Guide */}
            <AccordionRow
              title="Size Guide"
              isOpen={openSection === "size"}
              onToggle={() => toggleSection("size")}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-black/10 text-left text-black/40 text-xs uppercase tracking-widest">
                      <th className="py-2 pr-4">Size</th>
                      <th className="py-2 pr-4">Chest (flat)</th>
                      <th className="py-2 pr-4">Length</th>
                      <th className="py-2">Shoulder</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SIZE_GUIDE.map((row) => (
                      <tr key={row.size} className="border-b border-black/5">
                        <td className="py-2 pr-4 font-bold text-red-600">
                          {row.size}
                        </td>
                        <td className="py-2 pr-4 text-black/70">
                          {row.chest}
                        </td>
                        <td className="py-2 pr-4 text-black/70">
                          {row.length}
                        </td>
                        <td className="py-2 text-black/70">{row.shoulder}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-black/50 border-l-2 border-black pl-3">
                Oversized fit — size down if between sizes. Garment
                measurements in cm.
              </p>
            </AccordionRow>

            {/* Accordion: Shipping & Returns */}
            <AccordionRow
              title="Shipping & Returns"
              isOpen={openSection === "shipping"}
              onToggle={() => toggleSection("shipping")}
            >
              <div className="text-sm text-black/60 space-y-1.5">
                <p>Free shipping on orders over $100.</p>
                <p>Standard delivery: 3-5 business days.</p>
                <p>Express: 1-2 business days.</p>
                <p>Returns accepted within 14 days, unworn.</p>
              </div>
            </AccordionRow>

            {/* Trust badges */}
           
          </div>
        </div>
      </div>
    </div>
  );
};

const AccordionRow = ({ title, isOpen, onToggle, children }) => {
  return (
    <div className="mt-10 pt-8 border-t border-black/10">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between"
      >
        <span className={`${antonFont.className} text-xs font-bold uppercase tracking-widest text-black`}>
          {title}
        </span>
        <span className="w-7 h-7 border border-red-500 text-red-500 flex items-center justify-center text-sm font-bold">
          {isOpen ? "-" : "+"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetailsClient;