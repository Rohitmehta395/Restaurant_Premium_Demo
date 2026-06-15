import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  getPracticalPageData, 
  getBusinessContact,
  getAllServices
} from "@/lib/data/loaders";
import { PageHeader } from "@/components/sections/PageHeader";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { buildMetadata } from "@/lib/seo";
import { InfoBlock } from "@/components/common/InfoBlock";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPracticalPageData();
  if (!data) return {};

  return buildMetadata({
    title: data.meta_title || data.page_title,
    description: data.meta_description || "",
    path: "/practical-info",
  });
}

export default async function PracticalInfoPage() {
  const [data, contact, allServices] = await Promise.all([
    getPracticalPageData(),
    getBusinessContact(),
    getAllServices()
  ]);

  if (!data) notFound();

  // If distance-table block exists but lacks content, inject from contact data
  const infoBlocks = data.info_blocks.map(block => {
    if (block.content_type === "distance-table" && contact?.proximity_points && (!block.content || (Array.isArray(block.content) && block.content.length === 0))) {
      return { ...block, content: contact.proximity_points };
    }
    return block;
  });

  // Services quicklinks
  const services = allServices?.services.filter(s => s.status === "published") || [];

  return (
    <>
      <PageHeader
        title={data.page_title}
        subtitle={data.page_subtitle}
        ctaRef={data.hero_cta_ref}
        variant="minimal"
      />

      <section className="py-section container-content">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 max-w-5xl">
          {infoBlocks.map((block, index) => (
            <SectionReveal key={block.slug} delay={index * 0.1}>
              <InfoBlock
                iconRef={block.icon_ref || block.slug}
                heading={block.heading}
                contentType={block.content_type}
                content={block.content}
                note={block.note}
              />
            </SectionReveal>
          ))}
        </div>
      </section>

      {data.services_quicklinks && services.length > 0 && (
        <section className="py-section bg-surface-alternate">
          <div className="container-content">
            <SectionReveal>
              <h2 className="text-section-h2 font-display text-text-primary mb-4">
                {data.services_quicklinks.heading}
              </h2>
              {data.services_quicklinks.intro && (
                <p className="text-body-large text-text-secondary mb-8">
                  {data.services_quicklinks.intro}
                </p>
              )}
              <div className="flex flex-wrap gap-4">
                {services.map(service => (
                  <Link 
                    key={service.slug}
                    href={`/${service.slug}`}
                    className="inline-block border border-border-strong text-text-primary px-8 py-3 rounded-btn text-sm font-medium tracking-wide hover:bg-surface-dark hover:text-text-on-dark transition-colors duration-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-strong"
                  >
                    {service.nav_label}
                  </Link>
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>
      )}
    </>
  );
}