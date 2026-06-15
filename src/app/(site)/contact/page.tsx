import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  getContactPageData, 
  getBusinessContact,
  getBusinessIdentity,
  getSocialPlatforms
} from "@/lib/data/loaders";
import { ContactForm } from "@/components/interactive/ContactForm";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { SocialIconLink } from "@/components/common/SocialIconLink";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getContactPageData();
  if (!data) return {};

  return buildMetadata({
    title: data.meta_title || data.page_title,
    description: data.meta_description || "",
    path: `/contact`,
  });
}

export default async function ContactPage() {
  const [data, contact, identity, socialsData] = await Promise.all([
    getContactPageData(),
    getBusinessContact(),
    getBusinessIdentity(),
    getSocialPlatforms()
  ]);

  if (!data || !data.form_config) notFound();

  const socials = socialsData?.platforms.filter(s => s.show_in_contact) || [];

  return (
    <div className="py-24 md:py-32 container-content">
      <SectionReveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left column: Contact info */}
          <div className="space-y-12">
            <div>
              <h1 className="text-display-h2 font-display text-text-primary mb-6">
                {data.page_title}
              </h1>
              {data.page_subtitle && (
                <p className="text-body-large text-text-secondary">
                  {data.page_subtitle}
                </p>
              )}
            </div>

            <div className="space-y-8">
              {data.show_address_block && contact && identity && (
                <div>
                  <h3 className="text-body-base font-bold text-text-primary mb-2">Location</h3>
                  <address className="not-italic text-body-base text-text-secondary space-y-1">
                    <p>{identity.business_name}</p>
                    <p>{contact.address_line_1}</p>
                    <p>{contact.postcode} {contact.city}, {contact.country}</p>
                    {identity.vat_number && <p className="mt-2 text-caption">VAT: {identity.vat_number}</p>}
                  </address>
                  
                  {data.show_maps_link && contact.maps_link && (
                    <div className="mt-4">
                      <a 
                        href={contact.maps_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-body-sm font-medium text-brand-primary underline hover:text-brand-secondary transition-colors"
                      >
                        Get Directions
                      </a>
                    </div>
                  )}
                </div>
              )}

              {contact && (contact.phone || contact.email) && (
                <div>
                  <h3 className="text-body-base font-bold text-text-primary mb-2">Direct Contact</h3>
                  <div className="text-body-base text-text-secondary space-y-2">
                    {contact.email && (
                      <p>
                        <a href={`mailto:${contact.email}`} className="hover:text-brand-primary transition-colors">
                          {contact.email}
                        </a>
                      </p>
                    )}
                    {contact.phone && (
                      <p>
                        <a href={contact.phone_uri || `tel:${contact.phone}`} className="hover:text-brand-primary transition-colors">
                          {contact.phone}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              )}

              {data.show_social_links && socials.length > 0 && (
                <div>
                  <h3 className="text-body-base font-bold text-text-primary mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    {socials.map((social) => (
                      <SocialIconLink
                        key={social.platform}
                        platform={social.platform}
                        url={social.url}
                        variant="color"
                        size="md"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right column: Form */}
          <div className="bg-surface-alternate p-6 sm:p-10 rounded-base border border-border-subtle shadow-subtle">
            <h2 className="text-section-h3 font-display text-text-primary mb-8">
              Send an Inquiry
            </h2>
            <ContactForm 
              formConfig={data.form_config as any} 
              privacyPolicyUrl="/privacy-policy" 
            />
          </div>

        </div>
      </SectionReveal>
    </div>
  );
}
