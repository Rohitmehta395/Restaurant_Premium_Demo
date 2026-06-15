import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Users, Table, LayoutGrid, GlassWater, Coffee, Mic } from "lucide-react";
import { 
  getServiceBySlug, 
  getEventsPageData, 
  getFeatureGroup, 
  getFeaturesConfig 
} from "@/lib/data/loaders";
import { PageHeader } from "@/components/sections/PageHeader";
import { QuickNavBar } from "@/components/interactive/QuickNavBar";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { buildMetadata } from "@/lib/seo";

// Helper for dynamic lucide icons
const IconMap: Record<string, React.ElementType> = {
  Users,
  Table,
  LayoutGrid,
  GlassWater,
  Coffee,
  Mic,
};

export async function generateMetadata(): Promise<Metadata> {
  const service = await getServiceBySlug("business-events");
  if (!service) return {};

  return buildMetadata({
    title: service.meta_title || service.page_title,
    description: service.meta_description || "",
    path: "/business-events",
  });
}

export default async function BusinessEventsPage() {
  const slug = "business-events";
  
  const [
    service, 
    eventsData,
    technologies, 
    amenities, 
    features
  ] = await Promise.all([
    getServiceBySlug(slug),
    getEventsPageData(),
    getFeatureGroup("technologies"),
    getFeatureGroup("amenities"),
    getFeaturesConfig(),
  ]);

  if (!service || !eventsData) notFound();

  const heroImage = service.hero_image_ref ? {
    src: service.hero_image_ref,
    alt: service.hero_image_alt || service.page_title,
  } : undefined;

  // We only use QuickNav if we have specific sections for events
  const quickNavItems = [
    { label: "Pricing", id: "pricing" },
    { label: "Versatile Setup", id: "setup" },
    { label: "Technologies", id: "technologies" },
    { label: "Amenities", id: "amenities" },
  ];

  return (
    <>
      <PageHeader
        title={service.page_title}
        subtitle={service.page_subtitle}
        heroImage={heroImage}
        variant="split"
      />

      {/* Intro & Event Types List */}
      <section className="py-16 container-content">
        <SectionReveal>
          <p className="text-body-large text-text-secondary leading-relaxed max-w-4xl">
            {service.page_intro}
            {" We regularly host a variety of formats including "}
            <span className="font-medium text-text-primary">
              {eventsData.event_types.join(", ")}
            </span>.
          </p>
        </SectionReveal>
      </section>

      {/* Image Gallery Strip */}
      {eventsData.gallery_images && eventsData.gallery_images.length > 0 && (
        <section className="pb-section overflow-hidden">
          <SectionReveal>
            <div className="flex overflow-x-auto gap-4 pb-4 -mx-5 px-5 md:mx-0 md:px-0 hide-scrollbar container-content-width mx-auto">
              {eventsData.gallery_images.map((img, index) => (
                <div key={index} className="relative flex-shrink-0 w-[280px] md:w-[320px] aspect-[4/3] rounded-base overflow-hidden">
                  <Image 
                    src={img.image_ref} 
                    alt={img.alt_text} 
                    fill 
                    className="object-cover" 
                    sizes="(max-width: 768px) 280px, 320px"
                  />
                </div>
              ))}
            </div>
          </SectionReveal>
        </section>
      )}

      {features?.quick_navigation && (
        <QuickNavBar items={quickNavItems} />
      )}

      {/* Pricing Section */}
      {eventsData.pricing && (
        <section id="pricing" className="py-section container-content scroll-mt-24">
          <SectionReveal>
            <h2 className="text-section-h2 font-display text-text-primary mb-8">
              {eventsData.pricing.heading}
            </h2>
            <p className="text-body-large text-text-secondary max-w-3xl mb-8">
              {eventsData.pricing.body}
            </p>
            {eventsData.pricing.catering_note && (
              <p className="italic text-text-secondary text-body-base">
                * {eventsData.pricing.catering_note}
              </p>
            )}
          </SectionReveal>
        </section>
      )}

      {/* Versatile Setup Section */}
      {eventsData.setup && (
        <section id="setup" className="py-section bg-surface-alternate scroll-mt-24">
          <div className="container-content">
            <SectionReveal>
              <h2 className="text-section-h2 font-display text-text-primary mb-16">
                {eventsData.setup.heading}
              </h2>
            </SectionReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {eventsData.setup.items.map((item, index) => {
                const IconComponent = IconMap[item.icon] || LayoutGrid;
                return (
                  <SectionReveal key={item.title} delay={index * 0.1} className="flex gap-4">
                    <div className="shrink-0 mt-1 text-brand-primary">
                      <IconComponent className="size-6" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-card-h3 font-display font-medium text-text-primary mb-2">
                        {item.title}
                      </h3>
                      <p className="text-body-base text-text-secondary">
                        {item.description}
                      </p>
                    </div>
                  </SectionReveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Tailored Proposals */}
      {eventsData.tailored_proposals && (
        <section className="py-section container-content">
          <SectionReveal className="max-w-3xl">
            <p className="text-body-large text-text-secondary leading-relaxed text-center mx-auto">
              {eventsData.tailored_proposals}
            </p>
          </SectionReveal>
        </section>
      )}

      {/* Technologies Section */}
      {technologies && technologies.items.length > 0 && (
        <section id="technologies" className="py-section bg-surface-alternate scroll-mt-24">
          <div className="container-content">
            <SectionReveal>
              <h2 className="text-section-h2 font-display text-text-primary mb-16">
                {technologies.heading || "Technologies"}
              </h2>
            </SectionReveal>
            <FeaturesGrid featureGroup={technologies} variant="compact" />
          </div>
        </section>
      )}

      {/* Amenities Section */}
      {amenities && amenities.items.length > 0 && (
        <section id="amenities" className="py-section container-content scroll-mt-24">
          <SectionReveal>
            <h2 className="text-section-h2 font-display text-text-primary mb-16">
              {amenities.heading || "Amenities"}
            </h2>
          </SectionReveal>
          <FeaturesGrid featureGroup={amenities} variant="expanded" />
        </section>
      )}
    </>
  );
}
