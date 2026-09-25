import type { PropsWithChildren } from "react";
import { Modal as NativeModal, Pressable, StyleSheet, View } from "react-native";

import { colors, radii, spacing } from "@/design-system/tokens";
import { AppText } from "./AppText";

type ModalProps = PropsWithChildren<{
  visible: boolean;
  title: string;
  onRequestClose: () => void;
}>;

export function Modal({ visible, title, onRequestClose, children }: ModalProps) {
  return (
    <NativeModal animationType="fade" onRequestClose={onRequestClose} transparent visible={visible}>
      <View accessibilityViewIsModal style={styles.overlay}>
        <View accessibilityLabel={title} accessibilityRole="alert" style={styles.content}>
          <View style={styles.header}>
            <AppText variant="title">{title}</AppText>
            <Pressable
              accessibilityLabel={`Close ${title}`}
              accessibilityRole="button"
              hitSlop={8}
              onPress={onRequestClose}
              style={styles.close}
            >
              <AppText variant="title" tone="link">
                ×
              </AppText>
            </Pressable>
          </View>
          {children}
        </View>
      </View>
    </NativeModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing[5],
    backgroundColor: colors.overlay,
  },
  content: {
    width: "100%",
    maxWidth: 480,
    gap: spacing[4],
    borderRadius: radii.large,
    padding: spacing[5],
    backgroundColor: colors.surface.default,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing[3],
  },
  close: { minWidth: 44, minHeight: 44, alignItems: "center", justifyContent: "center" },
});
