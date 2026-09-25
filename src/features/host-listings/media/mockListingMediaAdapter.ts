import type { ListingImage } from "../domain/hostListing";

const sedan = require("../../../../assets/cargenie/car1.jpg");
const suv = require("../../../../assets/cargenie/car3.jpg");
const electric = require("../../../../assets/cargenie/audi.png");

const mockImages: readonly ListingImage[] = [
  { id: "mock-sedan", label: "Mock sedan exterior placeholder", source: sedan },
  { id: "mock-suv", label: "Mock SUV exterior placeholder", source: suv },
  { id: "mock-van", label: "Mock van exterior placeholder", source: electric },
];

export interface ListingMediaAdapter {
  listOptions(): Promise<ListingImage[]>;
  getOption(id: string): Promise<ListingImage | null>;
}

export const mockListingMediaAdapter: ListingMediaAdapter = {
  async listOptions() {
    return mockImages.map((image) => ({ ...image }));
  },
  async getOption(id) {
    const image = mockImages.find((candidate) => candidate.id === id);
    return image ? { ...image } : null;
  },
};
