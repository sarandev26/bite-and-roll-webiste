"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BeatMetric } from "@/data/beats";

interface BeatExtrasProps {
  ingredients?: string[];
  metrics?: BeatMetric[];
  activeBeatId: number;
}

export const BeatExtras: React.FC<BeatExtrasProps> = ({
  metrics,
}) => {
  return (
    <div className="relative z-20 pointer-events-none mt-4">
      {/* Drink Pinned Metrics Counters */}
      <AnimatePresence>
        {metrics && metrics.length > 0 && (
          <motion.div
            key="beat-metrics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-3 gap-3 md:gap-4 max-w-md mt-3"
          >
            {metrics.map((metric, idx) => (
              <CounterBox key={metric.label} metric={metric} delay={idx * 0.15} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function CounterBox({ metric }: { metric: BeatMetric; delay: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = metric.value;
    if (end === 0) {
      setCount(0);
      return;
    }

    const duration = 1200;
    const steps = 25;
    const stepTime = duration / steps;
    const increment = end / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [metric.value]);

  return (
    <div className="bg-[#14110F] border-2 border-[#14110F] rounded-2xl p-2.5 md:p-3 text-center shadow-lg">
      <div className="font-flame text-2xl md:text-4xl text-[#F2B33D] tabular-nums leading-none">
        {count}
        <span className="text-lg md:text-xl text-[#E4572E]">{metric.suffix}</span>
      </div>
      <div className="font-flame-sans text-[11px] md:text-xs text-[#EDE6DB]/80 tracking-wider uppercase font-medium mt-1 leading-tight">
        {metric.label}
      </div>
    </div>
  );
}
