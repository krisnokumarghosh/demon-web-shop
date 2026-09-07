import Navbar from "@/components/shared/Navbar";
import "./globals.css";
import { ibmPlexMono } from "@/lib/fonts";
import Footer from "@/components/shared/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata = {
  title: {
    default: "Demon Web Shop",
    template: "%s | Demon Web Shop",
  },
  description: "Wear Your Story",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${ibmPlexMono.className} h-full antialiased`}>
      <body
        className="min-h-full flex flex-col bg-[#FFFFFF]"
        suppressHydrationWarning
      >
        <Navbar></Navbar>
        <SmoothScroll>
          <main>{children}</main>
        </SmoothScroll>
        <Footer />
      </body>
    </html>
  );
}
