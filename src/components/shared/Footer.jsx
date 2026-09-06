"use client";

import Link from "next/link";

const linkColumns = [
  {
    title: "Drops",
    links: [
      { label: "Home", href: "/" },
      { label: "Drop", href: "/drop" },
      { label: "Collection", href: "/collection" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Lookbook", href: "/lookbook" },
      { label: "Our Story", href: "/our-story" },
      { label: "Size Guide", href: "/size-guide" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "TikTok", href: "https://tiktok.com" },
      { label: "Instagram", href: "https://instagram.com" },
      { label: "Facebook", href: "https://facebook.com" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Reviews", href: "/reviews" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Help", href: "/help" },
      { label: "Return Policy", href: "/returns" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

// Simple monogram mark — swap this <svg> for your real logo file
// (e.g. an <Image src="/images/logo.svg" .../>) whenever you have one.
const LogoMark = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path
      d="M4 6H32L8 30H32"
      stroke="white"
      strokeWidth="4"
      strokeLinecap="square"
      strokeLinejoin="miter"
    />
  </svg>
);

const socialButtons = [
  {
    label: "TikTok",
    href: "https://tiktok.com",
    className: "bg-white text-black hover:bg-white/90",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M16.6 5.82c-1.02-.9-1.65-2.18-1.65-3.6h-3.02v13.3c0 1.61-1.31 2.92-2.92 2.92a2.92 2.92 0 0 1-2.92-2.92 2.92 2.92 0 0 1 2.92-2.92c.3 0 .59.05.87.13v-3.06a6.02 6.02 0 0 0-.87-.06 5.94 5.94 0 0 0-5.94 5.94 5.94 5.94 0 0 0 5.94 5.94 5.94 5.94 0 0 0 5.94-5.94V9.4a8.5 8.5 0 0 0 4.95 1.58V7.96a5.6 5.6 0 0 1-3.3-2.14z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    className:
      "text-white bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600 hover:opacity-90",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.97.24 2.43.4a4.9 4.9 0 0 1 1.77 1.15 4.9 4.9 0 0 1 1.15 1.77c.16.46.35 1.26.4 2.43.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.97-.4 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.46.16-1.26.35-2.43.4-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.97-.24-2.43-.4a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.16-.46-.35-1.26-.4-2.43C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.24-1.97.4-2.43a4.9 4.9 0 0 1 1.15-1.77A4.9 4.9 0 0 1 5.59 1.8c.46-.16 1.26-.35 2.43-.4C9.29 1.34 9.67 1.33 12 1.33m0 2c-3.15 0-3.5.01-4.73.07-1.02.05-1.58.22-1.95.36-.49.19-.84.42-1.2.79-.37.36-.6.71-.79 1.2-.14.37-.31.93-.36 1.95C2.94 8.6 2.93 8.95 2.93 12s.01 3.4.07 4.63c.05 1.02.22 1.58.36 1.95.19.49.42.84.79 1.2.36.37.71.6 1.2.79.37.14.93.31 1.95.36 1.23.06 1.58.07 4.73.07s3.5-.01 4.73-.07c1.02-.05 1.58-.22 1.95-.36.49-.19.84-.42 1.2-.79.37-.36.6-.71.79-1.2.14-.37.31-.93.36-1.95.06-1.23.07-1.58.07-4.63s-.01-3.4-.07-4.63c-.05-1.02-.22-1.58-.36-1.95a3.15 3.15 0 0 0-.79-1.2 3.15 3.15 0 0 0-1.2-.79c-.37-.14-.93-.31-1.95-.36C15.4 4.21 15.05 4.2 12 4.2z" />
        <circle cx="12" cy="12" r="3.3" />
        <circle cx="17.5" cy="6.5" r="1.1" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    className: "bg-[#1877F2] text-white hover:bg-[#1877F2]/90",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M13.5 21v-7.6h2.55l.38-2.96h-2.93V8.55c0-.86.24-1.44 1.47-1.44h1.57V4.46A21 21 0 0 0 14.3 4.3c-2.24 0-3.78 1.37-3.78 3.87v2.16H8v2.97h2.52V21h3z" />
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <footer className="relative w-full bg-black text-white overflow-hidden">
      {/* Giant faded brand watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute top-1/2 right-0 -translate-y-1/2 translate-x-[8%] text-white/5 font-black uppercase leading-none text-[14rem] md:text-[18rem] whitespace-nowrap"
      >
        Demon
      </span>

      <div className="relative z-10 px-6 md:px-16 pt-20 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,280px)_1fr] gap-14 lg:gap-20">
          {/* Brand column */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <LogoMark />
            </Link>

            <p className="font-mono text-sm text-white/50 leading-relaxed max-w-[280px] mb-8">
              Wear the Arc. Anime-inspired streetwear for gamers and otaku.
              Every drop limited. No restocks. Ever.
            </p>

            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/40 mb-4">
              Follow The Lore
            </p>

            <div className="flex flex-wrap gap-2.5">
              {socialButtons.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wide transition-colors duration-200 ${social.className}`}
                >
                  {social.icon}
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
            {linkColumns.map((col) => (
              <div key={col.title}>
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/40 mb-5">
                  {col.title}
                </p>
                <ul className="space-y-3.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm font-semibold text-white/90 hover:text-red-500 transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/10">
        <div className="px-6 md:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40 font-mono order-2 md:order-1">
            &copy; {new Date().getFullYear()} Demon Web Shop. All drops are
            final. No restocks. Ever.
          </p>

          <button
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            className="order-1 md:order-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-5 py-2 rounded-full transition-colors duration-200"
          >
            Start
          </button>

          <div className="order-3 flex items-center gap-6 text-xs text-white/40 font-mono">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="hover:text-white transition-colors">
              Cookies
            </Link>
            <span className="hidden sm:flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Anime-inspired. Gamer-built. Community-owned.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;