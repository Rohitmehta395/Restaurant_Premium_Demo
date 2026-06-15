import { HomePageData } from "@/types";
import { SectionReveal } from "@/components/animation/SectionReveal";

interface AboutSectionProps {
  data?: HomePageData["about_section"];
}

export function AboutSection({ data }: AboutSectionProps) {
  if (!data || !data.show_section) return null;

  return (
    <section className="py-section bg-surface-default">
      <div className="container-content">
        <SectionReveal className="reading-column mx-auto max-w-2xl text-center md:text-left">
          <h2 className="text-section-h2 text-text-primary mb-8 font-display font-semibold">
            {data.heading}
          </h2>
          <div className="space-y-5">
            {data.body_paragraphs.map((paragraph, index) => (
              <p key={index} className="text-body-large text-text-secondary font-body">
                {paragraph}
              </p>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
