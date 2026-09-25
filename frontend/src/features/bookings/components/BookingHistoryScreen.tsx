import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { Badge } from "@/components/ui/Badge";
import { BottomNavigation } from "@/components/ui/BottomNavigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FeedbackState } from "@/components/ui/FeedbackState";
import { Screen } from "@/components/ui/Screen";
import { TopBar } from "@/components/ui/TopBar";
import { colors, spacing } from "@/design-system/tokens";
import { formatNaira } from "../domain/calculateQuote";
import { bookingRepository } from "../repositories/mockBookingRepository";
import type { Booking, BookingRepository, BookingStatus } from "../repositories/bookingRepository";
import { formatTime } from "./TimePicker";

const statusTone: Record<BookingStatus, "warning" | "success" | "error" | "info"> = {
  pending: "warning",
  confirmed: "success",
  cancelled: "error",
  completed: "info",
};
export function BookingHistoryScreen({
  repository = bookingRepository,
}: {
  repository?: BookingRepository;
}) {
  const router = useRouter();
  const [state, setState] = useState<{ loading: boolean; data: Booking[]; error: boolean }>({
    loading: true,
    data: [],
    error: false,
  });
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus | "all">("all");
  const fetchBookings = useCallback(() => {
    repository
      .listBookings()
      .then((data) => setState({ loading: false, data, error: false }))
      .catch(() => setState({ loading: false, data: [], error: true }));
  }, [repository]);
  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);
  if (state.loading)
    return (
      <Screen>
        <FeedbackState kind="loading" title="Loading mock bookings" />
      </Screen>
    );
  if (state.error)
    return (
      <Screen>
        <FeedbackState
          kind="error"
          title="Couldn't load mock bookings"
          onRetry={() => {
            setState((current) => ({ ...current, loading: true, error: false }));
            fetchBookings();
          }}
        />
      </Screen>
    );
  const visibleBookings = state.data.filter(
    (booking) => selectedStatus === "all" || booking.status === selectedStatus,
  );
  return (
    <Screen contentStyle={styles.screen} footer={<BottomNavigation active="bookings" />}>
      <TopBar title="History" onBack={() => router.back()} />
      <View accessibilityRole="tablist" style={styles.tabs}>
        {(["all", "pending", "completed"] as const).map((status) => {
          const selected = status === selectedStatus;
          return (
            <Pressable
              key={status}
              accessibilityRole="tab"
              accessibilityLabel={status === "all" ? "All bookings" : `${status} bookings`}
              accessibilityState={{ selected }}
              onPress={() => setSelectedStatus(status)}
              style={[styles.tab, selected && styles.tabSelected]}
            >
              <AppText style={{ color: selected ? colors.surface.inverse : colors.text.muted }}>
                {status === "all" ? "Ongoing" : `${status[0].toUpperCase()}${status.slice(1)}`}
              </AppText>
            </Pressable>
          );
        })}
      </View>
      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {!visibleBookings.length ? (
          <FeedbackState
            kind="empty"
            title={
              selectedStatus === "all"
                ? "No mock bookings yet"
                : `No ${selectedStatus} mock bookings`
            }
            description="Complete a mock trip to see it here."
          />
        ) : (
          visibleBookings.map((booking) => (
            <Card
              key={booking.id}
              accessibilityLabel={`View ${booking.status} mock booking`}
              onPress={() => router.push(`/(renter)/bookings/${booking.id}`)}
              childrenStyle={styles.row}
            >
              <View style={styles.top}>
                <AppText variant="title">
                  {booking.draft.startDate} → {booking.draft.endDate}
                </AppText>
                <Badge
                  label={`${booking.status[0].toUpperCase()}${booking.status.slice(1)} (mock)`}
                  tone={statusTone[booking.status]}
                />
              </View>
              <AppText tone="secondary">
                {booking.draft.pickupLocation} → {booking.draft.dropOffLocation}
              </AppText>
              <AppText variant="caption" tone="secondary">
                {formatTime(booking.draft.pickupTime ?? "")} pickup ·{" "}
                {formatTime(booking.draft.dropOffTime ?? "")} drop-off
              </AppText>
              <AppText variant="price">{formatNaira(booking.quote.total)}</AppText>
            </Card>
          ))
        )}
        <Button
          label="Browse available cars"
          variant="secondary"
          onPress={() => router.push("/(renter)/browse")}
        />
      </ScrollView>
    </Screen>
  );
}
const styles = StyleSheet.create({
  screen: { gap: spacing[2], paddingTop: spacing[1], paddingBottom: 0 },
  tabs: { flexDirection: "row", justifyContent: "space-between", marginBottom: spacing[3] },
  tab: { flex: 1, minHeight: 44, alignItems: "center", justifyContent: "center" },
  tabSelected: { borderBottomWidth: 2, borderBottomColor: colors.surface.inverse },
  list: { gap: spacing[3], paddingBottom: spacing[4] },
  row: { gap: spacing[2] },
  top: { flexDirection: "row", justifyContent: "space-between", gap: spacing[2] },
});
