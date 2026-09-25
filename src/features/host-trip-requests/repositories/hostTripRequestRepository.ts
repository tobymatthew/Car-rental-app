import type { TripRequest } from "../domain/tripRequest";

export interface HostTripRequestRepository {
  listTripRequests(input?: { listingId?: string }): Promise<TripRequest[]>;
  getTripRequest(id: string): Promise<TripRequest | null>;
  updateMockRequestStatus(input: {
    requestId: string;
    nextStatus: "approved" | "declined";
    actionKey: string;
  }): Promise<TripRequest>;
}

export class HostTripRequestError extends Error {
  constructor(message = "We couldn't update mock trip requests. Please try again.") {
    super(message);
    this.name = "HostTripRequestError";
  }
}
