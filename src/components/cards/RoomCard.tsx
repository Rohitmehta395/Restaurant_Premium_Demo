"use client";

import Image from "next/image";
import { SquareArrowOutUpRight, Star, BedDouble, Bath, Image as ImageIcon } from "lucide-react";
import type { RoomData } from "@/types/pages";
import { useLightbox } from "@/hooks/useLightbox";
import dynamic from "next/dynamic";

const LightboxGallery = dynamic(() => import("@/components/interactive/LightboxGallery").then(mod => mod.LightboxGallery), { ssr: false });
import { formatCurrency } from "@/lib/utils";

export interface RoomCardProps {
  room: RoomData;
  showPricing: boolean;
}

export function RoomCard({ room, showPricing }: RoomCardProps) {
  const images = room.gallery_images || [];
  const lightbox = useLightbox(images.length);

  const firstImage = images.length > 0 ? images[0] : null;
  const coverImage = room.cover_image_ref || (firstImage ? firstImage.image_ref : "/images/placeholder.jpg");
  const coverAlt = room.cover_image_alt || room.name;
  const galleryTriggerLabel = room.gallery_trigger_label || "View Gallery";

  const mappedImages = images.map((img) => ({
    src: img.image_ref,
    alt: img.alt_text || room.name,
  }));

  const areaText = room.area_display || (room.area_sqm ? `${room.area_sqm} m²` : undefined);

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
          aria-label={`Open gallery for ${room.name}`}
        >
          <Image 
            fill 
            src={coverImage} 
            alt={coverAlt} 
            className="object-cover transform scale-100 transition-transform duration-600 ease-out group-hover:scale-[1.03]" 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          />
        </div>

        {/* Card content */}
        <div className="pt-6 pb-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h3 className="text-card-h3 font-display font-semibold text-text-primary">
                {room.name}
              </h3>
              <p className="text-label-caps tracking-widest uppercase text-text-secondary mt-1 block">
                {room.max_guests ? `1-${room.max_guests} Guests` : room.capacity_label} · {room.room_count} Room{room.room_count !== 1 ? 's' : ''}
              </p>
            </div>
            
            {/* Pricing */}
            {showPricing && (room.rate_single || room.rate_double) && (
              <div className="text-left md:text-right shrink-0">
                <p className="text-body-base text-text-secondary">
                  {room.rate_from_text && "from "}
                  {room.rate_single && (
                    <>
                      <span className="text-card-h3 font-display font-semibold text-text-primary">
                        {formatCurrency(room.rate_single, room.rate_currency)}
                      </span>
                      {" (single)"}
                    </>
                  )}
                  {room.rate_single && room.rate_double && " · "}
                  {room.rate_double && (
                    <>
                      <span className="text-card-h3 font-display font-semibold text-text-primary">
                        {formatCurrency(room.rate_double, room.rate_currency)}
                      </span>
                      {" (double)"}
                    </>
                  )}
                </p>
                {room.rate_note && (
                  <p className="text-caption italic text-text-secondary mt-1 max-w-[200px] text-left md:text-right md:ml-auto">
                    * {room.rate_note}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Spec list */}
          <ul className="mt-4 space-y-2">
            {areaText && (
              <li className="flex items-center gap-2 text-body-base text-text-secondary">
                <SquareArrowOutUpRight className="size-4 text-text-secondary/60 shrink-0" />
                <span>{areaText}</span>
              </li>
            )}
            {room.bed_configuration && (
              <li className="flex items-center gap-2 text-body-base text-text-secondary">
                <BedDouble className="size-4 text-text-secondary/60 shrink-0" />
                <span>{room.bed_configuration}</span>
              </li>
            )}
            {room.bathroom_type && room.bathroom_type !== "none" && (
              <li className="flex items-center gap-2 text-body-base text-text-secondary">
                <Bath className="size-4 text-text-secondary/60 shrink-0" />
                <span className="capitalize">{room.bathroom_type} bathroom</span>
              </li>
            )}
            {room.exclusive_features?.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2 text-body-base text-text-secondary">
                <Star className="size-4 text-text-secondary/60 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <p className="text-body-base text-text-secondary leading-relaxed mt-4">
            {room.description_long || room.description_short}
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
          title={room.name}
          subtitle={room.capacity_label}
          currentIndex={lightbox.currentIndex}
          next={lightbox.next}
          prev={lightbox.prev}
          goTo={lightbox.goTo}
        />
      )}
    </>
  );
}
