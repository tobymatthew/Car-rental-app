import type { PropsWithChildren } from "react";
import {
  Pressable,
  StyleSheet,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { colors, elevation, radii, spacing } from "@/design-system/tokens";

type CardProps = PropsWithChildren<{
  onPress?: PressableProps["onPress"];
  style?: StyleProp<ViewStyle>;
  childrenStyle?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  testID?: string;
}>;

export function Card({
  children,
  onPress,
  style,
  childrenStyle,
  accessibilityLabel,
  testID,
}: CardProps) {
  const contentStyle = [styles.card, childrenStyle];
  if (!onPress)
    return (
      <View style={[contentStyle, style]} testID={testID}>
        {children}
      </View>
    );

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={({ pressed }) => [contentStyle, style, pressed && styles.pressed]}
      testID={testID}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface.default,
    borderRadius: radii.large,
    padding: spacing[4],
    ...elevation.card,
  },
  pressed: { opacity: 0.88 },
});
