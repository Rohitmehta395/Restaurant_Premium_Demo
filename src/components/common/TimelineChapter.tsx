import Image from "next/image";

export interface TimelineChapterProps {
  slug: string;
  heading: string;
  dateLabel?: string;
  bodyHtml: string;
  imageRef?: string;
  imageAlt?: string;
  imagePosition?: "left" | "right" | "below";
}

export function TimelineChapter({
  slug,
  heading,
  dateLabel,
  bodyHtml,
  imageRef,
  imageAlt,
  imagePosition = "right",
}: TimelineChapterProps) {
  return (
    <section aria-label={heading} id={slug} className="py-12 md:py-16">
      <div className="container-content">
        <div className={`flex flex-col gap-12 ${imagePosition === "left" ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
          <div className="flex-1 max-w-prose">
            <h2 className="text-section-h2 font-display text-text-primary mb-6">
              {heading}
              {dateLabel && (
                <span className="ml-3 text-body-base font-normal text-text-secondary tracking-widest uppercase">
                  ({dateLabel})
                </span>
              )}
            </h2>
            <div 
              className="prose prose-p:text-text-secondary prose-p:text-body-large prose-headings:font-display prose-headings:text-text-primary prose-a:text-brand-primary prose-a:underline" 
              dangerouslySetInnerHTML={{ __html: bodyHtml }} 
            />
          </div>
          
          {imageRef && imagePosition !== "below" && (
            <div className="flex-1 relative aspect-[4/3] w-full max-w-xl lg:max-w-none mx-auto">
              <Image 
                fill 
                src={imageRef} 
                alt={imageAlt || heading} 
                className="object-cover rounded-base" 
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}
        </div>
        
        {imageRef && imagePosition === "below" && (
          <div className="relative w-full aspect-[16/9] mt-12 md:mt-16">
            <Image 
              fill 
              src={imageRef} 
              alt={imageAlt || heading} 
              className="object-cover rounded-base" 
              sizes="100vw"
            />
          </div>
        )}
      </div>
    </section>
  );
}
