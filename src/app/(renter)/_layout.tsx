import { Stack } from "expo-router";
import { BookingDraftProvider } from "@/features/bookings/state/BookingDraftProvider";

export default function RenterLayout() {
  return (
    <BookingDraftProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </BookingDraftProvider>
  );
}
