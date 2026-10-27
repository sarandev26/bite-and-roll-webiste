"use client";

import React, { useRef, useEffect } from "react";
import { MENU_ITEMS, MenuItem } from "@/data/menu";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export const Menu: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedStageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const stage = pinnedStageRef.current;
    const track = trackRef.current;
    if (!container || !stage || !track) return;

    const ctx = gsap.context(() => {
      const getScrollDistance = () => {
        const extraPad = window.innerWidth < 768 ? 32 : 120;
        return Math.max(0, track.scrollWidth - window.innerWidth + extraPad);
      };

      gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: stage,
          pinSpacing: true,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, container);

    const handleImagesLoaded = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", handleImagesLoaded);
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      window.removeEventListener("load", handleImagesLoaded);
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="section-menu"
      data-cursor="MENU"
      className="relative w-full bg-[#14110F] text-[#EDE6DB] select-none"
    >
      {/* 100svh Pinned Viewport Container with Balanced Vertical Layout */}
      <div
        ref={pinnedStageRef}
        className="relative min-h-[100svh] h-[100svh] w-full overflow-hidden flex flex-col justify-between bg-[#14110F]"
      >
        {/* Fixed Top Header */}
        <div className="w-full pt-[8vh] sm:pt-[10vh] md:pt-[12vh] px-6 md:px-14 shrink-0 z-20">
          <div className="flex items-end justify-between max-w-[1800px] mx-auto">
            <div>
              <div className="font-flame-sans text-xs md:text-sm uppercase tracking-[0.25em] text-[#E4572E] font-bold mb-1">
                Handcrafted Street Menu
              </div>
              <h2 className="font-flame text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight text-[#EDE6DB] leading-none">
                THE <span className="text-outline-smoke">MENU</span>
              </h2>
            </div>

            <div className="hidden sm:block font-flame-sans text-xs uppercase tracking-widest text-[#EDE6DB]/40 font-semibold">
              10 DISHES • SCROLL TO EXPLORE &rarr;
            </div>
          </div>
        </div>

        {/* Center Horizontal Flex Track with Balanced ~6vh Bottom Padding */}
        <div className="w-full overflow-hidden my-auto pt-[2vh] pb-[6vh] shrink-0">
          <div
            ref={trackRef}
            className="flex gap-5 sm:gap-6 md:gap-8 items-center px-6 md:px-14 w-max will-change-transform"
            style={{ backfaceVisibility: "hidden" }}
          >
            {MENU_ITEMS.map((item, idx) => (
              <MenuCard
                key={item.id}
                item={item}
                index={idx}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CONTINUOUS DUAL-LAYER WAVING TRANSITION (Between Menu #14110F and How It Works #EDE6DB) */}
      <div className="relative w-full h-24 md:h-32 bg-[#14110F] overflow-hidden leading-none select-none pointer-events-none">
        {/* Back Wave: Mustard Yellow, 14s linear infinite */}
        <div className="absolute inset-0 flex w-[200%] animate-wave-back opacity-65 will-change-transform">
          <svg
            viewBox="0 0 2400 120"
            className="w-full h-full block"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 0 50 C 300 5, 300 95, 600 50 C 900 5, 900 95, 1200 50 C 1500 5, 1500 95, 1800 50 C 2100 5, 2100 95, 2400 50 L 2400 120 L 0 120 Z"
              fill="#F2B33D"
            />
          </svg>
        </div>

        {/* Front Wave: Ember Orange, 9s reverse linear infinite */}
        <div className="absolute inset-0 flex w-[200%] animate-wave-front opacity-85 will-change-transform">
          <svg
            viewBox="0 0 2400 120"
            className="w-full h-full block"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 0 65 C 300 105, 300 15, 600 65 C 900 105, 900 15, 1200 65 C 1500 105, 1500 15, 1800 65 C 2100 105, 2100 15, 2400 65 L 2400 120 L 0 120 Z"
              fill="#E4572E"
            />
          </svg>
        </div>

        {/* Base Layer: Smoke Beige transition cleanly connecting into How It Works */}
        <div className="absolute inset-x-0 bottom-0 h-10 md:h-14">
          <svg
            viewBox="0 0 1200 60"
            className="w-full h-full block"
            fill="#EDE6DB"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M 0 25 Q 300 55 600 25 T 1200 25 L 1200 60 L 0 60 Z" />
          </svg>
        </div>
      </div>
    </section>
  );
};

// 3D Tilted Premium Dish Card with gsap.quickTo
function MenuCard({
  item,
  index,
}: {
  item: MenuItem;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const quickRotateX = useRef<((v: number) => void) | null>(null);
  const quickRotateY = useRef<((v: number) => void) | null>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    quickRotateX.current = gsap.quickTo(cardRef.current, "rotationX", {
      duration: 0.35,
      ease: "power2.out",
    });
    quickRotateY.current = gsap.quickTo(cardRef.current, "rotationY", {
      duration: 0.35,
      ease: "power2.out",
    });

    return () => {
      quickRotateX.current = null;
      quickRotateY.current = null;
    };
  }, []);

  const themes = [
    {
      bg: "bg-[#F2B33D]",
      text: "text-[#14110F]",
      subtext: "text-[#14110F]/80",
      border: "border-[#14110F]",
      tagBg: "bg-[#14110F] text-[#F2B33D]",
      divider: "border-[#14110F]/30",
    },
    {
      bg: "bg-[#14110F]",
      text: "text-[#EDE6DB]",
      subtext: "text-[#EDE6DB]/75",
      border: "border-[#EDE6DB]/25",
      tagBg: "bg-[#E4572E] text-white",
      divider: "border-[#EDE6DB]/25",
    },
    {
      bg: "bg-[#E4572E]",
      text: "text-[#EDE6DB]",
      subtext: "text-[#EDE6DB]/85",
      border: "border-[#14110F]",
      tagBg: "bg-[#14110F] text-[#EDE6DB]",
      divider: "border-[#EDE6DB]/30",
    },
    {
      bg: "bg-[#EDE6DB]",
      text: "text-[#14110F]",
      subtext: "text-[#14110F]/80",
      border: "border-[#14110F]",
      tagBg: "bg-[#14110F] text-[#EDE6DB]",
      divider: "border-[#14110F]/25",
    },
  ];

  const currentTheme = themes[index % themes.length];

  // Gentle 3D Tilt with gsap.quickTo (disabled on touch devices)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && !window.matchMedia("(hover: hover)").matches) {
      return;
    }
    if (!cardRef.current || !quickRotateX.current || !quickRotateY.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const px = (e.clientX - cx) / (rect.width / 2);
    const py = (e.clientY - cy) / (rect.height / 2);
    quickRotateX.current(-py * 4);
    quickRotateY.current(px * 4);
  };

  const handleMouseLeave = () => {
    if (quickRotateX.current) quickRotateX.current(0);
    if (quickRotateY.current) quickRotateY.current(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="MENU"
      style={{
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
      }}
      className={`relative shrink-0 w-[78vw] sm:w-[44vw] md:w-[350px] lg:w-[370px] rounded-3xl border-3 ${currentTheme.border} ${currentTheme.bg} ${currentTheme.text} p-5 md:p-6 shadow-xl flex flex-col justify-between overflow-hidden select-none group h-[390px] md:h-[430px] lg:h-[460px]`}
    >
      {/* Punched Notches on Left and Right edges */}
      <div className="dish-notch-left" />
      <div className="dish-notch-right" />

      {/* Top Header Tag */}
      <div>
        <div className="flex justify-between items-center pb-3 border-b border-dashed border-current/25">
          <span
            className={`font-flame-sans text-[11px] md:text-xs tracking-wider uppercase font-bold px-3 py-0.5 rounded-full ${currentTheme.tagBg}`}
          >
            {item.badge || "STREET CRAFT"}
          </span>
          <span className="font-flame-sans text-[10px] md:text-[11px] font-bold tracking-wider opacity-60 uppercase">
            DISH #{item.number}
          </span>
        </div>

        {/* Product Image with lazy loading */}
        <div className="relative w-full h-36 md:h-44 my-3 rounded-2xl overflow-hidden bg-black/10 flex items-center justify-center p-2">
          <img
            src={item.previewImage}
            alt={item.name}
            loading="lazy"
            decoding="async"
            width={320}
            height={200}
            className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
          />
        </div>

        {/* Name & Category */}
        <div className="font-flame-sans text-[10px] md:text-[11px] uppercase tracking-widest opacity-60 font-semibold mb-0.5">
          {item.category}
        </div>
        <h3 className="font-flame text-xl sm:text-2xl md:text-3xl uppercase tracking-tight leading-none mb-1.5">
          {item.name}
        </h3>
        <p className={`font-flame-sans text-xs md:text-sm ${currentTheme.subtext} font-medium leading-relaxed line-clamp-2`}>
          {item.description}
        </p>
      </div>

      {/* Bottom Perforated Tear-Off Strip with Indian Price and 44px Tap Target Button */}
      <div className="pt-3 border-t-2 border-dashed border-current/25 flex items-center justify-between">
        <div>
          <span className="font-flame-sans text-[9px] md:text-[10px] tracking-wider uppercase opacity-60 block font-semibold">
            STREET PRICE
          </span>
          <span className="font-flame text-xl md:text-2xl tracking-tight leading-none text-[#E4572E]">
            {item.price}
          </span>
        </div>

        <button
          type="button"
          className={`font-flame-sans text-xs uppercase tracking-wider font-bold min-h-[44px] px-4 py-2.5 rounded-xl transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-md cursor-pointer flex items-center justify-center ${currentTheme.tagBg}`}
          data-cursor="ORDER"
        >
          Add to Bag
        </button>
      </div>
    </div>
  );
}
