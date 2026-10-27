"use client";

import { useEffect, useRef, useCallback } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export interface LenisScrollEvent {
  scroll: number;
  velocity: number;
  direction: number;
}

const lenisListeners = new Set<(e: LenisScrollEvent) => void>();

export function subscribeLenis(listener: (e: LenisScrollEvent) => void): () => void {
  lenisListeners.add(listener);
  return () => {
    lenisListeners.delete(listener);
  };
}

let globalLenisInstance: Lenis | null = null;

export function getGlobalLenis(): Lenis | null {
  return globalLenisInstance;
}

if (typeof window !== "undefined") {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);
  if (window.location.hash) {
    window.history.replaceState(null, "", window.location.pathname);
  }
}

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);
  const velocityRef = useRef<number>(0);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    ScrollTrigger.clearScrollMemory("manual");
    window.scrollTo(0, 0);

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Optimized Lenis config: native touch on phones (syncTouch: false), lerp 0.08
    const lenis = new Lenis({
      lerp: prefersReducedMotion ? 1 : 0.08,
      smoothWheel: !prefersReducedMotion,
      syncTouch: false, // Native touch scrolling on phones
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    globalLenisInstance = lenis;
    if (typeof window !== "undefined") {
      (window as unknown as { __lenis: Lenis }).__lenis = lenis;
    }
    lenis.scrollTo(0, { immediate: true });

    // Connect Lenis scroll to ScrollTrigger and external subscribers
    lenis.on("scroll", (e: LenisScrollEvent) => {
      ScrollTrigger.update();
      velocityRef.current = e.velocity || 0;
      lenisListeners.forEach((fn) => fn(e));
    });

    // Master GSAP ticker sync
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Orientation and resize listener (debounced 150ms)
    let resizeTimer: NodeJS.Timeout;
    const handleResizeOrOrientation = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener("resize", handleResizeOrOrientation, { passive: true });
    window.addEventListener("orientationchange", handleResizeOrOrientation, { passive: true });

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("resize", handleResizeOrOrientation);
      window.removeEventListener("orientationchange", handleResizeOrOrientation);
      clearTimeout(resizeTimer);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      if (globalLenisInstance === lenis) {
        globalLenisInstance = null;
      }
    };
  }, []);

  const scrollTo = useCallback((target: string | number | HTMLElement, offset = 0) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset, duration: 1.2 });
    }
  }, []);

  const stopScroll = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.stop();
    }
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
  }, []);

  const startScroll = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.start();
    }
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  }, []);

  return { lenis: lenisRef.current, scrollTo, stopScroll, startScroll, velocityRef };
}
