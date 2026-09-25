import type { PropsWithChildren, ReactNode } from "react";
import {
  Pressable,
  StyleSheet,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { colors, layout, spacing } from "@/design-system/tokens";

type ListRowProps = PropsWithChildren<{
  leading?: ReactNode;
  trailing?: ReactNode;
  selected?: boolean;
  onPress?: PressableProps["onPress"];
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}>;

export function ListRow({
  children,
  leading,
  trailing,
  selected = false,
  onPress,
  style,
  accessibilityLabel,
}: ListRowProps) {
  const content = (
    <>
      {leading ? <View style={styles.leading}>{leading}</View> : null}
      <View style={styles.content}>{children}</View>
      {trailing ? <View>{trailing}</View> : null}
    </>
  );

  if (!onPress) return <View style={[styles.row, style]}>{content}</View>;

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [styles.row, style, pressed && styles.pressed]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: layout.minimumTouchTarget,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
    paddingVertical: spacing[3],
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border.default,
  },
  leading: { alignItems: "center", justifyContent: "center" },
  content: { flex: 1 },
  pressed: { backgroundColor: colors.surface.muted },
});
