import { useState, type PropsWithChildren } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppText } from "@/components/ui/AppText";
import { Button } from "@/components/ui/Button";
import { PlatformSymbol } from "@/components/ui/PlatformSymbol";
import { colors, layout, radii, spacing } from "@/design-system/tokens";
import type { VehicleSearchFilters } from "../types";

type Props = {
  visible: boolean;
  filters: VehicleSearchFilters;
  onApply: (filters: VehicleSearchFilters) => void;
  onClose: () => void;
};

type ChoiceProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

function Choice({ label, selected, onPress, style }: ChoiceProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
      onPress={onPress}
      style={[styles.choice, selected && styles.choiceSelected, style]}
    >
      <AppText
        variant="captionStrong"
        style={selected ? styles.choiceTextSelected : styles.choiceText}
      >
        {label}
      </AppText>
    </Pressable>
  );
}

function Section({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <View style={styles.section}>
      <AppText variant="title">{title}</AppText>
      <View accessibilityRole="radiogroup" style={styles.choices}>
        {children}
      </View>
    </View>
  );
}

type SelectOption = { label: string; value: string | number };
function SelectSection({
  title,
  value,
  placeholder,
  expanded,
  options,
  onToggle,
  onSelect,
}: {
  title: string;
  value?: string | number;
  placeholder: string;
  expanded: boolean;
  options: readonly SelectOption[];
  onToggle: () => void;
  onSelect: (value: string | number) => void;
}) {
  const selectedLabel = options.find((option) => option.value === value)?.label;
  return (
    <View style={styles.section}>
      <AppText variant="title">{title}</AppText>
      <Pressable
        accessibilityLabel={`${title}, ${selectedLabel ?? placeholder}`}
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        onPress={onToggle}
        style={styles.selectField}
      >
        <AppText>{selectedLabel ?? placeholder}</AppText>
        <PlatformSymbol
          name={{
            ios: expanded ? "chevron.up" : "chevron.down",
            android: expanded ? "expand-less" : "expand-more",
            web: expanded ? "expand-less" : "expand-more",
          }}
          size={20}
          tintColor={colors.surface.inverse}
        />
      </Pressable>
      {expanded ? (
        <View accessibilityRole="radiogroup" style={styles.choices}>
          {options.map((option) => (
            <Choice
              key={option.value}
              label={option.label}
              selected={option.value === value}
              onPress={() => onSelect(option.value)}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}

const typeSymbols = {
  Sedan: { ios: "car.side", android: "directions-car", web: "directions-car" },
  SUV: { ios: "suv.side", android: "airport-shuttle", web: "airport-shuttle" },
  Luxury: { ios: "car.side.fill", android: "directions-car-filled", web: "directions-car-filled" },
} as const;

const initialFilters: VehicleSearchFilters = { query: "", sort: "recommended" };

export function VehicleFilterScreen({ visible, filters, onApply, onClose }: Props) {
  const [draft, setDraft] = useState(filters);
  const [expanded, setExpanded] = useState<string>();
  const toggle = <Key extends keyof VehicleSearchFilters>(
    key: Key,
    value: VehicleSearchFilters[Key],
  ) => setDraft((current) => ({ ...current, [key]: current[key] === value ? undefined : value }));

  return (
    <Modal animationType="slide" onRequestClose={onClose} visible={visible}>
      <SafeAreaView edges={["top", "bottom", "left", "right"]} style={styles.safeArea}>
        <View style={styles.topBar}>
          <Pressable
            accessibilityLabel="Close filters"
            accessibilityRole="button"
            onPress={onClose}
            style={styles.iconButton}
          >
            <PlatformSymbol
              name={{ ios: "chevron.left", android: "arrow-back", web: "arrow-back" }}
              size={24}
              tintColor={colors.surface.inverse}
            />
          </Pressable>
          <AppText variant="title" style={styles.title}>
            Filter
          </AppText>
          <Pressable
            accessibilityLabel="Reset all filters"
            accessibilityRole="button"
            onPress={() => setDraft(initialFilters)}
            style={styles.resetButton}
          >
            <AppText variant="captionStrong" tone="link">
              Reset
            </AppText>
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Section title="Price Range">
            {[40_000, 60_000, 80_000, 100_000].map((amount) => (
              <Choice
                key={amount}
                label={`Up to ₦${amount / 1000}k/day`}
                selected={draft.maxDailyRateNgn === amount}
                onPress={() => toggle("maxDailyRateNgn", amount)}
              />
            ))}
          </Section>

          <SelectSection
            title="Vehicle Make"
            value={draft.make}
            placeholder="Any make"
            expanded={expanded === "make"}
            onToggle={() => setExpanded((current) => (current === "make" ? undefined : "make"))}
            options={["Toyota", "Honda", "Lexus", "Kia", "Mercedes-Benz", "Hyundai"].map(
              (make) => ({ label: make, value: make }),
            )}
            onSelect={(make) => {
              toggle("make", String(make));
              setExpanded(undefined);
            }}
          />

          <View style={styles.section}>
            <AppText variant="title">Vehicle Type</AppText>
            <View accessibilityRole="radiogroup" style={styles.typeOptions}>
              {(["Sedan", "SUV", "Luxury"] as const).map((bodyType) => (
                <Pressable
                  key={bodyType}
                  accessibilityLabel={bodyType}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: draft.bodyType === bodyType }}
                  onPress={() => toggle("bodyType", bodyType)}
                  style={styles.typeOption}
                >
                  <View
                    style={[
                      styles.typeIcon,
                      draft.bodyType === bodyType && styles.typeIconSelected,
                    ]}
                  >
                    <PlatformSymbol
                      name={typeSymbols[bodyType]}
                      size={31}
                      tintColor={colors.surface.inverse}
                    />
                  </View>
                  <AppText variant="captionStrong">{bodyType}</AppText>
                </Pressable>
              ))}
            </View>
          </View>

          <SelectSection
            title="Colour"
            value={draft.color}
            placeholder="Any colour"
            expanded={expanded === "colour"}
            onToggle={() => setExpanded((current) => (current === "colour" ? undefined : "colour"))}
            options={["Black", "White", "Silver", "Blue"].map((color) => ({
              label: color,
              value: color,
            }))}
            onSelect={(color) => {
              toggle("color", color as VehicleSearchFilters["color"]);
              setExpanded(undefined);
            }}
          />

          <SelectSection
            title="Number Of Seats"
            value={draft.minimumSeats}
            placeholder="Any number"
            expanded={expanded === "seats"}
            onToggle={() => setExpanded((current) => (current === "seats" ? undefined : "seats"))}
            options={[4, 5, 7].map((seats) => ({ label: `${seats}+ seats`, value: seats }))}
            onSelect={(seats) => {
              toggle("minimumSeats", seats as VehicleSearchFilters["minimumSeats"]);
              setExpanded(undefined);
            }}
          />

          <SelectSection
            title="Year"
            value={draft.minimumYear}
            placeholder="Any year"
            expanded={expanded === "year"}
            onToggle={() => setExpanded((current) => (current === "year" ? undefined : "year"))}
            options={[2021, 2022, 2023, 2024].map((year) => ({
              label: `${year} or newer`,
              value: year,
            }))}
            onSelect={(year) => {
              toggle("minimumYear", Number(year));
              setExpanded(undefined);
            }}
          />

          <SelectSection
            title="Transmission"
            value={draft.transmission}
            placeholder="Any transmission"
            expanded={expanded === "transmission"}
            onToggle={() =>
              setExpanded((current) => (current === "transmission" ? undefined : "transmission"))
            }
            options={["Automatic", "Manual"].map((transmission) => ({
              label: transmission,
              value: transmission,
            }))}
            onSelect={(transmission) => {
              toggle("transmission", transmission as VehicleSearchFilters["transmission"]);
              setExpanded(undefined);
            }}
          />

          <SelectSection
            title="Location"
            value={draft.locationRegion}
            placeholder="Any location"
            expanded={expanded === "location"}
            onToggle={() =>
              setExpanded((current) => (current === "location" ? undefined : "location"))
            }
            options={["Lagos", "Abuja"].map((region) => ({ label: region, value: region }))}
            onSelect={(region) => {
              toggle("locationRegion", region as VehicleSearchFilters["locationRegion"]);
              setExpanded(undefined);
            }}
          />

          <Section title="Sort By">
            {(
              [
                ["Recommended", "recommended"],
                ["Price: Low to High", "price-asc"],
                ["Price: High to Low", "price-desc"],
              ] as const
            ).map(([label, sort]) => (
              <Choice
                key={sort}
                label={label}
                selected={draft.sort === sort}
                onPress={() => setDraft((current) => ({ ...current, sort }))}
              />
            ))}
          </Section>

          <Button
            label="Search"
            onPress={() => onApply({ ...draft, query: filters.query })}
            style={styles.searchButton}
          />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.surface.canvas },
  topBar: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: layout.screenGutter,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border.default,
  },
  iconButton: { width: 44, height: 44, alignItems: "center", justifyContent: "center" },
  title: { flex: 1, textAlign: "center" },
  resetButton: { width: 52, minHeight: 44, alignItems: "flex-end", justifyContent: "center" },
  content: {
    width: "100%",
    maxWidth: layout.maxContentWidth,
    alignSelf: "center",
    paddingHorizontal: layout.screenGutter,
    paddingTop: spacing[5],
    paddingBottom: spacing[10],
    gap: spacing[6],
  },
  section: { gap: spacing[3] },
  choices: { flexDirection: "row", flexWrap: "wrap", gap: spacing[2] },
  selectField: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing[4],
    borderRadius: radii.pill,
    backgroundColor: colors.surface.default,
  },
  typeOptions: { flexDirection: "row", gap: spacing[4] },
  typeOption: { flex: 1, alignItems: "center", gap: spacing[2] },
  typeIcon: {
    width: 68,
    height: 68,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border.default,
    borderRadius: radii.pill,
    backgroundColor: colors.surface.default,
  },
  typeIconSelected: { borderWidth: 2, borderColor: colors.surface.inverse },
  choice: {
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: spacing[4],
    borderWidth: 1,
    borderColor: colors.border.strong,
    borderRadius: radii.pill,
    backgroundColor: colors.surface.default,
  },
  choiceSelected: { borderColor: colors.surface.inverse, backgroundColor: colors.surface.inverse },
  choiceText: { color: colors.text.primary },
  choiceTextSelected: { color: colors.text.inverse },
  searchButton: { marginTop: spacing[2] },
});
