import { Image, StyleSheet } from "react-native";

type AuthBrandProps = { compact?: boolean };

export function AuthBrand({ compact = false }: AuthBrandProps) {
  return (
    <Image
      accessibilityLabel="CarGenie"
      resizeMode="contain"
      source={require("../../../../assets/cargenie/fullLogo.png")}
      style={[styles.logo, compact && styles.compact]}
    />
  );
}

const styles = StyleSheet.create({
  logo: { width: 147, height: 32 },
  compact: { width: 132, height: 29 },
});
