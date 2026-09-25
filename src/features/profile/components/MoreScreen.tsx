import { useRouter } from "expo-router";
import { Alert, Image, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { BottomNavigation } from "@/components/ui/BottomNavigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ListRow } from "@/components/ui/ListRow";
import { PlatformSymbol, type PlatformSymbolName } from "@/components/ui/PlatformSymbol";
import { Screen } from "@/components/ui/Screen";
import { colors, elevation, radii, spacing } from "@/design-system/tokens";

const rowIcon = (name: PlatformSymbolName) => (
  <View style={styles.rowIcon} accessible={false}>
    <PlatformSymbol name={name} size={20} tintColor={colors.surface.inverse} />
  </View>
);

const chevron = (
  <PlatformSymbol
    name={{ ios: "chevron.right", android: "chevron-right", web: "chevron-right" }}
    size={18}
    tintColor={colors.text.muted}
  />
);

export function MoreScreen() {
  const router = useRouter();
  const unavailable = (label: string) =>
    Alert.alert(`${label} is not connected`, "This Phase 6 preview uses mock data only.");

  return (
    <Screen scroll footer={<BottomNavigation active="more" />} contentStyle={styles.screen}>
      <View style={styles.header}>
        <Image
          accessibilityLabel="Mary Jane profile photo"
          source={require("../../../../assets/cargenie/profle.png")}
          style={styles.avatar}
        />
        <View style={styles.headerCopy}>
          <AppText variant="heading">Mary Jane</AppText>
          <AppText variant="caption" tone="secondary">
            Mock renter profile
          </AppText>
        </View>
        <View style={styles.notification} accessible={false}>
          <PlatformSymbol
            name={{ ios: "bell", android: "notifications-none", web: "notifications-none" }}
            size={23}
            tintColor={colors.surface.inverse}
          />
        </View>
      </View>

      <Card childrenStyle={styles.hostCard} style={styles.hostCardOuter}>
        <View style={styles.hostCopy}>
          <AppText variant="title">List Your Car On Cargenie</AppText>
          <AppText variant="caption" tone="secondary">
            Try the mock host tools and prepare a listing draft.
          </AppText>
        </View>
        <Button
          label="List a new car"
          onPress={() => router.push("/host/listings/new")}
          style={styles.hostButton}
        />
      </Card>

      <View style={styles.menu}>
        <ListRow
          accessibilityLabel="Open My Profile"
          leading={rowIcon({ ios: "person", android: "person-outline", web: "person-outline" })}
          trailing={chevron}
          onPress={() => router.push("/profile")}
          style={styles.menuRow}
        >
          <AppText variant="bodyStrong">My Profile</AppText>
        </ListRow>
        <ListRow
          accessibilityLabel="Open Listed Cars"
          leading={rowIcon({ ios: "car", android: "directions-car", web: "directions-car" })}
          trailing={chevron}
          onPress={() => router.push("/host/")}
          style={styles.menuRow}
        >
          <AppText variant="bodyStrong">Listed Cars</AppText>
        </ListRow>
        <ListRow
          accessibilityLabel="Open Trip Requests"
          leading={rowIcon({ ios: "calendar", android: "calendar-today", web: "calendar-today" })}
          trailing={chevron}
          onPress={() => router.push("/host/trip-requests/")}
          style={styles.menuRow}
        >
          <AppText variant="bodyStrong">Trip Requests</AppText>
        </ListRow>
        <ListRow
          accessibilityLabel="Payment Methods unavailable in mock preview"
          leading={rowIcon({ ios: "creditcard", android: "credit-card", web: "credit-card" })}
          trailing={chevron}
          onPress={() => unavailable("Payment methods")}
          style={styles.menuRow}
        >
          <AppText variant="bodyStrong">Payment Methods</AppText>
        </ListRow>
        <ListRow
          accessibilityLabel="Terms and Conditions unavailable in mock preview"
          leading={rowIcon({ ios: "doc.text", android: "description", web: "description" })}
          trailing={chevron}
          onPress={() => unavailable("Terms and conditions")}
          style={styles.menuRow}
        >
          <AppText variant="bodyStrong">Terms &amp; Conditions</AppText>
        </ListRow>
        <ListRow
          accessibilityLabel="Log out of mock session"
          leading={rowIcon({
            ios: "rectangle.portrait.and.arrow.right",
            android: "logout",
            web: "logout",
          })}
          trailing={chevron}
          onPress={() => router.replace("/onboarding")}
          style={styles.menuRow}
        >
          <AppText variant="bodyStrong" style={styles.logout}>
            Log Out
          </AppText>
        </ListRow>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { gap: spacing[5], paddingBottom: spacing[6] },
  header: { flexDirection: "row", alignItems: "center", gap: spacing[3] },
  avatar: { width: 58, height: 58, borderRadius: radii.pill, resizeMode: "cover" },
  headerCopy: { flex: 1, gap: 1 },
  notification: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  hostCardOuter: { padding: spacing[4] },
  hostCard: { gap: spacing[4] },
  hostCopy: { gap: spacing[1] },
  hostButton: { alignSelf: "flex-start", backgroundColor: colors.surface.inverse },
  menu: { gap: spacing[3] },
  menuRow: {
    minHeight: 54,
    paddingHorizontal: spacing[4],
    borderBottomWidth: 0,
    borderRadius: radii.pill,
    backgroundColor: colors.surface.default,
    ...elevation.card,
  },
  rowIcon: {
    width: 34,
    height: 34,
    borderRadius: radii.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.brand.subtle,
  },
  logout: { color: colors.feedback.error },
});
