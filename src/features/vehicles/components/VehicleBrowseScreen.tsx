import { useState } from "react";
import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

import { colors, layout, spacing } from "@/design-system/tokens";
import { AppText } from "@/components/ui/AppText";
import { Avatar } from "@/components/ui/Avatar";
import { BottomNavigation } from "@/components/ui/BottomNavigation";
import { Button } from "@/components/ui/Button";
import { FeedbackState } from "@/components/ui/FeedbackState";
import { PlatformSymbol } from "@/components/ui/PlatformSymbol";
import { Screen } from "@/components/ui/Screen";
import { VehicleImage } from "@/components/ui/VehicleImage";
import { useVehicleSearch } from "../hooks/useVehicleSearch";
import { vehicleRepository } from "../repositories/mockVehicleRepository";
import type { VehicleRepository } from "../repositories/vehicleRepository";
import type { VehicleSearchFilters } from "../types";
import { VehicleCard } from "./VehicleCard";
import { VehicleFilterScreen } from "./VehicleFilterScreen";
import { VehicleSearchField } from "./VehicleSearchField";

type VehicleBrowseScreenProps = { repository?: VehicleRepository };

const initialFilters: VehicleSearchFilters = { query: "", sort: "recommended" };

export function VehicleBrowseScreen({ repository = vehicleRepository }: VehicleBrowseScreenProps) {
  const router = useRouter();
  const [filters, setFilters] = useState<VehicleSearchFilters>(initialFilters);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const { status, data, retry } = useVehicleSearch({ repository, filters });
  const result = data ?? { vehicles: [], total: 0 };
  const filtersActive = Boolean(
    filters.query ||
    filters.locationRegion ||
    filters.maxDailyRateNgn ||
    filters.make ||
    filters.bodyType ||
    filters.color ||
    filters.minimumSeats ||
    filters.minimumYear ||
    filters.transmission ||
    (filters.sort && filters.sort !== "recommended"),
  );
  const featuredVehicle = filtersActive
    ? undefined
    : result.vehicles.find((vehicle) => vehicle.images[0]?.uri);
  const visibleVehicles = featuredVehicle
    ? result.vehicles.filter((vehicle) => vehicle.id !== featuredVehicle.id)
    : result.vehicles;

  const updateFilters = (changes: Partial<VehicleSearchFilters>) => {
    setFilters((current) => ({ ...current, ...changes }));
  };

  const clearFilters = () => setFilters(initialFilters);

  return (
    <Screen contentStyle={styles.screen} footer={<BottomNavigation active="browse" />}>
      <View style={styles.header}>
        <View style={styles.greetingRow}>
          <Avatar label="Mary" source={require("../../../../assets/cargenie/profle.png")} />
          <AppText variant="title" style={styles.greeting}>
            Hello, Mary
          </AppText>
          <View accessible={false} style={styles.headerIcon}>
            <PlatformSymbol
              name={{ ios: "bell", android: "notifications-none", web: "notifications-none" }}
              size={24}
              tintColor={colors.surface.inverse}
            />
          </View>
          <Pressable
            accessibilityLabel="Filter controls"
            accessibilityRole="button"
            accessibilityState={{ expanded: filtersVisible }}
            onPress={() => setFiltersVisible(true)}
            style={styles.headerIcon}
          >
            <PlatformSymbol
              name={{ ios: "line.3.horizontal.decrease", android: "tune", web: "tune" }}
              size={24}
              tintColor={colors.surface.inverse}
            />
          </Pressable>
        </View>
        <VehicleSearchField
          value={filters.query}
          onChangeText={(query) => updateFilters({ query })}
        />
      </View>

      {filtersVisible ? (
        <VehicleFilterScreen
          filters={filters}
          visible
          onClose={() => setFiltersVisible(false)}
          onApply={(nextFilters) => {
            setFilters(nextFilters);
            setFiltersVisible(false);
          }}
        />
      ) : null}

      {status === "loading" ? (
        <FeedbackState kind="loading" title="Loading available cars" />
      ) : null}
      {status === "error" ? (
        <FeedbackState
          description="Your filters are still here. Retry to load the inventory again."
          kind="error"
          onRetry={retry}
          title="Couldn't load vehicles"
        />
      ) : null}
      {status === "success" ? (
        <FlatList
          accessibilityLabel={`${visibleVehicles.length} available cars`}
          contentContainerStyle={result.total ? styles.listContent : styles.emptyContent}
          data={visibleVehicles}
          keyExtractor={(vehicle) => vehicle.id}
          numColumns={2}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.listHeaderContent}>
              {featuredVehicle ? (
                <Pressable
                  accessibilityLabel={`Book featured ${featuredVehicle.make} ${featuredVehicle.model}`}
                  accessibilityRole="button"
                  onPress={() => router.push(`/(renter)/vehicles/${featuredVehicle.id}`)}
                  style={({ pressed }) => [styles.featuredCard, pressed && styles.featuredPressed]}
                >
                  <VehicleImage
                    label={
                      featuredVehicle.images[0]?.alt ??
                      `${featuredVehicle.make} ${featuredVehicle.model} vehicle image`
                    }
                    source={featuredVehicle.images[0]?.uri}
                    style={styles.featuredImage}
                  />
                  <View style={styles.featuredCopy}>
                    <View style={styles.featuredTitleRow}>
                      <View style={styles.featuredName}>
                        <AppText variant="title">
                          {featuredVehicle.make} {featuredVehicle.model}
                        </AppText>
                        <AppText variant="bodyStrong" style={styles.featuredPrice}>
                          ₦{featuredVehicle.dailyRateNgn.toLocaleString("en-NG")}
                          <AppText variant="captionStrong" style={styles.featuredPrice}>
                            /Day
                          </AppText>
                        </AppText>
                      </View>
                      <AppText variant="bodyStrong" tone="link" style={styles.bookNow}>
                        Book Now
                      </AppText>
                    </View>
                  </View>
                </Pressable>
              ) : null}
              <AppText accessibilityLiveRegion="polite" variant="title">
                {filtersActive ? "Filter Results" : "Available Cars"}
              </AppText>
            </View>
          }
          ListHeaderComponentStyle={styles.listHeader}
          ListEmptyComponent={
            <View>
              <FeedbackState
                description={
                  filtersActive
                    ? "Try changing your search or filters."
                    : "New vehicle listings will appear here."
                }
                kind="empty"
                title={filtersActive ? "No vehicles match these filters" : "No vehicles available"}
              />
              {filtersActive ? (
                <Button label="Clear filters" variant="secondary" onPress={clearFilters} />
              ) : null}
            </View>
          }
          columnWrapperStyle={visibleVehicles.length > 1 ? styles.columns : undefined}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <VehicleCard vehicle={item} />
            </View>
          )}
          style={styles.list}
          testID="vehicle-browse-list"
        />
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { gap: spacing[4], paddingTop: spacing[2] },
  header: { gap: spacing[5] },
  greetingRow: { flexDirection: "row", alignItems: "center", gap: spacing[2] },
  greeting: { flex: 1 },
  headerIcon: { width: 28, height: 44, alignItems: "center", justifyContent: "center" },
  list: { flex: 1 },
  listHeader: { paddingBottom: spacing[3] },
  listHeaderContent: { gap: spacing[5] },
  featuredCard: {
    overflow: "hidden",
    borderRadius: 0,
    backgroundColor: colors.surface.default,
  },
  featuredPressed: { opacity: 0.86 },
  featuredImage: { width: "100%", height: 148, aspectRatio: undefined, borderRadius: 0 },
  featuredCopy: { paddingHorizontal: spacing[3], paddingVertical: spacing[3] },
  featuredTitleRow: { flexDirection: "row", alignItems: "flex-end", gap: spacing[3] },
  featuredName: { flex: 1, gap: spacing[1] },
  featuredPrice: { color: colors.brand.primary },
  bookNow: { textDecorationLine: "underline" },
  listContent: { gap: spacing[4], paddingBottom: spacing[4] },
  columns: { gap: spacing[3] },
  item: { flex: 1, maxWidth: (layout.maxContentWidth - layout.screenGutter * 2 - spacing[3]) / 2 },
  emptyContent: { flexGrow: 1, justifyContent: "center", paddingBottom: spacing[8] },
  emptyButton: { backgroundColor: colors.surface.default },
});
