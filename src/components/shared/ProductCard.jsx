"use client";

import { antonFont } from "@/lib/fonts";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

// Change this if your product images live in the local /public folder
// instead of being served from the API's own domain.
const IMAGE_BASE = "https://demon-web-shop.vercel.app";

const normalizeType = (type = "") => type.toLowerCase().replace(/\s+/g, "_");

/**
 * Reusable product card — framed card (padded image + tinted bg), hover
 * "Quick View" reveal + sale ribbon, name, price (handles sale
 * strike-through), Wishlist / Add to Cart actions. The whole card lifts
 * together as one unit on hover.
 *
 * Usage:
 *   <ProductCard product={product} />
 *
 * `product` shape (from the API): { id, name, price, images, type, ... }
 */
const ProductCard = ({ product }) => {
  const { id, name, price, images, type } = product;
  const isSale = normalizeType(type) === "sale";
  // API has no separate "original price" field — for sale items we
  // back-calculate it from the 15% discount shown on the ribbon.
  const originalPrice = isSale ? (price / 0.85).toFixed(2) : null;
  const image = images?.[0];

  return (
    // Whole card lifts as one unit on hover — image, info, buttons all
    // move together, nothing splits apart.
    <div className="group border border-black transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl">
      {/* Image sits inset inside a padded frame, not edge-to-edge */}
      <div className="">
        <div className="relative overflow-hidden bg-neutral-100">
          <div className="relative aspect-3/4">
            <Image
              src={
                image?.startsWith("http") ? image : `${IMAGE_BASE}${image}`
              }
              alt={name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />

            {isSale && (
              <div className="absolute -left-10 top-5 -rotate-45 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest w-36 py-1 text-center shadow-md">
                Sale 15% Off
              </div>
            )}
          </div>

          {/* Quick view bar — hidden below the image, slides up on hover */}
          <Link
            href={`/collection/${id}`}
            className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-black text-white text-xs font-bold uppercase tracking-widest py-3 flex items-center justify-center gap-2"
          >
            Quick View
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>
      </div>

      {/* Info */}
      <div className="px-4 py-3 pb-4">
        <h3 className={`${antonFont.className} text-sm md:text-base font-bold uppercase tracking-wide text-black mb-1`}>
          {name}
        </h3>

        <p className="mb-4">
          {isSale ? (
            <>
              <span className="text-black/40 line-through text-sm mr-2">
                ${originalPrice}
              </span>
              <span className={`${antonFont.className} text-red-600 font-bold text-xl`}>
                ${price}
              </span>
            </>
          ) : (
            <span className={`${antonFont.className} text-black font-extrabold text-xl`}>${price}</span>
          )}
        </p>

        <div className="grid grid-cols-2 gap-2">
          <Button className={`${antonFont.className} border bg-transparent rounded-none w-full border-black text-black  font-bold uppercase tracking-widest py-5 flex items-center justify-center gap-1.5 hover:bg-black hover:text-white transition-colors duration-200`}>
            <span>&#9825;</span> Wishlist
          </Button>
          <Button className={`${antonFont.className} bg-black rounded-none w-full text-white  font-bold uppercase tracking-widest py-5 flex items-center justify-center gap-1.5 hover:bg-red-700 transition-colors duration-200`}>
            Add to Cart <span>&rarr;</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;