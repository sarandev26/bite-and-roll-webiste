"use client";

import React, { useRef, useEffect } from "react";
import { CHAPTERS_DATA, BeatData } from "@/data/beats";
import { ScrollTrigger, gsap } from "@/lib/gsap";
import { QuickOrderButton } from "./QuickOrderButton";
import { MagneticButton } from "./MagneticButton";
import {
  TOTAL_GLOBAL_FRAMES,
  getDecodedFrame,
  onFrame0Ready,
} from "@/lib/framePreloader";

interface SinglePinnedStageProps {
  onNavigateMenu: () => void;
}

interface FlattenedBeat extends BeatData {
  chapterIndex: number;
  beatIndex: number;
  globalBeatIndex: number;
  isRight: boolean;
}

// 16 beats flattened across all 4 chapters
const ALL_BEATS: FlattenedBeat[] = CHAPTERS_DATA.flatMap((chapter, cIdx) =>
  chapter.beats.map((beat, bIdx) => ({
    ...beat,
    chapterIndex: cIdx,
    beatIndex: bIdx,
    globalBeatIndex: cIdx * 4 + bIdx,
    isRight: bIdx % 2 === 1,
  }))
);

export const SinglePinnedStage: React.FC<SinglePinnedStageProps> = ({
  onNavigateMenu,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinStageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Top Controls Wrappers for Pop-in Spring Animation
  const badgeWrapperRef = useRef<HTMLDivElement>(null);
  const quickOrderWrapperRef = useRef<HTMLDivElement>(null);

  // References for all 16 beat containers
  const beatContainerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Echo and Sticker badge DOM refs
  const echoWordContainerRef = useRef<HTMLDivElement>(null);
  const echoWordRow1Ref = useRef<HTMLDivElement>(null);
  const echoWordRow2Ref = useRef<HTMLDivElement>(null);
  const echoWordRow3Ref = useRef<HTMLDivElement>(null);
  const stickerTextRef = useRef<HTMLSpanElement>(null);

  // State machine refs for text transitions
  const activeBeatRef = useRef<number>(0);
  const displayedBeatRef = useRef<number>(0);
  const isTransitioningRef = useRef<boolean>(false);
  const queuedBeatRef = useRef<number | null>(null);
  const activeTimelineRef = useRef<gsap.core.Timeline | null>(null);

  // Target and current frame indices for single canvas loop
  const targetFrameIndexRef = useRef<number>(0);
  const currentFrameIndexRef = useRef<number>(0);
  const lastDrawnFrameRef = useRef<number>(-1);

  // Canvas idle float & scroll flag
  const idleTweenRef = useRef<gsap.core.Tween | null>(null);
  const hasUserScrolledRef = useRef<boolean>(false);

  // Helper for word colors
  const getWordColor = (word: { color?: string; outline?: boolean }) => {
    if (word.outline) return "text-outline-charcoal";
    switch (word.color) {
      case "ember":
        return "text-[#E4572E]";
      case "mustard":
        return "text-[#F2B33D]";
      case "green":
        return "text-[#6B8F3A]";
      case "charcoal":
      default:
        return "text-[#14110F]";
    }
  };

  // Perform beat transition (Exit old beat -> Enter new beat)
  const performTransition = (fromIdx: number, toIdx: number) => {
    if (fromIdx === toIdx) {
      isTransitioningRef.current = false;
      return;
    }

    isTransitioningRef.current = true;
    displayedBeatRef.current = toIdx;

    if (activeTimelineRef.current) {
      activeTimelineRef.current.kill();
    }

    const fromEl = beatContainerRefs.current[fromIdx];
    const toEl = beatContainerRefs.current[toIdx];
    const targetBeatData = ALL_BEATS[toIdx];
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Update Echo text and Sticker text directly
    if (targetBeatData) {
      const echoWord = targetBeatData.echoWord;
      if (echoWordRow1Ref.current) echoWordRow1Ref.current.textContent = echoWord;
      if (echoWordRow2Ref.current) echoWordRow2Ref.current.textContent = echoWord;
      if (echoWordRow3Ref.current) echoWordRow3Ref.current.textContent = echoWord;

      if (stickerTextRef.current) {
        stickerTextRef.current.textContent = targetBeatData.sticker || "100%";
      }
    }

    const tl = gsap.timeline({
      overwrite: "auto",
      onComplete: () => {
        isTransitioningRef.current = false;

        if (
          queuedBeatRef.current !== null &&
          queuedBeatRef.current !== displayedBeatRef.current
        ) {
          const nextTarget = queuedBeatRef.current;
          queuedBeatRef.current = null;
          performTransition(displayedBeatRef.current, nextTarget);
        } else {
          queuedBeatRef.current = null;
        }
      },
    });
    activeTimelineRef.current = tl;

    // 1. Exit of old beat (slide up and fade)
    if (fromEl) {
      const fromChars = fromEl.querySelectorAll(".beat-char");
      const fromExtras = fromEl.querySelectorAll(".beat-extra");

      if (prefersReducedMotion) {
        tl.to(fromEl, { autoAlpha: 0, duration: 0.15 });
      } else {
        if (fromChars.length > 0) {
          tl.to(fromChars, {
            y: -24,
            autoAlpha: 0,
            duration: 0.3,
            stagger: 0.008,
            ease: "power2.in",
          });
        }
        if (fromExtras.length > 0) {
          tl.to(
            fromExtras,
            {
              autoAlpha: 0,
              y: -12,
              duration: 0.22,
              ease: "power2.in",
            },
            "<"
          );
        }
        tl.set(fromEl, { autoAlpha: 0 });
      }
    }

    // 2. Entrance of new beat: ONLY AFTER exit is complete
    if (toEl) {
      const isRight = targetBeatData?.isRight;
      // On mobile: alternating entrance direction (x: 25 vs x: -25) without changing horizontal side
      const enterX = prefersReducedMotion ? 0 : isMobile ? (isRight ? 25 : -25) : isRight ? 35 : -35;
      const toChars = toEl.querySelectorAll(".beat-char");
      const toExtras = toEl.querySelectorAll(".beat-extra");

      if (prefersReducedMotion) {
        tl.fromTo(toEl, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 });
      } else {
        tl.fromTo(
          toEl,
          {
            autoAlpha: 1,
            x: enterX,
          },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.55,
            ease: "expo.out",
          },
          ">"
        );

        if (toChars.length > 0) {
          tl.fromTo(
            toChars,
            {
              y: 28,
              autoAlpha: 0,
            },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.55,
              stagger: 0.012,
              ease: "expo.out",
            },
            "<"
          );
        }

        if (toExtras.length > 0) {
          tl.fromTo(
            toExtras,
            {
              y: 14,
              autoAlpha: 0,
            },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.4,
              ease: "expo.out",
            },
            "<+=0.06"
          );
        }
      }
    }
  };

  const requestBeatTransition = (targetIdx: number) => {
    if (targetIdx === displayedBeatRef.current && !isTransitioningRef.current) {
      return;
    }

    if (isTransitioningRef.current) {
      queuedBeatRef.current = targetIdx;
      return;
    }

    performTransition(displayedBeatRef.current, targetIdx);
  };

  // Dedicated draw function with robust fallback and canvas sizing
  const drawFrame = (frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;
    const targetW = Math.round(width * dpr);
    const targetH = Math.round(height * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    // Fill with clean smoke beige
    ctx.fillStyle = "#EDE6DB";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const frame = getDecodedFrame(frameIdx);
    if (!frame) {
      // DO NOT set lastDrawnFrameRef.current if frame was not ready
      return;
    }

    const cWidth = canvas.width;
    const cHeight = canvas.height;
    const naturalW =
      "width" in frame ? frame.width : (frame as HTMLImageElement).naturalWidth;
    const naturalH =
      "height" in frame ? frame.height : (frame as HTMLImageElement).naturalHeight;

    if (naturalW > 0 && naturalH > 0) {
      const imgRatio = naturalW / naturalH;
      const canvasRatio = cWidth / cHeight;

      let drawWidth: number;
      let drawHeight: number;
      let offsetX: number;
      let offsetY: number;

      if (canvasRatio > imgRatio) {
        drawWidth = cWidth;
        drawHeight = cWidth / imgRatio;
        offsetX = 0;
        offsetY = (cHeight - drawHeight) / 2;
      } else {
        drawHeight = cHeight;
        drawWidth = cHeight * imgRatio;
        offsetX = (cWidth - drawWidth) / 2;
        offsetY = 0;
      }

      ctx.drawImage(
        frame as CanvasImageSource,
        offsetX,
        offsetY,
        drawWidth,
        drawHeight
      );

      // Successfully drawn!
      lastDrawnFrameRef.current = frameIdx;
    }
  };

  // Setup initial autoAlpha for beats and intro animation
  useEffect(() => {
    const prefersReducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    beatContainerRefs.current.forEach((el, idx) => {
      if (!el) return;
      if (idx === 0) {
        gsap.set(el, { autoAlpha: 1, x: 0 });
        const chars = el.querySelectorAll(".beat-char");
        const extras = el.querySelectorAll(".beat-extra");
        gsap.set(chars, { autoAlpha: 1, y: 0 });
        gsap.set(extras, { autoAlpha: 1, y: 0 });
      } else {
        const isRight = ALL_BEATS[idx].isRight;
        gsap.set(el, { autoAlpha: 0, x: isRight ? 35 : -35 });
        const chars = el.querySelectorAll(".beat-char");
        const extras = el.querySelectorAll(".beat-extra");
        gsap.set(chars, { autoAlpha: 0, y: 28 });
        gsap.set(extras, { autoAlpha: 0, y: 14 });
      }
    });

    if (prefersReducedMotion) {
      // Skip intro animations if reduced motion is requested
      return;
    }

    // 2s Opening Intro Animation (Canvas is ALWAYS visible with opacity 1)
    const introTl = gsap.timeline({
      delay: 0.1,
      onComplete: () => {
        if (!hasUserScrolledRef.current && canvasRef.current) {
          idleTweenRef.current = gsap.to(canvasRef.current, {
            y: 6,
            scale: 1.012,
            duration: 3.0,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      },
    });

    // Gentle scale from 1.04 to 1.0
    if (canvasRef.current) {
      introTl.fromTo(
        canvasRef.current,
        { scale: 1.04 },
        { scale: 1.0, duration: 1.2, ease: "power2.out" },
        0
      );
    }

    if (echoWordContainerRef.current) {
      introTl.fromTo(
        echoWordContainerRef.current,
        { scale: 0.94, opacity: 0 },
        { scale: 1.0, opacity: 1, duration: 1.2, ease: "power2.out" },
        0.1
      );
    }

    const beat0 = beatContainerRefs.current[0];
    if (beat0) {
      const chars = beat0.querySelectorAll(".beat-char");
      introTl.fromTo(
        chars,
        { y: 28, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.015, ease: "expo.out" },
        0.2
      );
    }

    if (badgeWrapperRef.current && quickOrderWrapperRef.current) {
      introTl.fromTo(
        [badgeWrapperRef.current, quickOrderWrapperRef.current],
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.75, stagger: 0.12, ease: "back.out(1.6)" },
        0.3
      );
    }

    return () => {
      introTl.kill();
      if (idleTweenRef.current) idleTweenRef.current.kill();
    };
  }, []);

  // Single ScrollTrigger setup with ease-in non-linear mapping for Burger opening
  useEffect(() => {
    const container = containerRef.current;
    const stage = pinStageRef.current;
    if (!container || !stage) return;

    const getPinDistance = () => {
      if (typeof window === "undefined") return 6000;
      const isMobile = window.innerWidth < 640;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return isMobile ? window.innerHeight * 0.3 * 16 : 3000;
      // On mobile: Pin length per beat about 60vh
      if (isMobile) return window.innerHeight * 0.6 * 16;
      return TOTAL_GLOBAL_FRAMES * 14;
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        pin: stage,
        pinSpacing: true,
        start: "top top",
        end: () => `+=${getPinDistance()}`,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = Math.max(0, Math.min(1, self.progress));

          // Stop idle float as soon as scrolling starts
          if (!hasUserScrolledRef.current && (p > 0.001 || window.scrollY > 4)) {
            hasUserScrolledRef.current = true;
            if (idleTweenRef.current) {
              idleTweenRef.current.kill();
              idleTweenRef.current = null;
              if (canvasRef.current) {
                gsap.to(canvasRef.current, { y: 0, scale: 1, duration: 0.35, ease: "power2.out" });
              }
            }
          }

          let targetFrame: number;
          const burgerShare = 119 / (TOTAL_GLOBAL_FRAMES - 1); // ~0.25

          if (p <= burgerShare) {
            const u = p / burgerShare;
            const mappedU = Math.pow(u, 2.2);
            targetFrame = mappedU * 119;
          } else {
            const restU = (p - burgerShare) / (1 - burgerShare);
            targetFrame = 120 + restU * (TOTAL_GLOBAL_FRAMES - 1 - 120);
          }

          targetFrameIndexRef.current = Math.max(0, Math.min(TOTAL_GLOBAL_FRAMES - 1, targetFrame));

          const totalBeats = ALL_BEATS.length;
          const slice = 1 / totalBeats;
          const hysteresis = 0.015;
          const currentBeat = activeBeatRef.current;
          let nextBeat = currentBeat;

          if (p > (currentBeat + 1) * slice + hysteresis) {
            nextBeat = Math.min(totalBeats - 1, Math.floor((p - hysteresis) / slice));
          } else if (p < currentBeat * slice - hysteresis) {
            nextBeat = Math.max(0, Math.floor((p + hysteresis) / slice));
          }

          if (nextBeat !== currentBeat) {
            activeBeatRef.current = nextBeat;
            requestBeatTransition(nextBeat);
          }
        },
      });

      // Force an immediate update so progress is read at 0
      ScrollTrigger.update();
    }, container);

    // Debounced resize and orientation change handler (150ms)
    let resizeTimer: NodeJS.Timeout;
    const handleResizeOrOrientation = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        drawFrame(Math.round(currentFrameIndexRef.current));
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener("resize", handleResizeOrOrientation, { passive: true });
    window.addEventListener("orientationchange", handleResizeOrOrientation, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResizeOrOrientation);
      window.removeEventListener("orientationchange", handleResizeOrOrientation);
      clearTimeout(resizeTimer);
      ctx.revert();
    };
  }, []);

  // Single Canvas Drawing Loop with master GSAP ticker integration & 0.12 lerp
  useEffect(() => {
    let isMounted = true;

    // Explicit listener: when frame 0 is decoded, draw it immediately!
    onFrame0Ready(() => {
      if (isMounted) {
        drawFrame(0);
      }
    });

    // Try drawing frame 0 immediately on mount
    drawFrame(0);

    // Also draw frame 0 when document fonts are ready
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        if (isMounted) drawFrame(Math.round(currentFrameIndexRef.current));
      });
    }

    const renderTick = () => {
      if (!isMounted) return;

      const diff = targetFrameIndexRef.current - currentFrameIndexRef.current;
      if (Math.abs(diff) > 0.001) {
        currentFrameIndexRef.current += diff * 0.12;
      } else {
        currentFrameIndexRef.current = targetFrameIndexRef.current;
      }

      const globalIdx = Math.max(
        0,
        Math.min(TOTAL_GLOBAL_FRAMES - 1, Math.round(currentFrameIndexRef.current))
      );

      // Draw only when globalIdx changes OR if lastDrawnFrame is -1
      if (globalIdx !== lastDrawnFrameRef.current || lastDrawnFrameRef.current === -1) {
        drawFrame(globalIdx);
      }
    };

    gsap.ticker.add(renderTick);

    return () => {
      isMounted = false;
      gsap.ticker.remove(renderTick);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="main-stage-container"
      data-cursor="BITE"
      className="relative w-full bg-[#EDE6DB] max-w-full overflow-hidden"
    >
      {/* Pinned 100svh Viewport Stage */}
      <div
        ref={pinStageRef}
        id="pinned-stage"
        data-cursor="BITE"
        className="relative min-h-[100svh] h-[100svh] w-full overflow-hidden bg-[#EDE6DB] select-none"
      >
        {/* Layer 0: Echo Text (Centered behind canvas product, 22vw on mobile) */}
        <div
          ref={echoWordContainerRef}
          className="pointer-events-none absolute inset-0 z-0 flex flex-col justify-center items-center overflow-hidden select-none"
        >
          <div className="w-full flex flex-col items-center justify-center space-y-1 sm:space-y-2 md:space-y-4">
            <div
              ref={echoWordRow1Ref}
              style={{ color: "rgba(228, 87, 46, 0.11)" }}
              className="whitespace-nowrap font-flame text-[22vw] sm:text-[18vw] md:text-[19vw] lg:text-[17vw] leading-[0.85] tracking-tight uppercase select-none text-center will-change-transform"
            >
              BURGER
            </div>
            <div
              ref={echoWordRow2Ref}
              style={{ color: "rgba(228, 87, 46, 0.11)" }}
              className="whitespace-nowrap font-flame text-[22vw] sm:text-[18vw] md:text-[19vw] lg:text-[17vw] leading-[0.85] tracking-tight uppercase select-none text-center will-change-transform"
            >
              BURGER
            </div>
            <div
              ref={echoWordRow3Ref}
              style={{ color: "rgba(228, 87, 46, 0.11)" }}
              className="whitespace-nowrap font-flame text-[22vw] sm:text-[18vw] md:text-[19vw] lg:text-[17vw] leading-[0.85] tracking-tight uppercase select-none text-center will-change-transform"
            >
              BURGER
            </div>
          </div>
        </div>

        {/* Layer 1: ONE Single Canvas for ALL 4 Chapters (Always Opacity 1, Cover Fit) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10 will-change-transform"
          style={{ backgroundColor: "#EDE6DB", opacity: 1, visibility: "visible" }}
        />

        {/* Layer 2: Top Safe Zone - Badges (60px round logo at top-left, 72px Quick Order at top-right on mobile) */}
        {/* Left Side: Round "BITE & ROLL" Badge (60px on mobile, never overlapping text) */}
        <div
          ref={badgeWrapperRef}
          data-cursor="BITE"
          className="absolute top-[calc(env(safe-area-inset-top,0px)+16px)] sm:top-18 md:top-20 left-4 sm:left-6 md:left-14 z-40 pointer-events-auto origin-center"
        >
          <div className="relative w-[60px] h-[60px] sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-2 border-dashed border-[#14110F] flex items-center justify-center p-0.5 sm:p-1 select-none bg-[#F2B33D] text-[#14110F] shadow-lg">
            <div className="w-full h-full rounded-full border border-[#14110F]/30 flex flex-col items-center justify-center text-center">
              <span className="font-flame-sans text-[7px] sm:text-[8px] md:text-[9.5px] tracking-widest uppercase font-bold opacity-80 leading-none">
                BITE &amp; ROLL
              </span>
              <span
                ref={stickerTextRef}
                className="font-flame text-xs sm:text-sm md:text-base tracking-wide uppercase leading-none my-0.5"
              >
                100%
              </span>
              <span className="font-flame-sans text-[6.5px] sm:text-[7px] md:text-[8.5px] tracking-widest uppercase font-bold opacity-80 leading-none">
                STREET CO.
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Floating Round Quick Order Button (72px on mobile) */}
        <div
          ref={quickOrderWrapperRef}
          data-cursor="ORDER"
          className="absolute top-[calc(env(safe-area-inset-top,0px)+16px)] sm:top-18 md:top-20 right-4 sm:right-6 md:right-14 z-40 pointer-events-auto origin-center"
        >
          <QuickOrderButton onClick={onNavigateMenu} />
        </div>

        {/* Layer 3: Text Safe Zone (Centered at bottom third on mobile max-w-[90%], max-w-[46%] on tablet, max-w-[38vw] on desktop capped at 1800px) */}
        <div className="w-full h-full max-w-[1800px] mx-auto relative pointer-events-none">
          {ALL_BEATS.map((beat, bIdx) => {
            const isRight = beat.isRight;
            return (
              <div
                key={`beat-container-${beat.id}-${bIdx}`}
                data-beat-index={bIdx}
                ref={(el) => {
                  beatContainerRefs.current[bIdx] = el;
                }}
                style={{
                  willChange: "transform, opacity",
                  backfaceVisibility: "hidden",
                }}
                className={`absolute z-20 pointer-events-none select-none ${
                  isRight
                    ? "top-[20vh] h-[68vh] right-6 sm:right-8 md:right-14 max-w-[90%] sm:max-w-[46%] md:max-w-[38vw] lg:max-w-[520px] hidden sm:flex flex-col justify-center items-end text-right"
                    : "top-[20vh] h-[68vh] left-6 sm:left-8 md:left-14 max-w-[90%] sm:max-w-[46%] md:max-w-[38vw] lg:max-w-[520px] hidden sm:flex flex-col justify-center items-start text-left"
                } sm:opacity-100 max-sm:!top-auto max-sm:!bottom-[calc(env(safe-area-inset-bottom,0px)+24px)] max-sm:!left-1/2 max-sm:!-translate-x-1/2 max-sm:!w-[90%] max-sm:!max-w-[90%] max-sm:!h-auto max-sm:!flex max-sm:flex-col max-sm:items-center max-sm:text-center`}
              >
                {/* Accent Tag in Flame Sans */}
                <div
                  className={`beat-extra font-flame-sans text-xs sm:text-[13px] md:text-[15px] font-bold uppercase tracking-[0.25em] text-[#E4572E] mb-1 sm:mb-2 flex items-center gap-2 ${
                    isRight
                      ? "flex-row-reverse max-sm:flex-row"
                      : "flex-row"
                  }`}
                >
                  <span>{beat.accent}</span>
                  <span className="w-4 sm:w-6 h-[1.5px] bg-[#E4572E]/50 inline-block" />
                </div>

                {/* Clamped Headline in Flame Display */}
                <div
                  className={`flex flex-col font-flame uppercase leading-[0.85] tracking-tight ${
                    isRight
                      ? "items-end max-sm:items-center"
                      : "items-start max-sm:items-center"
                  }`}
                >
                  {beat.headlineLines.map((line, lIdx) => (
                    <div
                      key={`line-${bIdx}-${lIdx}`}
                      className={`flex flex-wrap items-baseline gap-x-2 text-[clamp(1.5rem,6.5vw,2.2rem)] sm:text-[clamp(1.8rem,3.4vw,3.6rem)] lg:text-[clamp(2.2rem,3.2vw,3.8rem)] leading-[0.85] ${
                        isRight
                          ? "justify-end max-sm:justify-center"
                          : "justify-start max-sm:justify-center"
                      }`}
                    >
                      {line.map((word, wIdx) => {
                        const colorClass = getWordColor(word);
                        return (
                          <span
                            key={`w-${bIdx}-${lIdx}-${wIdx}`}
                            className={`inline-flex items-baseline overflow-hidden ${colorClass}`}
                          >
                            {word.text.split("").map((ch, cIdx) => (
                              <span
                                key={`ch-${bIdx}-${lIdx}-${wIdx}-${cIdx}`}
                                className="beat-char inline-block"
                              >
                                {ch}
                              </span>
                            ))}
                          </span>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Metrics if present (e.g. Chapter 3 Drink beat 3) */}
                {beat.metrics && beat.metrics.length > 0 && (
                  <div
                    className={`beat-extra flex flex-wrap gap-2 mt-2 sm:mt-3 ${
                      isRight
                        ? "justify-end max-sm:justify-center"
                        : "justify-start max-sm:justify-center"
                    }`}
                  >
                    {beat.metrics.map((m, mIdx) => (
                      <div
                        key={`metric-${bIdx}-${mIdx}`}
                        className="px-2.5 py-1 rounded-xl bg-[#14110F]/10 border border-[#14110F]/20 flex items-baseline gap-1"
                      >
                        <span className="font-flame text-xs sm:text-sm text-[#E4572E]">
                          {m.value}
                          {m.suffix}
                        </span>
                        <span className="font-flame-sans text-[9px] sm:text-[10px] font-bold text-[#14110F]/70 uppercase">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Body Paragraph in Flame Sans */}
                <p
                  className={`beat-extra mt-2 sm:mt-3 md:mt-4 font-flame-sans text-xs sm:text-[14px] md:text-[16px] text-[#14110F]/80 font-medium leading-relaxed max-w-sm ${
                    isRight
                      ? "text-right max-sm:text-center"
                      : "text-left max-sm:text-center"
                  }`}
                >
                  {beat.body}
                </p>

                {/* Section CTA Button (44px tap target) */}
                {beat.cta && (
                  <div
                    className={`beat-extra mt-3 sm:mt-4 pointer-events-auto flex ${
                      isRight
                        ? "justify-end max-sm:justify-center"
                        : "justify-start max-sm:justify-center"
                    }`}
                  >
                    <MagneticButton
                      variant="ember"
                      cursorText={beat.cta === "Order Now" ? "ORDER" : "MENU"}
                      onClick={onNavigateMenu}
                      className="!py-2 !px-5 !text-xs tracking-wider min-h-[44px]"
                    >
                      {beat.cta}
                    </MagneticButton>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Clean bottom spacer */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#EDE6DB] pointer-events-none z-30" />
      </div>
    </div>
  );
};
