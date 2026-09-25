import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { colors, radii, spacing } from "@/design-system/tokens";
import { AppText } from "@/components/ui/AppText";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ListRow } from "@/components/ui/ListRow";
import { TextField } from "@/components/ui/TextField";

export function HostListingFormExample() {
  const [transmission, setTransmission] = useState<"Automatic" | "Manual">("Automatic");
  const [price, setPrice] = useState("");

  return (
    <Card testID="host-listing-form-example">
      <View style={styles.content}>
        <View style={styles.heading}>
          <AppText variant="title">Car details</AppText>
          <AppText tone="secondary">List your car with the details renters need.</AppText>
        </View>
        <TextField hint="e.g. Toyota Corolla" label="Vehicle make and model" required />
        <View style={styles.group}>
          <AppText variant="captionStrong">Transmission</AppText>
          <ListRow
            accessibilityLabel="Automatic transmission"
            onPress={() => setTransmission("Automatic")}
            selected={transmission === "Automatic"}
            trailing={
              transmission === "Automatic" ? (
                <AppText variant="captionStrong" tone="link">
                  Selected
                </AppText>
              ) : null
            }
          >
            <AppText>Automatic</AppText>
          </ListRow>
          <ListRow
            accessibilityLabel="Manual transmission"
            onPress={() => setTransmission("Manual")}
            selected={transmission === "Manual"}
            trailing={
              transmission === "Manual" ? (
                <AppText variant="captionStrong" tone="link">
                  Selected
                </AppText>
              ) : null
            }
          >
            <AppText>Manual</AppText>
          </ListRow>
        </View>
        <View
          style={styles.placeholder}
          accessibilityLabel="Vehicle photo placeholder"
          accessibilityRole="image"
        >
          <AppText variant="captionStrong" tone="secondary">
            Vehicle photo
          </AppText>
          <AppText variant="caption" tone="muted">
            Add imagery in a later upload flow.
          </AppText>
        </View>
        <TextField
          keyboardType="numeric"
          label="Daily price"
          onChangeText={setPrice}
          placeholder="₦0"
          required
          value={price}
        />
        <Button disabled={!price} label="Save draft" />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  content: { gap: spacing[5] },
  heading: { gap: spacing[1] },
  group: { gap: spacing[1] },
  placeholder: {
    minHeight: 120,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[1],
    borderRadius: radii.medium,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.border.strong,
    backgroundColor: colors.surface.muted,
  },
});
