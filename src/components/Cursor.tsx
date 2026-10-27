"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "@/lib/gsap";

export const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeLabel, setActiveLabel] = useState("");
  const [isClickable, setIsClickable] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const lastPosRef = useRef({ x: -100, y: -100 });
  const activeLabelRef = useRef("");
  const isClickableRef = useRef(false);

  useEffect(() => {
    // Detect touch devices (phones, tablets)
    const checkTouch = () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches ||
        !window.matchMedia("(hover: hover)").matches
      );
    };

    if (checkTouch()) {
      setIsTouchDevice(true);
      return;
    }

    if (!cursorRef.current) return;

    // Use gsap.quickTo for instant 60fps cursor positioning
    const xTo = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.16,
      ease: "power3",
    });
    const yTo = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.16,
      ease: "power3",
    });

    const updateLabelAtPoint = (x: number, y: number) => {
      if (x < 0 || y < 0 || x > window.innerWidth || y > window.innerHeight) {
        if (activeLabelRef.current !== "") {
          activeLabelRef.current = "";
          setActiveLabel("");
        }
        if (isClickableRef.current) {
          isClickableRef.current = false;
          setIsClickable(false);
        }
        return;
      }

      const el = document.elementFromPoint(x, y);
      if (!el) {
        if (activeLabelRef.current !== "") {
          activeLabelRef.current = "";
          setActiveLabel("");
        }
        if (isClickableRef.current) {
          isClickableRef.current = false;
          setIsClickable(false);
        }
        return;
      }

      const cursorMatch = el.closest("[data-cursor]") as HTMLElement | null;
      if (cursorMatch) {
        const raw = cursorMatch.getAttribute("data-cursor")?.trim().toUpperCase() || "";
        let label = raw;
        if (label === "TICKET" || label === "TICKETS") {
          label = "MENU";
        }

        if (label !== activeLabelRef.current) {
          activeLabelRef.current = label;
          setActiveLabel(label);
        }
        if (!isClickableRef.current) {
          isClickableRef.current = true;
          setIsClickable(true);
        }
      } else {
        if (activeLabelRef.current !== "") {
          activeLabelRef.current = "";
          setActiveLabel("");
        }

        const clickable = Boolean(
          el.closest("button, a, input, select, textarea, [role='button']")
        );
        if (clickable !== isClickableRef.current) {
          isClickableRef.current = clickable;
          setIsClickable(clickable);
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      lastPosRef.current = { x: e.clientX, y: e.clientY };
      xTo(e.clientX);
      yTo(e.clientY);
      updateLabelAtPoint(e.clientX, e.clientY);
    };

    const handleScroll = () => {
      if (lastPosRef.current.x >= 0 && lastPosRef.current.y >= 0) {
        updateLabelAtPoint(lastPosRef.current.x, lastPosRef.current.y);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      activeLabelRef.current = "";
      setActiveLabel("");
      isClickableRef.current = false;
      setIsClickable(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  const hasLabel = Boolean(activeLabel);
  // Animate transform: scale instead of width/height to avoid layout reflows!
  const targetScale = hasLabel ? 1 : isClickable ? 0.58 : 0.38;

  return (
    <div
      ref={cursorRef}
      id="custom-cursor"
      className="pointer-events-none fixed top-0 left-0 z-50 -translate-x-1/2 -translate-y-1/2 will-change-transform"
      style={{
        transform: "translate3d(-100px, -100px, 0)",
        backfaceVisibility: "hidden",
      }}
    >
      <motion.div
        className="w-[74px] h-[74px] flex items-center justify-center rounded-full pointer-events-none select-none overflow-hidden will-change-transform"
        animate={{
          scale: targetScale,
          backgroundColor: hasLabel
            ? "rgba(228, 87, 46, 0.96)"
            : isClickable
            ? "rgba(242, 179, 61, 0.3)"
            : "rgba(20, 17, 15, 0.12)",
          borderColor: hasLabel
            ? "rgba(228, 87, 46, 0)"
            : isClickable
            ? "#E4572E"
            : "rgba(20, 17, 15, 0.4)",
          borderWidth: hasLabel ? 0 : 2,
        }}
        transition={{ type: "spring", stiffness: 450, damping: 28 }}
      >
        <AnimatePresence mode="wait">
          {hasLabel && (
            <motion.span
              key={`cursor-label-${activeLabel}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.16 }}
              className="font-flame-sans font-bold text-[11px] uppercase tracking-widest text-[#EDE6DB] text-center px-1"
            >
              {activeLabel}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Center dot in default resting state */}
      {!hasLabel && !isClickable && (
        <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-[#E4572E] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      )}
    </div>
  );
};
