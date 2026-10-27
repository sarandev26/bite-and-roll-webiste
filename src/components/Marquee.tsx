"use client";

import React from "react";
import { CheckerboardBand } from "./CheckerboardBand";

interface MarqueeProps {
  velocity?: number;
}

export const Marquee: React.FC<MarqueeProps> = () => {
  const items1 = [
    "FRESH",
    "ROLLED",
    "CRISPY",
    "BOLD",
    "STACKED",
    "CRAFTED",
    "UNTAMED",
    "FIRE-FORGED",
    "FRESH",
    "ROLLED",
    "CRISPY",
    "BOLD",
    "STACKED",
    "CRAFTED",
    "UNTAMED",
    "FIRE-FORGED",
  ];

  const items2 = [
    "SMOKY",
    "SAUCY",
    "SIZZLING",
    "STREET",
    "CRUNCH",
    "PURE FIRE",
    "MELTY GOUDA",
    "DRIZZLED",
    "SMOKY",
    "SAUCY",
    "SIZZLING",
    "STREET",
    "CRUNCH",
    "PURE FIRE",
    "MELTY GOUDA",
    "DRIZZLED",
  ];

  return (
    <div className="relative w-full py-12 md:py-16 bg-[#14110F] text-[#EDE6DB] overflow-hidden select-none border-b-2 border-[#EDE6DB]/15">
      {/* Top Strip (Moves Left, Mustard) - Pure CSS Continuous 30s Loop */}
      <div className="overflow-hidden w-full select-none group">
        <div className="flex w-max animate-marquee-left group-hover:[animation-play-state:paused] will-change-transform">
          {/* Content Group 1 */}
          <div className="flex shrink-0 items-center font-flame text-5xl sm:text-6xl md:text-8xl uppercase tracking-tight text-[#F2B33D] leading-none">
            {items1.map((word, idx) => (
              <span key={`grp1-word1-${idx}`} className="inline-flex items-center px-4 sm:px-6 md:px-8">
                {word}
                <span className="inline-block ml-4 sm:ml-6 md:ml-8 text-[#EDE6DB]/40">•</span>
              </span>
            ))}
          </div>

          {/* Content Group 2 (Identical Clone for Seamless -50% Loop) */}
          <div className="flex shrink-0 items-center font-flame text-5xl sm:text-6xl md:text-8xl uppercase tracking-tight text-[#F2B33D] leading-none">
            {items1.map((word, idx) => (
              <span key={`grp2-word1-${idx}`} className="inline-flex items-center px-4 sm:px-6 md:px-8">
                {word}
                <span className="inline-block ml-4 sm:ml-6 md:ml-8 text-[#EDE6DB]/40">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Middle Checkerboard Accent */}
      <div className="my-4 md:my-6">
        <CheckerboardBand
          variant="ember-charcoal"
          height="h-5 md:h-6"
          speed={15}
          className="border-y border-[#EDE6DB]/20"
        />
      </div>

      {/* Bottom Strip (Moves Right, Ember) - Pure CSS Continuous 30s Reverse Loop */}
      <div className="overflow-hidden w-full select-none group">
        <div className="flex w-max animate-marquee-right group-hover:[animation-play-state:paused] will-change-transform">
          {/* Content Group 1 */}
          <div className="flex shrink-0 items-center font-flame text-5xl sm:text-6xl md:text-8xl uppercase tracking-tight text-[#E4572E] leading-none">
            {items2.map((word, idx) => (
              <span key={`grp1-word2-${idx}`} className="inline-flex items-center px-4 sm:px-6 md:px-8">
                {word}
                <span className="inline-block ml-4 sm:ml-6 md:ml-8 text-[#EDE6DB]/40">•</span>
              </span>
            ))}
          </div>

          {/* Content Group 2 (Identical Clone for Seamless -50% Loop) */}
          <div className="flex shrink-0 items-center font-flame text-5xl sm:text-6xl md:text-8xl uppercase tracking-tight text-[#E4572E] leading-none">
            {items2.map((word, idx) => (
              <span key={`grp2-word2-${idx}`} className="inline-flex items-center px-4 sm:px-6 md:px-8">
                {word}
                <span className="inline-block ml-4 sm:ml-6 md:ml-8 text-[#EDE6DB]/40">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
