"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface LightboxGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  images: Array<{ src: string; alt: string; caption?: string }>;
  title: string;
  subtitle: string;
  currentIndex: number;
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
}

export function LightboxGallery({
  isOpen,
  onClose,
  images,
  title,
  subtitle,
  currentIndex,
  next,
  prev,
  goTo
}: LightboxGalleryProps) {
  const triggerRef = useRef<Element | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement;
      document.body.style.overflow = "hidden";
      // Focus close button on open for accessibility
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
      if (triggerRef.current instanceof HTMLElement) {
        triggerRef.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          prev();
          break;
        case "ArrowRight":
          next();
          break;
        case "Escape":
          onClose();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, next, prev, onClose]);

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];
  if (!currentImage) return null;

  const total = images.length;
  const counterText = `${String(currentIndex + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} gallery`}
          className="fixed inset-0 z-50 bg-[#0A0A09]/95 flex flex-col"
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate="visible"
          exit={prefersReducedMotion ? "hidden" : "exit"}
          variants={overlayVariants}
          transition={{ duration: 0.25 }}
        >
          {/* Header bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between px-4 sm:px-6 py-4 border-b border-white/15 gap-4">
            <div>
              <h2 className="text-section-h2 text-text-on-dark font-display">{title}</h2>
              <p className="text-label-caps tracking-widest text-text-on-dark/70 mt-1 uppercase">{subtitle}</p>
            </div>
            {/* Desktop close button */}
            <button
              ref={closeBtnRef}
              onClick={onClose}
              aria-label="Close gallery"
              className="hidden md:flex text-white hover:text-white/70 transition-colors p-2 cursor-pointer"
            >
              <X className="size-6" />
            </button>
          </div>

          {/* Mobile close button */}
          <button
            onClick={onClose}
            aria-label="Close gallery"
            className="md:hidden absolute top-4 right-4 h-11 w-11 flex items-center justify-center bg-black/40 rounded-full text-white z-50 cursor-pointer"
          >
            <X className="size-6" />
          </button>

          {/* Main image */}
          <div className="flex-1 relative flex items-center justify-center px-4 md:px-16 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={prefersReducedMotion ? "visible" : "hidden"}
                animate="visible"
                exit={prefersReducedMotion ? "hidden" : "exit"}
                variants={imageVariants}
                transition={{ duration: 0.2 }}
                className="relative w-full h-full max-h-[60vh] md:max-h-[70vh] flex items-center justify-center"
              >
                <Image
                  src={currentImage.src}
                  alt={currentImage.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-4 bottom-20 md:bottom-auto md:top-1/2 md:-translate-y-1/2 h-11 w-11 flex items-center justify-center text-white hover:text-white/70 transition-colors z-10 bg-black/40 rounded-full hover:bg-black/60 cursor-pointer"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-4 bottom-20 md:bottom-auto md:top-1/2 md:-translate-y-1/2 h-11 w-11 flex items-center justify-center text-white hover:text-white/70 transition-colors z-10 bg-black/40 rounded-full hover:bg-black/60 cursor-pointer"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>

          {/* Counter + thumbnail strip */}
          <div className="px-4 sm:px-6 py-4 md:pb-8">
            <p className="text-text-on-dark font-medium" aria-live="polite">{counterText}</p>
            <div className="flex gap-2 overflow-x-auto mt-3 pb-2 snap-x scrollbar-hide">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`relative shrink-0 w-[64px] h-[44px] md:w-[80px] md:h-[54px] rounded overflow-hidden transition-all duration-150 snap-start cursor-pointer ${
                    currentIndex === i 
                      ? "opacity-100 ring-2 ring-white ring-offset-1 ring-offset-[#0A0A09]" 
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={80}
                    height={54}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
