import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { AppText } from "@/components/ui/AppText";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { FeedbackState } from "@/components/ui/FeedbackState";
import { Screen } from "@/components/ui/Screen";
import { spacing } from "@/design-system/tokens";
import { formatNaira } from "../domain/calculateQuote";
import { bookingRepository } from "../repositories/mockBookingRepository";
import type { Booking, BookingRepository } from "../repositories/bookingRepository";
import { formatTime } from "./TimePicker";
export function BookingDetailScreen({
  bookingId,
  repository = bookingRepository,
}: {
  bookingId: string;
  repository?: BookingRepository;
}) {
  const [booking, setBooking] = useState<Booking | null | undefined>();
  useEffect(() => {
    repository
      .getBooking(bookingId)
      .then(setBooking)
      .catch(() => setBooking(null));
  }, [bookingId, repository]);
  if (booking === undefined)
    return (
      <Screen>
        <FeedbackState kind="loading" title="Loading mock booking" />
      </Screen>
    );
  if (!booking)
    return (
      <Screen>
        <FeedbackState kind="empty" title="Mock booking not found" />{" "}
      </Screen>
    );
  return (
    <Screen scroll contentStyle={styles.screen}>
      <AppText variant="heading">Mock booking details</AppText>
      <Badge label={`${booking.status} (mock)`} tone="success" />
      <Card childrenStyle={styles.card}>
        <AppText>
          {booking.draft.startDate} at {formatTime(booking.draft.pickupTime ?? "")} to{" "}
          {booking.draft.endDate} at {formatTime(booking.draft.dropOffTime ?? "")}
        </AppText>
        <AppText>
          {booking.draft.pickupLocation} → {booking.draft.dropOffLocation}
        </AppText>
        <AppText variant="price">{formatNaira(booking.quote.total)}</AppText>
        <AppText tone="secondary">No payment or live reservation exists.</AppText>
      </Card>
    </Screen>
  );
}
const styles = StyleSheet.create({ screen: { gap: spacing[4] }, card: { gap: spacing[2] } });
