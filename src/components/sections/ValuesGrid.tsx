import { SectionReveal } from "@/components/animation/SectionReveal";
import type { ValuesData } from "@/types/components";

interface ValuesGridProps {
  data: ValuesData;
}

export function ValuesGrid({ data }: ValuesGridProps) {
  if (!data || !data.values || data.values.length === 0) return null;

  return (
    <section className="py-section bg-surface-alternate">
      <div className="container-content">
        <SectionReveal className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-section-h2 text-text-primary font-display font-semibold">
            {data.section_heading}
          </h2>
          {data.section_subheading && (
            <p className="text-body-large text-text-secondary mt-4">
              {data.section_subheading}
            </p>
          )}
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {data.values.map((value, index) => (
            <SectionReveal key={value.slug} delay={index * 0.1} className="flex flex-col h-full bg-surface-default p-8 rounded-base border border-border-subtle shadow-subtle">
              <h3 className="text-card-h3 font-display font-medium text-text-primary mb-3">
                {value.label}
              </h3>
              <p className="text-body-base text-text-secondary leading-relaxed flex-1">
                {value.description}
              </p>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
