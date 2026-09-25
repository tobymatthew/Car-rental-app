import { useMemo, useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { Button } from "@/components/ui/Button";
import { PlatformSymbol } from "@/components/ui/PlatformSymbol";
import { colors, radii, spacing } from "@/design-system/tokens";

type Props = {
  visible: boolean;
  startDate: string;
  endDate: string;
  onApply: (startDate: string, endDate: string) => void;
  onClose: () => void;
};

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

function parseDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return Number.isNaN(date.getTime()) ? null : date;
}

function dateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function monthStart(date: Date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
}

function addMonths(date: Date, amount: number) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + amount, 1));
}

function monthCells(month: Date) {
  const firstWeekday = month.getUTCDay();
  const days = new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth() + 1, 0)).getUTCDate();
  return [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from(
      { length: days },
      (_, index) => new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth(), index + 1)),
    ),
  ];
}

export function DateRangePicker({ visible, startDate, endDate, onApply, onClose }: Props) {
  const defaultMonth = parseDate(startDate) ?? new Date();
  const [month, setMonth] = useState(monthStart(defaultMonth));
  const [start, setStart] = useState(startDate);
  const [end, setEnd] = useState(endDate);
  const cells = useMemo(() => monthCells(month), [month]);
  const today = dateKey(new Date());
  const monthLabel = month.toLocaleDateString("en-NG", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  const pick = (date: Date) => {
    const next = dateKey(date);
    if (!start || end || next <= start) {
      setStart(next);
      setEnd("");
      return;
    }
    setEnd(next);
  };

  return (
    <Modal animationType="fade" onRequestClose={onClose} transparent visible={visible}>
      <View accessibilityViewIsModal style={styles.overlay}>
        <View accessibilityLabel="Choose rental date range" style={styles.card}>
          <View style={styles.header}>
            <Pressable
              accessibilityLabel="Previous month"
              accessibilityRole="button"
              onPress={() => setMonth((current) => addMonths(current, -1))}
              style={styles.iconButton}
            >
              <PlatformSymbol
                name={{ ios: "chevron.left", android: "chevron-left", web: "chevron-left" }}
                size={21}
                tintColor={colors.surface.inverse}
              />
            </Pressable>
            <AppText variant="title">{monthLabel}</AppText>
            <Pressable
              accessibilityLabel="Next month"
              accessibilityRole="button"
              onPress={() => setMonth((current) => addMonths(current, 1))}
              style={styles.iconButton}
            >
              <PlatformSymbol
                name={{ ios: "chevron.right", android: "chevron-right", web: "chevron-right" }}
                size={21}
                tintColor={colors.surface.inverse}
              />
            </Pressable>
          </View>

          <View style={styles.weekRow} accessible={false}>
            {weekdays.map((weekday) => (
              <AppText key={weekday} variant="captionStrong" tone="secondary" style={styles.cell}>
                {weekday.slice(0, 1)}
              </AppText>
            ))}
          </View>
          <View style={styles.grid}>
            {cells.map((date, index) => {
              if (!date) return <View key={`blank-${index}`} style={styles.cell} />;
              const key = dateKey(date);
              const boundary = key === start || key === end;
              const inRange = Boolean(start && end && key > start && key < end);
              const disabled = key < today;
              return (
                <Pressable
                  key={key}
                  accessibilityLabel={date.toLocaleDateString("en-NG", {
                    dateStyle: "full",
                    timeZone: "UTC",
                  })}
                  accessibilityRole="button"
                  accessibilityState={{ disabled, selected: boundary || inRange }}
                  disabled={disabled}
                  onPress={() => pick(date)}
                  style={[
                    styles.day,
                    disabled && styles.dayDisabled,
                    inRange && styles.dayInRange,
                    boundary && styles.daySelected,
                  ]}
                >
                  <AppText
                    variant="captionStrong"
                    style={
                      boundary
                        ? styles.dayTextSelected
                        : disabled
                          ? styles.dayTextDisabled
                          : styles.dayText
                    }
                  >
                    {date.getUTCDate()}
                  </AppText>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.selectionSummary}>
            <View>
              <AppText variant="caption" tone="secondary">
                Pick up
              </AppText>
              <AppText variant="bodyStrong">{start || "Choose date"}</AppText>
            </View>
            <PlatformSymbol
              name={{ ios: "arrow.right", android: "arrow-forward", web: "arrow-forward" }}
              size={18}
              tintColor={colors.text.muted}
            />
            <View>
              <AppText variant="caption" tone="secondary">
                Drop off
              </AppText>
              <AppText variant="bodyStrong">{end || "Choose date"}</AppText>
            </View>
          </View>
          <View style={styles.actions}>
            <Button label="Cancel" variant="secondary" onPress={onClose} style={styles.action} />
            <Button
              label="Apply dates"
              disabled={!start || !end}
              onPress={() => onApply(start, end)}
              style={styles.action}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    padding: spacing[4],
    backgroundColor: colors.overlay,
  },
  card: {
    width: "100%",
    maxWidth: 380,
    alignSelf: "center",
    gap: spacing[3],
    padding: spacing[4],
    borderRadius: radii.large,
    backgroundColor: colors.surface.default,
  },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  iconButton: { width: 44, height: 44, alignItems: "center", justifyContent: "center" },
  weekRow: { flexDirection: "row" },
  grid: { flexDirection: "row", flexWrap: "wrap" },
  cell: { width: `${100 / 7}%`, textAlign: "center" },
  day: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.pill,
  },
  dayInRange: { borderRadius: 0, backgroundColor: colors.brand.subtle },
  dayDisabled: { opacity: 0.46 },
  daySelected: { backgroundColor: colors.surface.inverse, borderRadius: radii.pill },
  dayText: { color: colors.text.primary },
  dayTextSelected: { color: colors.text.inverse },
  dayTextDisabled: { color: colors.text.muted },
  selectionSummary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing[3],
    borderRadius: radii.medium,
    backgroundColor: colors.surface.muted,
  },
  actions: { flexDirection: "row", gap: spacing[2] },
  action: { flex: 1 },
});
