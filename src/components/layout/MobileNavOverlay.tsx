"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { Route } from "next";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { BusinessContact, NavItem, SocialPlatform } from "@/types";
import { SocialIconLink } from "@/components/common/SocialIconLink";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn, isExternalUrl } from "@/lib/utils";

interface MobileNavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  contact: BusinessContact;
  socials: SocialPlatform[];
  businessName: string;
  vatNumber?: string;
  showContact: boolean;
  showSocials: boolean;
}

function getNavHref(item: NavItem) {
  return item.path || item.url || "/";
}

function OverlayNavLink({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const href = getNavHref(item);
  const isExternal = isExternalUrl(href);
  const className = cn(
    "block py-2 font-display text-[34px] leading-none text-text-primary transition-colors duration-150 ease-out hover:text-text-secondary",
    "md:text-[54px]"
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target={item.open_in_new_tab ? "_blank" : undefined}
        rel={item.open_in_new_tab ? "noopener noreferrer" : undefined}
        onClick={onClose}
        className={className}
      >
        {item.label}
      </a>
    );
  }

  return (
    <Link href={href as Route} onClick={onClose} className={className}>
      {item.label}
    </Link>
  );
}

export function MobileNavOverlay({
  isOpen,
  onClose,
  navItems,
  contact,
  socials,
  businessName,
  vatNumber,
  showContact,
  showSocials,
}: MobileNavOverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      panelRef.current?.focus();
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const panelVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.24, ease: [0.4, 0, 0.2, 1] },
    },
    exit: {
      opacity: 0,
      transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.18, ease: [0.4, 0, 1, 1] },
    },
  };

  const contentVariants: Variants = {
    hidden: { y: prefersReducedMotion ? 0 : 18, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.28, ease: [0, 0, 0.2, 1], delay: 0.08 },
    },
    exit: {
      y: prefersReducedMotion ? 0 : 10,
      opacity: 0,
      transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.16, ease: [0.4, 0, 1, 1] },
    },
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          id="nav-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          tabIndex={-1}
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-40 overflow-y-auto bg-surface-default text-text-primary focus:outline-none"
        >
          <motion.div
            variants={contentVariants}
            className="min-h-svh px-8 pb-12 pt-28 md:px-12 md:pb-16 md:pt-36"
          >
            <div className="grid min-h-[calc(100svh-10rem)] grid-cols-1 gap-12 md:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] md:items-end">
              <nav aria-label="Main navigation" className="flex flex-col">
                {navItems.map((item) => (
                  <OverlayNavLink key={`${item.label}-${getNavHref(item)}`} item={item} onClose={onClose} />
                ))}
              </nav>

              <aside className="flex flex-col gap-8 text-sm leading-6 text-text-secondary">
                {showContact ? (
                  <div className="flex flex-col gap-3">
                    <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-text-primary">
                      {businessName}
                    </p>
                    <address className="not-italic">
                      {contact.address_line_1}
                      <br />
                      {contact.postcode} {contact.city}
                      <br />
                      {contact.country}
                    </address>
                    {vatNumber ? <p>VAT: {vatNumber}</p> : null}
                    <div className="flex flex-col gap-1 pt-2">
                      {contact.email ? (
                        <a className="hover:text-text-primary" href={`mailto:${contact.email}`}>
                          {contact.email}
                        </a>
                      ) : null}
                      {contact.phone && contact.phone_uri ? (
                        <a className="hover:text-text-primary" href={contact.phone_uri}>
                          {contact.phone}
                        </a>
                      ) : null}
                    </div>
                  </div>
                ) : null}

                {showSocials && socials.length > 0 ? (
                  <div className="flex items-center gap-4 text-text-primary">
                    {socials.map((social) => (
                      <SocialIconLink
                        key={social.platform}
                        platform={social.platform}
                        display_name={social.display_name}
                        url={social.url}
                        variant="color"
                      />
                    ))}
                  </div>
                ) : null}
              </aside>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
