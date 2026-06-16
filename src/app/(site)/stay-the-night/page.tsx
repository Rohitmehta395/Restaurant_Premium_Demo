import { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoomData } from "@/types/pages";
import { 
  getServiceBySlug, 
  getRoomsByServiceSlug, 
  getOnePriceConcept, 
  getFeatureGroup, 
  getFeaturesConfig 
} from "@/lib/data/loaders";
import { PageHeader } from "@/components/sections/PageHeader";
import { QuickNavBar } from "@/components/interactive/QuickNavBar";
import { RoomCard } from "@/components/cards/RoomCard";
import { OnePriceConcept } from "@/components/sections/OnePriceConcept";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const service = await getServiceBySlug("stay-the-night");
  if (!service) return {};

  return buildMetadata({
    title: service.meta_title || service.page_title,
    description: service.meta_description || "",
    path: "/stay-the-night",
  });
}

export default async function StayTheNightPage() {
  const slug = "stay-the-night";
  
  const [
    service, 
    rooms, 
    onePriceConcept, 
    inclusions, 
    features
  ] = await Promise.all([
    getServiceBySlug(slug),
    getRoomsByServiceSlug(slug),
    getOnePriceConcept(slug),
    getFeatureGroup("room-inclusions"),
    getFeaturesConfig(),
  ]);

  if (!service) notFound();

  const heroImage = service.hero_image_ref ? {
    src: service.hero_image_ref,
    alt: service.hero_image_alt || service.page_title,
  } : undefined;

  const showPricing = !!features?.pricing_visible;

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

      {/* Our Rooms Section */}
      {rooms.length > 0 && (
        <section id="rooms" className="py-section container-content scroll-mt-24">
          <SectionReveal>
            <h2 className="text-section-h2 font-display text-text-primary mb-16">
              Our Rooms
            </h2>
          </SectionReveal>
          
          <div className="flex flex-col gap-12 lg:gap-24">
            {rooms.map((room: RoomData, index: number) => (
              <SectionReveal key={room.slug} delay={index * 0.2}>
                <RoomCard room={room} showPricing={showPricing} />
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
            supportingImageRef={onePriceConcept.supporting_image_ref}
            supportingImageAlt={onePriceConcept.supporting_image_alt}
            background="default"
          />
        </div>
      )}

      {/* What's Included Section */}
      {inclusions && inclusions.items.length > 0 && (
        <section id="amenities" className="py-section container-content scroll-mt-24">
          <SectionReveal>
            <h2 className="text-section-h2 font-display text-text-primary mb-6">
              {inclusions.heading || "What's Included"}
            </h2>
            {inclusions.intro && (
              <p className="text-body-large text-text-secondary max-w-3xl mb-16">
                {inclusions.intro}
              </p>
            )}
          </SectionReveal>
          
          <div className={!inclusions.intro ? "mt-16" : ""}>
            <FeaturesGrid featureGroup={inclusions} variant="expanded" />
          </div>
        </section>
      )}
    </>
  );
}
