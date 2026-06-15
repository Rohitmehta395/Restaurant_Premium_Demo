import { getFeaturesConfig, getTestimonialsData } from "@/lib/data/loaders";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import type { Testimonial, TestimonialsData } from "@/types";

// Convenience: combined type used throughout this file
type TestimonialsDataWithList = TestimonialsData & { testimonials?: Testimonial[] };

// -----------------------------------------------------------------------
// Quotes variant — full-width narrative layout
// -----------------------------------------------------------------------
function QuotesLayout({
  data,
  items,
}: {
  data: TestimonialsDataWithList;
  items: Testimonial[];
}) {
  const featured = items.find((t) => t.featured);
  const rest = items.filter((t) => !t.featured);

  return (
    <section className="py-20 md:py-32 w-full bg-surface-default">
      <div className="container-content">
        <div
          className="font-display text-[120px] leading-none text-border-subtle select-none"
          aria-hidden="true"
        >
          &ldquo;
        </div>

        <div className="reading-column mx-auto">
          <SectionReveal className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-text-primary">
              {data.section_heading}
            </h2>
            {data.section_subheading && (
              <p className="text-lg text-text-secondary mt-2">
                {data.section_subheading}
              </p>
            )}
          </SectionReveal>

          {featured && (
            <SectionReveal delay={0.1}>
              <blockquote className="mb-12">
                <p className="text-2xl md:text-3xl font-display italic text-text-primary leading-relaxed">
                  &ldquo;{featured.quote}&rdquo;
                </p>
                <footer className="mt-6">
                  <cite className="text-base font-medium text-text-secondary not-italic">
                    — {featured.author_name}
                    {featured.author_title && `, ${featured.author_title}`}
                  </cite>
                </footer>
              </blockquote>
            </SectionReveal>
          )}

          {rest.map((t, i) => (
            <SectionReveal key={t.slug} delay={0.2 + i * 0.1}>
              <TestimonialCard
                quote={t.quote}
                authorName={t.author_name}
                authorTitle={t.author_title}
                authorImageRef={t.author_image_ref}
                authorImageAlt={t.author_image_alt}
                rating={t.rating}
                sourcePlatform={t.source_platform}
              />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------
// Cards variant — responsive 3-col grid
// -----------------------------------------------------------------------
function CardsLayout({
  data,
  items,
}: {
  data: TestimonialsDataWithList;
  items: Testimonial[];
}) {
  return (
    <section className="py-20 md:py-32 w-full bg-surface-alternate border-y border-border-subtle">
      <div className="container-content">
        <SectionReveal className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-text-primary">
            {data.section_heading}
          </h2>
          {data.section_subheading && (
            <p className="text-lg text-text-secondary mt-2">
              {data.section_subheading}
            </p>
          )}
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((t, index) => (
            <SectionReveal key={t.slug} delay={index * 0.1}>
              <TestimonialCard
                quote={t.quote}
                authorName={t.author_name}
                authorTitle={t.author_title}
                authorImageRef={t.author_image_ref}
                authorImageAlt={t.author_image_alt}
                rating={t.rating}
                sourcePlatform={t.source_platform}
                featured={t.featured}
              />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------
// Server Component shell — feature-flagged
// -----------------------------------------------------------------------
export async function TestimonialsSection() {
  const features = await getFeaturesConfig();

  // Feature-flagged off by default for FARMform template
  if (!features?.testimonials_section) return null;

  const data = await getTestimonialsData();
  if (!data) return null;

  const raw = (data as TestimonialsDataWithList).testimonials ?? [];

  // Filter visible only; featured rendered first
  const items: Testimonial[] = [
    ...raw.filter((t) => t.show && t.featured),
    ...raw.filter((t) => t.show && !t.featured),
  ];

  if (!items.length) return null;

  const variant = data.layout_variant ?? "cards";

  if (variant === "quotes") {
    return <QuotesLayout data={data as TestimonialsDataWithList} items={items} />;
  }

  if (variant === "carousel") {
    return (
      <TestimonialsCarousel
        data={data as TestimonialsDataWithList}
        items={items}
      />
    );
  }

  return <CardsLayout data={data as TestimonialsDataWithList} items={items} />;
}
