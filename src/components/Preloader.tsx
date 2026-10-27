"use client";

import React, { useEffect, useRef, useState } from "react";
import { preloadAllFrames, isFrame0Ready } from "@/lib/framePreloader";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRectRef = useRef<SVGRectElement>(null);
  const percentTextRef = useRef<HTMLSpanElement>(null);
  const [isUnmounted, setIsUnmounted] = useState(false);

  useEffect(() => {
    let animId: number;
    let isMounted = true;
    let targetProgress = 0;
    let displayProgress = 0;
    let hasCompleted = false;

    const updateRAF = () => {
      if (!isMounted) return;

      const diff = targetProgress - displayProgress;

      // Finish to 100 ONLY if targetProgress is 100 AND frame 0 is decoded
      const readyToExit = targetProgress >= 100 && isFrame0Ready();

      if (readyToExit) {
        displayProgress += Math.max(diff * 0.25, 4.0);
      } else if (Math.abs(diff) > 0.05) {
        displayProgress += diff * 0.15;
      } else {
        displayProgress = targetProgress;
      }

      displayProgress = Math.min(100, Math.max(0, displayProgress));

      // Direct DOM update (zero React re-renders)
      if (fillRectRef.current) {
        fillRectRef.current.setAttribute("y", String(100 - displayProgress));
        fillRectRef.current.setAttribute("height", String(displayProgress));
      }

      if (percentTextRef.current) {
        percentTextRef.current.textContent = String(
          Math.min(100, Math.floor(displayProgress))
        ).padStart(2, "0");
      }

      // Exit immediately once 100 is reached and frame 0 is confirmed ready
      if (readyToExit && displayProgress >= 99.5 && !hasCompleted) {
        hasCompleted = true;
        if (containerRef.current) {
          containerRef.current.style.transition = "opacity 0.45s ease-out, transform 0.45s ease-out";
          containerRef.current.style.opacity = "0";
          containerRef.current.style.pointerEvents = "none";
        }
        // Initialize Lenis, ScrollTrigger and canvas right as exit starts
        onComplete();
        setTimeout(() => {
          setIsUnmounted(true);
        }, 480);
        return;
      }

      animId = requestAnimationFrame(updateRAF);
    };

    animId = requestAnimationFrame(updateRAF);

    // Preload priority frames
    preloadAllFrames((p) => {
      targetProgress = p;
    }).then(() => {
      targetProgress = 100;
    });

    return () => {
      isMounted = false;
      cancelAnimationFrame(animId);
    };
  }, [onComplete]);

  if (isUnmounted) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#14110F] text-[#EDE6DB] select-none pointer-events-auto will-change-[opacity,transform]"
    >
      {/* Brand Mark Only */}
      <div className="mb-8 flex flex-col items-center">
        <span className="font-flame text-4xl md:text-5xl tracking-tight text-[#E4572E]">
          BITE <span className="text-[#F2B33D]">&amp;</span> ROLL
        </span>
      </div>

      {/* Stylized Burger-shaped Progress Bar */}
      <div className="relative w-28 h-28 md:w-36 md:h-36 mb-6">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath id="burgerFillMask">
              <rect
                ref={fillRectRef}
                x="0"
                y="100"
                width="100"
                height="0"
              />
            </clipPath>
          </defs>

          {/* Background Ghost Burger */}
          <g stroke="#EDE6DB" strokeOpacity="0.2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 40 C20 22, 80 22, 80 40 Z" />
            <circle cx="38" cy="30" r="1" fill="#EDE6DB" fillOpacity="0.3" stroke="none" />
            <circle cx="50" cy="27" r="1" fill="#EDE6DB" fillOpacity="0.3" stroke="none" />
            <circle cx="62" cy="32" r="1" fill="#EDE6DB" fillOpacity="0.3" stroke="none" />
            <path d="M16 46 Q28 44 40 47 Q52 50 64 46 Q76 43 84 46" />
            <rect x="18" y="52" width="64" height="8" rx="4" />
            <path d="M15 64 Q25 61 35 64 Q45 67 55 64 Q65 61 75 64 Q80 66 85 64" />
            <path d="M22 70 Q50 72 78 70 L76 78 C76 82, 24 82, 24 78 Z" />
          </g>

          {/* Filled Burger Clip */}
          <g clipPath="url(#burgerFillMask)">
            <path
              d="M20 40 C20 22, 80 22, 80 40 Z"
              fill="#F2B33D"
              stroke="#F2B33D"
              strokeWidth="2.5"
            />
            <circle cx="38" cy="30" r="1.5" fill="#14110F" />
            <circle cx="50" cy="27" r="1.5" fill="#14110F" />
            <circle cx="62" cy="32" r="1.5" fill="#14110F" />
            <path
              d="M16 46 Q28 44 40 47 Q52 50 64 46 Q76 43 84 46"
              stroke="#F2B33D"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <rect
              x="18"
              y="52"
              width="64"
              height="8"
              rx="4"
              fill="#E4572E"
              stroke="#E4572E"
              strokeWidth="1.5"
            />
            <path
              d="M15 64 Q25 61 35 64 Q45 67 55 64 Q65 61 75 64 Q80 66 85 64"
              stroke="#6B8F3A"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M22 70 Q50 72 78 70 L76 78 C76 82, 24 82, 24 78 Z"
              fill="#F2B33D"
              stroke="#F2B33D"
              strokeWidth="2.5"
            />
          </g>
        </svg>
      </div>

      {/* Percentage Counter */}
      <div className="flex items-baseline gap-1 font-flame">
        <span
          ref={percentTextRef}
          className="text-4xl md:text-5xl tabular-nums tracking-tight text-[#EDE6DB]"
        >
          00
        </span>
        <span className="text-lg md:text-xl text-[#E4572E]">%</span>
      </div>
    </div>
  );
};
