"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HeroContent } from "@/types";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface HeroSlideshowProps {
  hero: HeroContent;
}

export function HeroSlideshow({ hero }: HeroSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const images = hero.slideshow_images || [];
  
  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  if (!images.length) return null;

  const duration = prefersReducedMotion ? 0.001 : 1.2;

  return (
    <section 
      aria-label="Hero image gallery" 
      aria-roledescription="carousel"
      className="relative w-full h-[100svh] overflow-hidden"
    >
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {currentIndex + 1} of {images.length}
      </div>

      {/* Image Stack */}
      {images.map((image, index) => {
        const isActive = index === currentIndex;
        return (
          <motion.div
            key={image.image_ref}
            role="group"
            aria-roledescription="slide"
            aria-label={`Image ${index + 1} of ${images.length}`}
            className="absolute inset-0"
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration, ease: "easeInOut" }}
            initial={{ opacity: index === 0 ? 1 : 0 }}
            aria-hidden={!isActive}
          >
            <Image
              src={image.image_ref}
              alt={image.alt_text || "Hero image"}
              fill
              priority={index === 0}
              loading={index === 0 ? undefined : "lazy"}
              className="object-cover object-center"
              sizes="100vw"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            />
          </motion.div>
        );
      })}

      {/* Dark Overlay */}
      <div 
        className="absolute inset-0 z-10 bg-surface-dark"
        style={{ opacity: hero.overlay_opacity || 0.4 }}
      />

      {/* Text Container */}
      <div className="absolute bottom-8 md:bottom-16 left-4 right-4 md:left-0 md:right-0 z-20 text-center md:text-left">
        <div className="md:container-content">
          <motion.div 
            className="max-w-2xl mx-auto md:mx-0"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0.001 } : { duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            {hero.eyebrow_text && (
              <span className="hidden md:block text-xs tracking-widest uppercase text-white/80 mb-4 font-medium">
                {hero.eyebrow_text}
              </span>
            )}
            
            <h1 className="text-hero-h1 text-white">
              {hero.headline_parts && hero.headline_parts.length > 0 ? (
                hero.headline_parts.map((part, i) => (
                  part.emphasis ? (
                    <em key={i} className="italic" style={{ fontStyle: "italic" }}>{part.text}</em>
                  ) : (
                    <span key={i}>{part.text}</span>
                  )
                ))
              ) : (
                hero.headline
              )}
            </h1>

            {hero.subheadline && (
              <p className="text-white/90 mt-4 text-body-large md:text-section-h2 font-body font-normal">
                {hero.subheadline}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
