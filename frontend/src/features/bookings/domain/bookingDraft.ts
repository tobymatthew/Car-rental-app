export type BookingDraft = {
  vehicleId: string;
  startDate: string;
  endDate: string;
  pickupTime: string;
  dropOffTime: string;
  pickupLocation: string;
  dropOffLocation: string;
  eligibilityAcknowledged: boolean;
};

export type ConfirmedBookingDraft = BookingDraft & { confirmationKey: string };

export type BookingDraftErrors = Partial<Record<keyof BookingDraft, string>>;

export const emptyBookingDraft: BookingDraft = {
  vehicleId: "",
  startDate: "",
  endDate: "",
  pickupTime: "",
  dropOffTime: "",
  pickupLocation: "",
  dropOffLocation: "",
  eligibilityAcknowledged: false,
};

function dateAtMidnight(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
    ? date
    : null;
}

export function rentalDaysBetween(startDate: string, endDate: string) {
  const start = dateAtMidnight(startDate);
  const end = dateAtMidnight(endDate);
  if (!start || !end || end <= start) return null;
  return Math.round((end.getTime() - start.getTime()) / 86_400_000);
}

export function validateBookingDraft(draft: BookingDraft): BookingDraftErrors {
  const errors: BookingDraftErrors = {};
  if (!draft.vehicleId) errors.vehicleId = "Choose a vehicle before continuing.";
  if (!dateAtMidnight(draft.startDate)) errors.startDate = "Enter pickup as YYYY-MM-DD.";
  if (!dateAtMidnight(draft.endDate)) errors.endDate = "Enter drop-off as YYYY-MM-DD.";
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(draft.pickupTime)) {
    errors.pickupTime = "Choose a pickup time.";
  }
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(draft.dropOffTime)) {
    errors.dropOffTime = "Choose a drop-off time.";
  }
  if (
    !errors.startDate &&
    !errors.endDate &&
    rentalDaysBetween(draft.startDate, draft.endDate) === null
  ) {
    errors.endDate = "Drop-off must be after pickup.";
  }
  if (!draft.pickupLocation.trim()) errors.pickupLocation = "Enter a pickup location.";
  if (!draft.dropOffLocation.trim()) errors.dropOffLocation = "Enter a drop-off location.";
  if (!draft.eligibilityAcknowledged) {
    errors.eligibilityAcknowledged = "Confirm that this is a mock eligibility acknowledgement.";
  }
  return errors;
}
