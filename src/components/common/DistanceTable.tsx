import { cn } from "@/lib/utils";
import { ProximityPoint } from "@/types/business";

interface DistanceTableProps {
  points: ProximityPoint[];
  className?: string;
}

export function DistanceTable({ points, className }: DistanceTableProps) {
  if (!points?.length) return null;

  return (
    <dl className={cn("w-full", className)}>
      {points.map((point) => (
        <div
          key={point.label}
          className="flex justify-between items-center py-2 border-b border-border-subtle last:border-0"
        >
          <dt className="text-sm text-text-primary">{point.label}</dt>
          <dd className="text-sm text-text-secondary">
            {point.distance_text ?? `${point.distance_km} km`}
          </dd>
        </div>
      ))}
    </dl>
  );
}
