import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolView } from "expo-symbols";
import type { ComponentProps } from "react";
import {
  Platform,
  type ColorValue,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";

type SFSymbolName = ComponentProps<typeof SymbolView>["name"];
type MaterialIconName = ComponentProps<typeof MaterialIcons>["name"];

export type PlatformSymbolName = {
  ios: SFSymbolName;
  android: MaterialIconName;
  web: MaterialIconName;
};

type PlatformSymbolProps = {
  name: PlatformSymbolName;
  size?: number;
  tintColor?: ColorValue;
  style?: StyleProp<ViewStyle>;
};

/**
 * Renders an SF Symbol on iOS and a Material Icon on Android/Web.
 */
export function PlatformSymbol({ name, size = 24, tintColor, style }: PlatformSymbolProps) {
  if (Platform.OS === "ios") {
    return <SymbolView name={name.ios} size={size} tintColor={tintColor} style={style} />;
  }
  return (
    <MaterialIcons
      color={tintColor as string | undefined}
      name={Platform.OS === "android" ? name.android : name.web}
      size={size}
      style={style as StyleProp<TextStyle>}
    />
  );
}
