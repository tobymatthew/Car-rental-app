import { useLocalSearchParams } from "expo-router";
import { ListingDetailScreen } from "@/features/host-listings/components/ListingDetailScreen";
export default function HostListingDetailRoute() {
  const { listingId } = useLocalSearchParams<{ listingId: string }>();
  return <ListingDetailScreen listingId={listingId ?? ""} />;
}
