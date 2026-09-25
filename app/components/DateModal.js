import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView,
  } from "react-native";
  import React, { useState } from "react";
  import { Icon } from "@rneui/themed";
  import SafeArea from "./SafeArea";
  import MultiSlider from "@ptomasroos/react-native-multi-slider";
  import { MultiSelect } from "react-native-element-dropdown";
  import Button from "./ButtonLong";
  import { isDate } from "moment/moment";
  import { useNavigation } from "@react-navigation/native";
  
  import { typeOfcolor, seat, vehicleNames } from "./../static/data";
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
export default function DateModal() {
  return (
    <View>
      <Text>DateModal</Text>
    </View>
  )
}