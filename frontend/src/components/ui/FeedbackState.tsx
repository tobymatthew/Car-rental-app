import { ActivityIndicator, StyleSheet, View } from "react-native";

import { colors, spacing } from "@/design-system/tokens";
import { AppText } from "./AppText";
import { Button } from "./Button";

type FeedbackStateProps = {
  kind: "loading" | "empty" | "error";
  title: string;
  description?: string;
  onRetry?: () => void;
};

export function FeedbackState({ kind, title, description, onRetry }: FeedbackStateProps) {
  return (
    <View
      accessibilityLiveRegion="polite"
      accessibilityRole={kind === "error" ? "alert" : "summary"}
      style={styles.container}
    >
      {kind === "loading" ? <ActivityIndicator color={colors.brand.primary} /> : null}
      <AppText variant="title">{title}</AppText>
      {description ? (
        <AppText tone="secondary" style={styles.description}>
          {description}
        </AppText>
      ) : null}
      {kind === "error" && onRetry ? (
        <Button label="Try again" variant="secondary" onPress={onRetry} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", gap: spacing[3], padding: spacing[6] },
  description: { textAlign: "center" },
});
