import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { AppText } from "@/components/ui/AppText";
import { FeedbackState } from "@/components/ui/FeedbackState";
import { Screen } from "@/components/ui/Screen";
import { TopBar } from "@/components/ui/TopBar";
import { colors, spacing } from "@/design-system/tokens";
import type { HostListing } from "../domain/hostListing";
import { hostListingRepository } from "../repositories/mockHostListingRepository";
import type { HostListingRepository } from "../repositories/hostListingRepository";
import { ListingCard } from "./ListingCard";

export function HostDashboardScreen({
  repository = hostListingRepository,
}: {
  repository?: HostListingRepository;
}) {
  const router = useRouter();
  const [state, setState] = useState<{ loading: boolean; error: boolean; data: HostListing[] }>({
    loading: true,
    error: false,
    data: [],
  });
  const load = useCallback(() => {
    repository
      .listListings()
      .then((data) => setState({ loading: false, error: false, data }))
      .catch(() => setState({ loading: false, error: true, data: [] }));
  }, [repository]);
  useEffect(() => {
    load();
  }, [load]);
  if (state.loading)
    return (
      <Screen>
        <FeedbackState kind="loading" title="Loading mock host dashboard" />
      </Screen>
    );
  if (state.error)
    return (
      <Screen>
        <FeedbackState
          kind="error"
          title="Couldn't load mock listings"
          onRetry={() => {
            setState((current) => ({ ...current, loading: true, error: false }));
            load();
          }}
        />
      </Screen>
    );
  return (
    <Screen contentStyle={styles.screen}>
      <TopBar
        title="Listed Cars"
        onBack={() => router.back()}
        trailingLabel="Create mock listing"
        onTrailingPress={() => router.push("/(host)/host/listings/new")}
      />
      <View style={styles.tabs}>
        <AppText variant="bodyStrong" style={styles.tabSelected}>
          Pending
        </AppText>
        <AppText tone="muted">Approved</AppText>
      </View>
      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        <View style={styles.utilityRow}>
          <AppText variant="caption" tone="secondary">
            Local mock listings only.
          </AppText>
          <Pressable
            accessibilityLabel="Incoming mock trip requests"
            accessibilityRole="button"
            onPress={() => router.push("/(host)/host/trip-requests")}
          >
            <AppText variant="captionStrong" tone="link">
              Trip requests
            </AppText>
          </Pressable>
        </View>
        {!state.data.length ? (
          <FeedbackState
            kind="empty"
            title="No mock listings"
            description="Create a local mock listing to test the host flow."
          />
        ) : (
          state.data.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              onPress={() => router.push(`/(host)/host/listings/${listing.id}`)}
            />
          ))
        )}
      </ScrollView>
    </Screen>
  );
}
const styles = StyleSheet.create({
  screen: { gap: spacing[2], paddingTop: spacing[1], paddingBottom: 0 },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: spacing[8],
    paddingBottom: spacing[2],
  },
  tabSelected: {
    color: colors.surface.inverse,
    borderBottomWidth: 2,
    borderBottomColor: colors.surface.inverse,
    paddingBottom: spacing[2],
  },
  list: { gap: spacing[3], paddingBottom: spacing[4] },
  utilityRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
});
