"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const DATA_URL = "https://demon-web-shop.vercel.app/data.json";

const SaleSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Refs -----------------------------------------------------------
  // sectionRef  -> the element ScrollTrigger pins (the scroll-jack area)
  // stackRef    -> the relative container the cards are absolutely
  //                positioned inside (this is what gives them a shared
  //                stacking context / coordinate space)
  // cardMapRef  -> id -> DOM node, filled via ref callbacks. We use a
  //                Map (not an array reset during render) because
  //                mutating a ref's `.current` directly in the render
  //                body throws in modern React — see setCardRef below.
  const sectionRef = useRef(null);
  const stackRef = useRef(null);
  const cardMapRef = useRef(new Map());

  const setCardRef = (id) => (el) => {
    const map = cardMapRef.current;
    if (el) map.set(id, el);
    else map.delete(id);
  };

  // --- Data -------------------------------------------------------------
  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      try {
        const res = await fetch(DATA_URL);
        const data = await res.json();

        const saleItems = data.filter(
          (item) => item.type?.toLowerCase() === "sale"
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

  // --- Animation ----------------------------------------------------
  useEffect(() => {
    if (!products.length) return;
    if (!sectionRef.current || !stackRef.current) return;

    // Register once. GSAP no-ops a duplicate registerPlugin call, but
    // guarding keeps this explicit and avoids any React StrictMode /
    // Fast Refresh double-invoke surprises in dev.
    gsap.registerPlugin(ScrollTrigger);

    // Ordered array of the actual card DOM nodes, front-to-back
    // (index 0 = card that starts in the foreground).
    const cards = products
      .map((p) => cardMapRef.current.get(p.id))
      .filter(Boolean);

    if (cards.length < 2) return;

    // gsap.context() scopes every tween/ScrollTrigger created inside it
    // to this component, so ctx.revert() below cleanly kills all of
    // them on unmount or when `products` changes — no leaked
    // ScrollTriggers, no duplicates on re-run.
    const ctx = gsap.context(() => {
      // gsap.matchMedia() gives you the "responsive calculations for
      // desktop/tablet/mobile" requirement natively: each breakpoint
      // gets its own values AND its own automatic cleanup — when the
      // viewport crosses a breakpoint, GSAP reverts the previous
      // block's tweens/triggers and reruns the matching one.
      const mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: "(max-width: 639px)",
          isTablet: "(min-width: 640px) and (max-width: 1023px)",
          isDesktop: "(min-width: 1024px)",
        },
        (context) => {
          const { isMobile, isTablet } = context.conditions;

          // How far back (in px) each stacked card sits behind the
          // active one, and how much smaller/dimmer it gets per level
          // of depth. Smaller values on mobile so the stack doesn't
          // eat the whole narrow viewport.
          const STACK_OFFSET = isMobile ? 14 : isTablet ? 20 : 28;
          const SCALE_STEP = isMobile ? 0.035 : 0.045;
          const OPACITY_STEP = 0.12;

          // How much scroll distance (in viewport heights) each
          // card-to-card transition consumes. 1 = one full screen of
          // scrolling per card change; mobile gets a slightly shorter
          // throw so the section doesn't feel like it drags forever.
          const VH_PER_STEP = isMobile ? 0.8 : 1;

          const n = cards.length;

          // --- Initial stack state ----------------------------------
          // Card 0 is fully front (no offset/scale/opacity change).
          // Card i sits `i` levels deep: pushed down+back, slightly
          // scaled down, slightly dimmed, and under the cards in
          // front of it (lower z-index).
          cards.forEach((card, i) => {
            gsap.set(card, {
              yPercent: 0,
              y: i * STACK_OFFSET,
              scale: 1 - i * SCALE_STEP,
              opacity: 1 - Math.min(i * OPACITY_STEP, 0.4),
              zIndex: n - i,
              force3D: true,
            });
          });

          // --- Single scrubbed timeline, driven by one pinned trigger ---
          const tl = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              // Total pinned scroll distance = one "step" per card
              // transition (n - 1 transitions to get from card 1 to
              // card n in front). This is what makes progress along
              // the timeline map 1:1 to scroll position.
              end: () => `+=${(n - 1) * VH_PER_STEP * window.innerHeight}`,
              pin: sectionRef.current,
              pinSpacing: true,
              scrub: 1, // slight smoothing lag; still fully scroll-driven
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // For each transition i -> i+1: the current front card exits
          // upward, and every card behind it steps forward one level
          // (its new depth = old depth - 1). Both happen at the same
          // timeline position (`i`) so they read as one continuous
          // motion rather than a sequence of separate jumps.
          for (let i = 0; i < n - 1; i++) {
            const exiting = cards[i];
            const rest = cards.slice(i + 1);

            tl.to(
              exiting,
              {
                y: -window.innerHeight * 0.9,
                opacity: 0,
                scale: 1 - SCALE_STEP * 0.5,
                duration: 1,
              },
              i
            );

            rest.forEach((card, restIdx) => {
              const newDepth = restIdx; // 0 = becomes the new front card
              tl.to(
                card,
                {
                  y: newDepth * STACK_OFFSET,
                  scale: 1 - newDepth * SCALE_STEP,
                  opacity: 1 - Math.min(newDepth * OPACITY_STEP, 0.4),
                  duration: 1,
                },
                i
              );
            });
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [products]);

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
    <div className="relative w-full bg-white overflow-x-hidden">
      {/* Heading — normal document flow, scrolls away before the
          pinned stack takes over. Not part of the pinned area. */}
      <div className="px-6 md:px-10 py-16 md:py-20 bg-linear-to-b from-[#fff5f0] to-white flex items-end justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-2">
            Collection // The_Origin_Drop
          </p>
          <h2 className="font-black uppercase text-black text-5xl md:text-7xl leading-none">
            Sale
          </h2>
        </div>

        <Link
          href="/collection"
          className="hidden md:inline-block border border-black px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-black hover:bg-black hover:text-white transition-colors duration-200"
        >
          View_All
        </Link>
      </div>

      {/* PINNED AREA — sectionRef is what ScrollTrigger pins. Full
          viewport height + centers its content, so once pinned it
          behaves like a fixed "stage" the cards animate inside of. */}
      <section
        ref={sectionRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden "
      >
        {/* stackRef — shared coordinate space for the absolutely
            positioned cards. Sized to the card itself; all cards sit
            on top of one another here via position: absolute. */}
        <div
          ref={stackRef}
          className="relative w-[85%] sm:w-[70%] md:w-130 aspect-3/4 sm:aspect-4/5"
        >
          {products.map((product, index) => (
            <SaleCard
              key={product.id}
              ref={setCardRef(product.id)}
              product={product}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

const SaleCard = forwardRef(({ product }, ref) => {
  const { id, name, price, ColorWay, images } = product;
  const image = images?.[3] ?? images?.[images.length - 1];

  return (
    <div
      ref={ref}
      className="absolute inset-0 overflow-hidden border-t-4 border-red-600 bg-black will-change-transform"
    >
      <Image
        src={image}
        alt={name}
        fill
        sizes="(max-width: 768px) 85vw, 520px"
        className="object-cover pointer-events-none"
        draggable={false}
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-black/30" />

      <span className="absolute top-6 left-6 text-white/40 font-black text-lg">
        {id}
      </span>

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
        <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-red-500 mb-2">
          Collection // The_Origin_Drop
        </p>

        <h3 className="font-black uppercase text-white text-3xl md:text-5xl leading-tight mb-2">
          {name}
        </h3>

        <p className="text-sm text-white/60 mb-4">
          {ColorWay} &middot; ${price}
        </p>

        <Link
          href={`/product/${id}`}
          className="group inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest text-white border-b border-white/40 hover:border-white pb-1 transition-colors duration-200"
        >
          Shop {name}
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            &rarr;
          </span>
        </Link>
      </div>
    </div>
  );
});

SaleCard.displayName = "SaleCard";

export default SaleSection;