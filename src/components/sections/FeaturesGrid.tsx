import { Check, Sliders, Leaf, MapPin, Tag, Trees, Briefcase, Globe } from "lucide-react";
import { SectionReveal } from "@/components/animation/SectionReveal";
import type { FeatureGroup } from "@/types/components";

interface FeaturesGridProps {
  featureGroup: FeatureGroup;
  variant?: "compact" | "expanded";
}

const iconMap: Record<string, React.ElementType> = {
  "freedom": Sliders,
  "eco-friendly": Leaf,
  "convenient": MapPin,
  "one-price": Tag,
  "nature": Trees,
  "professionals": Briefcase,
  "multilingual": Globe
};

export function FeaturesGrid({ featureGroup, variant }: FeaturesGridProps) {
  if (featureGroup.slug === "why-choose") {
    return (
      <section className="bg-[#F0EDE8] py-12 md:py-[80px]">
        <div className="bg-[#FFFFFF] container-content p-12">
          <SectionReveal className="text-left mb-12">
            <h2 className="text-[36px] text-[#111] font-display font-normal">
              {featureGroup.heading || "Why choose FARMform?"}
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {featureGroup.items.map((item, index) => {
              const Icon = iconMap[item.slug] || Check;
              return (
                <SectionReveal key={item.slug} delay={index * 0.1}>
                  <div className="border-t-2 border-[#C8B99A] pt-4">
                    <Icon className="text-[#C8B99A] size-5" />
                    <h3 className="text-[15px] font-semibold text-[#111] mt-2 mb-3">
                      {item.label}
                    </h3>
                    <p className="text-[13px] text-[#666] leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Fallback for other feature groups
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
