import { Stack } from "expo-router";
import { HostListingDraftProvider } from "@/features/host-listings/state/HostListingDraftProvider";
export default function HostListingsLayout() {
  return (
    <HostListingDraftProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </HostListingDraftProvider>
  );
}
