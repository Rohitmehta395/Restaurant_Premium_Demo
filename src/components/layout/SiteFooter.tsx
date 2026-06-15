import Link from "next/link";
import { 
  getBusinessIdentity, 
  getBusinessContact, 
  getSocialPlatforms, 
  getNavigationConfig, 
  getSiteConfig 
} from "@/lib/data/loaders";
import { SocialIconLink } from "@/components/common/SocialIconLink";
import type { Route } from "next";

export async function SiteFooter() {
  const [
    identity,
    contact,
    socialData,
    navConfig,
    siteConfig,
  ] = await Promise.all([
    getBusinessIdentity(),
    getBusinessContact(),
    getSocialPlatforms(),
    getNavigationConfig(),
    getSiteConfig(),
  ]);

  if (!identity || !contact || !navConfig || !siteConfig) return null;

  const socialPlatforms = socialData?.platforms.filter((p) => p.show_in_footer) || [];
  
  // Navigation
  const navItems = navConfig.footer_navigation?.duplicate_primary 
    ? (navConfig.main || [])
    : (navConfig.footer_navigation?.custom_items || []);
    
  const currentYear = new Date().getFullYear();
  const regYear = identity.registration_year || String(currentYear);
  const displayYear = regYear === String(currentYear) ? regYear : `${regYear}–${currentYear}`;

  return (
    <footer className="bg-surface-dark text-text-on-dark" role="contentinfo" aria-label="Site footer">
      <div className="container-content">
        {/* Zone 1: Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 py-16 md:py-24">
          {/* Column 1: Company info block */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <p className="text-body-base font-medium text-text-on-dark">
              {identity.legal_entity_name}
            </p>
            <div className="text-body-base text-text-on-dark/70 mt-2">
              <p>{contact.address_line_1}</p>
              {contact.address_line_2 && <p>{contact.address_line_2}</p>}
              <p>{contact.postcode} {contact.city}</p>
              <p>{contact.country}</p>
            </div>
            
            <p className="text-body-base text-text-on-dark/70 mt-4">
              VAT: {identity.vat_number}
            </p>
            
            <div className="flex flex-col gap-1 mt-6">
              <a 
                href={`mailto:${contact.email}`} 
                className="flex items-center justify-center md:justify-start min-h-[44px] text-body-base text-text-on-dark/80 hover:text-text-on-dark transition-colors duration-150 cursor-pointer"
                aria-label={`Send email to ${contact.email}`}
              >
                {contact.email}
              </a>
              <a 
                href={contact.phone_uri} 
                className="flex items-center justify-center md:justify-start min-h-[44px] text-body-base text-text-on-dark/80 hover:text-text-on-dark transition-colors duration-150 cursor-pointer"
                aria-label={`Call ${contact.phone}`}
              >
                {contact.phone}
              </a>
            </div>
            
            {socialPlatforms.length > 0 && (
              <div className="flex gap-6 mt-8">
                {socialPlatforms.map((platform) => (
                  <SocialIconLink key={platform.platform} {...platform} />
                ))}
              </div>
            )}
          </div>
          
          {/* Column 2: Navigation links (desktop only) */}
          <div className="hidden md:block">
            <nav aria-label="Footer navigation" className="flex flex-col gap-3">
              {navItems.filter(item => item.show).map((item) => (
                <Link
                  key={item.label}
                  href={(item.path || "/") as Route}
                  className="flex items-center min-h-[44px] text-body-base text-text-on-dark/80 hover:text-text-on-dark transition-colors duration-150 cursor-pointer w-fit"
                  target={item.open_in_new_tab ? "_blank" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        
        {/* Separator */}
        <hr className="border-white/15 my-0" />
        
        {/* Zone 2: Bottom legal bar */}
        <div className="py-8 flex flex-col md:flex-row flex-wrap justify-between items-center gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 md:gap-4 text-[13px] text-text-on-dark/50">
            <span>
              All rights reserved {identity.business_name}{identity.trademark_symbol ? "®" : ""} © {displayYear}
            </span>
            
            {navConfig.footer_navigation?.show_legal_links && (
              <div className="flex items-center gap-2">
                <span className="hidden md:inline">·</span>
                <Link href="/privacy-policy" className="flex items-center justify-center min-h-[44px] text-text-on-dark/70 hover:text-text-on-dark transition-colors duration-150 cursor-pointer">
                  Privacy Policy
                </Link>
              </div>
            )}
          </div>
          
          {(siteConfig.credit_name || siteConfig.credit_url) && (
            <div className="text-[13px] text-text-on-dark/50">
              Code & Design{" "}
              {siteConfig.credit_url ? (
                <a 
                  href={siteConfig.credit_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-text-on-dark/70 hover:text-text-on-dark transition-colors inline-flex items-center min-h-[44px]"
                >
                  {siteConfig.credit_name || "Agency"}
                </a>
              ) : (
                <span>{siteConfig.credit_name}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
