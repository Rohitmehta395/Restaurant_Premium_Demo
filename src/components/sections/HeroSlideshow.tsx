"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { HeroContent } from "@/types";
import { cn } from "@/lib/utils";

interface HeroSlideshowProps {
  hero: HeroContent;
}

export function HeroSlideshow({ hero }: HeroSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = hero.slideshow_images || [];
  
  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  if (!images.length) return null;

  return (
    <section 
      role="region" 
      aria-label="Featured images slideshow" 
      className="relative w-full h-[100svh] overflow-hidden bg-[#1A1A18]"
    >
      <div className="sr-only" aria-live="polite">
        Slide {currentIndex + 1} of {images.length}
      </div>

      {/* Image Stack */}
      {images.map((image, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={image.image_ref}
            role="group"
            aria-roledescription="slide"
            aria-label={`Image ${index + 1} of ${images.length}`}
            className={cn(
              "absolute inset-0 transition-opacity duration-[1200ms] ease-in-out",
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            )}
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
            />
          </div>
        );
      })}

      {/* Uniform Dark Overlay */}
      <div className="absolute inset-0 z-20 bg-black/25 pointer-events-none" />

      {/* Text Block */}
      <div className="absolute z-30 bottom-[80px] left-0 right-0 pl-6 md:pl-[60px] pr-6 pointer-events-none">
        <div className="max-w-[500px]">
          {hero.eyebrow_text && (
            <div className="text-[11px] tracking-[0.15em] text-white/80 mb-3 uppercase">
              {hero.eyebrow_text.split('FORM').map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && <em className="font-display italic tracking-normal ml-[1px]">FORM</em>}
                </span>
              ))}
            </div>
          )}
          
          <h1 className="font-display text-[40px] md:text-[52px] leading-[1.1] text-white font-normal pointer-events-auto">
            {hero.headline_parts?.length ? (
              hero.headline_parts.map((part, i) => (
                <span key={i} className="block">
                  {part.text}
                </span>
              ))
            ) : (
              hero.headline
            )}
          </h1>
        </div>
      </div>

      {/* Slide Indicators */}
      {images.length > 1 && (
        <div className="absolute z-30 bottom-[48px] right-6 md:right-[60px] flex gap-[12px] items-center">
          {images.map((_, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className="group py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white cursor-pointer"
              >
                <div 
                  className={cn(
                    "h-[2px] w-10 transition-opacity duration-300",
                    isActive ? "bg-white opacity-100" : "bg-white opacity-30 group-hover:opacity-60"
                  )} 
                />
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
