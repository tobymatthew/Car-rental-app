import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { PlatformSymbol } from "@/components/ui/PlatformSymbol";
import { TextField } from "@/components/ui/TextField";
import { colors, layout, spacing } from "@/design-system/tokens";

type PasswordFieldProps = {
  value: string;
  error?: string;
  onChangeText: (value: string) => void;
};

export function PasswordField({ value, error, onChangeText }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <TextField
        autoCapitalize="none"
        autoComplete="password"
        error={error}
        label="Password"
        labelVisible={false}
        onChangeText={onChangeText}
        placeholder="Password"
        required
        secureTextEntry={!visible}
        textContentType="password"
        value={value}
        style={styles.input}
      />
      <Pressable
        accessibilityLabel={visible ? "Hide password" : "Show password"}
        accessibilityRole="button"
        hitSlop={4}
        onPress={() => setVisible((current) => !current)}
        style={({ pressed }) => [styles.action, pressed && styles.pressed]}
      >
        <PlatformSymbol
          name={
            visible
              ? { ios: "eye.slash", android: "visibility-off", web: "visibility-off" }
              : { ios: "eye", android: "visibility", web: "visibility" }
          }
          size={21}
          tintColor={colors.surface.inverse}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  input: { paddingRight: 58 },
  action: {
    position: "absolute",
    top: 1,
    right: spacing[2],
    minWidth: layout.minimumTouchTarget,
    minHeight: layout.minimumTouchTarget,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: { opacity: 0.6 },
});
