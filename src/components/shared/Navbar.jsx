"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Drawer } from "@heroui/react";
import {
  Bars,
  Magnifier,
  Heart,
  Bag,
  Person,
  ChevronDown,
  ShoppingBag,
} from "@gravity-ui/icons";
import { antonFont } from "@/lib/fonts";

const navLinks = [
  { name: "Drop", href: "/drop" },
  { name: "Collection", href: "/collection" },
  { name: "Lookbook", href: "/lookbook" },
  { name: "Our Story", href: "/our-story" },
];

const moreLinks = [
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
  { name: "Shipping & Returns", href: "/shipping-returns" },
];

const iconLinks = [
  { icon: Magnifier, href: "/search", label: "Search" },
  { icon: Heart, href: "/wishlist", label: "Wishlist" },
  { icon: ShoppingBag, href: "/cart", label: "Cart" },
  { icon: Person, href: "/account", label: "Account" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const pathname = usePathname();

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Marquee (and this transparent/offset state) only exists on the home
  // page hero, before scrolling. Every other page, and home after scroll,
  // gets the solid bg pinned to the very top.
  const showMarqueeState = isHome && !scrolled;
  const isTransparent = showMarqueeState;

  return (
    <header
      className={`fixed left-0 w-full z-50 transition-all duration-300 ${
        showMarqueeState ? "top-10" : "top-0"
      } ${
        isTransparent
          ? "bg-transparent"
          : "bg-black/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
      }`}
    >
      <nav className="flex items-center justify-between px-6 md:px-10 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className={`${antonFont.className} px-3 py-1.5 text-white font-black text-lg tracking-wide uppercase`}>
            Demon Shop
          </span>
        </Link>

        {/* Center Nav Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}

          {/* More dropdown */}
          <li
            className="relative"
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
          >
            <button
              className={`flex items-center gap-1 text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${
                moreOpen ? "text-white" : "text-white/70 hover:text-white"
              }`}
            >
              More
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  moreOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 bg-black border border-white/10 rounded-md shadow-xl py-2"
                >
                  {moreLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white/70 hover:text-white hover:bg-red-600 transition-colors duration-150"
                    >
                      {link.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        </ul>

        {/* Right icons */}
        <div className="hidden md:flex items-center gap-6">
          {iconLinks.map(({ icon: Icon, href, label }) => (
            <Link key={href} href={href} aria-label={label}>
              <Icon className="w-5 h-5 text-white hover:text-red-600 transition-colors duration-200" />
            </Link>
          ))}
        </div>

        {/* Mobile: icons + drawer trigger */}
        <div className="flex md:hidden items-center gap-4">
          <Link href="/cart" aria-label="Cart">
            <ShoppingBag className="w-5 h-5 text-white" />
          </Link>
          <Drawer>
            <Button className="bg-transparent min-w-0 p-0">
              <Bars className="w-5 h-5 text-white" />
            </Button>
            <Drawer.Backdrop className="bg-black/60 backdrop-blur-sm">
              <Drawer.Content placement="left">
                <Drawer.Dialog className="w-72 bg-black">
                  <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/10">
                    <Link href="/" className="flex items-center" slot="close">
                      <span className={`${antonFont.className} px-2.5 py-1 text-white font-black text-sm tracking-wide uppercase`}>
                        Demon Shop
                      </span>
                    </Link>
                    <Drawer.CloseTrigger className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors duration-200" />
                  </div>

                  <Drawer.Body className="px-6 py-6">
                    <nav className="flex flex-col h-full justify-between">
                      <div className="flex flex-col gap-1">
                        {[...navLinks, ...moreLinks].map((link, index) => (
                          <motion.div
                            key={link.href}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.06, duration: 0.35 }}
                          >
                            <Link href={link.href}>
                              <Button
                                slot="close"
                                className={`${antonFont.className} w-full justify-start px-3 py-3 rounded-lg text-sm font-bold uppercase tracking-widest transition-colors duration-200 ${
                                  isActive(link.href)
                                    ? "bg-white/10 text-white"
                                    : "bg-transparent text-white/60 hover:bg-white/5 hover:text-white"
                                }`}
                              >
                                {link.name}
                              </Button>
                            </Link>
                          </motion.div>
                        ))}
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.4 }}
                        className="flex items-center justify-around pb-4 pt-4 border-t border-white/10"
                      >
                        {iconLinks.map(({ icon: Icon, href, label }) => (
                          <Link key={href} href={href} aria-label={label} slot="close">
                            <Icon className="w-5 h-5 text-white/80 hover:text-white transition-colors duration-200" />
                          </Link>
                        ))}
                      </motion.div>
                    </nav>
                  </Drawer.Body>
                </Drawer.Dialog>
              </Drawer.Content>
            </Drawer.Backdrop>
          </Drawer>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;