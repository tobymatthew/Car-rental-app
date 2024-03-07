import { View, Text, StyleSheet } from "react-native";
import React from "react";
import SmallProfileImage from "./SmallProfileImage";
export default function RatingAndReview() {
  return (
    <View style={style.reviewContainer}>
      <View style={style.reviewHeader}>
        <Text style={style.reviewHeaderText}>Rating And Reviews</Text>
      </View>
      <View style={style.ratingContainer}>
        <SmallProfileImage />
        <View>
          <Text>+ + + + +</Text>
          <Text style={style.ratingDetail}>
            <Text style={style.ratingDetailText}>Kelly </Text>
            <Text style={style.ratingDetailText2}> May 30, 2022 </Text>
          </Text>
        </View>
      </View>

      <View>
        <Text style={style.reviewText}>
          Lorem ipsum dolor sit amet, conse adipiscing elit. Quisque ultrices
          enim Lorem ipsum dolor sit amet, conse adipiscing elit.
        </Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  reviewContainer: {
    paddingLeft: 22,
  },

  reviewHeaderText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A321E",
  },

  ratingContainer: {
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom:8
  },

  ratingDetailText: {
    fontSize: 12,
  },

  ratingDetailText2: {
    fontSize: 8,
    color: "#C4C4C4",
  },

  reviewText: {
    fontSize: 12,
  },
});
