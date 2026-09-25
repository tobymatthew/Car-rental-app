import { useLocalSearchParams } from "expo-router";
import { ConfirmationScreen } from "@/features/bookings/components/ConfirmationScreen";
export default function TripConfirmationRoute() {
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>();
  return <ConfirmationScreen bookingId={bookingId ?? ""} />;
}
