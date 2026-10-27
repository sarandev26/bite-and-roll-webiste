"use client";

import React from "react";
import { INGREDIENT_LABELS_CONFIG, IngredientPin } from "@/data/ingredientLabels";
import { motion, AnimatePresence } from "framer-motion";

interface IngredientCalloutsProps {
  chapterIndex: number;
  chapterProgress: number;
}

export const IngredientCallouts: React.FC<IngredientCalloutsProps> = ({
  chapterIndex,
  chapterProgress,
}) => {
  const currentChapterConfig = INGREDIENT_LABELS_CONFIG[chapterIndex];
  if (!currentChapterConfig) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-25 overflow-hidden select-none">
      {currentChapterConfig.labels.map((pin) => {
        const isVisible =
          chapterProgress >= pin.startProg && chapterProgress <= pin.endProg;

        return (
          <PinLabel
            key={pin.id}
            pin={pin}
            isVisible={isVisible}
          />
        );
      })}
    </div>
  );
};

function PinLabel({
  pin,
  isVisible,
}: {
  pin: IngredientPin;
  isVisible: boolean;
}) {
  const isRightSide = pin.x > 50;

  return (
    <div
      style={{
        left: `${pin.x}%`,
        top: `${pin.y}%`,
        transform: "translate(-50%, -50%)",
      }}
      className="absolute flex items-center pointer-events-none"
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: isRightSide ? 15 : -15, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: isRightSide ? 10 : -10, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`flex items-center gap-2 ${
              isRightSide ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* Tiny Dot Pointing at Ingredient */}
            <div className="relative flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E4572E] shadow-sm" />
              <span className="absolute w-4 h-4 rounded-full border border-[#E4572E]/40 animate-ping opacity-60" />
            </div>

            {/* Thin Connecting Pointer Line */}
            <div className="w-8 md:w-12 h-[1px] bg-[#14110F]/40" />

            {/* Elegant Label Pill (Flame Sans, 12-14px, uppercase, wide letter-spacing) */}
            <div className="bg-[#14110F]/85 backdrop-blur-sm text-[#EDE6DB] border border-[#EDE6DB]/20 px-3 py-1 rounded-full shadow-lg font-flame-sans text-[11px] md:text-[13px] uppercase tracking-[0.18em] font-semibold whitespace-nowrap">
              {pin.text}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
