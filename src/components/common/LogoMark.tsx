import Image from "next/image";
import Link from "next/link";

interface LogoMarkProps {
  variant?: "default" | "dark";
  width?: number;
  height?: number;
  priority?: boolean;
  businessName?: string;
}

export function LogoMark({
  variant = "default",
  width = 48,
  height = 48,
  priority = false,
  businessName = "GROVEside",
}: LogoMarkProps) {
  const src = variant === "dark" ? "/images/brand/logo-dark.svg" : "/images/brand/logo.svg";

  return (
    <Link href="/" aria-label={`${businessName} Home`} className="inline-block">
      <Image
        src={src}
        alt={`${businessName} Logo`}
        width={width}
        height={height}
        priority={priority}
        className="object-contain"
      />
    </Link>
  );
}
