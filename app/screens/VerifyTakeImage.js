import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Icon, Button } from "@rneui/themed";

export default function VerifyTakeImage({ route }) {
  const navigation = useNavigation();
  const { result } = route.params;
  return (
    <View style={style.container}>
      <View style={style.iconContainer}>
        <Icon
          onPress={() => navigation.goBack()}
          name="chevron-back-circle-outline"
          type="ionicon"
        />
      </View>
      <Text>The Image</Text>
      {result && (
        <Image source={{ uri: result }} style={{ width: 50, height: 50 }} />
      )}

      <Button
        title="Use Image"
        buttonStyle={[style.button]}
        titleStyle={style.titleStyle}
        onPress={() => navigation.navigate("ProofOfOwnerUplaod",{
          imageResult:result,
        })}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    paddingVertical: 50,
  },
  iconContainer: {
    alignItems: "flex-start",
    paddingVertical: 5,
  },
});
