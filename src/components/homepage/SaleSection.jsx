"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { antonFont } from "@/lib/fonts";

const DATA_URL = "https://demon-web-shop.vercel.app/data.json";

const SaleSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const sectionRef = useRef(null);
  const stackRef = useRef(null);
  const cardMapRef = useRef(new Map());

  const setCardRef = (id) => (el) => {
    const map = cardMapRef.current;
    if (el) map.set(id, el);
    else map.delete(id);
  };

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

  useEffect(() => {
    if (!products.length) return;
    if (!sectionRef.current || !stackRef.current) return;

   
    gsap.registerPlugin(ScrollTrigger);

   
    const cards = products
      .map((p) => cardMapRef.current.get(p.id))
      .filter(Boolean);

    if (cards.length < 2) return;

   
    const ctx = gsap.context(() => {
     
      const mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: "(max-width: 639px)",
          isTablet: "(min-width: 640px) and (max-width: 1023px)",
          isDesktop: "(min-width: 1024px)",
        },
        (context) => {
          const { isMobile, isTablet } = context.conditions;

        
          const STACK_OFFSET = isMobile ? 14 : isTablet ? 20 : 28;
          const SCALE_STEP = isMobile ? 0.035 : 0.045;
          const OPACITY_STEP = 0.12;

       
          const VH_PER_STEP = isMobile ? 0.8 : 1;

          const n = cards.length;

         
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

          const tl = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
            
              end: () => `+=${(n - 1) * VH_PER_STEP * window.innerHeight}`,
              pin: sectionRef.current,
              pinSpacing: true,
              scrub: 1, 
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

        
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
              const newDepth = restIdx; 
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
      <div className="px-6 md:px-10 py-16 md:py-20 bg-linear-to-b from-[#fff5f0] to-white flex items-end justify-between">
        <div>
          <p className={`${antonFont.className} text-xs font-bold uppercase tracking-widest text-red-600 mb-2`}>
            Collection // The_Origin_Drop
          </p>
          <h2 className={`${antonFont.className} font-black uppercase text-black text-5xl md:text-7xl leading-none`}>
            Sale
          </h2>
        </div>

        <Link
          href="/collection"
          className={`${antonFont.className} hidden md:inline-block border border-black px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-black hover:bg-black hover:text-white transition-colors duration-200`}
        >
          View All
        </Link>
      </div>

     
      <section
        ref={sectionRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden "
      >
      
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
        <p className={`${antonFont.className} text-xs md:text-sm font-bold uppercase tracking-widest text-red-500 mb-2`}>
          Collection // The_Origin_Drop
        </p>

        <h3 className={`${antonFont.className} font-black uppercase text-white text-3xl md:text-5xl leading-tight mb-2`}>
          {name}
        </h3>

        <p className="text-sm text-white/60 mb-4">
          {ColorWay} &middot; ${price}
        </p>

        <Link
          href={`/collection/${id}`}
          className="group inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest text-white hover:text-red-600 border-b border-white/40 hover:border-red-600 pb-1 transition-colors duration-200"
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