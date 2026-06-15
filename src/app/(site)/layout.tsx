import { PreHeaderBar } from "@/components/layout/PreHeaderBar";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { PreFooterCTA } from "@/components/sections/PreFooterCTA";
import { getFeaturesConfig } from "@/lib/data/loaders";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const features = await getFeaturesConfig();

  return (
    <div className="flex min-h-screen flex-col">
      <PreHeaderBar />
      <SiteHeader />
      <main id="content" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      <PreFooterCTA />
      {features?.newsletter_signup && <NewsletterSection />}
      <SiteFooter />
    </div>
  );
}