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
  
  const navItems = navConfig.footer_navigation?.duplicate_primary 
    ? (navConfig.main || [])
    : (navConfig.footer_navigation?.custom_items || []);
    
  return (
    <footer className="bg-[#1A1A18] text-white pt-[60px] pb-[40px]" role="contentinfo" aria-label="Site footer">
      <div className="container-content">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pb-16">
          {/* Left Column */}
          <div className="flex flex-col">
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
                    className="w-9 h-9 min-h-0 min-w-0 m-0 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 hover:opacity-100 transition-colors text-white opacity-100" 
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Right Column: Navigation */}
          <div className="flex flex-col gap-y-4">
            {navItems.filter(item => item.show).map((item) => (
              <Link
                key={item.label}
                href={(item.path || "/") as Route}
                className="text-[11px] tracking-[0.12em] uppercase text-white underline underline-offset-4 decoration-white/40 hover:decoration-white transition-all w-fit"
                target={item.open_in_new_tab ? "_blank" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="border-t border-white/15 pt-6 flex justify-between items-center text-[11px] tracking-[0.08em] uppercase">
          <div className="text-white/40">
            ALL RIGHTS RESERVED FARMFORM® <span className="mx-1">·</span> 
            <Link href="/privacy-policy" className="hover:text-white transition-colors underline decoration-white/40 underline-offset-4">
              PRIVACY POLICY
            </Link>
          </div>
          
          <div className="text-white/40 flex items-center">
            CODE & DESIGN <span className="mx-1">·</span>
            <a 
              href={siteConfig.credit_url || "https://studioscale.be"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline decoration-white/40 hover:text-white transition-colors"
            >
              STUDIO SCALE
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
