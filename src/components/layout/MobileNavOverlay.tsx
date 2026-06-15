"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";
import { AnimatePresence, motion } from "framer-motion";
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
    "text-white text-[11px] tracking-[0.2em] uppercase font-medium",
    "hover:text-white/60 transition-colors duration-150"
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

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.2 },
    },
  };

  const panelVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: prefersReducedMotion ? { duration: 0 } : { type: "tween", duration: 0.4, ease: [0.4, 0, 0.2, 1] },
    },
    exit: {
      x: "100%",
      transition: prefersReducedMotion ? { duration: 0 } : { type: "tween", duration: 0.3, ease: [0.4, 0, 1, 1] },
    },
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <div
          id="nav-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-40 focus:outline-none pointer-events-none"
        >
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/30 pointer-events-auto"
            onClick={onClose}
          />

          {/* Sliding Panel */}
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 bottom-0 pointer-events-auto bg-[#1A1A18] z-50 overflow-y-auto"
            style={{ width: "min(480px, 45vw)" }}
          >
            <div 
              className="grid h-full"
              style={{
                gridTemplateColumns: "1fr auto 1fr",
                padding: "48px 40px",
                gap: 0
              }}
            >
              {/* Left Column: Business Info */}
              <div className="flex flex-col">
                <div className="mb-10">
                  <Image
                    src="/images/brand/logo-icon.svg"
                    alt=""
                    width={40}
                    height={40}
                    className="size-10 object-contain brightness-0 invert"
                    unoptimized
                  />
                </div>

                <div className="flex flex-col gap-4 mt-4">
                  {showContact ? (
                    <>
                      <div className="flex flex-col">
                        <p className="text-white/90 text-sm mb-1">{businessName}</p>
                        <address className="not-italic flex flex-col text-white/60 text-xs leading-6">
                          <span>{contact.address_line_1}</span>
                          <span>{contact.postcode} {contact.city}</span>
                          {vatNumber ? <span>VAT: {vatNumber}</span> : null}
                        </address>
                      </div>
                      
                      <div className="flex flex-col text-white/60 text-xs leading-6">
                        {contact.email ? (
                          <a className="hover:text-white transition-colors" href={`mailto:${contact.email}`}>
                            {contact.email}
                          </a>
                        ) : null}
                        {contact.phone && contact.phone_uri ? (
                          <a className="hover:text-white transition-colors" href={contact.phone_uri}>
                            T: {contact.phone}
                          </a>
                        ) : null}
                      </div>
                    </>
                  ) : null}

                  {showSocials && socials.length > 0 ? (
                    <div className="flex items-center gap-3 mt-6">
                      {socials.map((social) => (
                        <div key={social.platform} className="bg-white rounded-full flex items-center justify-center size-8 hover:bg-white/80 transition-colors">
                          <SocialIconLink
                            platform={social.platform}
                            display_name={social.display_name}
                            url={social.url}
                            variant="color"
                            size="sm"
                            className="!text-black !m-0 !min-h-0 !min-w-0"
                          />
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="w-px bg-white/20 mx-8 self-stretch" />

              {/* Right Column: Nav Links */}
              <nav 
                aria-label="Main navigation" 
                className="flex flex-col justify-center"
                style={{ gap: "20px" }}
              >
                {navItems.map((item) => (
                  <OverlayNavLink key={`${item.label}-${getNavHref(item)}`} item={item} onClose={onClose} />
                ))}
              </nav>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
