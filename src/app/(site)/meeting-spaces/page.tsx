import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SpaceData } from "@/types/pages";
import { 
  getServiceBySlug, 
  getSpacesByServiceSlug, 
  getOnePriceConcept, 
  getFeatureGroup, 
  getFeaturesConfig 
} from "@/lib/data/loaders";
import { PageHeader } from "@/components/sections/PageHeader";
import { QuickNavBar } from "@/components/interactive/QuickNavBar";
import { SpaceCard } from "@/components/cards/SpaceCard";
import { OnePriceConcept } from "@/components/sections/OnePriceConcept";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const service = await getServiceBySlug("meeting-spaces");
  if (!service) return {};

  return buildMetadata({
    title: service.meta_title || service.page_title,
    description: service.meta_description || "",
    path: "/meeting-spaces",
  });
}

export default async function MeetingSpacesPage() {
  const slug = "meeting-spaces";
  
  const [
    service, 
    spaces, 
    onePriceConcept, 
    technologies, 
    amenities, 
    features
  ] = await Promise.all([
    getServiceBySlug(slug),
    getSpacesByServiceSlug(slug),
    getOnePriceConcept(slug),
    getFeatureGroup("technologies"),
    getFeatureGroup("amenities"),
    getFeaturesConfig(),
  ]);

  if (!service) notFound();

  const heroImage = service.hero_image_ref ? {
    src: service.hero_image_ref,
    alt: service.hero_image_alt || service.page_title,
  } : undefined;

  return (
    <>
      <PageHeader
        title={service.page_title}
        subtitle={service.page_subtitle}
        heroImage={heroImage}
        variant="standard"
      />
      
      {features?.quick_navigation && service.quick_nav_items && service.quick_nav_items.length > 0 && (
        <QuickNavBar items={service.quick_nav_items} />
      )}

      {/* The Spaces Section */}
      {spaces.length > 0 && (
        <section id="spaces" className="py-section container-content scroll-mt-24">
          <SectionReveal>
            <h2 className="text-section-h2 font-display text-text-primary mb-16">
              The Spaces
            </h2>
          </SectionReveal>
          
          <div className="flex flex-col gap-12 lg:gap-24">
            {spaces.map((space: SpaceData, index: number) => (
              <SectionReveal key={space.slug} delay={index * 0.2}>
                <SpaceCard space={space} />
              </SectionReveal>
            ))}
          </div>
        </section>
      )}

      {/* One Price Concept Section */}
      {onePriceConcept && (
        <div id="one-price-concept" className="scroll-mt-24">
          <OnePriceConcept
            headline={onePriceConcept.headline}
            body={onePriceConcept.body}
            inclusionsHeading={onePriceConcept.inclusions_heading || ""}
            inclusionsBody={onePriceConcept.inclusions_body || ""}
            cateringNote={onePriceConcept.catering_note}
            background="alternate"
          />
        </div>
      )}

      {/* Technologies Section */}
      {technologies && technologies.items.length > 0 && (
        <section id="technologies" className="py-section container-content scroll-mt-24">
          <SectionReveal>
            <h2 className="text-section-h2 font-display text-text-primary mb-6">
              {technologies.heading || "Technologies"}
            </h2>
            {technologies.intro && (
              <p className="text-body-large text-text-secondary max-w-3xl mb-16">
                {technologies.intro}
              </p>
            )}
          </SectionReveal>
          
          <div className={!technologies.intro ? "mt-16" : ""}>
            <FeaturesGrid featureGroup={technologies} variant="compact" />
          </div>
        </section>
      )}

      {/* Amenities Section */}
      {amenities && amenities.items.length > 0 && (
        <section id="amenities" className="py-section bg-surface-alternate scroll-mt-24">
          <div className="container-content">
            <SectionReveal>
              <h2 className="text-section-h2 font-display text-text-primary mb-6">
                {amenities.heading || "Amenities"}
              </h2>
              {amenities.intro && (
                <p className="text-body-large text-text-secondary max-w-3xl mb-16">
                  {amenities.intro}
                </p>
              )}
            </SectionReveal>
            
            <div className={!amenities.intro ? "mt-16" : ""}>
              <FeaturesGrid featureGroup={amenities} variant="expanded" />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
