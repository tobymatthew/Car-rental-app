import { View, Text, ScrollView } from "react-native";
import React from "react";
import VerifyUpload from "../components/VerifyUpload";
import SafeArea from "../components/SafeArea";

export default function ProofOfOwnerUplaod({ route }) {
  const { header, subtext, checkPhoto, checkNumber } = route.params;
  return (
    <SafeArea>
      <ScrollView style={{ height: "200%" }}>
        <View>
          <VerifyUpload
            header={header}
            subtext={subtext}
            checkPhoto={checkPhoto}
            checkNumber={checkNumber}
          />
        </View>
      </ScrollView>
    </SafeArea>
  );
}
