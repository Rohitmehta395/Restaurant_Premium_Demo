import { Metadata } from "next";
import { notFound } from "next/navigation";
import path from "path";
import fs from "fs";
import { marked } from "marked";
import { 
  getStoryPageData, 
  getTeamMemberBySlug
} from "@/lib/data/loaders";
import { PageHeader } from "@/components/sections/PageHeader";
import { TimelineChapter } from "@/components/common/TimelineChapter";
import { FounderSignature } from "@/components/common/FounderSignature";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getStoryPageData();
  if (!data) return {};

  return buildMetadata({
    title: data.meta_title || data.page_title,
    description: data.meta_description || "",
    path: "/our-story",
    ogImage: data.hero_image_ref,
  });
}

export default async function OurStoryPage() {
  const story = await getStoryPageData();
  
  if (!story) notFound();

  // Read and parse markdown content
  const mdPath = path.join(process.cwd(), "content", "pages", "story.md");
  let chapterContents: { heading: string, html: string }[] = [];
  try {
    const mdContent = fs.readFileSync(mdPath, "utf-8");
    const rawChapters = mdContent.split(/(?=^## )/m).filter(Boolean);
    chapterContents = rawChapters.map(raw => {
      const lines = raw.split('\n');
      const headingLine = (lines[0] || '').replace('## ', '').trim();
      const body = lines.slice(1).join('\n').trim();
      const html = marked.parse(body, { async: false }) as string;
      return { heading: headingLine, html };
    });
  } catch (error) {
    console.error("Failed to read or parse story.md", error);
  }

  // Founder details
  const founder = story.founder_note?.show && story.founder_note.member_ref 
    ? await getTeamMemberBySlug(story.founder_note.member_ref)
    : null;

  const heroImage = story.hero_image_ref ? {
    src: story.hero_image_ref,
    alt: story.page_title,
  } : undefined;

  return (
    <>
      <PageHeader
        title={story.page_title}
        subtitle={story.page_subtitle}
        heroImage={heroImage}
        variant="standard"
      />

      <div className="py-8 md:py-16">
        {story.chapters.map((chapter: any, index: number) => {
          // Attempt to match markdown chapter by order
          const mdChapter = chapterContents[index];
          const bodyHtml = mdChapter ? mdChapter.html : "<p>Content not found</p>";
          
          return (
            <SectionReveal key={chapter.slug} delay={0.2}>
              <TimelineChapter
                slug={chapter.slug}
                heading={chapter.heading}
                dateLabel={chapter.date_label}
                bodyHtml={bodyHtml}
                imageRef={chapter.image_ref}
                imageAlt={chapter.image_alt}
                imagePosition={chapter.image_position}
              />
            </SectionReveal>
          );
        })}
      </div>

      {founder && story.founder_note?.show && (
        <SectionReveal>
          <FounderSignature
            heading={story.founder_note.heading}
            body={founder.bio_long}
            closingSalutation={story.founder_note.closing_salutation || "Warm regards,"}
            signatureName={founder.signature_name}
            signatureTitle={founder.signature_title}
          />
        </SectionReveal>
      )}
    </>
  );
}