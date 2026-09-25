import { useLocalSearchParams } from "expo-router";
import { ListingDraftScreen } from "@/features/host-listings/components/ListingDraftScreen";
export default function EditHostListingRoute() {
  const { listingId } = useLocalSearchParams<{ listingId: string }>();
  return <ListingDraftScreen listingId={listingId ?? ""} />;
}
