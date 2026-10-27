"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StickerBadgeProps {
  text?: string;
  variant?: "starburst" | "stamp" | "pill";
  color?: "mustard" | "ember" | "green" | "charcoal";
  className?: string;
  rotation?: number;
}

export const StickerBadge: React.FC<StickerBadgeProps> = ({
  text = "HOT",
  variant = "starburst",
  color = "mustard",
  className = "",
  rotation = -8,
}) => {
  const bgColors = {
    mustard: "bg-[#F2B33D] text-[#14110F]",
    ember: "bg-[#E4572E] text-[#EDE6DB]",
    green: "bg-[#6B8F3A] text-[#EDE6DB]",
    charcoal: "bg-[#14110F] text-[#F2B33D]",
  };

  if (variant === "stamp") {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={`stamp-${text}`}
          initial={{ scale: 0, rotate: rotation - 25, opacity: 0 }}
          animate={{ scale: 1, rotate: rotation, opacity: 1 }}
          exit={{ scale: 0, rotate: rotation + 20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 20 }}
          className={`relative w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-dashed border-[#14110F] flex items-center justify-center p-1.5 select-none ${bgColors[color]} ${className}`}
        >
          {/* Inner circle border */}
          <div className="w-full h-full rounded-full border border-[#14110F]/30 flex flex-col items-center justify-center text-center">
            <span className="font-flame-sans text-[10px] tracking-widest uppercase font-bold opacity-80">
              BITE &amp; ROLL
            </span>
            <span className="font-flame text-lg md:text-xl tracking-wide uppercase leading-none my-0.5">
              {text}
            </span>
            <span className="font-flame-sans text-[9px] tracking-widest uppercase font-bold opacity-80">
              STREET CO.
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  if (variant === "starburst") {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={`starburst-${text}`}
          initial={{ scale: 0, rotate: rotation - 30, opacity: 0 }}
          animate={{ scale: 1, rotate: rotation, opacity: 1 }}
          exit={{ scale: 0, rotate: rotation + 30, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className={`relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center select-none ${className}`}
        >
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full animate-[spin_25s_linear_infinite]"
          >
            <polygon
              points="50,0 62,25 88,12 80,38 100,50 80,62 88,88 62,80 50,100 38,80 12,88 20,62 0,50 20,38 12,12 38,25"
              fill={color === "mustard" ? "#F2B33D" : color === "ember" ? "#E4572E" : "#6B8F3A"}
              stroke="#14110F"
              strokeWidth="2"
            />
          </svg>
          <span className="relative z-10 font-flame text-sm md:text-base uppercase tracking-tight text-[#14110F] text-center leading-none px-2">
            {text}
          </span>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`pill-${text}`}
        initial={{ scale: 0, y: 15, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0, y: -10, opacity: 0 }}
        transition={{ type: "spring", stiffness: 450, damping: 25 }}
        className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border-2 border-[#14110F] font-flame-sans text-xs md:text-sm font-semibold tracking-wider uppercase select-none shadow-md ${bgColors[color]} ${className}`}
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <span className="w-2 h-2 rounded-full bg-[#14110F]" />
        <span>{text}</span>
      </motion.div>
    </AnimatePresence>
  );
};
