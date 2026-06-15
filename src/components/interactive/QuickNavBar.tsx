"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Route } from "next";
import { cn } from "@/lib/utils";

interface QuickNavItem {
  label: string;
  id: string;
}

interface QuickNavBarProps {
  items: QuickNavItem[];
}

export function QuickNavBar({ items }: QuickNavBarProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!items || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -80% 0px", // Trigger when section hits the top 20%
      }
    );

    // Give the DOM a tiny bit of time to render the sections before querying
    const timer = setTimeout(() => {
      items.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) observer.observe(element);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [items]);

  if (!items || items.length === 0) return null;

  const hasManyItems = items.length > 4;

  return (
    <div className="border-b border-border-subtle bg-surface-default sticky top-[64px] z-30">
      <div className="container-content py-4">
        <div className="flex flex-row items-center gap-4">
          <span className="text-label-caps text-text-secondary uppercase tracking-wider font-semibold flex items-center gap-2 shrink-0">
            <span className="hidden xs:inline">Quick nav</span> <ArrowRight className="size-3 md:size-4" aria-hidden="true" />
          </span>
          
          <nav aria-label="Page sections" className={cn(
            "flex-1 overflow-hidden",
            hasManyItems ? "overflow-x-auto scrollbar-hide" : ""
          )}>
            <ol role="list" className={cn(
              "flex items-center gap-x-4 gap-y-2 whitespace-nowrap",
              hasManyItems ? "flex-nowrap" : "flex-wrap"
            )}>
              {items.map((item, index) => {
                const isActive = activeId === item.id;
                
                return (
                  <li key={item.id} className="flex items-center gap-4">
                    <Link
                      href={`#${item.id}` as Route}
                      className={`text-[13px] md:text-body-base transition-colors duration-150 ease-out cursor-pointer ${
                        isActive 
                          ? "text-text-primary font-medium underline underline-offset-8 decoration-2 decoration-brand-secondary" 
                          : "text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {item.label}
                    </Link>
                    {index < items.length - 1 && (
                      <span className="text-text-secondary/40 select-none" aria-hidden="true">
                        ·
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
}
