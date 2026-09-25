import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { TextField } from "@/components/ui/TextField";
import { colors, spacing } from "@/design-system/tokens";
import { validateSignIn, type SignInErrors } from "@/features/auth/domain/validation";
import { AuthBrand } from "./AuthBrand";
import { PasswordField } from "./PasswordField";

export function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<SignInErrors>({});

  const submit = () => {
    const nextErrors = validateSignIn(email, password);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      router.replace("/browse");
    }
  };

  return (
    <Screen scroll contentStyle={styles.container}>
      <AuthBrand />

      <View style={styles.intro}>
        <AppText accessibilityRole="header" style={styles.title} variant="display">
          Welcome Back!
        </AppText>
        <AppText>Your ride your choice, at your{`\n`}pace and convenience</AppText>
      </View>

      <View style={styles.form}>
        <TextField
          autoCapitalize="none"
          autoComplete="email"
          error={errors.email}
          inputMode="email"
          keyboardType="email-address"
          label="Email"
          labelVisible={false}
          onChangeText={setEmail}
          onSubmitEditing={submit}
          placeholder="Email"
          required
          returnKeyType="next"
          textContentType="emailAddress"
          value={email}
        />
        <PasswordField error={errors.password} onChangeText={setPassword} value={password} />
        <AppText style={styles.forgot} variant="captionStrong" tone="link">
          Forgot password
        </AppText>
      </View>

      <View style={styles.actions}>
        <Button label="Sign In" onPress={submit} />
        <View style={styles.inlinePrompt}>
          <AppText>New here?</AppText>
          <Pressable
            accessibilityRole="link"
            onPress={() => router.replace("/sign-up")}
            style={styles.linkTouch}
          >
            <AppText style={styles.link} variant="bodyStrong" tone="link">
              Sign Up
            </AppText>
          </Pressable>
        </View>
        <AppText style={styles.mockNote} variant="caption" tone="secondary">
          Demo mode only. No account or password is stored.
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, gap: 0 },
  intro: { marginTop: spacing[6] },
  title: { fontSize: 26, lineHeight: 34, marginBottom: spacing[1] },
  form: { gap: spacing[8], marginTop: spacing[10] + spacing[4] },
  forgot: { alignSelf: "flex-end", marginTop: -spacing[6], textDecorationLine: "underline" },
  actions: { marginTop: "auto", paddingTop: spacing[12], gap: spacing[2] },
  inlinePrompt: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 4 },
  linkTouch: { minHeight: 44, justifyContent: "center" },
  link: { textDecorationLine: "underline" },
  mockNote: { textAlign: "center", color: colors.text.secondary },
});
