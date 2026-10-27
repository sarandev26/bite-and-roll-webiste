"use client";

import React from "react";

interface SauceDripProps {
  color?: string;
  className?: string;
  inverted?: boolean;
}

export const SauceDrip: React.FC<SauceDripProps> = ({
  color = "#E4572E",
  className = "",
  inverted = false,
}) => {
  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className} ${
        inverted ? "rotate-180" : ""
      }`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 64"
        preserveAspectRatio="none"
        className="w-full h-8 md:h-12 block"
        fill={color}
      >
        <path d="M0,0 L1200,0 L1200,12 C1150,12 1120,38 1080,38 C1040,38 1010,8 960,8 C910,8 880,48 830,48 C780,48 750,14 700,14 C650,14 620,58 570,58 C520,58 490,16 440,16 C390,16 360,42 310,42 C260,42 230,10 180,10 C130,10 100,52 50,52 C20,52 10,20 0,20 Z" />
      </svg>
    </div>
  );
};
