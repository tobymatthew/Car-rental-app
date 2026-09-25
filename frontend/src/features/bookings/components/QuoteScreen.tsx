import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FeedbackState } from "@/components/ui/FeedbackState";
import { Screen } from "@/components/ui/Screen";
import { TopBar } from "@/components/ui/TopBar";
import { VehicleImage } from "@/components/ui/VehicleImage";
import { colors, spacing } from "@/design-system/tokens";
import { vehicleRepository } from "@/features/vehicles/repositories/mockVehicleRepository";
import type { Vehicle } from "@/features/vehicles/types";
import { calculateQuote, formatNaira, type BookingQuote } from "../domain/calculateQuote";
import { validateBookingDraft } from "../domain/bookingDraft";
import { bookingRepository } from "../repositories/mockBookingRepository";
import type { BookingRepository } from "../repositories/bookingRepository";
import { useBookingDraft } from "../state/BookingDraftProvider";
import { formatTime } from "./TimePicker";

type Props = { repository?: BookingRepository };
export function QuoteScreen({ repository = bookingRepository }: Props) {
  const router = useRouter();
  const { draft } = useBookingDraft();
  const [vehicle, setVehicle] = useState<Vehicle | null | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>();
  const draftIsValid = Object.keys(validateBookingDraft(draft)).length === 0;
  useEffect(() => {
    if (!draftIsValid) return;
    vehicleRepository
      .getVehicle(draft.vehicleId)
      .then(setVehicle)
      .catch(() => setVehicle(null));
  }, [draft.vehicleId, draftIsValid]);
  if (!draftIsValid)
    return (
      <Screen>
        <FeedbackState
          kind="error"
          title="Trip details need updating"
          description="A complete, valid mock trip is required before a quote can be confirmed."
          onRetry={() => router.replace("/(renter)/trip-details")}
        />
      </Screen>
    );
  if (vehicle === undefined)
    return (
      <Screen>
        <FeedbackState kind="loading" title="Calculating quote" />
      </Screen>
    );
  if (!vehicle)
    return (
      <Screen>
        <FeedbackState
          kind="error"
          title="Vehicle unavailable"
          description="Return to trip details and choose an available mock vehicle."
        />
      </Screen>
    );
  let quote: BookingQuote;
  try {
    quote = calculateQuote(draft, { dailyRateNgn: vehicle.dailyRateNgn, currency: "NGN" });
  } catch {
    return (
      <Screen>
        <FeedbackState
          kind="error"
          title="Trip details need updating"
          description="Return to the form and correct the required dates and locations."
          onRetry={() => router.replace("/(renter)/trip-details")}
        />
      </Screen>
    );
  }
  const lines = [
    ["Rental", `${quote.rentalDays} days × ${formatNaira(quote.dailyRate)}`, quote.rentalSubtotal],
    ["Service fee", "10% mock policy", quote.serviceFee],
    [
      "Location fee",
      quote.deliveryOrLocationFee ? "Different pickup and drop-off" : "Same pickup and drop-off",
      quote.deliveryOrLocationFee,
    ],
  ] as const;
  const confirm = async () => {
    setSubmitting(true);
    setError(undefined);
    try {
      const booking = await repository.createMockBooking({
        draft: {
          ...draft,
          confirmationKey: `${draft.vehicleId}:${draft.startDate}:${draft.pickupTime}:${draft.endDate}:${draft.dropOffTime}:${draft.pickupLocation}:${draft.dropOffLocation}`,
        },
        quote,
      });
      router.replace({
        pathname: "/(renter)/trip-confirmation",
        params: { bookingId: booking.id },
      });
    } catch {
      setError("Couldn't create this mock booking. Please try again.");
      setSubmitting(false);
    }
  };
  return (
    <Screen scroll contentStyle={styles.screen}>
      <TopBar title="Payment Details" onBack={() => router.back()} />
      <View style={styles.tripHeader}>
        <VehicleImage
          label={vehicle.images[0]?.alt ?? `${vehicle.make} ${vehicle.model} vehicle image`}
          source={vehicle.images[0]?.uri}
          style={styles.vehicleImage}
        />
        <View style={styles.tripCopy}>
          <AppText variant="title">
            {vehicle.make} {vehicle.model}
          </AppText>
          <AppText variant="caption">Total Fee</AppText>
          <AppText variant="price" style={styles.totalPrice}>
            {formatNaira(quote.total)}
          </AppText>
          <AppText variant="caption" tone="muted">
            {quote.rentalDays} days · {formatNaira(quote.dailyRate)}/day
          </AppText>
        </View>
      </View>
      <Card childrenStyle={styles.lines} style={styles.breakdown}>
        <View style={styles.line}>
          <View>
            <AppText variant="bodyStrong">Trip schedule</AppText>
            <AppText variant="caption" tone="secondary">
              {draft.startDate} at {formatTime(draft.pickupTime)}
            </AppText>
          </View>
          <AppText variant="captionStrong">
            {draft.endDate} · {formatTime(draft.dropOffTime)}
          </AppText>
        </View>
        {lines.map(([title, detail, amount]) => (
          <View key={title} style={styles.line}>
            <View>
              <AppText variant="bodyStrong">{title}</AppText>
              <AppText variant="caption" tone="secondary">
                {detail}
              </AppText>
            </View>
            <AppText>{formatNaira(amount)}</AppText>
          </View>
        ))}
        <View style={styles.total}>
          <AppText variant="title">Estimated total</AppText>
          <AppText variant="price">{formatNaira(quote.total)}</AppText>
        </View>
      </Card>
      {error ? (
        <AppText accessibilityRole="alert" style={styles.error}>
          {error}
        </AppText>
      ) : null}
      <View style={styles.paymentChoices}>
        <Button
          label="Pay with bank transfer (mock)"
          variant="secondary"
          disabled={submitting}
          onPress={confirm}
        />
        <Button
          label="Pay with card (mock)"
          variant="secondary"
          disabled={submitting}
          onPress={confirm}
        />
      </View>
      <Button label="Pay mock total" loading={submitting} onPress={confirm} />
      <Button
        label="Edit trip details"
        variant="secondary"
        disabled={submitting}
        onPress={() => router.back()}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({
  screen: { gap: spacing[5] },
  tripHeader: { flexDirection: "row", alignItems: "center", gap: spacing[3] },
  vehicleImage: { width: 110, height: 81, aspectRatio: undefined },
  tripCopy: { flex: 1, gap: 1 },
  totalPrice: { color: colors.brand.primary },
  lines: { gap: spacing[4] },
  breakdown: { backgroundColor: colors.surface.canvas, paddingHorizontal: 0, paddingVertical: 0 },
  line: { flexDirection: "row", justifyContent: "space-between", gap: spacing[3] },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: colors.border.default,
    paddingTop: spacing[4],
  },
  error: { color: colors.feedback.error },
  paymentChoices: { gap: spacing[3] },
});
