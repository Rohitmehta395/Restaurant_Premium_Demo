import { cn } from "@/lib/utils";
import {
  Maximize2,
  Users,
  BedDouble,
  Bath,
  Trees,
  Flame,
  Star,
  LucideProps,
} from "lucide-react";

// All icon names used across space cards, room cards, etc.
const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  Maximize2,
  Users,
  BedDouble,
  Bath,
  Trees,
  Flame,
  Star,
};

interface SpecItem {
  iconName: string;
  text: string;
}

interface SpecListProps {
  items: SpecItem[];
  className?: string;
}

export function SpecList({ items, className }: SpecListProps) {
  if (!items?.length) return null;

  return (
    <ul role="list" className={cn("space-y-2", className)}>
      {items.map((item, index) => {
        const Icon = ICON_MAP[item.iconName];
        return (
          <li
            key={`${item.iconName}-${index}`}
            className="flex items-center gap-2 text-sm text-text-secondary"
          >
            {Icon ? (
              <Icon
                className="size-4 shrink-0 text-text-secondary/60"
                aria-hidden="true"
              />
            ) : (
              // Fallback spacer when icon not found — keeps alignment intact
              <span className="size-4 shrink-0" aria-hidden="true" />
            )}
            <span>{item.text}</span>
          </li>
        );
      })}
    </ul>
  );
}
