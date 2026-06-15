import Link from "next/link";
import {
  getBusinessIdentity,
  getBusinessContact,
  getSocialPlatforms,
  getNavigationConfig,
  getSiteConfig,
} from "@/lib/data/loaders";
import { SocialIconLink } from "@/components/common/SocialIconLink";
import type { Route } from "next";

export async function SiteFooter() {
  const [identity, contact, socialData, navConfig, siteConfig] =
    await Promise.all([
      getBusinessIdentity(),
      getBusinessContact(),
      getSocialPlatforms(),
      getNavigationConfig(),
      getSiteConfig(),
    ]);

  if (!identity || !contact || !navConfig || !siteConfig) return null;

  const socialPlatforms =
    socialData?.platforms.filter((p) => p.show_in_footer) || [];

  const navItems = navConfig.footer_navigation?.duplicate_primary
    ? navConfig.main || []
    : navConfig.footer_navigation?.custom_items || [];

  return (
    <footer
      className="bg-transparent text-white pt-[60px] pb-[40px]"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="px-6 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row justify-center items-start gap-12 md:gap-16 pb-16 max-w-[800px] mx-auto">
          {/* Left Column */}
          <div className="flex flex-col flex-1 max-w-[300px]">
            <p className="text-white text-[14px] font-medium mb-1">
              {identity.legal_entity_name || "FARMform La Mama BV"}
            </p>
            <p className="text-white/60 text-[13px]">
              {contact.address_line_1 || "Stuikberg 135, 1840 Londerzeel"}
            </p>
            <p className="text-white/60 text-[13px] mb-4">
              VAT: {identity.vat_number || "BE 0742576075"}
            </p>

            <a
              href={`mailto:${contact.email}`}
              className="text-white/60 text-[13px] hover:text-white transition-colors"
            >
              {contact.email || "info@farmform.be"}
            </a>
            <a
              href={contact.phone_uri || "tel:+32475910715"}
              className="text-white/60 text-[13px] hover:text-white transition-colors mt-1"
            >
              T: {contact.phone || "+32 (0) 475 910 715"}
            </a>

            {socialPlatforms.length > 0 && (
              <div className="flex gap-3 mt-6">
                {socialPlatforms.map((platform) => (
                  <SocialIconLink
                    key={platform.platform}
                    {...platform}
                    size="sm"
                    className="w-9 h-9 min-h-0 min-w-0 m-0 rounded-md bg-white flex items-center justify-center hover:bg-white/90 transition-colors text-black"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Navigation */}
          <div className="flex flex-col gap-y-4 flex-1 md:border-l md:border-white/20 md:pl-16">
            {navItems
              .filter((item) => item.show)
              .map((item) => (
                <Link
                  key={item.label}
                  href={(item.path || "/") as Route}
                  className="text-[11px] tracking-[0.12em] uppercase text-white hover:text-white/80 transition-all w-fit font-bold underline decoration-white underline-offset-[6px]"
                  target={item.open_in_new_tab ? "_blank" : undefined}
                >
                  {item.label}
                </Link>
              ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex justify-between items-center text-[13px] tracking-[0.08em] uppercase font-bold">
          <div className="text-white">
            ALL RIGHTS RESERVED FARMFORM <span className="mx-1">·</span>
            <Link
              href="/privacy-policy"
              className="text-white/60 transition-colors underline hover:no-underline underline-offset-2"
            >
              PRIVACY POLICY
            </Link>
          </div>

          <div className="text-white flex items-center">
            CODE & DESIGN <span className="mx-1">·</span>
            <a
              href={siteConfig.credit_url || "https://rohittmehta.netlify.app"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 transition-colors underline hover:no-underline underline-offset-2"
            >
              ROHIT MEHTA
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
