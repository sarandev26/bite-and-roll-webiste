import { Bagel_Fat_One, Fredoka } from "next/font/google";

/**
 * Central Fonts Configuration for Bite & Roll
 * Primary: "Flame" (Headlines, big stacked text, echo text, stickers, prices)
 * Secondary: "Flame Sans" (Body text, labels, nav, buttons)
 *
 * If /public/fonts/Flame-Regular.woff2 and FlameSans-Regular.woff2 are added,
 * swap them here using next/font/local.
 *
 * Current clearly distinct fallbacks:
 * - Flame -> Bagel Fat One (weight: 400, heavy chunky rounded display)
 * - Flame Sans -> Fredoka (weights: 400, 500, 600, 700)
 */

export const fontFlame = Bagel_Fat_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-flame",
  display: "swap",
});

export const fontFlameSans = Fredoka({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-flame-sans",
  display: "swap",
});
