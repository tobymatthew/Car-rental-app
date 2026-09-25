import { createContext, useContext, useMemo, useState, type PropsWithChildren } from "react";

import { emptyBookingDraft, type BookingDraft } from "../domain/bookingDraft";

type BookingDraftContextValue = {
  draft: BookingDraft;
  updateDraft: (changes: Partial<BookingDraft>) => void;
  chooseVehicle: (vehicleId: string) => void;
  resetDraft: () => void;
};

const BookingDraftContext = createContext<BookingDraftContextValue | null>(null);

export function BookingDraftProvider({ children }: PropsWithChildren) {
  const [draft, setDraft] = useState<BookingDraft>(emptyBookingDraft);
  const value = useMemo<BookingDraftContextValue>(
    () => ({
      draft,
      updateDraft: (changes) => setDraft((current) => ({ ...current, ...changes })),
      chooseVehicle: (vehicleId) =>
        setDraft((current) =>
          current.vehicleId === vehicleId ? current : { ...emptyBookingDraft, vehicleId },
        ),
      resetDraft: () => setDraft(emptyBookingDraft),
    }),
    [draft],
  );
  return <BookingDraftContext.Provider value={value}>{children}</BookingDraftContext.Provider>;
}

export function useBookingDraft() {
  const value = useContext(BookingDraftContext);
  if (!value) throw new Error("useBookingDraft must be used within BookingDraftProvider.");
  return value;
}
