import { HomePageData } from "@/types";
import { getAllServices } from "@/lib/data/loaders";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { SectionReveal } from "@/components/animation/SectionReveal";

interface ServicesGridProps {
  data?: HomePageData["services_section"] & { intro_text?: string };
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
    <section className="bg-white py-12 md:py-[80px]">
      <div className="container-content">
        {data.heading && (
          <SectionReveal className="text-left mb-10">
            <h2 className="text-[36px] text-[#111] font-display font-normal mb-4">
              {data.heading}
            </h2>
            {(data as any).intro_text && (
              <p className="text-[15px] text-[#666] leading-relaxed max-w-[560px]">
                {(data as any).intro_text}
              </p>
            )}
          </SectionReveal>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
