import { useState } from "react";
import { Image, StyleSheet, View, type ImageSourcePropType } from "react-native";

import { colors, radii } from "@/design-system/tokens";
import { AppText } from "./AppText";

type AvatarSize = "small" | "medium" | "large";

type AvatarProps = {
  label: string;
  source?: ImageSourcePropType;
  size?: AvatarSize;
};

const sizes = { small: 32, medium: 40, large: 56 } as const;

export function Avatar({ label, source, size = "medium" }: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const dimension = sizes[size];
  const initials = label
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (source && !failed) {
    return (
      <Image
        accessibilityLabel={`${label} avatar`}
        onError={() => setFailed(true)}
        source={source}
        style={{ width: dimension, height: dimension, borderRadius: radii.pill }}
      />
    );
  }

  return (
    <View
      accessibilityLabel={`${label} avatar`}
      accessibilityRole="image"
      style={[styles.fallback, { width: dimension, height: dimension, borderRadius: radii.pill }]}
    >
      <AppText variant="captionStrong" tone="inverse">
        {initials || "?"}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  fallback: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.brand.primary,
  },
});
