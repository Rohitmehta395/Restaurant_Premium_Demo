import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string, locale: string = "en-BE"): string {
  if (amount === 0) return "—";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCurrencyRange(min: number, max: number, currency: string): string {
  if (min === max) return formatCurrency(min, currency);
  return `${formatCurrency(min, currency)} – ${formatCurrency(max, currency)}`;
}

export function formatDate(isoString: string, format: string = "DD/MM/YYYY"): string {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return isoString;
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());
  
  return format
    .replace('DD', day)
    .replace('MM', month)
    .replace('YYYY', year);
}

export function slugify(text: string): string {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

export function resolveImagePath(ref: string): string {
  if (!ref) return "";
  if (ref.startsWith('http://') || ref.startsWith('https://')) return ref;
  if (ref.startsWith('/')) return ref;
  return `/${ref}`;
}

export function padSlideCounter(index: number, total: number): string {
  return `${String(index).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
}

export function getPublicYear(): number {
  return new Date().getFullYear();
}

export function truncate(text: string, maxLength: number): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  const subString = text.substring(0, maxLength);
  const lastSpace = subString.lastIndexOf(' ');
  if (lastSpace > 0) {
    return subString.substring(0, lastSpace) + '…';
  }
  return subString + '…';
}

export function joinList(items: string[], separator: string = ", "): string {
  if (!items || !items.length) return "";
  return items.join(separator);
}

export function isExternalUrl(url: string): boolean {
  if (!url) return false;
  return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('tel:');
}

export function getLinkProps(url: string): { target?: string; rel?: string } {
  if (isExternalUrl(url)) {
    return { target: "_blank", rel: "noopener noreferrer" };
  }
  return {};
}
