import { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { Button } from "@/components/ui/Button";
import { colors, radii, spacing } from "@/design-system/tokens";

const slots = Array.from({ length: 21 }, (_, index) => {
  const totalMinutes = 8 * 60 + index * 30;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
});

export function formatTime(value: string) {
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(value)) return "time not recorded";
  const [hoursValue, minutes = "00"] = value.split(":");
  const hours = Number(hoursValue);
  if (!Number.isFinite(hours)) return value;
  const suffix = hours >= 12 ? "pm" : "am";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes}${suffix}`;
}

export function TimePicker({
  visible,
  title,
  value,
  onApply,
  onClose,
}: {
  visible: boolean;
  title: string;
  value: string;
  onApply: (value: string) => void;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState(value || "08:00");
  return (
    <Modal animationType="fade" onRequestClose={onClose} transparent visible={visible}>
      <View accessibilityViewIsModal style={styles.overlay}>
        <View accessibilityLabel={title} style={styles.card}>
          <AppText variant="title">{title}</AppText>
          <ScrollView contentContainerStyle={styles.slots} showsVerticalScrollIndicator={false}>
            {slots.map((slot) => {
              const isSelected = slot === selected;
              return (
                <Pressable
                  key={slot}
                  accessibilityLabel={formatTime(slot)}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: isSelected }}
                  onPress={() => setSelected(slot)}
                  style={[styles.slot, isSelected && styles.slotSelected]}
                >
                  <AppText
                    variant="bodyStrong"
                    style={isSelected ? styles.selectedText : styles.slotText}
                  >
                    {formatTime(slot)}
                  </AppText>
                </Pressable>
              );
            })}
          </ScrollView>
          <View style={styles.actions}>
            <Button label="Cancel" variant="secondary" onPress={onClose} style={styles.action} />
            <Button label="Set time" onPress={() => onApply(selected)} style={styles.action} />
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
    padding: spacing[5],
    backgroundColor: colors.overlay,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    maxHeight: "74%",
    alignSelf: "center",
    gap: spacing[4],
    padding: spacing[5],
    borderRadius: radii.large,
    backgroundColor: colors.surface.default,
  },
  slots: { flexDirection: "row", flexWrap: "wrap", gap: spacing[2] },
  slot: {
    width: "30%",
    minHeight: 44,
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.pill,
    backgroundColor: colors.surface.muted,
  },
  slotSelected: { backgroundColor: colors.surface.inverse },
  slotText: { color: colors.text.primary },
  selectedText: { color: colors.text.inverse },
  actions: { flexDirection: "row", gap: spacing[2] },
  action: { flex: 1 },
});
