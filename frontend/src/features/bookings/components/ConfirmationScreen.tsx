import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FeedbackState } from "@/components/ui/FeedbackState";
import { PlatformSymbol } from "@/components/ui/PlatformSymbol";
import { Screen } from "@/components/ui/Screen";
import { colors, radii, spacing } from "@/design-system/tokens";
import { formatNaira } from "../domain/calculateQuote";
import { bookingRepository } from "../repositories/mockBookingRepository";
import type { Booking, BookingRepository } from "../repositories/bookingRepository";
import { useBookingDraft } from "../state/BookingDraftProvider";
import { formatTime } from "./TimePicker";

export function ConfirmationScreen({
  bookingId,
  repository = bookingRepository,
}: {
  bookingId: string;
  repository?: BookingRepository;
}) {
  const router = useRouter();
  const { resetDraft } = useBookingDraft();
  const [booking, setBooking] = useState<Booking | null | undefined>(undefined);
  useEffect(() => {
    repository
      .getBooking(bookingId)
      .then(setBooking)
      .catch(() => setBooking(null));
  }, [bookingId, repository]);
  if (booking === undefined)
    return (
      <Screen>
        <FeedbackState kind="loading" title="Loading confirmation" />
      </Screen>
    );
  if (!booking)
    return (
      <Screen>
        <FeedbackState
          kind="error"
          title="Mock booking not found"
          description="It may have been cleared from this test session."
        />
      </Screen>
    );
  return (
    <Screen scroll contentStyle={styles.screen}>
      <View
        accessibilityLabel="Mock booking confirmed"
        accessibilityRole="image"
        style={styles.successMark}
      >
        <PlatformSymbol
          name={{ ios: "checkmark", android: "check", web: "check" }}
          size={32}
          tintColor={colors.text.inverse}
        />
      </View>
      <AppText variant="heading" style={styles.centered}>
        Thank you!
      </AppText>
      <Badge label="Confirmed (mock)" tone="success" />
      <Card childrenStyle={styles.card}>
        <AppText variant="title">No payment was charged</AppText>
        <AppText tone="secondary">
          No real reservation was created. This confirmation exists only in local mock data.
        </AppText>
        <AppText variant="caption" tone="muted">
          Reference: {booking.id}
        </AppText>
      </Card>
      <Card childrenStyle={styles.card}>
        <AppText variant="bodyStrong">
          {booking.draft.startDate} at {formatTime(booking.draft.pickupTime ?? "")}
          {" → "}
          {booking.draft.endDate} at {formatTime(booking.draft.dropOffTime ?? "")}
        </AppText>
        <AppText tone="secondary">
          {booking.draft.pickupLocation} → {booking.draft.dropOffLocation}
        </AppText>
        <AppText variant="price">{formatNaira(booking.quote.total)} estimated mock total</AppText>
      </Card>
      <Button
        label="View booking history"
        onPress={() => {
          resetDraft();
          router.replace("/(renter)/bookings");
        }}
      />
      <Button
        label="Browse cars"
        variant="secondary"
        onPress={() => {
          resetDraft();
          router.replace("/(renter)/browse");
        }}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({
  screen: { gap: spacing[5], alignItems: "stretch", justifyContent: "center" },
  card: { gap: spacing[2] },
  centered: { textAlign: "center" },
  successMark: {
    width: 72,
    height: 72,
    alignSelf: "center",
    borderRadius: radii.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface.inverse,
  },
});
