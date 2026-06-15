import { HeroSlideshow } from "@/components/sections/HeroSlideshow";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { ValuesGrid } from "@/components/sections/ValuesGrid";
import { PreFooterCTA } from "@/components/sections/PreFooterCTA";
import { getHeroBySlug, getHomePageData, getFeatureGroup, getValuesData } from "@/lib/data/loaders";
import { buildMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomePageData();
  if (!data) return {};

  return buildMetadata({
    title: data.meta_title,
    description: data.meta_description,
    path: "/",
  });
}

export default async function Page() {
  const heroData = await getHeroBySlug("home-hero");
  const homeData = await getHomePageData();
  const featuresData = await getFeatureGroup("why-choose");
  const valuesData = await getValuesData();
  
  if (!heroData || !homeData) return null;

  return (
    <main>
      <HeroSlideshow hero={heroData} />
      <AboutSection data={homeData.about_section} />
      <ServicesGrid data={homeData.services_section} />
      
      {featuresData && (
        <FeaturesGrid featureGroup={featuresData} />
      )}

      {valuesData && valuesData.values?.length > 0 ? (
        <ValuesGrid data={valuesData} />
      ) : null}

      <PreFooterCTA />
    </main>
  );
}
