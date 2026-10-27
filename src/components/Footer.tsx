"use client";

import React, { useState } from "react";
import { FaInstagram } from "react-icons/fa6";
import { HiArrowUp, HiArrowRight } from "react-icons/hi";

interface FooterProps {
  onBackToTop: () => void;
  onNavigate: (targetId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onBackToTop, onNavigate }) => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail("");
    }
  };

  const tickerText =
    "FRESH • ROLLED • CRISPY • BOLD • FIRE-SEALED • LATE-NIGHT CRAVINGS • FREE DELIVERY ABOVE ₹399 • ";

  return (
    <footer className="relative w-full bg-[#14110F] text-[#EDE6DB] select-none overflow-hidden">
      {/* =========================================================================
          1. TOP STRIP: Full-width Mustard "HUNGRY? ORDER NOW"
          ========================================================================= */}
      <div className="w-full bg-[#F2B33D] text-[#14110F] px-6 sm:px-10 md:px-14 py-10 sm:py-14 md:py-16 border-b-2 border-[#14110F]">
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="font-flame-sans text-xs md:text-sm uppercase tracking-[0.25em] text-[#E4572E] font-bold block mb-1">
              Late-Night Cravings Solved
            </span>
            <h2 className="font-flame text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl uppercase tracking-tight text-[#14110F] leading-[0.85]">
              HUNGRY? <span className="text-outline-charcoal">ORDER NOW</span>
            </h2>
            <p className="font-flame-sans text-xs sm:text-sm md:text-base text-[#14110F]/80 mt-2 font-medium max-w-lg mx-auto md:mx-0">
              Fresh off the scorching cast iron to your doorstep. Free express delivery across major hubs on all orders above ₹399.
            </p>
          </div>

          {/* Round arrow button with 44px+ tap target */}
          <button
            type="button"
            onClick={() => onNavigate("section-menu")}
            className="group relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-[#E4572E] text-white border-2 sm:border-3 border-[#14110F] shadow-xl flex items-center justify-center flex-shrink-0 hover:scale-105 hover:bg-[#14110F] hover:text-[#F2B33D] transition-[transform,background-color,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer min-h-[44px] min-w-[44px]"
            data-cursor="ORDER"
            aria-label="Order food now"
          >
            <HiArrowRight className="text-2xl sm:text-3xl md:text-4xl transition-transform duration-300 group-hover:rotate-45" />
          </button>
        </div>
      </div>

      {/* =========================================================================
          2. THIN SCROLLING TEXT TICKER (Pure CSS on transform only)
          ========================================================================= */}
      <div className="w-full bg-[#E4572E] text-[#EDE6DB] py-2 sm:py-2.5 overflow-hidden border-b border-[#EDE6DB]/15">
        <div className="flex w-max animate-marquee-left select-none will-change-transform">
          <div className="flex shrink-0 whitespace-nowrap font-flame text-xs sm:text-sm md:text-base uppercase tracking-wider">
            <span>{tickerText}</span>
            <span>{tickerText}</span>
          </div>
          <div className="flex shrink-0 whitespace-nowrap font-flame text-xs sm:text-sm md:text-base uppercase tracking-wider">
            <span>{tickerText}</span>
            <span>{tickerText}</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. MIDDLE BLOCK: Responsive (Stacked on Mobile, 2-Col Tablet, 4-Col Desktop)
          ========================================================================= */}
      <div className="w-full bg-[#14110F]">
        <div className="max-w-[1800px] mx-auto px-6 sm:px-10 md:px-14 pt-12 md:pt-14 pb-8 md:pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 pb-10 sm:pb-12 border-b border-[#EDE6DB]/15">
            {/* Left Column (Stacked / Full Width Newsletter on mobile) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="font-flame text-2xl sm:text-3xl md:text-4xl text-[#E4572E] leading-none">
                  BITE <span className="text-[#F2B33D]">&amp;</span> ROLL
                </span>
                <p className="font-flame-sans text-xs sm:text-sm text-[#EDE6DB]/75 font-medium leading-relaxed max-w-sm mt-2.5 sm:mt-3">
                  Cinematic street food handcrafted on fire-forged cast iron. Savor signature smash burgers, loaded artisanal rolls, and golden double-fried sides.
                </p>

                {/* Indian Contact Info */}
                <div className="mt-4 sm:mt-5 space-y-1 text-xs font-flame-sans text-[#EDE6DB]/70 font-medium">
                  <p className="text-[#EDE6DB] font-semibold">Flagship Kitchen:</p>
                  <p>12th Main Road, Indiranagar, Bengaluru, Karnataka 560038</p>
                  <p className="text-[#F2B33D] font-bold pt-0.5">Phone: +91 98450 82910</p>
                  <p className="text-[#EDE6DB]/60">Mon — Sun: 11:30 AM — 02:00 AM IST (Delivery till 03:30 AM)</p>
                </div>
              </div>

              {/* Newsletter Pill Input (Full width on mobile) */}
              <div className="mt-6 sm:mt-8 w-full">
                <span className="font-flame-sans text-[11px] uppercase tracking-widest text-[#F2B33D] font-bold block mb-2">
                  JOIN THE STREET SQUAD
                </span>
                <form
                  onSubmit={handleSubmit}
                  className="flex items-center bg-[#EDE6DB]/10 border-2 border-[#EDE6DB]/20 rounded-full p-1 focus-within:border-[#E4572E] transition-colors duration-300 w-full max-w-md"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email for fresh drops..."
                    className="bg-transparent px-3 sm:px-4 py-2 font-flame-sans text-xs sm:text-sm text-[#EDE6DB] placeholder-[#EDE6DB]/40 focus:outline-none flex-1 font-medium min-w-0"
                  />
                  <button
                    type="submit"
                    className="min-h-[44px] px-4 sm:px-5 py-2 rounded-full bg-[#E4572E] hover:bg-[#F2B33D] hover:text-[#14110F] text-white font-flame-sans text-xs uppercase font-bold tracking-wider transition-[background-color,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer whitespace-nowrap flex items-center justify-center"
                    data-cursor="GO"
                  >
                    {subscribed ? "YOU'RE IN!" : "SUBSCRIBE"}
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column: 2 columns on mobile/tablet (`grid-cols-2 sm:grid-cols-2 md:grid-cols-4`), 4 on desktop */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {/* Col 1: Menu */}
              <div>
                <h4 className="font-flame text-base sm:text-lg uppercase tracking-tight text-[#F2B33D] mb-2 sm:mb-3">
                  MENU
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm font-flame-sans font-medium text-[#EDE6DB]/70">
                  <li>
                    <button
                      type="button"
                      onClick={() => onNavigate("main-stage-container")}
                      className="hover:text-[#E4572E] transition-colors duration-300 cursor-pointer text-left min-h-[32px] flex items-center"
                    >
                      Classic Burger (₹149)
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => onNavigate("main-stage-container")}
                      className="hover:text-[#E4572E] transition-colors duration-300 cursor-pointer text-left min-h-[32px] flex items-center"
                    >
                      Chicken Wrap (₹179)
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => onNavigate("main-stage-container")}
                      className="hover:text-[#E4572E] transition-colors duration-300 cursor-pointer text-left min-h-[32px] flex items-center"
                    >
                      Double Cheese (₹229)
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => onNavigate("section-menu")}
                      className="text-[#E4572E] font-bold hover:underline text-left block pt-1 min-h-[32px] flex items-center"
                    >
                      Full 10 Items →
                    </button>
                  </li>
                </ul>
              </div>

              {/* Col 2: Locations (Indian Cities) */}
              <div>
                <h4 className="font-flame text-base sm:text-lg uppercase tracking-tight text-[#F2B33D] mb-2 sm:mb-3">
                  CITIES
                </h4>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm font-flame-sans font-medium text-[#EDE6DB]/70">
                  <li className="py-0.5">Bengaluru (Indiranagar)</li>
                  <li className="py-0.5">Chennai (Anna Nagar)</li>
                  <li className="py-0.5">Mumbai (Bandra West)</li>
                  <li className="py-0.5">Hyderabad (Jubilee Hills)</li>
                  <li className="py-0.5">Coimbatore (RS Puram)</li>
                </ul>
              </div>

              {/* Col 3: About */}
              <div>
                <h4 className="font-flame text-base sm:text-lg uppercase tracking-tight text-[#F2B33D] mb-2 sm:mb-3">
                  ABOUT
                </h4>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm font-flame-sans font-medium text-[#EDE6DB]/70">
                  <li className="py-0.5">The Flat-Top Craft</li>
                  <li className="py-0.5">Fire-Sealed Packaging</li>
                  <li className="py-0.5">Secret Spice Blends</li>
                  <li className="py-0.5">Kitchen Careers</li>
                </ul>
              </div>

              {/* Col 4: Instagram */}
              <div>
                <h4 className="font-flame text-base sm:text-lg uppercase tracking-tight text-[#F2B33D] mb-2 sm:mb-3">
                  FOLLOW
                </h4>
                <p className="text-xs font-flame-sans text-[#EDE6DB]/60 mb-3 font-medium">
                  Live flat-top stories &amp; midnight drops.
                </p>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 min-h-[44px] rounded-full bg-[#EDE6DB]/10 hover:bg-[#E4572E] hover:text-white transition-colors duration-300 text-xs font-flame-sans uppercase font-bold tracking-wider"
                  data-cursor="GO"
                >
                  <FaInstagram className="text-base text-[#F2B33D]" />
                  <span>@BITEANDROLL</span>
                </a>
              </div>
            </div>
          </div>

          {/* =========================================================================
              4. HUGE TWO-LINE "BITE & ROLL" WORDMARK (Scaled to fit full width)
              ========================================================================= */}
          <div
            className="relative w-full pt-6 sm:pt-8 pb-3 sm:pb-4 text-center group cursor-pointer overflow-hidden"
            data-cursor="BITE"
          >
            <div className="font-flame text-[18vw] sm:text-[16vw] md:text-[15vw] leading-[0.78] tracking-tighter uppercase select-none transition-[transform,color] duration-500 ease-out text-transparent [-webkit-text-stroke:1.5px_rgba(237,230,219,0.3)] md:[-webkit-text-stroke:2px_rgba(237,230,219,0.3)] group-hover:text-[#F2B33D] group-hover:[-webkit-text-stroke:2px_#F2B33D] group-hover:-translate-y-1">
              <div>BITE &amp;</div>
              <div>ROLL</div>
            </div>
          </div>

          {/* =========================================================================
              5. SLIM LEGAL ROW: Copyright + "Back to top" Pill (44px tap target)
              ========================================================================= */}
          <div className="pt-5 sm:pt-6 pb-2 flex flex-col sm:flex-row justify-between items-center text-xs font-flame-sans text-[#EDE6DB]/50 font-medium border-t border-[#EDE6DB]/10 mt-2 gap-4">
            <span className="text-center sm:text-left">&copy; 2026 BITE &amp; ROLL STREET FOOD INDIA PVT. LTD. ALL RIGHTS RESERVED.</span>

            {/* Back to top pill */}
            <button
              type="button"
              onClick={onBackToTop}
              className="flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-full border border-[#EDE6DB]/30 hover:border-[#E4572E] hover:text-[#E4572E] transition-colors duration-300 cursor-pointer group text-xs font-flame-sans font-semibold uppercase tracking-wider"
              data-cursor="GO"
            >
              <span>BACK TO TOP</span>
              <HiArrowUp className="text-sm transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
