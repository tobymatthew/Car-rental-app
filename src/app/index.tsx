import { router } from "expo-router";
import { useEffect } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";

import { colors } from "@/design-system/tokens";

const SPLASH_DURATION_MS = 1_200;

export default function LaunchScreen() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/onboarding");
    }, SPLASH_DURATION_MS);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View
      accessibilityLabel="CarGenie is opening"
      accessibilityRole="progressbar"
      accessibilityState={{ busy: true }}
      style={styles.container}
      testID="branded-splash"
    >
      <ImageBackground
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        resizeMode="cover"
        source={require("../../assets/cargenie/splash-background.png")}
        style={styles.background}
      />
      <Image
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        resizeMode="contain"
        source={require("../../assets/cargenie/fullLogo.png")}
        style={styles.logo}
      />
    </View>
  );
}

export { SPLASH_DURATION_MS };

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface.canvas },
  background: { flex: 1, width: "100%" },
  logo: {
    position: "absolute",
    top: "45%",
    left: "20%",
    width: "60%",
    height: 58,
  },
});
