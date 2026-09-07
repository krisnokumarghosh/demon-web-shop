"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ProductCard from "@/components/shared/ProductCard";
import { antonFont } from "@/lib/fonts";

const DATA_URL = "https://demon-web-shop.vercel.app/data.json";

const HERO_BACKGROUND = "/images/banner-2.jpg";

const DROP_DATE = new Date("2026-09-01T00:00:00");

const getTimeLeft = () => {
  const diff = DROP_DATE.getTime() - Date.now();
  if (diff <= 0)
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isLive: false,
  };
};

const fadeUpContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const DropPage = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      try {
        const res = await fetch(DATA_URL);
        const data = await res.json();
        const saleItems = data.filter(
          (item) => item.type?.toLowerCase() === "sale",
        );
        const finalItems =
          saleItems.length >= 4 ? saleItems.slice(0, 4) : data.slice(0, 4);
        if (!ignore) setProducts(finalItems);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    console.log("Waitlist signup:", email);
    setSubmitted(true);
  };

  const formattedDate = DROP_DATE.toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).toUpperCase();

  return (
    <main className="w-full bg-white">
      <section className="relative w-full min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden bg-black">
        <Image
          src={HERO_BACKGROUND}
          alt="Awakening Drop"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-black/80" />

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUpContainer}
          className="relative z-10 text-center px-6"
        >
          <motion.p
            variants={fadeUpItem}
            className="flex items-center justify-center gap-2 text-red-500 text-xs font-bold uppercase tracking-[0.3em] mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            Incoming Transmission
          </motion.p>

          <motion.h1
            variants={fadeUpItem}
            className={`${antonFont.className} font-black uppercase text-5xl sm:text-6xl md:text-8xl`}
          >
            <span className="block text-white">Awakening</span>
            <span className="block text-red-600">Is Live.</span>
          </motion.h1>

          <motion.p
            variants={fadeUpItem}
            className="mt-8 font-mono text-sm md:text-base text-white/60"
          >
            The next chapter begins. Are you ready?
          </motion.p>

          <motion.p
            variants={fadeUpItem}
            className="mt-3 font-mono text-xs text-white/40 tracking-widest uppercase"
          >
            Drop Date: {formattedDate}
          </motion.p>
        </motion.div>
      </section>

      <section className="w-full bg-linear-to-b from-[#fff5f0] to-white py-20 md:py-28 px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUpContainer}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.p
            variants={fadeUpItem}
            className="flex items-center justify-center gap-2 text-red-600 text-xs font-bold uppercase tracking-[0.3em] mb-10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            {timeLeft.isLive ? "Awakening // Is Live" : "Countdown // Active"}
          </motion.p>

          <motion.div
            variants={fadeUpContainer}
            className="grid grid-cols-4 gap-3 sm:gap-5 max-w-xl mx-auto mb-12"
          >
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((unit) => (
              <motion.div
                key={unit.label}
                variants={fadeUpItem}
                className="border border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.15)] py-6 sm:py-8"
              >
                <p className="font-black text-4xl sm:text-5xl text-black">
                  {String(unit.value).padStart(2, "0")}
                </p>
                <p className="mt-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-black/40">
                  {unit.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.h2
            variants={fadeUpItem}
            className={`${antonFont.className} font-black uppercase text-black text-2xl sm:text-3xl md:text-4xl mb-3`}
          >
            {timeLeft.isLive ? "The Drop Is Live." : "The Drop Is Coming."}
          </motion.h2>
          <motion.p
            variants={fadeUpItem}
            className="font-mono text-xs sm:text-sm text-black/40 uppercase tracking-widest mb-10"
          >
            {formattedDate} — Australia
          </motion.p>

          <motion.div variants={fadeUpItem}>
            <Link
              href="/collection"
              className={`${antonFont.className} inline-block bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest text-sm px-8 py-4 transition-colors duration-200`}
            >
              {timeLeft.isLive
                ? "The Wait Is Over — Enter The Archive \u2192"
                : "Get Notified When It Drops \u2192"}
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section className="w-full bg-white py-20 px-6 border-t border-black/5">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUpContainer}
          className="max-w-xl mx-auto text-center"
        >
          <motion.p
            variants={fadeUpItem}
            className="text-red-600 text-xs font-bold uppercase tracking-[0.3em] mb-4"
          >
            Get Early Access
          </motion.p>
          <motion.h2
            variants={fadeUpItem}
            className={`${antonFont.className} font-black uppercase text-black text-4xl sm:text-5xl mb-5`}
          >
            Join The Waitlist.
          </motion.h2>
          <motion.p
            variants={fadeUpItem}
            className="font-mono text-sm text-black/50 mb-8"
          >
            Be first to shop Awakening. Exclusive early access + pre-drop
            discount for waitlist members.
          </motion.p>

          {submitted ? (
            <motion.p
              variants={fadeUpItem}
              className="text-sm font-bold uppercase tracking-widest text-red-600"
            >
              You&apos;re on the list. See you at the drop.
            </motion.p>
          ) : (
            <motion.form
              variants={fadeUpItem}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-0 max-w-lg mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-4 py-4 border border-black/20 focus:border-black outline-none font-mono text-sm placeholder:text-black/30"
              />
              <button
                type="submit"
                className={`${antonFont.className} bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest text-sm px-6 py-4 transition-colors duration-200 whitespace-nowrap`}
              >
                Join The Waitlist &rarr;
              </button>
            </motion.form>
          )}
        </motion.div>
      </section>

      <section className="w-full bg-linear-to-b from-[#fff5f0] to-white py-16 md:py-20 px-6 md:px-10 border-t border-red-600">
        <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">
          The_Origin_Drop // Still Available
        </p>
        <h2 className={`${antonFont.className} font-black uppercase text-black text-4xl md:text-5xl mb-3`}>
          While You Wait.
        </h2>
        <p className="font-mono text-sm text-black/50 mb-10">
          Shop The Origin Drop, our current collection.
        </p>

        {loading ? (
          <div className="py-16 flex items-center justify-center">
            <span className="text-xs font-bold uppercase tracking-widest text-black/40">
              Loading...
            </span>
          </div>
        ) : (
          <>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUpContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 mb-10"
            >
              {products.map((product) => (
                <motion.div key={product.id} variants={fadeUpItem}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>

            <Link
              href="/collection"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black border-b border-black pb-1 hover:text-red-600 hover:border-red-600 transition-colors duration-200"
            >
              View Full Collection &rarr;
            </Link>
          </>
        )}
      </section>
    </main>
  );
};

export default DropPage;
