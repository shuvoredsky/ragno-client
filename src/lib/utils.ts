import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";

/**
 * Combines conditional class names with Tailwind CSS conflict resolution
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats numeric price into Bangladeshi Taka (BDT ৳) representation
 */
export function formatPrice(
  amount: number | string | undefined | null,
  options?: { showCurrency?: boolean }
): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount || 0;
  const showCurrency = options?.showCurrency ?? true;

  const formatted = new Intl.NumberFormat("en-BD", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(num);

  return showCurrency ? `৳ ${formatted}` : formatted;
}

/**
 * Calculates discount percentage
 */
export function calculateDiscount(mrpPrice: number, currentPrice: number): number {
  if (!mrpPrice || mrpPrice <= currentPrice) return 0;
  return Math.round(((mrpPrice - currentPrice) / mrpPrice) * 100);
}

/**
 * Generates unique event ID for Meta Conversion API deduplication
 */
export function generateEventId(): string {
  return `fb_evt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Retrieves or creates persistent Guest Session ID (UUID v4)
 */
export function getGuestCorrelationId(): string {
  if (typeof window === "undefined") return "";

  let guestId = Cookies.get("guest_correlation_id");
  if (!guestId) {
    guestId = "gst_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 10);
    Cookies.set("guest_correlation_id", guestId, { expires: 365, sameSite: "lax" });
  }
  return guestId;
}

/**
 * Client cookie helpers
 */
export function getAccessToken(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return Cookies.get("accessToken");
}

export function setAccessToken(token: string): void {
  Cookies.set("accessToken", token, { expires: 30, sameSite: "lax" });
}

export function removeAccessToken(): void {
  Cookies.remove("accessToken");
  Cookies.remove("user_session");
}

/**
 * Validates Bangladeshi mobile phone number format (013-019, 11 digits)
 */
export function isValidBDPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, "");
  const bdPhoneRegex = /^(?:88)?(01[3-9]\d{8})$/;
  return bdPhoneRegex.test(cleaned);
}
