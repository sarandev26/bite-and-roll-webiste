"use client";

import React from "react";
import { HiStar } from "react-icons/hi";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  foodImage: string;
  foodName: string;
  foodPrice: string;
  quote: string;
  orderId: string;
  rotation: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Aarav Sharma",
    location: "Indiranagar, Bengaluru",
    avatar: "/images/testimonials/customer-2.webp",
    foodImage: "/images/menu/classic-burger.webp",
    foodName: "Classic Burger",
    foodPrice: "₹149",
    quote: "Late-night cravings solved! The smash patty has crispy lace edges and unmatched street energy. Free delivery above ₹399 arrived piping hot.",
    orderId: "BR-BLR-104",
    rotation: -1.5,
  },
  {
    id: "t2",
    name: "Ananya Iyer",
    location: "Anna Nagar, Chennai",
    avatar: "/images/testimonials/customer-1.webp",
    foodImage: "/images/menu/chicken-wrap.webp",
    foodName: "Chicken Wrap",
    foodPrice: "₹179",
    quote: "That mint crema drizzle and flaky warm rolled paratha hit different. Crisp chicken tender in every single bite without getting soggy.",
    orderId: "BR-MAA-208",
    rotation: 1.8,
  },
  {
    id: "t3",
    name: "Rohan Kulkarni",
    location: "Bandra West, Mumbai",
    avatar: "/images/testimonials/customer-4.webp",
    foodImage: "/images/menu/loaded-fries.webp",
    foodName: "Loaded Fries",
    foodPrice: "₹149",
    quote: "Skin-on fries with peri-peri glaze and warm queso... perfectly cured my 2 AM flat-top cravings. Best street sides in Mumbai.",
    orderId: "BR-BOM-312",
    rotation: -1.2,
  },
  {
    id: "t4",
    name: "Priya Reddy",
    location: "Jubilee Hills, Hyderabad",
    avatar: "/images/testimonials/customer-5.webp",
    foodImage: "/images/menu/bbq-burger.webp",
    foodName: "BBQ Burger",
    foodPrice: "₹249",
    quote: "You can taste the flat-top fire in every single layer. Sealed tight in thermal foil that stays steaming hot till the last crunch.",
    orderId: "BR-HYD-415",
    rotation: 1.5,
  },
  {
    id: "t5",
    name: "Vikram Nair",
    location: "RS Puram, Coimbatore",
    avatar: "/images/testimonials/customer-6.webp",
    foodImage: "/images/menu/double-cheese.webp",
    foodName: "Double Cheese",
    foodPrice: "₹229",
    quote: "Double smashed patties with molten gouda paired with iced cold brew. Absolute heavyweight street food, stellar packaging.",
    orderId: "BR-CJB-519",
    rotation: -1.7,
  },
  {
    id: "t6",
    name: "Meera Sen",
    location: "Koramangala, Bengaluru",
    avatar: "/images/testimonials/customer-3.webp",
    foodImage: "/images/menu/cold-coffee.webp",
    foodName: "Cold Coffee",
    foodPrice: "₹139",
    quote: "18-hour cold brew on crushed ice is unbeatable. Lightning fast takeaway drop and free delivery above ₹399 made it a daily ritual.",
    orderId: "BR-BLR-622",
    rotation: 1.3,
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section
      data-cursor="LOVE"
      className="relative w-full py-20 sm:py-24 md:py-36 bg-[#14110F] text-[#EDE6DB] overflow-hidden select-none"
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 mb-12 sm:mb-16 text-center">
        <span className="font-flame-sans text-xs md:text-sm uppercase tracking-[0.25em] text-[#F2B33D] font-bold block mb-2">
          Voices From The Street
        </span>
        <h2 className="font-flame text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-[#EDE6DB] leading-[0.85]">
          LOVED BY THE <span className="text-outline-smoke">STREET</span>
        </h2>
        <p className="font-flame-sans text-xs sm:text-sm md:text-base text-[#EDE6DB]/60 mt-3 sm:mt-4 font-medium max-w-lg mx-auto">
          Over 50,000 orders served across Bengaluru, Chennai, Hyderabad &amp; Mumbai. Free delivery above ₹399 for late-night cravings.
        </p>
      </div>

      {/* Row 1: Right-to-Left Pure CSS Marquee on Transform Only (40s linear infinite) */}
      <div
        className="w-full overflow-hidden py-3 sm:py-4 group"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee-testimonials-1 group-hover:[animation-play-state:paused] will-change-transform">
          {/* Copy 1 */}
          <div className="flex shrink-0">
            {TESTIMONIALS.map((item, idx) => (
              <div key={`r1-c1-${item.id}-${idx}`} className="shrink-0 px-2.5 sm:px-3">
                <TestimonialCard item={item} />
              </div>
            ))}
          </div>
          {/* Copy 2 (Identical for seamless -50% loop) */}
          <div className="flex shrink-0">
            {TESTIMONIALS.map((item, idx) => (
              <div key={`r1-c2-${item.id}-${idx}`} className="shrink-0 px-2.5 sm:px-3">
                <TestimonialCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Left-to-Right Pure CSS Marquee on Transform Only (48s linear infinite reverse) */}
      <div
        className="w-full overflow-hidden py-3 sm:py-4 mt-1 sm:mt-2 group"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee-testimonials-2 group-hover:[animation-play-state:paused] will-change-transform">
          {/* Copy 1 */}
          <div className="flex shrink-0">
            {[...TESTIMONIALS.slice(3), ...TESTIMONIALS.slice(0, 3)].map((item, idx) => (
              <div key={`r2-c1-${item.id}-${idx}`} className="shrink-0 px-2.5 sm:px-3">
                <TestimonialCard item={item} />
              </div>
            ))}
          </div>
          {/* Copy 2 */}
          <div className="flex shrink-0">
            {[...TESTIMONIALS.slice(3), ...TESTIMONIALS.slice(0, 3)].map((item, idx) => (
              <div key={`r2-c2-${item.id}-${idx}`} className="shrink-0 px-2.5 sm:px-3">
                <TestimonialCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div
      style={{
        transform: `rotate(${item.rotation}deg)`,
        backfaceVisibility: "hidden",
      }}
      className="relative w-[80vw] sm:w-[350px] md:w-[380px] rounded-3xl bg-[#1d1916] border-2 border-dashed border-[#EDE6DB]/20 p-5 sm:p-6 flex flex-col justify-between hover:border-[#E4572E] hover:rotate-0 transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer group shadow-lg h-full will-change-transform select-none"
      data-cursor="LOVE"
    >
      <div>
        {/* Receipt Header */}
        <div className="flex justify-between items-center pb-3 border-b border-dashed border-[#EDE6DB]/15 mb-3 sm:mb-4">
          <span className="font-flame-sans text-[10px] tracking-widest text-[#EDE6DB]/50 uppercase font-semibold">
            {item.orderId} • VERIFIED BITE
          </span>
          <div className="flex text-xs sm:text-sm text-[#F2B33D]">
            {[...Array(5)].map((_, i) => (
              <HiStar key={i} />
            ))}
          </div>
        </div>

        {/* Quote */}
        <p className="font-flame-sans text-xs sm:text-sm text-[#EDE6DB]/85 font-medium leading-relaxed whitespace-normal line-clamp-3">
          &ldquo;{item.quote}&rdquo;
        </p>

        {/* Ordered Food Badge */}
        <div className="flex items-center gap-2 mt-3 sm:mt-4 px-3 py-1.5 rounded-xl bg-[#EDE6DB]/5 border border-[#EDE6DB]/10 w-fit">
          <img
            src={item.foodImage}
            alt={item.foodName}
            loading="lazy"
            decoding="async"
            width={28}
            height={28}
            className="w-7 h-7 object-contain rounded-lg"
          />
          <span className="font-flame-sans text-[10px] sm:text-[11px] text-[#F2B33D] font-semibold uppercase tracking-wider">
            Ordered: {item.foodName} ({item.foodPrice})
          </span>
        </div>
      </div>

      {/* Author Footer with Portrait Photo */}
      <div className="flex items-center gap-3 sm:gap-3.5 mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-[#EDE6DB]/10">
        <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl overflow-hidden border-2 border-[#E4572E] shadow-sm flex-shrink-0">
          <img
            src={item.avatar}
            alt={item.name}
            loading="lazy"
            decoding="async"
            width={48}
            height={48}
            className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 will-change-transform"
          />
        </div>
        <div>
          <div className="font-flame text-base sm:text-lg uppercase tracking-tight text-[#EDE6DB] group-hover:text-[#F2B33D] transition-colors duration-300 leading-tight">
            {item.name}
          </div>
          <div className="font-flame-sans text-[11px] sm:text-xs text-[#EDE6DB]/50 mt-0.5 font-medium">
            {item.location}
          </div>
        </div>
      </div>
    </div>
  );
}
