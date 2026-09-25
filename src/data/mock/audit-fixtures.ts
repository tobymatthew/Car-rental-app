export const auditFixtureSizes = ["small", "medium", "stress"] as const;

export type AuditFixtureSize = (typeof auditFixtureSizes)[number];

export type AuditImageLoading = "fast" | "slow" | "error";

export interface AuditImageFixture {
  id: string;
  url: string;
  width: number;
  height: number;
  loading: AuditImageLoading;
}

export interface AuditVehicleFixture {
  id: string;
  make: string;
  model: string;
  year: number;
  location: string;
  dailyRateNgn: number;
  hostName: string;
  features: string[];
  images: AuditImageFixture[];
}

export type AuditBookingStatus = "upcoming" | "active" | "completed" | "cancelled";

export interface AuditBookingFixture {
  id: string;
  vehicleId: string;
  status: AuditBookingStatus;
  startDate: string;
  endDate: string;
  totalNgn: number;
}

export type AuditTripRequestStatus = "pending" | "approved" | "declined" | "completed";

export interface AuditTripRequestFixture {
  id: string;
  vehicleId: string;
  renterName: string;
  status: AuditTripRequestStatus;
  startDate: string;
  endDate: string;
}

export interface AuditListingDraftFixture {
  id: string;
  step: "details" | "location" | "pricing" | "review";
  title: string;
  location: string;
  dailyRateNgn: number | null;
  imageCount: number;
  isPersisted: boolean;
}

export interface AuditFixtureSet {
  size: AuditFixtureSize;
  profile: {
    id: string;
    name: string;
    role: "renter" | "host";
  };
  vehicles: AuditVehicleFixture[];
  bookings: AuditBookingFixture[];
  tripRequests: AuditTripRequestFixture[];
  listingDraft: AuditListingDraftFixture;
}

const fixtureCounts: Record<AuditFixtureSize, number> = {
  small: 6,
  medium: 50,
  stress: 300,
};

const vehicleSeeds = [
  { make: "Toyota", model: "Camry", rate: 42_000 },
  { make: "Honda", model: "Civic", rate: 38_000 },
  { make: "Lexus", model: "ES 350", rate: 75_000 },
  { make: "Kia", model: "Sportage", rate: 55_000 },
  { make: "Mercedes-Benz", model: "C-Class", rate: 95_000 },
  { make: "Hyundai", model: "Tucson", rate: 48_000 },
] as const;

const locations = ["Lekki, Lagos", "Victoria Island, Lagos", "Wuse, Abuja", "Ikeja, Lagos"];
const hosts = ["Amaka Okafor", "Tunde Bello", "Nneka Eze", "Daniel Yusuf"];
const featureSets = [
  ["Automatic", "Air conditioning"],
  ["Automatic", "Bluetooth", "Backup camera"],
  ["Automatic", "Leather seats", "Sunroof"],
] as const;

function createImages(vehicleId: string, vehicleIndex: number): AuditImageFixture[] {
  return ["hero", "interior", "rear"].map((view, imageIndex) => ({
    id: `${vehicleId}-${view}`,
    url: `https://fixtures.cargenie.test/vehicles/${vehicleId}/${view}.jpg`,
    width: imageIndex === 0 ? 1_200 : 900,
    height: imageIndex === 0 ? 800 : 600,
    loading: vehicleIndex === 0 && imageIndex === 2 ? "error" : "fast",
  }));
}

function createVehicle(index: number): AuditVehicleFixture {
  const seed = vehicleSeeds[index % vehicleSeeds.length];
  const vehicleId = `vehicle-${String(index + 1).padStart(3, "0")}`;

  return {
    id: vehicleId,
    make: seed.make,
    model: seed.model,
    year: 2020 + (index % 5),
    location: locations[index % locations.length],
    dailyRateNgn: seed.rate + (index % 4) * 2_500,
    hostName: hosts[index % hosts.length],
    features: [...featureSets[index % featureSets.length]],
    images: createImages(vehicleId, index),
  };
}

function createBooking(index: number, vehicleId: string): AuditBookingFixture {
  const statuses: AuditBookingStatus[] = ["upcoming", "active", "completed", "cancelled"];
  const status = statuses[index % statuses.length];
  const startDay = String(10 + (index % 18)).padStart(2, "0");
  const endDay = String(12 + (index % 18)).padStart(2, "0");

  return {
    id: `booking-${String(index + 1).padStart(3, "0")}`,
    vehicleId,
    status,
    startDate: `2026-08-${startDay}`,
    endDate: `2026-08-${endDay}`,
    totalNgn: 84_000 + (index % 6) * 12_500,
  };
}

function createTripRequest(index: number, vehicleId: string): AuditTripRequestFixture {
  const statuses: AuditTripRequestStatus[] = ["pending", "approved", "declined", "completed"];

  return {
    id: `trip-request-${String(index + 1).padStart(3, "0")}`,
    vehicleId,
    renterName: ["Ifeanyi Obi", "Sarah James", "Musa Abdullahi", "Chidinma Okoro"][index % 4],
    status: statuses[index % statuses.length],
    startDate: `2026-09-${String(3 + (index % 20)).padStart(2, "0")}`,
    endDate: `2026-09-${String(5 + (index % 20)).padStart(2, "0")}`,
  };
}

export function createAuditFixtures(size: AuditFixtureSize): AuditFixtureSet {
  const count = fixtureCounts[size];
  const vehicles = Array.from({ length: count }, (_, index) => createVehicle(index));

  return {
    size,
    profile: {
      id: "profile-audit-001",
      name: "Adaeze Nwosu",
      role: "renter",
    },
    vehicles,
    bookings: vehicles.map((vehicle, index) => createBooking(index, vehicle.id)),
    tripRequests: vehicles.map((vehicle, index) => createTripRequest(index, vehicle.id)),
    listingDraft: {
      id: "listing-draft-audit-001",
      step: "pricing",
      title: "2022 Toyota Camry",
      location: "Lekki, Lagos",
      dailyRateNgn: 42_000,
      imageCount: 3,
      isPersisted: false,
    },
  };
}
