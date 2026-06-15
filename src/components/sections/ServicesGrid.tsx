import { HomePageData } from "@/types";
import { getAllServices } from "@/lib/data/loaders";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { SectionReveal } from "@/components/animation/SectionReveal";

interface ServicesGridProps {
  data?: HomePageData["services_section"];
}

export async function ServicesGrid({ data }: ServicesGridProps) {
  if (!data || !data.show_section) return null;

  const servicesData = await getAllServices();
  if (!servicesData || !servicesData.services) return null;

  const publishedServices = servicesData.services
    .filter((s) => s.status === "published")
    .sort((a, b) => a.sort_order - b.sort_order)
    .slice(0, 3);

  if (publishedServices.length === 0) return null;

  return (
    <section className="py-section bg-surface-alternate">
      <div className="container-content">
        {data.heading && (
          <SectionReveal className="text-center mb-12">
            <h2 className="text-section-h2 text-text-primary font-display font-semibold">
              {data.heading}
            </h2>
            {data.intro && (
              <p className="text-body-large text-text-secondary mt-4 max-w-2xl mx-auto">
                {data.intro}
              </p>
            )}
          </SectionReveal>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {publishedServices.map((service, index) => (
            <SectionReveal key={service.slug} delay={index * 0.15}>
              <ServiceCard
                title={service.card_title}
                tagline={service.card_tagline}
                ctaText={service.card_cta_text}
                ctaHref={`/${service.slug}`}
                imageSrc={service.card_image_ref || "/images/placeholder.jpg"}
                imageAlt={service.card_image_alt || service.card_title}
              />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
