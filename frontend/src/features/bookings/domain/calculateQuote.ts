import { rentalDaysBetween, type BookingDraft } from "./bookingDraft";

/** All monetary values are non-negative, whole Nigerian naira integers (no fractional units). */
export type VehiclePricingPolicy = { dailyRateNgn: number; currency: "NGN" };

export type BookingQuote = {
  rentalDays: number;
  dailyRate: number;
  rentalSubtotal: number;
  serviceFee: number;
  deliveryOrLocationFee: number;
  discounts: number;
  total: number;
  currency: "NGN";
};

export function calculateQuote(draft: BookingDraft, pricing: VehiclePricingPolicy): BookingQuote {
  const rentalDays = rentalDaysBetween(draft.startDate, draft.endDate);
  if (!rentalDays || !Number.isSafeInteger(pricing.dailyRateNgn) || pricing.dailyRateNgn <= 0) {
    throw new Error("A valid draft and a positive daily rate are required to calculate a quote.");
  }
  const rentalSubtotal = rentalDays * pricing.dailyRateNgn;
  const serviceFee = Math.round(rentalSubtotal * 0.1);
  const deliveryOrLocationFee =
    draft.pickupLocation.trim().toLocaleLowerCase() ===
    draft.dropOffLocation.trim().toLocaleLowerCase()
      ? 0
      : 5_000;
  const total = rentalSubtotal + serviceFee + deliveryOrLocationFee;
  if (
    !Number.isSafeInteger(rentalSubtotal) ||
    !Number.isSafeInteger(serviceFee) ||
    !Number.isSafeInteger(total)
  ) {
    throw new Error("The mock quote exceeds the supported whole-naira range.");
  }
  return {
    rentalDays,
    dailyRate: pricing.dailyRateNgn,
    rentalSubtotal,
    serviceFee,
    deliveryOrLocationFee,
    discounts: 0,
    total,
    currency: pricing.currency,
  };
}

export function formatNaira(valueMinor: number) {
  return `₦${valueMinor.toLocaleString("en-NG")}`;
}
