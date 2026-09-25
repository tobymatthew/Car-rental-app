import { Platform, type TextStyle, type ViewStyle } from "react-native";

export const colors = {
  brand: {
    primary: "#7BB66D",
    pressed: "#609653",
    subtle: "#DDF0D8",
    onPrimary: "#FFFFFF",
  },
  surface: {
    canvas: "#FAFAF5",
    default: "#FFFFFF",
    muted: "#F2F2F2",
    inverse: "#1A321E",
  },
  text: {
    primary: "#101710",
    secondary: "#596158",
    muted: "#A8B0A5",
    inverse: "#FFFFFF",
    link: "#1A321E",
  },
  border: {
    default: "#E7E7E1",
    strong: "#CED6CB",
    focus: "#1A321E",
  },
  feedback: {
    success: "#5D9E51",
    successSubtle: "#DDF0D8",
    warning: "#8A6518",
    warningSubtle: "#F9F0CF",
    error: "#B13C35",
    errorSubtle: "#FEEBE9",
    info: "#315F3A",
    infoSubtle: "#EAF2E8",
  },
  disabled: {
    background: "#D0D0D0",
    text: "#7F887D",
  },
  overlay: "rgba(26, 50, 30, 0.52)",
} as const;

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
} as const;

export const layout = {
  screenGutter: 22,
  maxContentWidth: 720,
  minimumTouchTarget: 44,
  bottomNavigationHeight: 64,
} as const;

export const radii = {
  small: 10,
  medium: 14,
  large: 16,
  pill: 999,
} as const;

export const borders = {
  hairline: 1,
  focus: 2,
} as const;

export const elevation = {
  card: Platform.select({
    web: { boxShadow: "0 2px 8px rgba(23, 32, 51, 0.08)" },
    default: {
      shadowColor: "#1A321E",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 2,
    },
  }) satisfies ViewStyle,
} as const;

export const typography = {
  display: { fontSize: 32, lineHeight: 39, fontWeight: "700" },
  heading: { fontSize: 22, lineHeight: 29, fontWeight: "700" },
  title: { fontSize: 17, lineHeight: 23, fontWeight: "600" },
  body: { fontSize: 15, lineHeight: 22, fontWeight: "400" },
  bodyStrong: { fontSize: 15, lineHeight: 22, fontWeight: "600" },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: "400" },
  captionStrong: { fontSize: 13, lineHeight: 18, fontWeight: "600" },
  button: { fontSize: 15, lineHeight: 20, fontWeight: "700" },
  price: { fontSize: 21, lineHeight: 27, fontWeight: "700" },
} as const satisfies Record<string, TextStyle>;

export const motion = {
  duration: { fast: 120, standard: 200, slow: 320 },
  easing: { standard: "ease-out", emphasized: "ease-in-out" },
} as const;

export const imageRules = {
  vehicleAspectRatio: 1.45,
  iconSizes: { small: 16, medium: 20, large: 24 },
} as const;

export type TextRole = keyof typeof typography;
export type TextTone = keyof typeof colors.text;
export type FeedbackTone = keyof typeof colors.feedback;
