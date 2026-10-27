"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";

export const HowItWorks: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      num: "01",
      title: "PICK",
      accent: "The Craving",
      desc: "Choose from signature smash burgers, loaded artisanal rolls, and double-fried crispy sides.",
      image: "/images/how-it-works/pick.webp",
      rotation: -1.5,
      badgeColor: "bg-[#F2B33D] text-[#14110F]",
      tagColor: "border-[#F2B33D]",
    },
    {
      num: "02",
      title: "WE ROLL",
      accent: "The Flat-Top Heat",
      desc: "Freshly made to order on fire-forged cast iron, drizzled with secret glaze, wrapped and sealed in seconds.",
      image: "/images/how-it-works/roll.webp",
      rotation: 1.8,
      badgeColor: "bg-[#E4572E] text-white",
      tagColor: "border-[#E4572E]",
    },
    {
      num: "03",
      title: "YOU BITE",
      accent: "The Street Drop",
      desc: "Delivered piping hot, aromatic and crisp. Unwrap the foil, hear the crunch, and taste the real fire.",
      image: "/images/how-it-works/bite.webp",
      rotation: -1.2,
      badgeColor: "bg-[#6B8F3A] text-white",
      tagColor: "border-[#6B8F3A]",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="section-how-it-works"
      className="relative w-full py-20 sm:py-28 md:py-36 bg-[#EDE6DB] text-[#14110F] overflow-hidden select-none"
    >
      {/* CONTINUOUS DUAL-LAYER EMBER ORANGE & MUSTARD YELLOW WAVE (Z-0, Behind Step Panels) */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-72 md:h-80 pointer-events-none z-0 overflow-hidden">
        {/* Vertical Bob Container: translateY, transform only */}
        <div className="relative w-full h-full animate-wave-bob will-change-transform">
          {/* Back Wave: Lighter Mustard Yellow, 14s linear infinite */}
          <div className="absolute inset-0 flex w-[200%] animate-wave-back opacity-55 will-change-transform">
            <svg
              viewBox="0 0 2400 240"
              className="w-full h-full"
              fill="none"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 0 100 C 300 10, 300 190, 600 100 C 900 10, 900 190, 1200 100 C 1500 10, 1500 190, 1800 100 C 2100 10, 2100 190, 2400 100"
                stroke="#F2B33D"
                strokeWidth="36"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Front Wave: Ember Orange, 9s reverse linear infinite */}
          <div className="absolute inset-0 flex w-[200%] animate-wave-front opacity-75 will-change-transform">
            <svg
              viewBox="0 0 2400 240"
              className="w-full h-full"
              fill="none"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 0 120 C 300 200, 300 30, 600 120 C 900 200, 900 30, 1200 120 C 1500 200, 1500 30, 1800 120 C 2100 200, 2100 30, 2400 120"
                stroke="#E4572E"
                strokeWidth="26"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
          <span className="font-flame-sans text-xs md:text-sm uppercase tracking-[0.25em] text-[#E4572E] font-bold block mb-2">
            Three Steps to Glory
          </span>
          <h2 className="font-flame text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-[#14110F] leading-[0.85]">
            HOW IT <span className="text-outline-charcoal">WORKS</span>
          </h2>
          <p className="font-flame-sans text-xs sm:text-sm md:text-base text-[#14110F]/70 mt-3 md:mt-4 font-medium">
            Fast, raw, street-food precision. From scorching grill to your hands in under 3 minutes.
          </p>
        </div>

        {/* 3 Tall Poster Panels: 1 column on mobile, 2 columns on tablet, 3 columns on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 relative z-10">
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
              style={{
                backfaceVisibility: "hidden",
              }}
              className="relative bg-[#EDE6DB] border-3 border-[#14110F] rounded-3xl p-6 md:p-8 shadow-xl flex flex-col justify-between overflow-hidden group will-change-transform"
              data-cursor="STEP"
            >
              {/* Step Header */}
              <div>
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <span className="font-flame text-5xl sm:text-6xl md:text-7xl text-[#14110F] leading-none">
                    {step.num}
                  </span>
                  <span
                    className={`font-flame-sans text-xs md:text-sm tracking-wider uppercase font-bold px-3.5 py-1.5 rounded-full border border-[#14110F] shadow-sm ${step.badgeColor}`}
                  >
                    {step.accent}
                  </span>
                </div>

                {/* Poster Product Image with Lazy Loading & Explicit Dimensions */}
                <div className="relative w-full h-48 sm:h-56 md:h-64 my-3 sm:my-4 rounded-2xl overflow-hidden bg-[#14110F]/5 border-2 border-[#14110F] p-3 flex items-center justify-center">
                  <img
                    src={step.image}
                    alt={step.title}
                    loading="lazy"
                    decoding="async"
                    width={480}
                    height={320}
                    className="w-full h-full object-cover rounded-xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 will-change-transform"
                  />
                </div>

                <h3 className="font-flame text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-[#14110F] mt-3 sm:mt-4 mb-2 leading-[0.85]">
                  {step.title}
                </h3>
                <p className="font-flame-sans text-xs sm:text-sm md:text-base text-[#14110F]/75 font-medium leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Bottom Stamp Line */}
              <div className="mt-6 sm:mt-8 pt-4 border-t-2 border-dashed border-[#14110F]/20 flex justify-between items-center text-xs font-flame-sans font-semibold tracking-widest text-[#14110F]/60 uppercase">
                <span>PHASE {step.num} OF 03</span>
                <span className="text-[#E4572E] font-bold text-base">★ ★ ★</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
