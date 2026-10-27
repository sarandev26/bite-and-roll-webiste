"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";

interface QuickOrderButtonProps {
  onClick: () => void;
  className?: string;
}

export const QuickOrderButton: React.FC<QuickOrderButtonProps> = ({
  onClick,
  className = "",
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (typeof window !== "undefined" && !window.matchMedia("(hover: hover)").matches) {
      return;
    }
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setPos({
      x: (e.clientX - centerX) * 0.25,
      y: (e.clientY - centerY) * 0.25,
    });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={btnRef}
      type="button"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      data-cursor="ORDER"
      className={`relative w-[72px] h-[72px] sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[#E4572E] text-[#EDE6DB] border-2 sm:border-3 border-[#14110F] shadow-xl flex items-center justify-center cursor-pointer select-none group overflow-hidden will-change-transform ${className}`}
    >
      {/* Rotating Circular Text Ring */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite] pointer-events-none will-change-transform"
      >
        <path
          id="quickOrderCirclePath"
          d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          fill="none"
        />
        <text className="font-flame-sans text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.24em] fill-[#EDE6DB]">
          <textPath href="#quickOrderCirclePath" startOffset="0%">
            ORDER NOW • QUICK BITE • FRESH DROP •&nbsp;
          </textPath>
        </text>
      </svg>

      {/* Center Circle with Icon */}
      <div className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-[#14110F] text-[#F2B33D] flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110">
        <HiArrowRight className="text-sm sm:text-lg md:text-xl group-hover:translate-x-0.5 transition-transform" />
      </div>
    </motion.button>
  );
};
