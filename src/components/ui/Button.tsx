import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { colors, layout, radii, spacing } from "@/design-system/tokens";
import { AppText } from "./AppText";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "destructive";

type ButtonProps = Omit<PressableProps, "children" | "style"> & {
  label: string;
  variant?: ButtonVariant;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

const variantStyles = StyleSheet.create({
  primary: { backgroundColor: colors.brand.primary },
  secondary: {
    backgroundColor: colors.surface.default,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  tertiary: { backgroundColor: "transparent" },
  destructive: { backgroundColor: colors.feedback.error },
});

export function Button({
  label,
  variant = "primary",
  loading = false,
  disabled,
  style,
  accessibilityLabel,
  ...props
}: ButtonProps) {
  const isDisabled = Boolean(disabled || loading);
  const usesLightLabel = variant === "primary" || variant === "destructive";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        variantStyles[variant],
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={usesLightLabel ? colors.text.inverse : colors.brand.primary} />
      ) : (
        <AppText
          variant="button"
          tone={usesLightLabel ? "inverse" : variant === "tertiary" ? "link" : "primary"}
        >
          {label}
        </AppText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: layout.minimumTouchTarget,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderRadius: radii.pill,
  },
  pressed: { opacity: 0.86 },
  disabled: {
    backgroundColor: colors.disabled.background,
    borderColor: colors.disabled.background,
  },
});
