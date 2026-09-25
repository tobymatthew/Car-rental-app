import type { PropsWithChildren, ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { SafeAreaView, type Edge } from "react-native-safe-area-context";

import { colors, layout, spacing } from "@/design-system/tokens";

type ScreenProps = PropsWithChildren<{
  scroll?: boolean;
  edges?: Edge[];
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  footer?: ReactNode;
  testID?: string;
}>;

export function Screen({
  children,
  scroll = false,
  edges = ["top", "right", "bottom", "left"],
  style,
  contentStyle,
  footer,
  testID,
}: ScreenProps) {
  const content = scroll ? (
    <ScrollView
      contentContainerStyle={[styles.scrollContent, contentStyle]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, contentStyle]}>{children}</View>
  );

  return (
    <SafeAreaView
      edges={footer ? edges.filter((edge) => edge !== "bottom") : edges}
      style={[styles.safeArea, style]}
      testID={testID}
    >
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", default: undefined })}
        style={styles.flex}
      >
        {content}
        {footer ? (
          <SafeAreaView edges={["bottom"]} style={styles.footerSafeArea}>
            {footer}
          </SafeAreaView>
        ) : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.surface.canvas },
  flex: { flex: 1 },
  footerSafeArea: { backgroundColor: colors.surface.default },
  content: {
    flex: 1,
    width: "100%",
    maxWidth: layout.maxContentWidth,
    alignSelf: "center",
    padding: layout.screenGutter,
  },
  scrollContent: {
    width: "100%",
    maxWidth: layout.maxContentWidth,
    alignSelf: "center",
    padding: layout.screenGutter,
    paddingBottom: spacing[10],
    gap: spacing[5],
  },
});
