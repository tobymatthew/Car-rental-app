import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

import { colors, spacing } from "@/design-system/tokens";
import { AppText } from "@/components/ui/AppText";
import { Card } from "@/components/ui/Card";
import { VehicleImage } from "@/components/ui/VehicleImage";
import type { Vehicle } from "../types";

type VehicleCardProps = { vehicle: Vehicle };

function formatNaira(value: number) {
  return `₦${value.toLocaleString("en-NG")}`;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const router = useRouter();
  const name = `${vehicle.make} ${vehicle.model}`;
  const primaryImage = vehicle.images[0];

  return (
    <Card
      accessibilityLabel={`View ${name}`}
      childrenStyle={styles.card}
      onPress={() => router.push(`/(renter)/vehicles/${vehicle.id}`)}
      testID={`vehicle-card-${vehicle.id}`}
    >
      <VehicleImage
        label={primaryImage?.alt ?? `${name} vehicle image`}
        source={primaryImage?.uri}
      />
      <View style={styles.content}>
        <AppText numberOfLines={2} variant="bodyStrong" style={styles.name}>
          {name}
        </AppText>
        <View style={styles.priceRow}>
          <AppText style={styles.price} variant="bodyStrong">
            {formatNaira(vehicle.dailyRateNgn)}
          </AppText>
          <AppText variant="caption" style={styles.day}>
            /Day
          </AppText>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { padding: 0, overflow: "hidden" },
  content: { gap: spacing[2], padding: spacing[3], paddingBottom: spacing[4], minHeight: 96 },
  name: { minHeight: 44 },
  price: { color: colors.brand.primary },
  priceRow: { flexDirection: "row", alignItems: "baseline" },
  day: { color: colors.brand.primary, marginLeft: 2 },
});
