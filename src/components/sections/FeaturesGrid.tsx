import { Check } from "lucide-react";
import { SectionReveal } from "@/components/animation/SectionReveal";
import type { FeatureGroup } from "@/types/components";

interface FeaturesGridProps {
  featureGroup: FeatureGroup;
  variant: "compact" | "expanded";
}

export function FeaturesGrid({ featureGroup, variant }: FeaturesGridProps) {
  const isCompact = variant === "compact";
  const gridClass = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12";

  return (
    <div>
      <div className={gridClass}>
        {featureGroup.items.map((item, index) => (
          <SectionReveal key={item.slug} delay={index * 0.08} className="flex gap-4">
            <div className="shrink-0 mt-1 text-brand-primary">
              <Check className="size-7 md:size-8" />
            </div>
            <div>
              <h3 className="text-body-large font-medium text-text-primary">
                {item.label}
              </h3>
              {(item.descriptor || item.body) && (
                <p className="text-body-base text-text-secondary mt-1">
                  {item.descriptor || item.body}
                </p>
              )}
            </div>
          </SectionReveal>
        ))}
      </div>
      {featureGroup.note && (
        <SectionReveal delay={featureGroup.items.length * 0.08} className="mt-12">
          <p className="italic text-text-secondary text-body-base max-w-2xl">
            * {featureGroup.note}
          </p>
        </SectionReveal>
      )}
    </div>
  );
}
