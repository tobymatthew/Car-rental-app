import { useLocalSearchParams } from "expo-router";
import { TripRequestDetailScreen } from "@/features/host-trip-requests/components/TripRequestDetailScreen";
export default function HostTripRequestDetailRoute() {
  const { requestId } = useLocalSearchParams<{ requestId: string }>();
  return <TripRequestDetailScreen requestId={requestId ?? ""} />;
}
