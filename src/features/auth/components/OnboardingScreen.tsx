import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppText } from "@/components/ui/AppText";
import { Button } from "@/components/ui/Button";
import { colors, layout, spacing } from "@/design-system/tokens";

const slides = [
  {
    key: "rent",
    title: "Rent The Best\nLuxury Cars",
    description: "Choose contentment and select\nsatisfaction when you need a car",
    image: require("../../../../assets/cargenie/audi.png"),
  },
  {
    key: "dream",
    title: "Get The Keys\nTo Your Dream Car",
    description: "Get the keys to your dream car\nin just 3 steps",
    image: require("../../../../assets/cargenie/onboarding-car-2.png"),
  },
  {
    key: "host",
    title: "Turn Your Cars To Assets",
    description: "Let your cars work for you\non CarGenie",
    image: require("../../../../assets/cargenie/onboarding-car-3.png"),
  },
  {
    key: "magic",
    title: "Experience\n“MAGIC ON WHEELS”",
    description: "Your ride your choice, at\nyour pace and convenience",
    image: require("../../../../assets/cargenie/onboarding-car-4.png"),
  },
] as const;

export function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const listRef = useRef<FlatList<(typeof slides)[number]>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const updateIndex = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setCurrentIndex(Math.round(event.nativeEvent.contentOffset.x / width));
  };

  const selectSlide = (index: number) => {
    setCurrentIndex(index);
    listRef.current?.scrollToIndex({ animated: true, index });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Image
          accessibilityLabel="CarGenie"
          resizeMode="contain"
          source={require("../../../../assets/cargenie/mark.png")}
          style={styles.mark}
        />
      </View>

      <FlatList
        data={slides}
        decelerationRate="fast"
        getItemLayout={(_, index) => ({ length: width, offset: width * index, index })}
        horizontal
        keyExtractor={(item) => item.key}
        onMomentumScrollEnd={updateIndex}
        pagingEnabled
        ref={listRef}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <View style={styles.copy}>
              <AppText accessibilityRole="header" style={styles.title} variant="heading">
                {item.title}
              </AppText>
              <AppText style={styles.description}>{item.description}</AppText>
            </View>
            <View style={styles.vehicleFrame}>
              <Image
                accessibilityLabel={`CarGenie onboarding vehicle: ${item.title.replace("\n", " ")}`}
                resizeMode="contain"
                source={item.image}
                style={styles.vehicle}
              />
            </View>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        testID="onboarding-pages"
      />

      <View accessibilityLabel={`Page ${currentIndex + 1} of ${slides.length}`} style={styles.dots}>
        {slides.map((slide, index) => {
          const selected = index === currentIndex;
          return (
            <Pressable
              accessibilityLabel={`Show onboarding page ${index + 1}`}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              hitSlop={10}
              key={slide.key}
              onPress={() => selectSlide(index)}
              style={[styles.dotTouch, selected && styles.dotTouchSelected]}
            >
              <View style={[styles.dot, selected && styles.dotSelected]} />
            </Pressable>
          );
        })}
      </View>

      <View style={styles.actions}>
        <Button
          label="Sign Up"
          onPress={() => router.push("/sign-up")}
          style={[styles.action, styles.signUp]}
        />
        <Button label="Sign In" onPress={() => router.push("/sign-in")} style={styles.action} />
      </View>
    </SafeAreaView>
  );
}

export { slides as onboardingSlides };

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.surface.canvas },
  header: { height: 92, alignItems: "center", justifyContent: "center" },
  mark: { width: 50, height: 50 },
  slide: { flex: 1, paddingHorizontal: layout.screenGutter },
  copy: { paddingTop: spacing[4] },
  title: { fontSize: 24, lineHeight: 33, color: colors.text.primary },
  description: { marginTop: spacing[1], fontSize: 16, lineHeight: 21 },
  vehicleFrame: { flex: 1, minHeight: 245, alignItems: "center", justifyContent: "center" },
  vehicle: { width: "116%", height: "100%", maxHeight: 330 },
  dots: {
    minHeight: layout.minimumTouchTarget,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dotTouch: {
    width: 10,
    height: layout.minimumTouchTarget,
    alignItems: "center",
    justifyContent: "center",
  },
  dotTouchSelected: { width: 12 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.brand.primary },
  dotSelected: { backgroundColor: colors.surface.inverse },
  actions: {
    flexDirection: "row",
    gap: spacing[5],
    paddingHorizontal: layout.screenGutter,
    paddingBottom: spacing[4],
  },
  action: { flex: 1 },
  signUp: { backgroundColor: colors.surface.inverse },
});
