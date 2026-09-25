import { useRouter } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ListRow } from "@/components/ui/ListRow";
import { PlatformSymbol } from "@/components/ui/PlatformSymbol";
import { Screen } from "@/components/ui/Screen";
import { TopBar } from "@/components/ui/TopBar";
import { colors, radii, spacing } from "@/design-system/tokens";

export function ProfileScreen() {
  const router = useRouter();
  const info = [
    ["Email", "mary.jane@example.com", "envelope", "mail-outline"],
    ["Phone", "+234 800 000 0000", "phone", "phone"],
    ["Location", "Lagos, Nigeria", "mappin", "location-on"],
    ["Member since", "June 2024", "calendar", "calendar-today"],
  ] as const;
  return (
    <Screen scroll contentStyle={styles.screen}>
      <TopBar title="My Profile" onBack={() => router.back()} />
      <View style={styles.identity}>
        <Image
          accessibilityLabel="Mary Jane profile photo"
          source={require("../../../../assets/cargenie/profle.png")}
          style={styles.avatar}
        />
        <AppText variant="heading">Mary Jane</AppText>
        <View style={styles.rating} accessibilityLabel="Rated 4.8 out of 5 across 58 mock trips">
          <PlatformSymbol
            name={{ ios: "star.fill", android: "star", web: "star" }}
            size={18}
            tintColor="#E6B84A"
          />
          <AppText variant="bodyStrong">4.8</AppText>
          <AppText variant="caption" tone="secondary">
            · 58 trips
          </AppText>
        </View>
      </View>

      <Card style={styles.infoCard}>
        {info.map(([label, value, ios, material]) => (
          <ListRow
            key={label}
            leading={
              <PlatformSymbol
                name={{ ios, android: material, web: material }}
                size={20}
                tintColor={colors.surface.inverse}
              />
            }
          >
            <AppText variant="caption" tone="secondary">
              {label}
            </AppText>
            <AppText variant="bodyStrong">{value}</AppText>
          </ListRow>
        ))}
      </Card>

      <Card childrenStyle={styles.hostCard} style={styles.hostCardOuter}>
        <View style={styles.hostCopy}>
          <AppText variant="title" tone="inverse">
            Turn your car into an asset
          </AppText>
          <AppText variant="caption" tone="inverse">
            Start with a mock six-step listing draft. Nothing is published publicly.
          </AppText>
        </View>
        <Button
          label="Start Now"
          variant="secondary"
          onPress={() => router.push("/host/listings/new")}
        />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { gap: spacing[5] },
  identity: { alignItems: "center", gap: spacing[2] },
  avatar: { width: 104, height: 104, borderRadius: radii.pill, resizeMode: "cover" },
  rating: { flexDirection: "row", alignItems: "center", gap: spacing[1] },
  infoCard: { paddingVertical: 0 },
  hostCardOuter: { backgroundColor: colors.surface.inverse },
  hostCard: { gap: spacing[4] },
  hostCopy: { gap: spacing[2] },
});
