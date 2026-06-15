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
    <section className="bg-transparent pt-12 md:pt-[80px] pb-0">
      <div className="px-6 md:px-12 lg:px-16 flex flex-col items-center">
        {data.section_label && (
          <p className="text-[11px] tracking-[0.18em] uppercase text-white/60 mb-6 text-center">
            {data.section_label}
          </p>
        )}
        <h2 className="font-display text-[36px] md:text-[42px] text-white font-normal text-center leading-[1.3] max-w-[700px] mx-auto mb-10">
          {data.heading}
        </h2>

        <NewsletterForm data={data} />
      </div>
    </section>
  );
}
