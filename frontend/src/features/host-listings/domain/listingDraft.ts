import type {
  HostListing,
  ListingAvailability,
  ListingCategory,
  ListingFeatureId,
  ListingImage,
} from "./hostListing";

export type HostListingDraft = {
  make: string;
  model: string;
  year: string;
  category: ListingCategory;
  features: ListingFeatureId[];
  pickupLocation: string;
  availability: ListingAvailability;
  dailyRateNgn: string;
  imageId: string;
};

export type ValidHostListingDraft = Omit<HostListing, "id" | "status" | "updatedAt">;
export type HostListingDraftErrors = Partial<Record<keyof HostListingDraft, string>>;

export const emptyHostListingDraft: HostListingDraft = {
  make: "",
  model: "",
  year: "",
  category: "car",
  features: [],
  pickupLocation: "",
  availability: "daily",
  dailyRateNgn: "",
  imageId: "mock-sedan",
};

export function listingToDraft(listing: HostListing): HostListingDraft {
  return {
    make: listing.make,
    model: listing.model,
    year: String(listing.year),
    category: listing.category,
    features: [...listing.features],
    pickupLocation: listing.pickupLocation,
    availability: listing.availability,
    dailyRateNgn: String(listing.dailyRateNgn),
    imageId: listing.image.id,
  };
}

export function validateListingDraft(draft: HostListingDraft): HostListingDraftErrors {
  const errors: HostListingDraftErrors = {};
  if (!draft.make.trim()) errors.make = "Enter the vehicle make.";
  if (!draft.model.trim()) errors.model = "Enter the vehicle model.";
  const year = Number(draft.year);
  if (!Number.isInteger(year) || year < 1990 || year > 2027) {
    errors.year = "Enter a year from 1990 to 2027.";
  }
  if (!draft.features.length) errors.features = "Choose at least one structured feature.";
  if (!draft.pickupLocation.trim()) errors.pickupLocation = "Enter a mock pickup location.";
  const dailyRateNgn = Number(draft.dailyRateNgn);
  if (!Number.isSafeInteger(dailyRateNgn) || dailyRateNgn <= 0) {
    errors.dailyRateNgn = "Enter a positive whole-naira daily rate.";
  }
  if (!draft.imageId) errors.imageId = "Choose a mock vehicle image.";
  return errors;
}

export function toValidListingDraft(
  draft: HostListingDraft,
  image: ListingImage | null,
): ValidHostListingDraft {
  const errors = validateListingDraft(draft);
  if (Object.keys(errors).length || !image) throw new Error("The mock listing draft is invalid.");
  return {
    make: draft.make.trim(),
    model: draft.model.trim(),
    year: Number(draft.year),
    category: draft.category,
    features: [...draft.features],
    pickupLocation: draft.pickupLocation.trim(),
    availability: draft.availability,
    dailyRateNgn: Number(draft.dailyRateNgn),
    image: { ...image },
  };
}
