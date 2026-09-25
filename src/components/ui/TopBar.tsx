import { Pressable, StyleSheet, View } from "react-native";

import { colors, layout, spacing } from "@/design-system/tokens";
import { AppText } from "./AppText";
import { PlatformSymbol } from "./PlatformSymbol";

type TopBarProps = {
  title?: string;
  onBack?: () => void;
  trailingLabel?: string;
  onTrailingPress?: () => void;
};

const backSymbol = { ios: "chevron.left", android: "arrow-back", web: "arrow-back" } as const;
const moreSymbol = { ios: "ellipsis", android: "more-vert", web: "more-vert" } as const;

export function TopBar({ title, onBack, trailingLabel, onTrailingPress }: TopBarProps) {
  return (
    <View style={styles.bar}>
      {onBack ? (
        <Pressable
          accessibilityLabel="Go back"
          accessibilityRole="button"
          hitSlop={10}
          onPress={onBack}
          style={styles.iconButton}
        >
          <PlatformSymbol name={backSymbol} size={24} tintColor={colors.surface.inverse} />
        </Pressable>
      ) : (
        <View style={styles.spacer} />
      )}
      {title ? (
        <AppText variant="title" style={styles.title}>
          {title}
        </AppText>
      ) : (
        <View style={styles.title} />
      )}
      {onTrailingPress ? (
        <Pressable
          accessibilityLabel={trailingLabel ?? "More actions"}
          accessibilityRole="button"
          hitSlop={10}
          onPress={onTrailingPress}
          style={styles.iconButton}
        >
          <PlatformSymbol name={moreSymbol} size={23} tintColor={colors.surface.inverse} />
        </Pressable>
      ) : (
        <View style={styles.spacer} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconButton: {
    width: layout.minimumTouchTarget,
    height: layout.minimumTouchTarget,
    alignItems: "center",
    justifyContent: "center",
  },
  spacer: { width: layout.minimumTouchTarget },
  title: { flex: 1, textAlign: "center", marginHorizontal: spacing[2] },
});
