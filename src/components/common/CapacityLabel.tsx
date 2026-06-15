import { cn } from "@/lib/utils";

interface CapacityLabelProps {
  text: string;
  className?: string;
}

export function CapacityLabel({ text, className }: CapacityLabelProps) {
  return (
    <p
      className={cn(
        // label_caps treatment: uppercase, wide tracking, small, muted
        "text-xs tracking-widest uppercase font-semibold text-text-secondary",
        className
      )}
    >
      {text}
    </p>
  );
}
