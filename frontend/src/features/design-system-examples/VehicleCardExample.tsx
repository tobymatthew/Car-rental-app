import { StyleSheet, View } from "react-native";

import { spacing } from "@/design-system/tokens";
import { AppText } from "@/components/ui/AppText";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { VehicleImage } from "@/components/ui/VehicleImage";

export type VehicleCardExampleProps = {
  name?: string;
  location?: string;
  facts?: string;
  pricePerDay?: string;
  hostName?: string;
  availability?: "Available" | "Booked";
  imageUri?: string;
};

export function VehicleCardExample({
  name = "Toyota Corolla",
  location = "Lekki, Lagos",
  facts = "Automatic · 5 seats · Petrol",
  pricePerDay = "₦45,000",
  hostName = "Amara Okafor",
  availability = "Available",
  imageUri,
}: VehicleCardExampleProps) {
  return (
    <Card testID="vehicle-card-example">
      <VehicleImage label={`${name} vehicle`} source={imageUri} />
      <View style={styles.content}>
        <View style={styles.heading}>
          <View style={styles.titleGroup}>
            <AppText variant="title">{name}</AppText>
            <AppText variant="caption" tone="secondary">
              {location}
            </AppText>
          </View>
          <Badge label={availability} tone={availability === "Available" ? "success" : "warning"} />
        </View>
        <AppText variant="caption" tone="secondary">
          {facts}
        </AppText>
        <View style={styles.footer}>
          <View style={styles.host}>
            <Avatar label={hostName} size="small" />
            <View>
              <AppText variant="caption" tone="muted">
                Hosted by
              </AppText>
              <AppText variant="captionStrong">{hostName}</AppText>
            </View>
          </View>
          <View style={styles.price}>
            <AppText variant="price">{pricePerDay}</AppText>
            <AppText variant="caption" tone="secondary">
              / day
            </AppText>
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  content: { gap: spacing[3], paddingTop: spacing[4] },
  heading: { flexDirection: "row", justifyContent: "space-between", gap: spacing[3] },
  titleGroup: { flex: 1, gap: spacing[1] },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing[3],
  },
  host: { flex: 1, flexDirection: "row", alignItems: "center", gap: spacing[2] },
  price: { alignItems: "flex-end" },
});
