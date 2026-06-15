import { useState } from "react";

export function useLightbox(imageCount: number) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const open = (index = 0) => { 
    setCurrentIndex(index); 
    setIsOpen(true); 
  };
  
  const close = () => setIsOpen(false);
  
  const next = () => setCurrentIndex((i) => (i + 1) % imageCount);
  
  const prev = () => setCurrentIndex((i) => (i - 1 + imageCount) % imageCount);
  
  const goTo = (index: number) => setCurrentIndex(index);
  
  return { isOpen, currentIndex, open, close, next, prev, goTo };
}
