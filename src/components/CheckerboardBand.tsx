"use client";

import React from "react";
import { motion } from "framer-motion";

interface CheckerboardBandProps {
  variant?: "ember-charcoal" | "charcoal-beige" | "mustard-charcoal";
  className?: string;
  height?: string;
  speed?: number; // duration in seconds
  reverse?: boolean;
}

export const CheckerboardBand: React.FC<CheckerboardBandProps> = ({
  variant = "ember-charcoal",
  className = "",
  height = "h-7",
  speed = 18,
  reverse = false,
}) => {
  const patternClass =
    variant === "charcoal-beige"
      ? "checkerboard-charcoal-beige"
      : variant === "mustard-charcoal"
      ? "checkerboard-mustard-charcoal"
      : "checkerboard-ember-charcoal";

  return (
    <div
      className={`relative w-full ${height} overflow-hidden select-none border-y border-[#14110F]/20 ${className}`}
      aria-hidden="true"
    >
      <motion.div
        initial={{ x: reverse ? "-50%" : "0%" }}
        animate={{ x: reverse ? "0%" : "-50%" }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
        className={`w-[200%] h-full ${patternClass}`}
      />
    </div>
  );
};
