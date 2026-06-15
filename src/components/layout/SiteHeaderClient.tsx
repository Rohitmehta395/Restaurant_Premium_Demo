"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import { NavItem, BusinessContact, SocialPlatform } from "@/types";
import { cn } from "@/lib/utils";
import { MobileNavOverlay } from "./MobileNavOverlay";

interface SiteHeaderClientProps {
  navItems: NavItem[];
  contact: BusinessContact;
  socials: SocialPlatform[];
  businessName: string;
  brandTagline: string;
  vatNumber?: string;
  menuTriggerLabel: string;
  showContactInMenu: boolean;
  showSocialInMenu: boolean;
}

function DecorativeStar() {
  return (
    <svg
      aria-hidden="true"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="size-[14px] shrink-0 text-white"
    >
      <path
        d="M7 1.25L8.32 5.68L12.75 7L8.32 8.32L7 12.75L5.68 8.32L1.25 7L5.68 5.68L7 1.25Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <span aria-hidden="true" className="flex flex-col gap-[4px]">
      <span className="block h-[1.5px] w-5 bg-white" />
      <span className="block h-[1.5px] w-5 bg-white" />
      <span className="block h-[1.5px] w-5 bg-white" />
    </span>
  );
}

export function SiteHeaderClient({
  navItems,
  contact,
  socials,
  businessName,
  brandTagline,
  vatNumber,
  menuTriggerLabel,
  showContactInMenu,
  showSocialInMenu,
}: SiteHeaderClientProps) {
  const pathname = usePathname();
  const hasFullBleedHero = pathname === "/";
  const [isPastHero, setIsPastHero] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isScrolled = !hasFullBleedHero || isPastHero;

  useEffect(() => {
    if (!hasFullBleedHero) {
      return;
    }

    const handleScroll = () => {
      const shouldCollapse = window.scrollY > 150;
      setIsPastHero((current) =>
        current === shouldCollapse ? current : shouldCollapse,
      );
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasFullBleedHero]);

  const normalizedMenuLabel = menuTriggerLabel || "MENU";
  const menuButtonLabel = isMenuOpen
    ? "Close navigation menu"
    : "Open navigation menu";

  return (
    <>
      <header role="banner" className="farmform-site-header">
        <div className="farmform-site-header__inner">
          {/* Left Element */}
          <div className="relative flex items-center h-12 w-full">
            <Link
              href={"/" as Route}
              aria-label={`${businessName} home`}
              className={cn(
                "absolute left-0 flex size-12 flex-none items-center justify-center rounded-full bg-black text-white transition-all duration-700 ease-out",
                isScrolled ? "opacity-100" : "opacity-0 pointer-events-none"
              )}
            >
              <Image
                src="/images/brand/logo-icon.svg"
                alt=""
                width={24}
                height={24}
                className="size-10 object-contain brightness-0 invert"
                unoptimized
              />
            </Link>
            <Link
              href={"/" as Route}
              className={cn(
                "absolute left-0 flex items-center gap-2 text-white transition-all duration-700 ease-out",
                !isScrolled ? "opacity-100" : "opacity-0 pointer-events-none"
              )}
              aria-label={`${brandTagline} - ${businessName} home`}
            >
              <DecorativeStar />
              <span className="text-[11px] font-light uppercase tracking-[0.15em] text-white">
                {brandTagline}
              </span>
            </Link>
          </div>

          {/* Center Element */}
          <div className="relative flex items-center justify-center h-12 w-full">
            <Link
              href={"/" as Route}
              aria-label={`${businessName} home`}
              className={cn(
                "absolute flex items-center gap-2 transition-all duration-700 ease-out",
                !isScrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
              )}
            >
              <Image
                src="/images/brand/logo.svg"
                alt=""
                width={36}
                height={36}
                className="size-8 md:size-[36px] object-contain brightness-0 invert"
                unoptimized
              />
              <span className="text-white font-display text-[26px] md:text-[34px] tracking-wide">
                FARM<span className="italic font-light">form</span>
              </span>
            </Link>
          </div>

          {/* Right Element */}
          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="nav-menu"
            aria-label={menuButtonLabel}
            onClick={() => setIsMenuOpen((current) => !current)}
            className={cn(
              "z-[60] flex cursor-pointer items-center gap-[10px] text-white justify-self-end",
              "transition-all duration-700 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
              isMenuOpen ? "opacity-0 pointer-events-none" : "hover:opacity-70",
              isScrolled ? "bg-black rounded-xl px-[18px] h-10" : "h-10 px-0 rounded-none bg-transparent"
            )}
          >
            <span className="text-[13px] font-medium uppercase tracking-[0.1em] text-white mt-[1px]">
              {normalizedMenuLabel}
            </span>
            <HamburgerIcon />
          </button>
        </div>
      </header>

      <MobileNavOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navItems={navItems}
        contact={contact}
        socials={socials}
        businessName={businessName}
        vatNumber={vatNumber}
        showContact={showContactInMenu}
        showSocials={showSocialInMenu}
      />
    </>
  );
}
