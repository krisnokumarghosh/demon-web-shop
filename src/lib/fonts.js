import { Anton, IBM_Plex_Mono } from "next/font/google";

export const antonFont = Anton({
  subsets: ["latin"],
  weight: "400",
});

export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});