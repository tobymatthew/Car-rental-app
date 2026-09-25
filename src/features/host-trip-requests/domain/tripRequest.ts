export type TripRequestStatus = "pending" | "approved" | "declined" | "completed";
export type TripRequest = {
  id: string;
  listingId: string;
  vehicleName: string;
  renterDisplayName: string;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  dropOffLocation: string;
  estimatedTotalNgn: number;
  status: TripRequestStatus;
  updatedAt: string;
};

export const tripRequestStatusLabels: Record<TripRequestStatus, string> = {
  pending: "Pending (mock)",
  approved: "Approved (mock)",
  declined: "Declined (mock)",
  completed: "Completed (mock)",
};
