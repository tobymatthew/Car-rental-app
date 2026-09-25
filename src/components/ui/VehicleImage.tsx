import { Image } from "expo-image";
import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  type ImageStyle,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { accessibility } from "@/design-system/accessibility";
import { colors, imageRules, radii, spacing } from "@/design-system/tokens";
import { AppText } from "./AppText";

type VehicleImageProps = {
  source?: string | number;
  label: string;
  style?: StyleProp<ImageStyle>;
};

export function VehicleImage({ source, label, style }: VehicleImageProps) {
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(Boolean(source));
  const showFallback = !source || failed;

  if (showFallback) {
    return (
      <View
        accessibilityLabel={`${label}. ${accessibility.imageFallbackLabel}`}
        accessibilityRole="image"
        style={[styles.fallback, style as StyleProp<ViewStyle>]}
      >
        <AppText variant="captionStrong" tone="muted">
          Vehicle image
        </AppText>
        <AppText variant="caption" tone="muted">
          Unavailable
        </AppText>
      </View>
    );
  }

  return (
    <View style={[styles.container, style as StyleProp<ViewStyle>]}>
      <Image
        accessibilityLabel={label}
        accessible
        cachePolicy="disk"
        contentFit="cover"
        onError={() => setFailed(true)}
        onLoadEnd={() => setLoading(false)}
        source={source}
        style={[styles.image, style]}
        transition={0}
      />
      {loading ? (
        <ActivityIndicator
          accessibilityLabel="Loading vehicle image"
          color={colors.brand.primary}
          style={styles.loader}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    aspectRatio: imageRules.vehicleAspectRatio,
    borderRadius: radii.medium,
    backgroundColor: colors.surface.muted,
  },
  container: {
    width: "100%",
    position: "relative",
    overflow: "hidden",
    borderRadius: radii.medium,
  },
  loader: { position: "absolute", top: "45%", alignSelf: "center" },
  fallback: {
    width: "100%",
    aspectRatio: imageRules.vehicleAspectRatio,
    borderRadius: radii.medium,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[1],
    backgroundColor: colors.surface.muted,
  },
});
