import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

import { colors, layout, spacing } from "@/design-system/tokens";
import { AppText } from "./AppText";
import { PlatformSymbol } from "./PlatformSymbol";

type Destination = "browse" | "bookings" | "more";
const symbols = {
  browse: {
    selected: { ios: "house.fill", android: "home", web: "home" },
    idle: { ios: "house", android: "home", web: "home" },
  },
  bookings: {
    selected: { ios: "clock.fill", android: "history", web: "history" },
    idle: { ios: "clock", android: "history", web: "history" },
  },
  more: {
    selected: { ios: "ellipsis.circle.fill", android: "more-horiz", web: "more-horiz" },
    idle: { ios: "ellipsis.circle", android: "more-horiz", web: "more-horiz" },
  },
} as const;
const labels = { browse: "Home", bookings: "History", more: "More" } as const;

export function BottomNavigation({ active }: { active: Destination }) {
  const router = useRouter();
  const destinations: readonly Destination[] = ["browse", "bookings", "more"];
  return (
    <View accessibilityRole="tablist" style={styles.bar}>
      {destinations.map((destination) => {
        const selected = destination === active;
        return (
          <Pressable
            key={destination}
            accessibilityLabel={labels[destination]}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            onPress={() =>
              router.push(
                destination === "browse"
                  ? "/browse"
                  : destination === "bookings"
                    ? "/bookings/"
                    : "/more",
              )
            }
            style={styles.item}
          >
            <PlatformSymbol
              name={selected ? symbols[destination].selected : symbols[destination].idle}
              size={22}
              tintColor={colors.surface.inverse}
            />
            <AppText
              variant="captionStrong"
              style={{ color: colors.surface.inverse, opacity: selected ? 1 : 0.72 }}
            >
              {labels[destination]}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  bar: {
    minHeight: layout.bottomNavigationHeight,
    flexDirection: "row",
    width: "100%",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border.default,
    backgroundColor: colors.surface.default,
    paddingTop: spacing[1],
    paddingBottom: spacing[2],
  },
  item: {
    flex: 1,
    minHeight: layout.bottomNavigationHeight,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
});
