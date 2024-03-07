import { View, Text } from "react-native";
import React from "react";
import AccountVerifyAndPickup from "../components/AccountVerifyAndPickup";

export default function SpecifyPickup({ route }) {
  const { header, subtext,address } = route.params;

  return (
    <View>
      <AccountVerifyAndPickup header={header} subtext={subtext} address ={address} />
    </View>
  );
}
