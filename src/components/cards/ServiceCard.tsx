import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { ArrowRight } from "lucide-react";

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
    <Link href={ctaHref as Route} className="group block h-full cursor-pointer" aria-label={`Learn more about ${title}`}>
      <article className="border border-border-subtle hover:border-border-strong rounded-base overflow-hidden h-full flex flex-col transition-colors duration-150 ease-out">
        <div className="relative aspect-[16/9] md:aspect-[4/3] overflow-hidden shrink-0">
          <Image 
            fill 
            src={imageSrc} 
            alt={imageAlt} 
            className="object-cover transform scale-100 group-hover:scale-[1.03] transition-transform duration-600 ease-out" 
          />
        </div>
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-card-h3 font-display font-semibold text-text-primary">
            {title}
          </h3>
          <p className="text-body-base text-text-secondary mt-2 flex-1">
            {tagline}
          </p>
          <span className="text-body-base text-text-primary font-medium mt-4 inline-flex items-center gap-1">
            {ctaText}
            <ArrowRight className="size-4 hidden md:inline translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300 ease-out" aria-hidden="true" />
          </span>
        </div>
      </article>
    </Link>
  );
}
