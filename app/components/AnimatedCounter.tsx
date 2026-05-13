"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, useInView, animate } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const numericMatch = value.match(/[\d.]+/);
  const numeric = numericMatch ? parseFloat(numericMatch[0]) : null;
  const prefix = value.replace(/[\d.]+.*/, "");
  const suffix = numeric !== null ? value.replace(/^[^0-9]*[\d.]+/, "") : "";

  useEffect(() => {
    if (!isInView || numeric === null || !ref.current) return;

    const el = ref.current;
    const controls = animate(0, numeric, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        const formatted = Number.isInteger(numeric)
          ? Math.round(v).toString()
          : v.toFixed(2);
        el.textContent = prefix + formatted + suffix;
      },
    });

    return () => controls.stop();
  }, [isInView, numeric, prefix, suffix]);

  if (numeric === null) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
