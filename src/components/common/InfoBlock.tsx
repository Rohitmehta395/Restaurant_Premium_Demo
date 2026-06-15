import React from "react";
import { Languages, MapPin, Car, Cpu, Coffee, Clock } from "lucide-react";
import { ProximityPoint } from "@/types/business";
import Link from "next/link";

export interface InfoBlockProps {
  iconRef: string;
  heading: string;
  contentType: "paragraph" | "list" | "distance-table" | "hours";
  content: string | string[] | ProximityPoint[] | any;
  note?: string;
  href?: string;
}

const IconMap: Record<string, React.ElementType> = {
  languages: Languages,
  location: MapPin,
  parking: Car,
  technologies: Cpu,
  amenities: Coffee,
  hours: Clock,
};

export function InfoBlock({
  iconRef,
  heading,
  contentType,
  content,
  note,
  href,
}: InfoBlockProps) {
  const IconComponent = IconMap[iconRef] || MapPin;

  const HeadingEl = href ? (
    <Link
      href={href as any}
      className="hover:underline hover:text-brand-primary transition-colors"
    >
      {heading}
    </Link>
  ) : (
    <>{heading}</>
  );

  return (
    <div className="flex gap-4">
      <div className="shrink-0 mt-1 text-brand-primary">
        <IconComponent className="size-6" strokeWidth={1.5} />
      </div>
      <div className="flex-1">
        <h3 className="text-card-h3 font-display font-medium text-text-primary mb-3">
          {HeadingEl}
        </h3>

        {contentType === "paragraph" && (
          <p className="text-body-base text-text-secondary leading-relaxed">
            {content as string}
          </p>
        )}

        {contentType === "list" && Array.isArray(content) && (
          <ul className="list-disc list-inside space-y-1 text-body-base text-text-secondary">
            {(content as string[]).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )}

        {contentType === "distance-table" && Array.isArray(content) && (
          <dl className="space-y-2 text-body-base text-text-secondary w-full max-w-sm">
            {(content as ProximityPoint[]).map((point, idx) => (
              <div
                key={idx}
                className="flex justify-between border-b border-border-subtle pb-1"
              >
                <dt>{point.label}</dt>
                <dd className="font-medium">{point.distance_text}</dd>
              </div>
            ))}
          </dl>
        )}

        {contentType === "hours" && content && (
          <dl className="space-y-2 text-body-base text-text-secondary w-full max-w-sm">
            {Object.entries(content).map(([days, hours], idx) => (
              <div
                key={idx}
                className="flex justify-between border-b border-border-subtle pb-1"
              >
                <dt className="capitalize">{days}</dt>
                <dd className="font-medium">{hours as string}</dd>
              </div>
            ))}
          </dl>
        )}

        {note && (
          <p className="text-caption italic text-text-secondary mt-3">
            * {note}
          </p>
        )}
      </div>
    </div>
  );
}
