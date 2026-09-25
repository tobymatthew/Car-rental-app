import { TextField } from "@/components/ui/TextField";

type VehicleSearchFieldProps = {
  value: string;
  onChangeText: (value: string) => void;
};

export function VehicleSearchField({ value, onChangeText }: VehicleSearchFieldProps) {
  return (
    <TextField
      accessibilityHint="Searches vehicle make, model, location, and features as you type."
      autoCapitalize="none"
      label="Search cars"
      labelVisible={false}
      onChangeText={onChangeText}
      placeholder="Location, car, or feature"
      returnKeyType="search"
      value={value}
    />
  );
}
