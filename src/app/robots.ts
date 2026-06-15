import { MetadataRoute } from 'next'
import { getSiteConfig } from "@/lib/data/loaders"

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteConfig = await getSiteConfig();
  const siteUrl = siteConfig?.url || "https://farmform.be";

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
