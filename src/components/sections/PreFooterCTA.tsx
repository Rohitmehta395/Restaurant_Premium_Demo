import Link from "next/link";
import { getCTABySlug } from "@/lib/data/loaders";
import { SectionReveal } from "@/components/animation/SectionReveal";
import type { Route } from "next";

export async function PreFooterCTA() {
  const data = await getCTABySlug("primary-contact");

  if (!data) return null;

  return (
    <section className="bg-surface-alternate">
      <div className="container-content py-section">
        {data.show_divider_above && (
          <hr className="border-border-subtle mb-16" />
        )}
        
        <SectionReveal className="reading-column mx-auto flex flex-col items-center">
          <h2 className="text-section-h2 text-text-primary text-center font-display font-semibold">
            {data.heading}
          </h2>
          {data.body && (
            <p className="text-body-large text-text-secondary text-center mt-4 mb-8">
              {data.body}
            </p>
          )}
          
          <Link
            href={(data.button_url || "/") as Route}
            className="bg-brand-primary text-text-on-dark px-8 py-3 rounded-btn text-sm font-medium tracking-wide uppercase hover:bg-opacity-80 transition-colors duration-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            target={data.open_in_new_tab ? "_blank" : undefined}
          >
            {data.button_text}
          </Link>
        </SectionReveal>
      </div>
    </section>
  );
}
