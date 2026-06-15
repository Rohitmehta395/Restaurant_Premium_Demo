"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

export function useScrollReveal(options?: {
  threshold?: number;
  margin?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const isVisible = useInView(ref, {
    amount: options?.threshold ?? 0.1,
    margin: (options?.margin as any) ?? "-80px",
    once: options?.once ?? true,
  });

  return { ref, isVisible };
}
