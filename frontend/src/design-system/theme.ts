import {
  borders,
  colors,
  elevation,
  imageRules,
  layout,
  motion,
  radii,
  spacing,
  typography,
} from "./tokens";

export const lightTheme = {
  colors,
  spacing,
  layout,
  radii,
  borders,
  elevation,
  typography,
  motion,
  imageRules,
} as const;

export type AppTheme = typeof lightTheme;
