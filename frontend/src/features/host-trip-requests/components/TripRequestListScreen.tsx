import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { AppText } from "@/components/ui/AppText";
import { Badge } from "@/components/ui/Badge";
import { FeedbackState } from "@/components/ui/FeedbackState";
import { Screen } from "@/components/ui/Screen";
import { TopBar } from "@/components/ui/TopBar";
import { colors, radii, spacing } from "@/design-system/tokens";
import { formatNaira } from "@/features/bookings/domain/calculateQuote";
import {
  tripRequestStatusLabels,
  type TripRequest,
  type TripRequestStatus,
} from "../domain/tripRequest";
import type { HostTripRequestRepository } from "../repositories/hostTripRequestRepository";
import { hostTripRequestRepository } from "../repositories/mockHostTripRequestRepository";
const tones: Record<TripRequestStatus, "warning" | "success" | "error" | "info"> = {
  pending: "warning",
  approved: "success",
  declined: "error",
  completed: "info",
};

export function TripRequestListScreen({
  repository = hostTripRequestRepository,
}: {
  repository?: HostTripRequestRepository;
}) {
  const router = useRouter();
  const [state, setState] = useState<{ loading: boolean; error: boolean; data: TripRequest[] }>({
    loading: true,
    error: false,
    data: [],
  });
  const load = useCallback(() => {
    repository
      .listTripRequests()
      .then((data) => setState({ loading: false, error: false, data }))
      .catch(() => setState({ loading: false, error: true, data: [] }));
  }, [repository]);
  useEffect(() => {
    load();
  }, [load]);
  if (state.loading)
    return (
      <Screen>
        <FeedbackState kind="loading" title="Loading mock trip requests" />
      </Screen>
    );
  if (state.error)
    return (
      <Screen>
        <FeedbackState
          kind="error"
          title="Couldn't load mock trip requests"
          onRetry={() => {
            setState((current) => ({ ...current, loading: true, error: false }));
            load();
          }}
        />
      </Screen>
    );
  return (
    <Screen contentStyle={styles.screen}>
      <TopBar title="Trip Requests" onBack={() => router.back()} />
      <View style={styles.headingCopy}>
        <AppText tone="secondary">
          Actions change host-side mock data only. No renter is contacted.
        </AppText>
      </View>
      <FlatList
        accessibilityLabel={`${state.data.length} mock trip requests`}
        contentContainerStyle={state.data.length ? styles.listContent : styles.emptyContent}
        data={state.data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(request) => request.id}
        ListEmptyComponent={<FeedbackState kind="empty" title="No mock trip requests" />}
        renderItem={({ item: request }) => (
          <Pressable
            key={request.id}
            onPress={() => router.push(`/(host)/host/trip-requests/${request.id}`)}
            accessibilityLabel={`View ${request.status} mock request for ${request.vehicleName}`}
            accessibilityRole="button"
            style={({ pressed }) => [styles.card, pressed && styles.pressed]}
          >
            <View style={styles.heading}>
              <View style={styles.titleRow}>
                <View
                  style={[
                    styles.statusDot,
                    {
                      backgroundColor:
                        tones[request.status] === "success"
                          ? colors.feedback.success
                          : tones[request.status] === "error"
                            ? colors.feedback.error
                            : colors.surface.inverse,
                    },
                  ]}
                />
                <AppText variant="title">{request.vehicleName}</AppText>
              </View>
              <Badge label={tripRequestStatusLabels[request.status]} tone={tones[request.status]} />
            </View>
            <AppText tone="secondary">
              {request.renterDisplayName} · {request.startDate} → {request.endDate}
            </AppText>
            <AppText variant="price">
              {formatNaira(request.estimatedTotalNgn)} mock estimate
            </AppText>
          </Pressable>
        )}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({
  screen: { gap: spacing[4] },
  listContent: { gap: spacing[3], paddingBottom: spacing[8] },
  emptyContent: { flexGrow: 1, justifyContent: "center" },
  card: {
    gap: spacing[2],
    paddingVertical: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
  },
  heading: { flexDirection: "row", justifyContent: "space-between", gap: spacing[2] },
  titleRow: { flex: 1, flexDirection: "row", alignItems: "center", gap: spacing[2] },
  statusDot: { width: 18, height: 18, borderRadius: radii.pill },
  pressed: { opacity: 0.76 },
  headingCopy: { gap: spacing[1] },
});
