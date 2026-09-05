"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/shared/ProductCard";
import { antonFont } from "@/lib/fonts";

const DATA_URL = "https://demon-web-shop.vercel.app/data.json";

const FILTERS = ["All", "Sale", "New_Arrival", "Limited", "Zangetsu"];

const normalizeType = (type = "") => type.toLowerCase().replace(/\s+/g, "_");

const CollectionComponent = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

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

  const filteredProducts = useMemo(() => {
    let list = products;

    if (activeFilter !== "All") {
      list = list.filter(
        (p) => normalizeType(p.type) === activeFilter.toLowerCase()
      );
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }

    return list;
  }, [products, activeFilter, search]);

  return (
    <main className="w-full bg-white">
      {/* ---------------- Hero header ---------------- */}
      <section className="relative w-full bg-black overflow-hidden">
        <div className="relative px-6 md:px-10 pt-32 md:pt-40 pb-10 md:pb-12">
          {/* Faint giant count, top-right */}
          <span className="pointer-events-none select-none absolute top-24 md:top-32 right-6 md:right-10 text-white/10 font-black text-8xl md:text-9xl leading-none">
            {loading ? "" : products.length}
          </span>

          <p className={`${antonFont.className} text-xs md:text-sm font-bold uppercase tracking-widest text-red-500 mb-4`}>
            The_Origin_Drop // Complete_Archive
          </p>

          <h1 className={`${antonFont.className} font-black uppercase text-white leading-[0.95] text-4xl sm:text-5xl md:text-7xl max-w-3xl`}>
            Anime Graphic Tees —
            <br />
            The Full Collection
          </h1>

          <p className="mt-6 text-sm md:text-base text-white/50">
            Every drop. Every arc. Documented.
          </p>
        </div>

        <div className="border-t border-white/15" />

        <div className="px-6 md:px-10 py-4 flex flex-col sm:flex-row gap-2 sm:gap-0 items-start sm:items-center justify-between text-[11px] md:text-xs font-bold uppercase tracking-widest text-white/50">
          <span>
            {loading ? "—" : products.length} Pieces // The_Origin_Drop //
            Est_2024
          </span>
          <span>Australia-Wide Shipping</span>
        </div>
      </section>

      {/* ---------------- Filter + search bar ---------------- */}
      <section className=" bg-white border-b border-black/10">
        <div className="px-6 md:px-10 py-4 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
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

          <div className="flex items-center gap-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full md:w-56 px-4 py-2 text-xs md:text-sm border border-black/20 focus:border-black outline-none uppercase tracking-wide placeholder:text-black/30"
            />
            <span className="shrink-0 text-[11px] md:text-xs font-bold uppercase tracking-widest text-black/40">
              {filteredProducts.length} Items
            </span>
          </div>
        </div>
      </section>

      {/* ---------------- Product grid ---------------- */}
      <section className="px-6 md:px-10 py-10 md:py-14">
        {loading ? (
          <div className="py-20 flex items-center justify-center">
            <span className="text-xs font-bold uppercase tracking-widest text-black/40">
              Loading...
            </span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-20 flex items-center justify-center">
            <span className="text-xs font-bold uppercase tracking-widest text-black/40">
              No items found
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default CollectionComponent;