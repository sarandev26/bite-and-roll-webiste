"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EchoTextProps {
  word: string;
  progress: number;
}

export const EchoText: React.FC<EchoTextProps> = ({
  word,
  progress,
}) => {
  // 3 stacked centered rows with parallax offsets
  const rows = [
    { id: 0, speed: -120 },
    { id: 1, speed: 140 },
    { id: 2, speed: -110 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-0 flex flex-col justify-center items-center overflow-hidden select-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={`echo-${word}`}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-full flex flex-col items-center justify-center space-y-2 md:space-y-4"
        >
          {rows.map((row) => {
            const shift = (progress - 0.5) * row.speed;
            return (
              <div
                key={`echo-row-${word}-${row.id}`}
                style={{
                  transform: `translateX(${shift}px)`,
                  transition: "transform 0.12s linear",
                  color: "rgba(228, 87, 46, 0.12)",
                }}
                className="whitespace-nowrap font-flame text-[15vw] sm:text-[17vw] md:text-[19vw] leading-[0.88] tracking-tight uppercase select-none text-center"
              >
                {word}
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
