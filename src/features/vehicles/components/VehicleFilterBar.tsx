import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { colors, layout, radii, spacing } from "@/design-system/tokens";
import { AppText } from "@/components/ui/AppText";
import type { VehicleSearchFilters } from "../types";

type VehicleFilterBarProps = {
  filters: VehicleSearchFilters;
  onLocationChange: (value: VehicleSearchFilters["locationRegion"]) => void;
  onPriceChange: (value: VehicleSearchFilters["maxDailyRateNgn"]) => void;
};

type FilterChoice<T> = { label: string; value: T };

const locations: readonly FilterChoice<VehicleSearchFilters["locationRegion"]>[] = [
  { label: "All locations", value: undefined },
  { label: "Lagos", value: "Lagos" },
  { label: "Abuja", value: "Abuja" },
];

const prices: readonly FilterChoice<VehicleSearchFilters["maxDailyRateNgn"]>[] = [
  { label: "All prices", value: undefined },
  { label: "Under ₦60k", value: 60_000 },
];

function FilterChoiceButton<T>({
  choice,
  selected,
  onPress,
}: {
  choice: FilterChoice<T>;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityLabel={choice.label}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.choice,
        selected && styles.choiceSelected,
        pressed && styles.choicePressed,
      ]}
    >
      <AppText variant="captionStrong" tone={selected ? "inverse" : "primary"}>
        {choice.label}
      </AppText>
    </Pressable>
  );
}

export function VehicleFilterBar({
  filters,
  onLocationChange,
  onPriceChange,
}: VehicleFilterBarProps) {
  return (
    <View style={styles.container}>
      <AppText variant="captionStrong">Filters</AppText>
      <ScrollView
        accessibilityLabel="Vehicle filters"
        horizontal
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.choices}
      >
        {locations.map((choice) => (
          <FilterChoiceButton
            choice={choice}
            key={choice.label}
            onPress={() => onLocationChange(choice.value)}
            selected={filters.locationRegion === choice.value}
          />
        ))}
        {prices.map((choice) => (
          <FilterChoiceButton
            choice={choice}
            key={choice.label}
            onPress={() => onPriceChange(choice.value)}
            selected={filters.maxDailyRateNgn === choice.value}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing[2] },
  choices: { gap: spacing[2], paddingRight: layout.screenGutter },
  choice: {
    minHeight: layout.minimumTouchTarget,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border.strong,
    borderRadius: radii.pill,
    paddingHorizontal: spacing[3],
    backgroundColor: colors.surface.default,
  },
  choiceSelected: { borderColor: colors.brand.primary, backgroundColor: colors.brand.primary },
  choicePressed: { opacity: 0.85 },
});
