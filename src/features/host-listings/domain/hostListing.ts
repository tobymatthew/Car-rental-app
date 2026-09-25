export type ListingStatus = "draft" | "mock-published";
export type ListingCategory = "car" | "suv" | "minivan" | "van" | "truck";
export type ListingAvailability = "daily" | "weekdays" | "weekends";
export type ListingFeatureId =
  | "bluetooth"
  | "usb-input"
  | "child-seat"
  | "keyless-entry"
  | "backup-camera"
  | "wheelchair-accessible";

export type ListingImage = { id: string; label: string; source?: string | number };
export type HostProfile = { id: string; displayName: string; mock: true };

export type HostListing = {
  id: string;
  make: string;
  model: string;
  year: number;
  category: ListingCategory;
  features: ListingFeatureId[];
  pickupLocation: string;
  availability: ListingAvailability;
  dailyRateNgn: number;
  image: ListingImage;
  status: ListingStatus;
  updatedAt: string;
};

export const listingCategoryLabels: Record<ListingCategory, string> = {
  car: "Car",
  suv: "SUV",
  minivan: "Minivan",
  van: "Van",
  truck: "Truck",
};

export const listingAvailabilityLabels: Record<ListingAvailability, string> = {
  daily: "Every day (mock)",
  weekdays: "Weekdays (mock)",
  weekends: "Weekends (mock)",
};

export const listingFeatureLabels: Record<ListingFeatureId, string> = {
  bluetooth: "Bluetooth",
  "usb-input": "USB input",
  "child-seat": "Child seat",
  "keyless-entry": "Keyless entry",
  "backup-camera": "Backup camera",
  "wheelchair-accessible": "Wheelchair accessible",
};
