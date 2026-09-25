export type VehicleAvailability = "available" | "booked";

export type VehicleImage = {
  id: string;
  uri?: string | number;
  alt: string;
};

export type VehicleFeature = {
  id: string;
  label: string;
};

export type VehicleLocation = {
  city: string;
  area?: string;
  displayName: string;
  region: "Lagos" | "Abuja";
};

export type Vehicle = {
  id: string;
  make: string;
  model: string;
  year: number;
  location: VehicleLocation;
  dailyRateNgn: number;
  host: { id: string; name: string };
  images: VehicleImage[];
  features: VehicleFeature[];
  bodyType: "Sedan" | "SUV" | "Luxury";
  color: "Black" | "White" | "Silver" | "Blue";
  seats: 4 | 5 | 7;
  transmission: "Automatic" | "Manual";
  availability: VehicleAvailability;
};

export type VehicleSort = "recommended" | "price-asc" | "price-desc";

export type VehicleSearchFilters = {
  query: string;
  locationRegion?: VehicleLocation["region"];
  maxDailyRateNgn?: number;
  make?: string;
  bodyType?: Vehicle["bodyType"];
  color?: Vehicle["color"];
  minimumSeats?: Vehicle["seats"];
  minimumYear?: number;
  transmission?: Vehicle["transmission"];
  sort?: VehicleSort;
};

export type VehicleSearchResult = {
  vehicles: Vehicle[];
  total: number;
};

export type RepositoryError = {
  code: "INVENTORY_UNAVAILABLE" | "UNKNOWN";
  message: string;
  retryable: boolean;
};
