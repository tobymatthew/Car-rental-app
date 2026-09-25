import { layout } from "./tokens";

export const accessibility = {
  minimumTouchTarget: layout.minimumTouchTarget,
  requiredHint: "Required field.",
  imageFallbackLabel: "Image unavailable.",
} as const;

export function requiredFieldHint(hint?: string) {
  return hint ? `${hint} ${accessibility.requiredHint}` : accessibility.requiredHint;
}
