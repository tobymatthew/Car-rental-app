import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Indicator({ indicatorCount, currentSlideIndex }) {
  if (!indicatorCount || typeof indicatorCount !== "number") return null;

  let indicators = [];

  for (let i = 0; i < indicatorCount; i++) {
    indicators.push(i);
  }


  return indicators.map((indicators, index) =>
   (
    <View
      key={indicators.toString()}
      style={[
        style.indicator,
        index === currentSlideIndex ? style.selected : style.unSelected,
      ]}
    />
  
  ));

}

const style = StyleSheet.create({
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selected: {
    backgroundColor: "#1A321E",
  },
  unSelected: {
    backgroundColor: "#7BB66D94",
    borderColor: "#7BB66D94",
    borderWidth: 2,
  },
});
