"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { NavItem } from "@/types";

import { cn } from "@/lib/utils";

interface NavLinkProps {
  item: NavItem;
  onClick?: () => void;
  className?: string;
  activeClassName?: string;
}

export function NavLink({
  item,
  onClick,
  className,
  activeClassName = "text-brand-secondary font-medium",
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === item.path;

  return (
    <Link
      href={(item.path || "/") as Route}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      target={item.open_in_new_tab ? "_blank" : undefined}
      rel={item.open_in_new_tab ? "noopener noreferrer" : undefined}
      className={cn(
        "text-body-base transition-colors duration-150 ease-out hover:text-text-secondary cursor-pointer",
        className,
        isActive && activeClassName
      )}
    >
      {item.label}
    </Link>
  );
}
