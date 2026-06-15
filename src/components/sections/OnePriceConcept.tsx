import Image from "next/image";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { cn } from "@/lib/utils";

interface OnePriceConceptProps {
  headline: string;
  body: string;
  inclusionsHeading: string;
  inclusionsBody: string;
  cateringNote?: string;
  supportingImageRef?: string;
  supportingImageAlt?: string;
  background?: "default" | "alternate";
}

export function OnePriceConcept({
  headline,
  body,
  inclusionsHeading,
  inclusionsBody,
  cateringNote,
  supportingImageRef,
  supportingImageAlt,
  background = "default",
}: OnePriceConceptProps) {
  const hasImage = !!supportingImageRef;

  const bgClasses = {
    default: "bg-surface-default",
    alternate: "bg-surface-alternate border-y border-border-subtle",
  };

  const Content = ({ isCentered }: { isCentered?: boolean }) => (
    <div className={cn(isCentered ? "text-center" : "text-left")}>
      <h2 className="text-section-h2 font-display font-semibold text-text-primary">
        {headline}
      </h2>
      <p className="text-body-large text-text-secondary mt-4 leading-relaxed">
        {body}
      </p>
      
      <div className="mt-8 pt-8 border-t border-border-subtle">
        <h3 className="text-card-h3 font-semibold text-text-primary">
          {inclusionsHeading}
        </h3>
        <p className="text-body-base text-text-secondary mt-3 leading-relaxed">
          {inclusionsBody}
        </p>
      </div>
      
      {cateringNote && (
        <p 
          aria-label="Additional note about catering"
          className="text-caption italic text-text-secondary mt-6 pt-6 border-t border-border-subtle"
        >
          {cateringNote}
        </p>
      )}
    </div>
  );

  return (
    <section className={cn("py-20 md:py-32 w-full", bgClasses[background])}>
      <div className="container-content">
        {hasImage ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-1 lg:order-1">
              <SectionReveal direction="up" delay={0}>
                <Content />
              </SectionReveal>
            </div>

            <div className="order-2 lg:order-2">
              <SectionReveal direction="right" delay={0.2}>
                <div className="relative aspect-[16/9] lg:aspect-[4/3] rounded-base overflow-hidden shadow-base">
                  <Image
                    src={supportingImageRef!}
                    alt={supportingImageAlt || ""}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </SectionReveal>
            </div>
          </div>
        ) : (
          <div className="reading-column mx-auto">
            <SectionReveal direction="up" delay={0}>
              <Content isCentered />
            </SectionReveal>
          </div>
        )}
      </div>
    </section>
  );
}
