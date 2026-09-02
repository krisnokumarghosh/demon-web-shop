"use client";

import { useEffect, useState } from "react";
import FastMarquee from "react-fast-marquee";

const marqueeItems = [
  "FREE SHIPPING ON ORDERS OVER $100",
  "NEW DROP: BLUE FLAME TEE NOW AVAILABLE",
  "LIMITED STOCK",
  "THE_ORIGIN_DROP COLLECTION LIVE",
];

const Marquee = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Same 40px threshold the Navbar uses, so both move together.
    const onScroll = () => setVisible(window.scrollY <= 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-10 z-[60] bg-red-600 flex items-center transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <FastMarquee speed={40} gradient={false} autoFill>
        {marqueeItems.map((item, index) => (
          <span
            key={index}
            className="mx-4 text-[11px] md:text-xs font-bold uppercase tracking-widest text-white flex items-center"
          >
            {item}
            <span className="mx-4 text-white/60">•</span>
          </span>
        ))}
      </FastMarquee>
    </div>
  );
};

export default Marquee;