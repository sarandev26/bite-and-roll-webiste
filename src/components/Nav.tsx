"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenuAlt4, HiX } from "react-icons/hi";
import { gsap } from "@/lib/gsap";
import { subscribeLenis } from "@/hooks/useLenis";

interface NavProps {
  onNavigate: (targetId: string) => void;
}

export const Nav: React.FC<NavProps> = ({ onNavigate }) => {
  const headerRef = useRef<HTMLElement>(null);
  const isNavHiddenRef = useRef<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    // Initial state: visible at y=0, opacity 1
    gsap.set(header, { y: 0, autoAlpha: 1 });

    // Calculate full off-screen distance:
    // real height + top offset + shadow size (60px)
    const getHideY = () => {
      if (!header) return -180;
      const rect = header.getBoundingClientRect();
      const topOffset = header.offsetTop || (window.innerWidth < 640 ? 12 : 16);
      return -(rect.height + topOffset + 60);
    };

    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;

    const hideNav = () => {
      if (isNavHiddenRef.current) return;
      isNavHiddenRef.current = true;
      const hideDistance = getHideY();

      // Slide out smoothly in 0.5s with power3.inOut on transform and opacity only
      gsap.to(header, {
        y: hideDistance,
        autoAlpha: 0,
        duration: 0.5,
        ease: "power3.inOut",
        overwrite: "auto",
        onComplete: () => {
          if (isNavHiddenRef.current && header) {
            header.style.visibility = "hidden";
            header.style.pointerEvents = "none";
          }
        },
      });
    };

    const showNav = () => {
      if (!isNavHiddenRef.current) return;
      isNavHiddenRef.current = false;

      // Restore visibility immediately when it starts to slide back in
      header.style.visibility = "visible";
      header.style.pointerEvents = "none";

      // Slide in smoothly in 0.45s with power3.out on transform and opacity only
      gsap.to(header, {
        y: 0,
        autoAlpha: 1,
        duration: 0.45,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const handleScroll = (currentScrollY: number) => {
      // At the very top of the page (below 80px) always show
      if (currentScrollY <= 80) {
        if (isNavHiddenRef.current) {
          showNav();
        }
        lastScrollY = currentScrollY;
        return;
      }

      const diff = currentScrollY - lastScrollY;

      // Threshold of about 8px with direction check (do not toggle on tiny movements)
      if (diff > 8) {
        // Scrolling down: hide completely
        if (!isNavHiddenRef.current) {
          hideNav();
        }
        lastScrollY = currentScrollY;
      } else if (diff < -8) {
        // Scrolling up: show smoothly
        if (isNavHiddenRef.current) {
          showNav();
        }
        lastScrollY = currentScrollY;
      }
    };

    // Single Lenis scroll listener
    const unsubscribeLenis = subscribeLenis((e) => {
      handleScroll(e.scroll);
    });

    // Native scroll fallback (ensures touch scrolling on phones triggers smoothly)
    const onNativeScroll = () => {
      handleScroll(window.scrollY);
    };
    window.addEventListener("scroll", onNativeScroll, { passive: true });

    return () => {
      unsubscribeLenis();
      window.removeEventListener("scroll", onNativeScroll);
      if (header) {
        gsap.killTweensOf(header);
      }
    };
  }, []);

  const navLinks = [
    { label: "Experience", target: "main-stage-container", cursor: "BITE" },
    { label: "The Menu", target: "section-menu", cursor: "MENU" },
    { label: "How It Works", target: "section-how-it-works", cursor: "STEP" },
  ];

  return (
    <>
      <header
        ref={headerRef}
        style={{
          backfaceVisibility: "hidden",
        }}
        className="fixed top-3 sm:top-4 left-0 right-0 z-40 px-3 sm:px-6 md:px-8 pointer-events-none will-change-transform"
      >
        {/* Slim Pill-Shaped Container with min 44px tap targets */}
        <div className="max-w-4xl mx-auto min-h-[48px] sm:min-h-[52px] bg-[#14110F]/90 backdrop-blur-md border border-[#EDE6DB]/20 rounded-full px-4 sm:px-6 flex items-center justify-between shadow-xl pointer-events-auto select-none">
          {/* Brand Logo Left */}
          <button
            type="button"
            onClick={() => onNavigate("main-stage-container")}
            className="group min-h-[44px] flex items-center gap-1 cursor-pointer focus:outline-none"
            data-cursor="BITE"
          >
            <span className="font-flame text-base sm:text-lg md:text-xl tracking-tight text-[#EDE6DB] group-hover:text-[#E4572E] transition-colors duration-300 leading-none">
              BITE <span className="text-[#E4572E]">&amp;</span>{" "}
              <span className="text-[#F2B33D]">ROLL</span>
            </span>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.target}
                type="button"
                onClick={() => onNavigate(link.target)}
                className="font-flame-sans text-[13px] tracking-wider uppercase font-semibold text-[#EDE6DB]/80 hover:text-[#E4572E] transition-colors duration-300 cursor-pointer min-h-[44px] flex items-center"
                data-cursor={link.cursor}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action: Order Now Pill on ALL Devices + Hamburger on Mobile */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate("section-menu")}
              className="min-h-[44px] px-3.5 sm:px-5 py-2 text-[11px] sm:text-xs tracking-wider font-flame-sans font-bold uppercase rounded-full bg-[#E4572E] text-white hover:bg-[#F2B33D] hover:text-[#14110F] transition-[background-color,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-md flex items-center justify-center cursor-pointer"
              data-cursor="ORDER"
            >
              Order Now
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-11 h-11 flex items-center justify-center text-2xl text-[#EDE6DB] hover:text-[#E4572E] transition-colors duration-300 cursor-pointer rounded-full"
              aria-label="Open mobile menu"
              data-cursor="MENU"
            >
              <HiOutlineMenuAlt4 />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu Overlay in Charcoal with Large Flame Text */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-[#14110F] text-[#EDE6DB] flex flex-col justify-between p-6 sm:p-10 pt-[calc(env(safe-area-inset-top,0px)+20px)] pb-[calc(env(safe-area-inset-bottom,0px)+24px)] select-none"
          >
            {/* Top Bar with Brand and 44px Close Button */}
            <div className="flex justify-between items-center">
              <span className="font-flame text-2xl sm:text-3xl text-[#E4572E]">
                BITE &amp; ROLL
              </span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-11 h-11 flex items-center justify-center text-3xl text-[#EDE6DB] hover:text-[#E4572E] transition-colors duration-300 cursor-pointer rounded-full border border-[#EDE6DB]/20"
                aria-label="Close menu"
                data-cursor="MENU"
              >
                <HiX />
              </button>
            </div>

            {/* Staggered Nav Links in Large Flame Display Font */}
            <div className="flex flex-col gap-6 my-auto">
              {navLinks.map((link, idx) => (
                <motion.button
                  key={link.target}
                  type="button"
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * idx, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  data-cursor={link.cursor}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate(link.target);
                  }}
                  className="font-flame text-4xl sm:text-5xl text-left uppercase tracking-tight text-[#EDE6DB] hover:text-[#E4572E] transition-colors duration-300 min-h-[48px] flex items-center"
                >
                  {link.label}
                </motion.button>
              ))}
            </div>

            {/* Bottom Order Button (48px tap target) */}
            <div>
              <button
                type="button"
                data-cursor="ORDER"
                className="w-full min-h-[48px] py-3.5 rounded-full bg-[#E4572E] text-white font-flame-sans text-sm font-bold uppercase tracking-wider hover:bg-[#F2B33D] hover:text-[#14110F] transition-[background-color,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-xl flex items-center justify-center cursor-pointer"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate("section-menu");
                }}
              >
                Order Now &rarr;
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
