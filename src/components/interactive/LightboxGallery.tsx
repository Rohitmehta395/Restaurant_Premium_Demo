"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowLeft, Plus, Minus } from "lucide-react";

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
  
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    } else {
      setVisible(false);
      const timer = setTimeout(() => setShouldRender(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Reset zoom on slide change
  useEffect(() => {
    setZoomLevel(1.0);
  }, [currentIndex]);

  const handleZoomIn = () => setZoomLevel((p) => (p === 1.0 ? 1.3 : p === 1.3 ? 1.6 : 1.6));
  const handleZoomOut = () => setZoomLevel((p) => (p === 1.6 ? 1.3 : p === 1.3 ? 1.0 : 1.0));

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement;
      document.body.style.overflow = "hidden";
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

  if (!shouldRender || !images || images.length === 0) return null;

  const currentImage = images[currentIndex];
  if (!currentImage) return null;

  const total = images.length;
  const counterText = `${String(currentIndex + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-600 ease-out ${
        visible ? "bg-black/50 opacity-100" : "bg-transparent opacity-0 pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} gallery`}
      onClick={onClose}
    >
      <div 
        className={`bg-[#F8F6F2] rounded-[8px] w-[min(960px,92vw)] h-[90vh] max-h-[90vh] flex flex-col overflow-hidden transition-all duration-600 ease-out transform ${
          visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-8 scale-[0.98] opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between py-[20px] px-[28px]">
          <div className="flex items-center">
            <h2 className="font-display text-[18px] text-[#111] font-normal">{title}</h2>
            {subtitle && (
              <span className="text-[11px] tracking-[0.12em] uppercase text-[#888] ml-4">
                {subtitle}
              </span>
            )}
          </div>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close gallery"
            className="border border-[#111] bg-[#111] text-white rounded-full px-5 py-2.5 text-[11px] tracking-[0.1em] uppercase flex items-center gap-2 cursor-pointer hover:bg-[#333] transition-colors"
          >
            <ArrowLeft className="size-3" />
            CLOSE
          </button>
        </div>

        {/* Main image area */}
        <div className="flex-1 relative px-[28px] pb-[16px] flex items-center justify-center min-h-0">
          <div className="relative w-full h-full overflow-hidden rounded-[8px]">
            {images.map((img, i) => (
              <Image
                key={i}
                src={img.src}
                alt={img.alt}
                fill
                sizes="960px"
                className={`object-cover transition-opacity duration-200 ${
                  i === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
                style={{
                  transform: i === currentIndex ? `scale(${zoomLevel})` : 'scale(1)',
                  transition: 'opacity 200ms ease-in-out, transform 300ms ease-in-out'
                }}
                priority={i === currentIndex}
              />
            ))}
            
            {/* Overlaid Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
              {/* Left side */}
              <div className="flex items-center gap-[12px] pointer-events-auto">
                <button
                  onClick={prev}
                  aria-label="Previous image"
                  className="w-9 h-9 rounded-full bg-white border border-[#111] flex items-center justify-center cursor-pointer hover:bg-[#E8E4DC] transition-colors"
                >
                  <ChevronLeft className="size-4 text-[#111]" />
                </button>
                <div className="bg-white border border-[#111] rounded-full px-4 py-1.5 text-[13px] text-[#111] font-medium select-none">
                  {counterText}
                </div>
                <button
                  onClick={next}
                  aria-label="Next image"
                  className="w-9 h-9 rounded-full bg-white border border-[#111] flex items-center justify-center cursor-pointer hover:bg-[#E8E4DC] transition-colors"
                >
                  <ChevronRight className="size-4 text-[#111]" />
                </button>
              </div>

              {/* Right side */}
              <div className="flex items-center gap-[8px] pointer-events-auto">
                <button
                  onClick={handleZoomIn}
                  aria-label="Zoom in"
                  className="w-9 h-9 rounded-full bg-white border border-[#111] flex items-center justify-center cursor-pointer hover:bg-[#E8E4DC] transition-colors"
                >
                  <Plus className="size-4 text-[#111]" />
                </button>
                <button
                  onClick={handleZoomOut}
                  aria-label="Zoom out"
                  className="w-9 h-9 rounded-full bg-white border border-[#111] flex items-center justify-center cursor-pointer hover:bg-[#E8E4DC] transition-colors"
                >
                  <Minus className="size-4 text-[#111]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="pb-[20px] px-[28px] flex gap-[8px] overflow-x-auto scrollbar-hide">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`View image ${i + 1}`}
              className={`shrink-0 w-[70px] h-[50px] rounded-[3px] overflow-hidden cursor-pointer transition-opacity duration-150 border-2 ${
                currentIndex === i 
                  ? "opacity-100 border-[#111]" 
                  : "opacity-50 border-transparent hover:opacity-[0.85]"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={70}
                height={50}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
