import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { Button } from "@/components/ui/Button";
import { PlatformSymbol } from "@/components/ui/PlatformSymbol";
import { Screen } from "@/components/ui/Screen";
import { TextField } from "@/components/ui/TextField";
import { TopBar } from "@/components/ui/TopBar";
import { VehicleImage } from "@/components/ui/VehicleImage";
import { colors, radii, spacing } from "@/design-system/tokens";
import { vehicleRepository } from "@/features/vehicles/repositories/mockVehicleRepository";
import type { Vehicle } from "@/features/vehicles/types";
import { validateBookingDraft, type BookingDraftErrors } from "../domain/bookingDraft";
import { useBookingDraft } from "../state/BookingDraftProvider";
import { DateRangePicker } from "./DateRangePicker";
import { formatTime, TimePicker } from "./TimePicker";

function formatDate(value: string) {
  if (!value) return "Choose date";
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function TripDetailsScreen() {
  const router = useRouter();
  const { draft, updateDraft, resetDraft } = useBookingDraft();
  const [errors, setErrors] = useState<BookingDraftErrors>({});
  const [vehicle, setVehicle] = useState<Vehicle | null>();
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [timePicker, setTimePicker] = useState<"pickup" | "dropoff" | null>(null);
  const [activeLocation, setActiveLocation] = useState<"pickup" | "dropoff">("pickup");
  useEffect(() => {
    if (!draft.vehicleId) return;
    vehicleRepository
      .getVehicle(draft.vehicleId)
      .then(setVehicle)
      .catch(() => setVehicle(null));
  }, [draft.vehicleId]);
  const continueToQuote = () => {
    const nextErrors = validateBookingDraft(draft);
    setErrors(nextErrors);
    if (!Object.keys(nextErrors).length) router.push("/(renter)/trip-quote");
  };
  return (
    <Screen scroll contentStyle={styles.screen}>
      <TopBar title="Rent Details" onBack={() => router.back()} />
      {vehicle?.id === draft.vehicleId ? (
        <View style={styles.vehicleSummary}>
          <VehicleImage
            label={vehicle.images[0]?.alt ?? `${vehicle.make} ${vehicle.model} vehicle image`}
            source={vehicle.images[0]?.uri}
            style={styles.vehicleImage}
          />
          <View style={styles.vehicleCopy}>
            <AppText variant="title">
              {vehicle.make} {vehicle.model}
            </AppText>
            <AppText variant="price" style={styles.vehiclePrice}>
              ₦{vehicle.dailyRateNgn.toLocaleString("en-NG")}
              <AppText variant="captionStrong" style={styles.vehiclePrice}>
                /Day
              </AppText>
            </AppText>
          </View>
        </View>
      ) : null}
      <View style={styles.form}>
        <View style={styles.fieldGroup}>
          <AppText variant="captionStrong">Pick up</AppText>
          <View style={styles.formRow}>
            <Pressable
              accessibilityLabel={`Pickup date, ${draft.startDate || "not selected"}`}
              accessibilityRole="button"
              onPress={() => setCalendarVisible(true)}
              style={[styles.pickerField, errors.startDate && styles.pickerFieldError]}
            >
              <PlatformSymbol
                name={{ ios: "calendar", android: "calendar-today", web: "calendar-today" }}
                size={18}
                tintColor={colors.surface.inverse}
              />
              <View style={styles.pickerCopy}>
                <AppText variant="caption" tone="secondary">
                  Date
                </AppText>
                <AppText variant="bodyStrong">{formatDate(draft.startDate)}</AppText>
              </View>
            </Pressable>
            <Pressable
              accessibilityLabel={`Pickup time, ${draft.pickupTime ? formatTime(draft.pickupTime) : "not selected"}`}
              accessibilityRole="button"
              onPress={() => setTimePicker("pickup")}
              style={[styles.pickerField, errors.pickupTime && styles.pickerFieldError]}
            >
              <PlatformSymbol
                name={{ ios: "clock", android: "schedule", web: "schedule" }}
                size={18}
                tintColor={colors.surface.inverse}
              />
              <View style={styles.pickerCopy}>
                <AppText variant="caption" tone="secondary">
                  Time
                </AppText>
                <AppText variant="bodyStrong">
                  {draft.pickupTime ? formatTime(draft.pickupTime) : "Choose time"}
                </AppText>
              </View>
            </Pressable>
          </View>
          {errors.startDate || errors.pickupTime ? (
            <AppText accessibilityRole="alert" variant="caption" style={styles.error}>
              {errors.startDate ?? errors.pickupTime}
            </AppText>
          ) : null}
        </View>

        <View style={styles.fieldGroup}>
          <AppText variant="captionStrong">Drop off</AppText>
          <View style={styles.formRow}>
            <Pressable
              accessibilityLabel={`Drop-off date, ${draft.endDate || "not selected"}`}
              accessibilityRole="button"
              onPress={() => setCalendarVisible(true)}
              style={[styles.pickerField, errors.endDate && styles.pickerFieldError]}
            >
              <PlatformSymbol
                name={{ ios: "calendar", android: "calendar-today", web: "calendar-today" }}
                size={18}
                tintColor={colors.surface.inverse}
              />
              <View style={styles.pickerCopy}>
                <AppText variant="caption" tone="secondary">
                  Date
                </AppText>
                <AppText variant="bodyStrong">{formatDate(draft.endDate)}</AppText>
              </View>
            </Pressable>
            <Pressable
              accessibilityLabel={`Drop-off time, ${draft.dropOffTime ? formatTime(draft.dropOffTime) : "not selected"}`}
              accessibilityRole="button"
              onPress={() => setTimePicker("dropoff")}
              style={[styles.pickerField, errors.dropOffTime && styles.pickerFieldError]}
            >
              <PlatformSymbol
                name={{ ios: "clock", android: "schedule", web: "schedule" }}
                size={18}
                tintColor={colors.surface.inverse}
              />
              <View style={styles.pickerCopy}>
                <AppText variant="caption" tone="secondary">
                  Time
                </AppText>
                <AppText variant="bodyStrong">
                  {draft.dropOffTime ? formatTime(draft.dropOffTime) : "Choose time"}
                </AppText>
              </View>
            </Pressable>
          </View>
          {errors.endDate || errors.dropOffTime ? (
            <AppText accessibilityRole="alert" variant="caption" style={styles.error}>
              {errors.endDate ?? errors.dropOffTime}
            </AppText>
          ) : null}
        </View>

        <View accessibilityRole="tablist" style={styles.locationTabs}>
          {(["pickup", "dropoff"] as const).map((location) => {
            const selected = activeLocation === location;
            return (
              <Pressable
                key={location}
                accessibilityRole="tab"
                accessibilityState={{ selected }}
                onPress={() => setActiveLocation(location)}
                style={[styles.locationTab, selected && styles.locationTabSelected]}
              >
                <AppText
                  variant="bodyStrong"
                  style={selected ? styles.locationTabTextSelected : styles.locationTabText}
                >
                  {location === "pickup" ? "Pick Up" : "Drop Off"}
                </AppText>
              </Pressable>
            );
          })}
        </View>
        {activeLocation === "pickup" ? (
          <TextField
            label="Pickup location"
            required
            value={draft.pickupLocation}
            placeholder="Enter pickup address"
            onChangeText={(pickupLocation) => updateDraft({ pickupLocation })}
            error={errors.pickupLocation}
          />
        ) : (
          <TextField
            label="Drop-off location"
            required
            value={draft.dropOffLocation}
            placeholder="Enter drop-off address"
            onChangeText={(dropOffLocation) => updateDraft({ dropOffLocation })}
            error={errors.dropOffLocation}
          />
        )}
        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: draft.eligibilityAcknowledged }}
          accessibilityLabel="Mock driver eligibility acknowledgement"
          onPress={() => updateDraft({ eligibilityAcknowledged: !draft.eligibilityAcknowledged })}
          style={styles.acknowledgement}
        >
          <View style={[styles.checkbox, draft.eligibilityAcknowledged && styles.checkboxChecked]}>
            {draft.eligibilityAcknowledged ? (
              <PlatformSymbol
                name={{ ios: "checkmark", android: "check", web: "check" }}
                size={16}
                tintColor={colors.text.inverse}
              />
            ) : null}
          </View>
          <AppText style={styles.acknowledgementText}>
            I acknowledge this is mock-only. Driver eligibility is not verified.
          </AppText>
        </Pressable>
        {errors.eligibilityAcknowledged ? (
          <AppText accessibilityLiveRegion="polite" tone="secondary" style={styles.error}>
            {errors.eligibilityAcknowledged}
          </AppText>
        ) : null}
      </View>
      <AppText tone="secondary">
        Leaving this step preserves the draft. Cancel clears it; no quote is stored.
      </AppText>
      <View style={styles.actions}>
        <Button
          label="Cancel trip"
          variant="secondary"
          onPress={() => {
            resetDraft();
            router.replace("/(renter)/browse");
          }}
        />
        <Button label="Rent Vehicle" onPress={continueToQuote} />
      </View>
      {calendarVisible ? (
        <DateRangePicker
          visible
          startDate={draft.startDate}
          endDate={draft.endDate}
          onClose={() => setCalendarVisible(false)}
          onApply={(startDate, endDate) => {
            updateDraft({ startDate, endDate });
            setCalendarVisible(false);
          }}
        />
      ) : null}
      {timePicker === "pickup" ? (
        <TimePicker
          visible
          title="Choose pickup time"
          value={draft.pickupTime}
          onClose={() => setTimePicker(null)}
          onApply={(pickupTime) => {
            updateDraft({ pickupTime });
            setTimePicker(null);
          }}
        />
      ) : null}
      {timePicker === "dropoff" ? (
        <TimePicker
          visible
          title="Choose drop-off time"
          value={draft.dropOffTime}
          onClose={() => setTimePicker(null)}
          onApply={(dropOffTime) => {
            updateDraft({ dropOffTime });
            setTimePicker(null);
          }}
        />
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { gap: spacing[5] },
  form: { gap: spacing[4] },
  fieldGroup: { gap: spacing[2] },
  formRow: { flexDirection: "row", gap: spacing[3] },
  pickerField: {
    flex: 1,
    minWidth: 0,
    minHeight: 62,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    padding: spacing[3],
    borderWidth: 1,
    borderColor: colors.border.default,
    borderRadius: radii.medium,
    backgroundColor: colors.surface.default,
  },
  pickerFieldError: { borderWidth: 2, borderColor: colors.feedback.error },
  pickerCopy: { flex: 1, gap: 1 },
  locationTabs: {
    flexDirection: "row",
    padding: spacing[1],
    borderRadius: radii.pill,
    backgroundColor: colors.surface.muted,
  },
  locationTab: {
    flex: 1,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.pill,
  },
  locationTabSelected: { backgroundColor: colors.surface.inverse },
  locationTabText: { color: colors.text.secondary },
  locationTabTextSelected: { color: colors.text.inverse },
  vehicleSummary: { flexDirection: "row", alignItems: "center", gap: spacing[3] },
  vehicleImage: { width: 152, height: 86, aspectRatio: undefined },
  vehicleCopy: { flex: 1, gap: spacing[1] },
  vehiclePrice: { color: colors.brand.primary },
  acknowledgement: { flexDirection: "row", alignItems: "flex-start", gap: spacing[2] },
  checkbox: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border.strong,
    borderRadius: radii.small,
  },
  checkboxChecked: {
    borderColor: colors.surface.inverse,
    backgroundColor: colors.surface.inverse,
  },
  acknowledgementText: { flex: 1 },
  error: { color: colors.feedback.error },
  actions: { gap: spacing[3] },
});
