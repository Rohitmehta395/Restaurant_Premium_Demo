import { cache } from "react";
import { promises as fs } from "fs";
import path from "path";
import {
  BusinessIdentity,
  BusinessContact,
  BusinessHours,
  SocialPlatform,
  TeamMember,
  HomePageData,
  ServiceData,
  SpaceData,
  RoomData,
  OnePriceConcept,
  StoryPageData,
  PracticalInfoBlock,
  ContactPageData,
  EventsPageData,
  CTABlock,
  HeroContent,
  FeatureGroup,
  ValuesData,
  Testimonial,
  TestimonialsData,
  FAQData,
  NewsletterData,
  Banner,
  CookiesData,
  PrivacyData,
  SiteConfig,
  FeaturesConfig,
  NavigationConfig
} from "@/types";

const DATA_DIR = path.join(process.cwd(), "data");
const CONFIG_DIR = path.join(process.cwd(), "config");

async function readJson<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data) as T;
  } catch (error) {
    console.error(`Error reading data from ${filePath}:`, error);
    return fallback;
  }
}

// -- Business Loaders --

export const getBusinessIdentity = cache(async (): Promise<BusinessIdentity> => {
  return readJson<BusinessIdentity>(path.join(DATA_DIR, "business", "identity.json"), {} as BusinessIdentity);
});

export const getBusinessContact = cache(async (): Promise<BusinessContact> => {
  return readJson<BusinessContact>(path.join(DATA_DIR, "business", "contact.json"), {} as BusinessContact);
});

export const getBusinessHours = cache(async (): Promise<BusinessHours> => {
  return readJson<BusinessHours>(path.join(DATA_DIR, "business", "hours.json"), {} as BusinessHours);
});

export const getSocialPlatforms = cache(async (): Promise<{ platforms: SocialPlatform[] }> => {
  return readJson<{ platforms: SocialPlatform[] }>(path.join(DATA_DIR, "business", "social.json"), { platforms: [] });
});

export const getTeam = cache(async (): Promise<{ members: TeamMember[] }> => {
  return readJson<{ members: TeamMember[] }>(path.join(DATA_DIR, "business", "team.json"), { members: [] });
});

// -- Pages Loaders --

export const getHomePageData = cache(async (): Promise<HomePageData> => {
  return readJson<HomePageData>(path.join(DATA_DIR, "pages", "home.json"), {} as HomePageData);
});

export const getAllServices = cache(async (): Promise<{ services: ServiceData[] }> => {
  return readJson<{ services: ServiceData[] }>(path.join(DATA_DIR, "pages", "services.json"), { services: [] });
});

export const getServiceBySlug = cache(async (slug: string): Promise<ServiceData | null> => {
  const data = await getAllServices();
  if (!data || !data.services) return null;
  return data.services.find(s => s.slug === slug) || null;
});

export const getOnePriceConcept = cache(async (slug: string): Promise<OnePriceConcept | null> => {
  const data = await readJson<{ one_price_concepts?: OnePriceConcept[] }>(path.join(DATA_DIR, "pages", "services.json"), { one_price_concepts: [] });
  if (!data || !data.one_price_concepts) return null;
  return data.one_price_concepts.find(c => c.service_slug === slug) || null;
});

export const getAllSpaces = cache(async (): Promise<{ spaces: SpaceData[] }> => {
  return readJson<{ spaces: SpaceData[] }>(path.join(DATA_DIR, "pages", "spaces.json"), { spaces: [] });
});

export const getSpacesByServiceSlug = cache(async (slug: string): Promise<SpaceData[]> => {
  const data = await getAllSpaces();
  if (!data || !data.spaces) return [];
  return data.spaces.filter(s => s.parent_service_slug === slug);
});

export const getAllRooms = cache(async (): Promise<{ rooms: RoomData[] }> => {
  return readJson<{ rooms: RoomData[] }>(path.join(DATA_DIR, "pages", "rooms.json"), { rooms: [] });
});

export const getRoomsByServiceSlug = cache(async (slug: string): Promise<RoomData[]> => {
  const data = await getAllRooms();
  if (!data || !data.rooms) return [];
  return data.rooms.filter(r => r.parent_service_slug === slug);
});

export const getStoryPageData = cache(async (): Promise<StoryPageData> => {
  return readJson<StoryPageData>(path.join(DATA_DIR, "pages", "story.json"), {} as StoryPageData);
});

export const getPracticalPageData = cache(async (): Promise<{ page_title: string; page_subtitle?: string; meta_title: string; meta_description: string; hero_cta_ref?: string; info_blocks: PracticalInfoBlock[]; services_quicklinks?: { heading: string, intro?: string } }> => {
  return readJson<any>(path.join(DATA_DIR, "pages", "practical.json"), { info_blocks: [] });
});

export const getContactPageData = cache(async (): Promise<ContactPageData> => {
  return readJson<ContactPageData>(path.join(DATA_DIR, "pages", "contact.json"), {} as ContactPageData);
});

export const getEventsPageData = cache(async (): Promise<EventsPageData> => {
  return readJson<EventsPageData>(path.join(DATA_DIR, "pages", "events.json"), {} as EventsPageData);
});

// -- Components Loaders --

export const getHeroBySlug = cache(async (slug: string): Promise<HeroContent | null> => {
  const data = await readJson<{ heroes: HeroContent[] }>(path.join(DATA_DIR, "components", "hero.json"), { heroes: [] });
  if (!data || !data.heroes) return null;
  return data.heroes.find(h => h.slug === slug) || null;
});

export const getCTABySlug = cache(async (slug: string): Promise<CTABlock | null> => {
  const data = await readJson<{ ctas: CTABlock[] }>(path.join(DATA_DIR, "components", "cta.json"), { ctas: [] });
  if (!data || !data.ctas) return null;
  return data.ctas.find(c => c.slug === slug) || null;
});

export const getFeatureGroup = cache(async (slug: string): Promise<FeatureGroup | null> => {
  const data = await readJson<{ feature_groups: FeatureGroup[] }>(path.join(DATA_DIR, "components", "features.json"), { feature_groups: [] });
  if (!data || !data.feature_groups) return null;
  return data.feature_groups.find(f => f.slug === slug) || null;
});

export const getValuesData = cache(async (): Promise<ValuesData> => {
  return readJson<ValuesData>(path.join(DATA_DIR, "components", "values.json"), {} as ValuesData);
});

export const getAllTestimonials = cache(async (): Promise<{ testimonials: Testimonial[] }> => {
  return readJson<{ testimonials: Testimonial[] }>(path.join(DATA_DIR, "components", "testimonials.json"), { testimonials: [] });
});

export const getTestimonialsData = cache(async (): Promise<TestimonialsData | null> => {
  const data = await readJson<TestimonialsData & { testimonials: Testimonial[] }>(
    path.join(DATA_DIR, "components", "testimonials.json"),
    { section_heading: "What our guests say", testimonials: [] } as unknown as TestimonialsData & { testimonials: Testimonial[] }
  );
  return data || null;
});

export const getFeaturedTestimonials = cache(async (): Promise<Testimonial[]> => {
  const data = await getAllTestimonials();
  if (!data || !data.testimonials) return [];
  return data.testimonials.filter(t => t.featured && t.show);
});

export const getFAQData = cache(async (): Promise<FAQData> => {
  return readJson<FAQData>(path.join(DATA_DIR, "components", "faq.json"), {} as FAQData);
});

export const getNewsletterData = cache(async (): Promise<NewsletterData> => {
  return readJson<NewsletterData>(path.join(DATA_DIR, "components", "newsletter.json"), {} as NewsletterData);
});

export const getActiveBanners = cache(async (): Promise<Banner[]> => {
  const data = await readJson<{ banners: Banner[] }>(path.join(DATA_DIR, "components", "banners.json"), { banners: [] });
  if (!data || !data.banners) return [];
  
  const now = new Date();
  
  return data.banners.filter(b => {
    if (!b.show) return false;
    
    if (b.start_date) {
      const start = new Date(b.start_date);
      if (start > now) return false;
    }
    
    if (b.end_date) {
      const end = new Date(b.end_date);
      if (end < now) return false;
    }
    
    return true;
  });
});

export const getCookiesData = cache(async (): Promise<CookiesData> => {
  return readJson<CookiesData>(path.join(DATA_DIR, "legal", "cookies.json"), {} as CookiesData);
});

export const getPrivacyData = cache(async (): Promise<PrivacyData> => {
  return readJson<PrivacyData>(path.join(DATA_DIR, "legal", "privacy.json"), {} as PrivacyData);
});

// -- Config Loaders --

export const getSiteConfig = cache(async (): Promise<SiteConfig> => {
  return readJson<SiteConfig>(path.join(CONFIG_DIR, "site.config.json"), {} as SiteConfig);
});

export const getFeaturesConfig = cache(async (): Promise<FeaturesConfig> => {
  return readJson<FeaturesConfig>(path.join(CONFIG_DIR, "features.config.json"), {} as FeaturesConfig);
});

export const getNavigationConfig = cache(async (): Promise<NavigationConfig> => {
  return readJson<NavigationConfig>(path.join(CONFIG_DIR, "navigation.config.json"), {} as NavigationConfig);
});
export const getTeamMemberBySlug = cache(async (slug: string): Promise<any | null> => {
  const data = await readJson<{ members: any[] }>(path.join(DATA_DIR, "business", "team.json"), { members: [] });
  if (!data || !data.members) return null;
  return data.members.find((m) => m.slug === slug) || null;
});
