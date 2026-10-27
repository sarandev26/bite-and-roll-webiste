"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "ember" | "mustard" | "charcoal" | "outline";
  cursorText?: string;
  id?: string;
  type?: "button" | "submit" | "reset";
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  className = "",
  variant = "ember",
  cursorText = "ORDER",
  id,
  type = "button",
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ripplePos, setRipplePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Magnetic pull (max 12px translation)
    const distanceX = (e.clientX - centerX) * 0.35;
    const distanceY = (e.clientY - centerY) * 0.35;
    setPosition({ x: distanceX, y: distanceY });

    // Ripple origin in percentage
    const ripX = ((e.clientX - rect.left) / rect.width) * 100;
    const ripY = ((e.clientY - rect.top) / rect.height) * 100;
    setRipplePos({ x: ripX, y: ripY });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(true);
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const ripX = ((e.clientX - rect.left) / rect.width) * 100;
    const ripY = ((e.clientY - rect.top) / rect.height) * 100;
    setRipplePos({ x: ripX, y: ripY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  // Variant base styles
  const variantStyles = {
    ember: "bg-[#E4572E] text-[#EDE6DB] border-transparent hover:text-white",
    mustard: "bg-[#F2B33D] text-[#14110F] border-transparent hover:text-white",
    charcoal: "bg-[#14110F] text-[#EDE6DB] border-[#14110F] hover:text-[#EDE6DB]",
    outline: "bg-transparent text-[#14110F] border-[#14110F] hover:text-white",
  };

  const rippleColors = {
    ember: "#14110F",
    mustard: "#E4572E",
    charcoal: "#E4572E",
    outline: "#14110F",
  };

  return (
    <motion.button
      ref={btnRef}
      id={id}
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor={cursorText}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className={`relative inline-flex items-center justify-center overflow-hidden border-2 px-8 py-3.5 font-flame-sans font-bold text-sm md:text-base uppercase tracking-wider transition-colors duration-300 rounded-full cursor-pointer select-none shadow-md ${variantStyles[variant]} ${className}`}
    >
      {/* Expanding Ripple Fill from Pointer Position */}
      <span
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-500 ease-out"
        style={{
          left: `${ripplePos.x}%`,
          top: `${ripplePos.y}%`,
          width: "260%",
          paddingBottom: "260%",
          backgroundColor: rippleColors[variant],
          transform: isHovered ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0)",
        }}
      />

      {/* Button Content with subtle parallax offset */}
      <motion.span
        animate={{ x: position.x * 0.4, y: position.y * 0.4 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative z-10 flex items-center gap-2"
      >
        {children}
      </motion.span>
    </motion.button>
  );
};
