"use client";

import React from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { BeatData } from "@/data/beats";

interface BeatHeadlineProps {
  beat: BeatData;
  align?: "left" | "right";
}

export const BeatHeadline: React.FC<BeatHeadlineProps> = ({
  beat,
  align = "left",
}) => {
  const isRight = align === "right";

  const getColorClass = (word: { color?: string; outline?: boolean }) => {
    if (word.outline) {
      return "text-outline-charcoal";
    }
    switch (word.color) {
      case "ember":
        return "text-[#E4572E]";
      case "mustard":
        return "text-[#F2B33D]";
      case "green":
        return "text-[#6B8F3A]";
      case "charcoal":
      default:
        return "text-[#14110F]";
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.015,
        delayChildren: 0.02,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.008,
        staggerDirection: -1,
      },
    },
  };

  const charVariants: Variants = {
    hidden: {
      y: 35,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1], // expo.out
      },
    },
    exit: {
      y: -30,
      rotate: isRight ? 2 : -2,
      opacity: 0,
      transition: {
        duration: 0.25,
        ease: [0.7, 0, 0.84, 0],
      },
    },
  };

  return (
    <div
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
      className={`relative z-20 pointer-events-none select-none w-full max-w-full md:max-w-[38vw] flex flex-col ${
        isRight
          ? "items-center md:items-end text-center md:text-right"
          : "items-center md:items-start text-center md:text-left"
      }`}
    >
      {/* Small Accent Tag in Flame Sans */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`accent-${beat.id}-${beat.accent}`}
          initial={{ opacity: 0, x: isRight ? 12 : -12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isRight ? -8 : 8 }}
          transition={{ duration: 0.3 }}
          className={`font-flame-sans text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-[#E4572E] mb-2 flex items-center gap-2 ${
            isRight ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <span>{beat.accent}</span>
          <span className="w-6 h-[1.5px] bg-[#E4572E]/50 inline-block" />
        </motion.div>
      </AnimatePresence>

      {/* Stacked Big Display Headline in Flame (tight line-height 0.85, no velocity shake) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`headline-block-${beat.id}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
          className={`flex flex-col font-flame uppercase leading-[0.85] tracking-tight will-change-transform ${
            isRight ? "items-center md:items-end" : "items-center md:items-start"
          }`}
        >
          {beat.headlineLines.map((line, lIdx) => (
            <div
              key={`line-${beat.id}-${lIdx}`}
              className={`flex flex-wrap items-baseline gap-x-3 text-5xl sm:text-6xl md:text-7xl lg:text-[5.4rem] leading-[0.85] ${
                isRight ? "justify-center md:justify-end" : "justify-center md:justify-start"
              }`}
            >
              {line.map((word, wIdx) => {
                const colorClass = getColorClass(word);
                return (
                  <span
                    key={`w-${beat.id}-${lIdx}-${wIdx}`}
                    className={`inline-flex items-baseline overflow-hidden ${colorClass}`}
                  >
                    {word.text.split("").map((ch, cIdx) => (
                      <motion.span
                        key={`ch-${beat.id}-${lIdx}-${wIdx}-${cIdx}`}
                        variants={charVariants}
                        className="inline-block"
                      >
                        {ch}
                      </motion.span>
                    ))}
                  </span>
                );
              })}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Narrow Column Short Body Line in Flame Sans */}
      <AnimatePresence mode="wait">
        <motion.p
          key={`body-${beat.id}-${beat.body}`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 md:mt-5 font-flame-sans text-xs sm:text-sm md:text-base text-[#14110F]/80 max-w-sm font-medium leading-relaxed"
        >
          {beat.body}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};
