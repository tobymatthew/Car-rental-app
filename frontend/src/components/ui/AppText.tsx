import type { PropsWithChildren } from "react";
import { StyleSheet, Text, type StyleProp, type TextProps, type TextStyle } from "react-native";

import { colors, type TextRole, type TextTone, typography } from "@/design-system/tokens";

type AppTextProps = PropsWithChildren<
  TextProps & {
    variant?: TextRole;
    tone?: TextTone;
    style?: StyleProp<TextStyle>;
  }
>;

export function AppText({
  children,
  variant = "body",
  tone = "primary",
  style,
  ...props
}: AppTextProps) {
  return (
    <Text
      allowFontScaling
      style={[styles.base, typography[variant], { color: colors.text[tone] }, style]}
      {...props}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
  },
});
