import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { AppText } from "@/components/ui/AppText";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FeedbackState } from "@/components/ui/FeedbackState";
import { Screen } from "@/components/ui/Screen";
import { TopBar } from "@/components/ui/TopBar";
import { VehicleImage } from "@/components/ui/VehicleImage";
import { spacing } from "@/design-system/tokens";
import { formatNaira } from "@/features/bookings/domain/calculateQuote";
import {
  listingAvailabilityLabels,
  listingFeatureLabels,
  type HostListing,
} from "../domain/hostListing";
import { hostListingRepository } from "../repositories/mockHostListingRepository";
import type { HostListingRepository } from "../repositories/hostListingRepository";

export function ListingDetailScreen({
  listingId,
  repository = hostListingRepository,
}: {
  listingId: string;
  repository?: HostListingRepository;
}) {
  const router = useRouter();
  const [listing, setListing] = useState<HostListing | null | undefined>();
  useEffect(() => {
    repository
      .getListing(listingId)
      .then(setListing)
      .catch(() => setListing(null));
  }, [listingId, repository]);
  if (listing === undefined)
    return (
      <Screen>
        <FeedbackState kind="loading" title="Loading mock listing" />
      </Screen>
    );
  if (!listing)
    return (
      <Screen>
        <FeedbackState kind="empty" title="Mock listing not found" />
      </Screen>
    );
  return (
    <Screen scroll contentStyle={styles.screen}>
      <TopBar title="Listed car" onBack={() => router.back()} />
      <AppText variant="heading">
        {listing.year} {listing.make} {listing.model}
      </AppText>
      <Badge label="Mock published" tone="success" />
      <VehicleImage label={listing.image.label} source={listing.image.source} />
      <Card childrenStyle={styles.card}>
        <AppText variant="price">{formatNaira(listing.dailyRateNgn)} / mock day</AppText>
        <AppText>{listing.pickupLocation}</AppText>
        <AppText>{listingAvailabilityLabels[listing.availability]}</AppText>
        <AppText tone="secondary">
          {listing.features.map((feature) => listingFeatureLabels[feature]).join(" · ")}
        </AppText>
      </Card>
      <AppText tone="secondary">
        Saved locally for testing. This listing is not verified, public, or available to real
        renters.
      </AppText>
      <Button
        label="Edit listing"
        onPress={() => router.push(`/(host)/host/listings/${listing.id}/edit`)}
      />
      <Button
        label="Back to host dashboard"
        variant="secondary"
        onPress={() => router.replace("/(host)/host")}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({ screen: { gap: spacing[4] }, card: { gap: spacing[2] } });
