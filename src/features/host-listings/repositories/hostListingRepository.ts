import type { HostListing } from "../domain/hostListing";
import type { ValidHostListingDraft } from "../domain/listingDraft";

export interface HostListingRepository {
  listListings(): Promise<HostListing[]>;
  getListing(id: string): Promise<HostListing | null>;
  saveMockListing(input: {
    listingId?: string;
    draft: ValidHostListingDraft;
  }): Promise<HostListing>;
}

export class HostRepositoryError extends Error {
  constructor(message = "We couldn't update mock host listings. Please try again.") {
    super(message);
    this.name = "HostRepositoryError";
  }
}
