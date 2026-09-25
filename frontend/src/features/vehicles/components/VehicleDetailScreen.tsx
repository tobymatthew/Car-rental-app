import { useRouter } from "expo-router";
import { useEffect, useReducer, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FeedbackState } from "@/components/ui/FeedbackState";
import { Screen } from "@/components/ui/Screen";
import { TopBar } from "@/components/ui/TopBar";
import { VehicleImage } from "@/components/ui/VehicleImage";
import { colors, spacing } from "@/design-system/tokens";
import { useBookingDraft } from "@/features/bookings/state/BookingDraftProvider";
import { vehicleRepository } from "../repositories/mockVehicleRepository";
import type { VehicleRepository } from "../repositories/vehicleRepository";
import type { Vehicle } from "../types";

type Props = { vehicleId: string; repository?: VehicleRepository };

export function VehicleDetailScreen({ vehicleId, repository = vehicleRepository }: Props) {
  const router = useRouter();
  const { chooseVehicle } = useBookingDraft();
  const [retryVersion, retry] = useReducer((value: number) => value + 1, 0);
  const [state, setState] = useState<{
    vehicle?: Vehicle | null;
    loading: boolean;
    error: boolean;
  }>({
    loading: true,
    error: false,
  });
  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    repository
      .getVehicle(vehicleId, { signal: controller.signal })
      .then((vehicle) => active && setState({ vehicle, loading: false, error: false }))
      .catch((error: unknown) => {
        if (active && !(error instanceof Error && error.name === "AbortError")) {
          setState({ loading: false, error: true });
        }
      });
    return () => {
      active = false;
      controller.abort();
    };
  }, [repository, retryVersion, vehicleId]);
  if (state.loading)
    return (
      <Screen>
        <FeedbackState kind="loading" title="Loading vehicle" />
      </Screen>
    );
  if (state.error)
    return (
      <Screen>
        <FeedbackState
          kind="error"
          title="Couldn't load this vehicle"
          onRetry={() => {
            setState({ loading: true, error: false });
            retry();
          }}
        />
      </Screen>
    );
  if (!state.vehicle)
    return (
      <Screen>
        <FeedbackState
          kind="empty"
          title="Vehicle not found"
          description="This mock listing may have been removed."
        />
      </Screen>
    );
  const vehicle = state.vehicle;
  const name = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  return (
    <Screen scroll contentStyle={styles.screen}>
      <TopBar onBack={() => router.back()} />
      <ScrollView
        horizontal
        accessibilityLabel={`${name} image gallery`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.gallery}
      >
        {vehicle.images.map((image) => (
          <VehicleImage
            key={image.id}
            label={image.alt}
            source={image.uri}
            style={styles.heroImage}
          />
        ))}
      </ScrollView>
      <View style={styles.titleBlock}>
        <AppText variant="heading">{name}</AppText>
        <AppText variant="price" style={styles.price}>
          ₦{vehicle.dailyRateNgn.toLocaleString("en-NG")}
          <AppText variant="bodyStrong" style={styles.priceUnit}>
            /Day
          </AppText>
        </AppText>
        <Badge
          label={vehicle.availability === "available" ? "Available (mock)" : "Booked (mock)"}
          tone={vehicle.availability === "available" ? "success" : "warning"}
        />
      </View>
      <View style={styles.specifications}>
        <AppText variant="title">Specifications</AppText>
        <View style={styles.specGrid}>
          {[
            ["Location", vehicle.location.displayName],
            ["Vehicle make", vehicle.make],
            ["Features", vehicle.features.map((feature) => feature.label).join(" · ")],
            ["Year of make", String(vehicle.year)],
          ].map(([label, value]) => (
            <View key={label} style={styles.specCard}>
              <AppText variant="caption">{label}</AppText>
              <AppText variant="bodyStrong" numberOfLines={2}>
                {value}
              </AppText>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.host}>
        <Avatar label={vehicle.host.name} />
        <View>
          <AppText variant="caption" tone="muted">
            Hosted by
          </AppText>
          <AppText variant="title">{vehicle.host.name}</AppText>
          <AppText tone="secondary">Host details are mock data.</AppText>
        </View>
      </View>
      <AppText accessibilityLiveRegion="polite" tone="secondary">
        Availability, pricing, and vehicle details are mock data and are not backend-guaranteed.
      </AppText>
      <Button
        label="Rent Vehicle"
        disabled={vehicle.availability !== "available"}
        onPress={() => {
          chooseVehicle(vehicle.id);
          router.push("/(renter)/trip-details");
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { gap: spacing[4] },
  gallery: { gap: spacing[3] },
  heroImage: { width: 316, aspectRatio: 1.75 },
  titleBlock: { gap: spacing[1] },
  price: { color: colors.brand.primary },
  priceUnit: { color: colors.brand.primary, marginLeft: 2 },
  specifications: { gap: spacing[3], paddingTop: spacing[2] },
  specGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing[3] },
  specCard: {
    width: "47%",
    minHeight: 62,
    justifyContent: "center",
    gap: spacing[1],
    padding: spacing[3],
    borderRadius: 10,
    backgroundColor: colors.surface.default,
  },
  host: { flexDirection: "row", alignItems: "center", gap: spacing[3] },
});
