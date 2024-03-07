import { View, Text,StyleSheet } from "react-native";
import React from "react";

export default function SmallProfileImage() {
  return (
    <View style={style.hostImageContainer}>
      <View style={style.hostImage}></View>
    </View>
  );
}

const style = StyleSheet.create({
    
  hostImageContainer:{
    marginRight:16,
  },

  hostImage:{
     backgroundColor:"#D9D9D9",
     width:50,
     height:50,
     borderRadius:360
  },
})
