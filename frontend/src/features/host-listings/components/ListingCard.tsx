import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "@/components/ui/AppText";
import { Badge } from "@/components/ui/Badge";
import { VehicleImage } from "@/components/ui/VehicleImage";
import { spacing } from "@/design-system/tokens";
import { formatNaira } from "@/features/bookings/domain/calculateQuote";
import { listingAvailabilityLabels, type HostListing } from "../domain/hostListing";

export function ListingCard({ listing, onPress }: { listing: HostListing; onPress: () => void }) {
  const name = `${listing.year} ${listing.make} ${listing.model}`;
  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel={`View ${name} mock listing`}
      accessibilityRole="button"
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.row}>
        <VehicleImage
          label={listing.image.label}
          source={listing.image.source}
          style={styles.image}
        />
        <View style={styles.content}>
          <AppText variant="title">{name}</AppText>
          <AppText variant="price">
            {formatNaira(listing.dailyRateNgn)}
            <AppText variant="caption" tone="secondary">
              /day
            </AppText>
          </AppText>
        </View>
      </View>
      <View style={styles.meta}>
        <Badge
          label={listing.status === "mock-published" ? "Mock published" : "Draft"}
          tone={listing.status === "mock-published" ? "success" : "neutral"}
        />
        <AppText variant="caption" tone="secondary">
          {listing.pickupLocation} · {listingAvailabilityLabels[listing.availability]}
        </AppText>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card: { gap: spacing[2], paddingVertical: spacing[2] },
  row: { flexDirection: "row", gap: spacing[3] },
  image: { width: 120, height: 104, aspectRatio: undefined },
  content: { flex: 1, gap: spacing[1], justifyContent: "center" },
  meta: { gap: spacing[1], paddingLeft: 132 },
  pressed: { opacity: 0.78 },
});
