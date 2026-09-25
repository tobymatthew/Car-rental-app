import { StyleSheet, View } from "react-native";

import { colors, radii, spacing } from "@/design-system/tokens";
import { AppText } from "./AppText";

type BadgeTone = "success" | "warning" | "error" | "info" | "neutral";

type BadgeProps = { label: string; tone?: BadgeTone };

const badgeColors = {
  success: { background: colors.feedback.successSubtle, foreground: colors.feedback.success },
  warning: { background: colors.feedback.warningSubtle, foreground: colors.feedback.warning },
  error: { background: colors.feedback.errorSubtle, foreground: colors.feedback.error },
  info: { background: colors.feedback.infoSubtle, foreground: colors.feedback.info },
  neutral: { background: colors.surface.muted, foreground: colors.text.secondary },
} as const;

export function Badge({ label, tone = "neutral" }: BadgeProps) {
  const palette = badgeColors[tone];
  return (
    <View
      accessibilityLabel={`${tone}: ${label}`}
      accessibilityRole="text"
      style={[styles.badge, { backgroundColor: palette.background }]}
    >
      <View style={[styles.indicator, { backgroundColor: palette.foreground }]} />
      <AppText variant="captionStrong" style={{ color: palette.foreground }}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[1],
    borderRadius: radii.pill,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
  },
  indicator: { width: 8, height: 8, borderRadius: radii.pill },
});
