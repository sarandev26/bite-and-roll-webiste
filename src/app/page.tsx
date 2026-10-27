"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useLenis } from "@/hooks/useLenis";
import { Preloader } from "@/components/Preloader";
import { Nav } from "@/components/Nav";
import { Cursor } from "@/components/Cursor";
import { SinglePinnedStage } from "@/components/SinglePinnedStage";
import { Marquee } from "@/components/Marquee";
import { Menu } from "@/components/Menu";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { ScrollTrigger } from "@/lib/gsap";

export default function Home() {
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const { scrollTo, stopScroll, startScroll } = useLenis();

  // Lock scrolling while preloader is active, enforce (0,0) start
  useEffect(() => {
    stopScroll();
    window.scrollTo(0, 0);
  }, [stopScroll]);

  const handlePreloaderComplete = useCallback(() => {
    setIsPreloaderDone(true);
    startScroll();
    window.scrollTo(0, 0);
    // Refresh ScrollTrigger only after preloader unmounts and frames are ready
    setTimeout(() => {
      ScrollTrigger.refresh();
      ScrollTrigger.update();
    }, 100);
  }, [startScroll]);

  const handleNavigate = useCallback(
    (targetId: string) => {
      scrollTo(`#${targetId}`, -10);
    },
    [scrollTo]
  );

  const handleBackToTop = useCallback(() => {
    scrollTo(0);
  }, [scrollTo]);

  const handleNavigateMenu = useCallback(() => {
    scrollTo("#section-menu", -10);
  }, [scrollTo]);

  return (
    <main className="relative bg-[#EDE6DB] text-[#14110F] min-h-screen">
      {/* 1. Preloader (Unmounts fully after finishing) */}
      {!isPreloaderDone && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}

      {/* 2. Custom Magnetic Cursor */}
      <Cursor />

      {/* 3. Fixed Minimal Navigation (Height ~52px) */}
      <Nav onNavigate={handleNavigate} />

      {/* 4. Section 1: Single Pinned Stage (Burger, Wrap, Drink, Bag in 1 container) */}
      <SinglePinnedStage
        onNavigateMenu={handleNavigateMenu}
      />

      {/* 5. Section 2: Dual Opposite-Direction Marquee Strip */}
      <Marquee />

      {/* 6. Section 3: The Menu (10 Handcrafted Dish Cards with ₹ INR prices) */}
      <Menu />

      {/* 7. Section 4: How It Works (3 Tall Poster Panels) */}
      <HowItWorks />

      {/* 8. Section 5: Testimonials (Loved By The Street with Indian cities & portraits) */}
      <Testimonials />

      {/* 9. Section 6: Typographic Graphic Footer (No food photos, Indian details) */}
      <Footer onBackToTop={handleBackToTop} onNavigate={handleNavigate} />
    </main>
  );
}
