import {
  StyleSheet,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from "react-native";

import { requiredFieldHint } from "@/design-system/accessibility";
import { borders, colors, radii, spacing, typography } from "@/design-system/tokens";
import { AppText } from "./AppText";

type TextFieldProps = TextInputProps & {
  label: string;
  labelVisible?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  hint?: string;
  error?: string;
  required?: boolean;
};

export function TextField({
  label,
  labelVisible = true,
  containerStyle,
  hint,
  error,
  required = false,
  accessibilityLabel,
  accessibilityHint,
  style,
  ...props
}: TextFieldProps) {
  const describedHint = required
    ? requiredFieldHint(accessibilityHint ?? hint)
    : (accessibilityHint ?? hint);

  return (
    <View style={[styles.field, containerStyle]}>
      {labelVisible ? (
        <AppText variant="captionStrong">
          {label}
          {required ? " *" : ""}
        </AppText>
      ) : null}
      <TextInput
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityHint={describedHint}
        accessibilityState={{ disabled: props.editable === false }}
        aria-invalid={Boolean(error)}
        editable={props.editable}
        placeholderTextColor={colors.text.muted}
        style={[styles.input, error ? styles.inputError : undefined, style]}
        {...props}
      />
      {error ? (
        <AppText
          accessibilityLiveRegion="polite"
          variant="caption"
          tone="muted"
          style={styles.error}
        >
          {error}
        </AppText>
      ) : hint ? (
        <AppText variant="caption" tone="muted">
          {hint}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: spacing[2] },
  input: {
    minHeight: 46,
    borderWidth: borders.hairline,
    borderColor: "transparent",
    borderRadius: radii.pill,
    backgroundColor: colors.surface.muted,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    color: colors.text.primary,
    ...typography.body,
  },
  inputError: { borderColor: colors.feedback.error, borderWidth: borders.focus },
  error: { color: colors.feedback.error },
});
