import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { Button } from "@/components/ui/Button";
import { PlatformSymbol } from "@/components/ui/PlatformSymbol";
import { Screen } from "@/components/ui/Screen";
import { TextField } from "@/components/ui/TextField";
import { colors, layout, spacing } from "@/design-system/tokens";
import { validateSignUp, type SignUpErrors } from "@/features/auth/domain/validation";
import { AuthBrand } from "./AuthBrand";
import { PasswordField } from "./PasswordField";

export function SignUpScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<SignUpErrors>({});

  const submit = () => {
    const nextErrors = validateSignUp({ firstName, lastName, email, password, termsAccepted });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      router.replace("/browse");
    }
  };

  return (
    <Screen scroll contentStyle={styles.container}>
      <Image
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        resizeMode="contain"
        source={require("../../../../assets/cargenie/sign-up-corner.png")}
        style={styles.corner}
      />
      <AuthBrand />

      <View style={styles.intro}>
        <AppText accessibilityRole="header" style={styles.title} variant="heading">
          Sign Up
        </AppText>
        <AppText>Start your dream journey now.</AppText>
      </View>

      <View style={styles.form}>
        <TextField
          autoComplete="name-given"
          error={errors.firstName}
          label="First Name"
          labelVisible={false}
          onChangeText={setFirstName}
          placeholder="First Name"
          required
          textContentType="givenName"
          value={firstName}
        />
        <TextField
          autoComplete="name-family"
          error={errors.lastName}
          label="Last Name"
          labelVisible={false}
          onChangeText={setLastName}
          placeholder="Last Name"
          required
          textContentType="familyName"
          value={lastName}
        />
        <TextField
          autoCapitalize="none"
          autoComplete="email"
          error={errors.email}
          inputMode="email"
          keyboardType="email-address"
          label="Email"
          labelVisible={false}
          onChangeText={setEmail}
          placeholder="Email"
          required
          textContentType="emailAddress"
          value={email}
        />
        <PasswordField error={errors.password} onChangeText={setPassword} value={password} />

        <Pressable
          accessibilityLabel="I agree to CarGenie's Terms & Conditions"
          accessibilityRole="checkbox"
          accessibilityState={{ checked: termsAccepted }}
          onPress={() => setTermsAccepted((current) => !current)}
          style={({ pressed }) => [styles.terms, pressed && styles.pressed]}
        >
          <PlatformSymbol
            name={
              termsAccepted
                ? { ios: "checkmark.square.fill", android: "check-box", web: "check-box" }
                : {
                    ios: "square",
                    android: "check-box-outline-blank",
                    web: "check-box-outline-blank",
                  }
            }
            size={21}
            tintColor={colors.brand.primary}
          />
          <AppText style={styles.termsCopy} variant="caption">
            I agree to CarGenie&apos;s{" "}
            <AppText style={styles.termsLink} variant="captionStrong" tone="link">
              Terms &amp; Conditions
            </AppText>
          </AppText>
        </Pressable>
        {errors.terms ? (
          <AppText accessibilityLiveRegion="polite" style={styles.error} variant="caption">
            {errors.terms}
          </AppText>
        ) : null}
      </View>

      <View style={styles.actions}>
        <Button label="Sign Up" onPress={submit} />
        <View style={styles.inlinePrompt}>
          <AppText>Already signed up?</AppText>
          <Pressable
            accessibilityRole="link"
            onPress={() => router.replace("/sign-in")}
            style={styles.linkTouch}
          >
            <AppText style={styles.link} variant="bodyStrong" tone="link">
              Sign In
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
  container: { flexGrow: 1, gap: 0, overflow: "hidden" },
  corner: {
    position: "absolute",
    top: -22,
    right: -22,
    width: 118,
    height: 95,
  },
  intro: { marginTop: spacing[10] },
  title: { fontSize: 25, lineHeight: 33, marginBottom: spacing[1] },
  form: { gap: spacing[5], marginTop: spacing[8] },
  terms: {
    minHeight: layout.minimumTouchTarget,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
  },
  pressed: { opacity: 0.68 },
  termsCopy: { flex: 1 },
  termsLink: { textDecorationLine: "underline" },
  error: { color: colors.feedback.error, marginTop: -spacing[5] },
  actions: { marginTop: spacing[6], gap: spacing[2] },
  inlinePrompt: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 4 },
  linkTouch: { minHeight: 44, justifyContent: "center" },
  link: { textDecorationLine: "underline" },
  mockNote: { textAlign: "center" },
});
