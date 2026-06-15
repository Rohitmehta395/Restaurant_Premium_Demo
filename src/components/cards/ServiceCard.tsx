import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { ArrowUpRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  tagline: string;
  ctaText: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
}

export function ServiceCard({
  title,
  tagline,
  ctaText,
  ctaHref,
  imageSrc,
  imageAlt,
}: ServiceCardProps) {
  return (
    <article className="border border-[#E0DDD8] rounded-[4px] overflow-hidden bg-white h-full flex flex-col group">
      <div className="relative aspect-[4/3] overflow-hidden shrink-0">
        <Image 
          fill 
          src={imageSrc} 
          alt={imageAlt} 
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
        />
      </div>
      
      <div className="pt-5 px-5 pb-0 flex flex-col flex-1">
        <h3 className="font-display text-[22px] text-[#111] font-normal mb-3">
          {title}
        </h3>
        <p className="text-[14px] text-[#666] leading-relaxed mb-0 flex-1">
          {tagline}
        </p>
      </div>
      
      <Link href={ctaHref as Route} className="mt-5 border-t border-[#E0DDD8] py-[14px] px-5 flex items-center justify-between hover:bg-[#F5F2ED] transition-colors cursor-pointer" aria-label={`Learn more about ${title}`}>
        <span className="text-[11px] tracking-[0.1em] uppercase text-[#111] font-medium">
          {ctaText}
        </span>
        <ArrowUpRight className="size-4 text-[#111]" aria-hidden="true" />
      </Link>
    </article>
  );
}
