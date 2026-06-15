"use client";

import Image from "next/image";
import {
  SquareArrowOutUpRight,
  Users,
  Star,
  Image as ImageIcon,
} from "lucide-react";
import type { SpaceData } from "@/types/pages";
import { useLightbox } from "@/hooks/useLightbox";
import dynamic from "next/dynamic";

const LightboxGallery = dynamic(
  () =>
    import("@/components/interactive/LightboxGallery").then(
      (mod) => mod.LightboxGallery,
    ),
  { ssr: false },
);

export interface SpaceCardProps {
  space: SpaceData;
}

export function SpaceCard({ space }: SpaceCardProps) {
  const images = space.gallery_images || [];
  const lightbox = useLightbox(images.length);

  const firstImage = images.length > 0 ? images[0] : null;
  const coverImage =
    space.cover_image_ref ||
    (firstImage ? firstImage.image_ref : "/images/placeholder.jpg");
  const coverAlt = space.cover_image_alt || space.name;
  const galleryTriggerLabel = space.gallery_trigger_label || "View Gallery";

  const mappedImages = images.map((img) => ({
    src: img.image_ref,
    alt: img.alt_text || space.name,
  }));

  const areaText =
    space.area_display || (space.area_sqm ? `${space.area_sqm} m²` : undefined);

  return (
    <>
      <article className="group">
        {/* Cover image */}
        <div
          className="relative aspect-[16/9] md:aspect-[3/2] overflow-hidden cursor-pointer rounded-t-sm"
          onClick={() => lightbox.open(0)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              lightbox.open(0);
            }
          }}
          aria-label={`Open gallery for ${space.name}`}
        >
          <Image
            fill
            src={coverImage}
            alt={coverAlt}
            className="object-cover object-center transform scale-100 group-hover:scale-[1.03] transition-transform duration-600 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          />
          <div
            className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"
            aria-hidden="true"
          />
        </div>

        {/* Card content */}
        <div className="pt-6 pb-8">
          <h3 className="text-card-h3 font-display font-semibold text-text-primary">
            {space.name}
          </h3>
          <p className="text-label-caps tracking-widest uppercase text-text-secondary mt-1 block">
            {space.capacity_label}
          </p>

          {/* Spec list */}
          <ul className="mt-4 space-y-2">
            {areaText && (
              <li className="flex items-center gap-2 text-body-base text-text-secondary">
                <SquareArrowOutUpRight className="size-4 text-text-secondary/60 shrink-0" />
                <span>{areaText}</span>
              </li>
            )}
            {space.layout_styles && space.layout_styles.length > 0 && (
              <li className="flex items-center gap-2 text-body-base text-text-secondary">
                <Users className="size-4 text-text-secondary/60 shrink-0" />
                <span>{space.layout_styles.join(", ")}</span>
              </li>
            )}
            {space.special_features?.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 text-body-base text-text-secondary"
              >
                <Star className="size-4 text-text-secondary/60 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <p className="text-body-base text-text-secondary leading-relaxed mt-4">
            {space.description_long || space.description_short}
          </p>

          {mappedImages.length > 0 && (
            <button
              onClick={() => lightbox.open(0)}
              className="mt-6 w-full md:w-auto px-6 py-3 md:p-0 border border-border-subtle md:border-none text-body-base font-medium text-text-primary underline underline-offset-4 hover:no-underline hover:text-text-secondary transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-btn md:rounded-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <ImageIcon className="md:hidden size-4" />
              {galleryTriggerLabel}
            </button>
          )}
        </div>
      </article>

      {mappedImages.length > 0 && (
        <LightboxGallery
          isOpen={lightbox.isOpen}
          onClose={lightbox.close}
          images={mappedImages}
          title={space.name}
          subtitle={space.capacity_label}
          currentIndex={lightbox.currentIndex}
          next={lightbox.next}
          prev={lightbox.prev}
          goTo={lightbox.goTo}
        />
      )}
    </>
  );
}
