import { NewsletterForm } from "@/components/interactive/NewsletterForm";
import { getNewsletterData, getFeaturesConfig } from "@/lib/data/loaders";

export async function NewsletterSection() {
  const [data, features] = await Promise.all([
    getNewsletterData(),
    getFeaturesConfig(),
  ]);

  if (!features?.newsletter_signup || !data || !data.show_on_all_pages) {
    return null;
  }

  return (
    <section className="py-section bg-surface-dark text-text-on-dark">
      <div className="container-content">
        <div className="reading-column mx-auto">
          <h2 className="text-section-h2 text-center font-display font-semibold">
            {data.heading}
          </h2>
          {data.subheading && (
            <p className="text-body-large text-text-on-dark/70 text-center mt-4">
              {data.subheading}
            </p>
          )}
          <NewsletterForm data={data} />
        </div>
      </div>
    </section>
  );
}
