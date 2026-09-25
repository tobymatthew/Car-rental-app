import { View, Text, StyleSheet, Dimensions,Image } from "react-native";
import React from "react";
import normalize from "react-native-normalize";

export default function Slide({ item }) {
  return (
    <View style={[styles.slide]}>
      
      <Text style={[styles.text, styles.textTitle]}>{item.title}</Text>
      <Text style={[styles.text, styles.textDesc]}>{item.desc}</Text>
       <Image style={[styles.img, { marginLeft:item.margin}]} source={item.BackgroundImage}/>
    </View>
  );
}

const { width, height } = Dimensions.get("screen");
const styles = StyleSheet.create({
  slide: {
    width,
    marginTop: normalize(40),
    marginLeft:normalize(10)
  },
  text: {
    color: "#000",
  },

  textTitle:{
    fontSize:normalize(30),
    fontWeight:'bold',
  },

  textDesc:{
    fontSize:normalize(20),
    lineHeight:21,
    fontWeight:'400',
    marginTop:normalize(8)

  },

  img:{
    marginTop:normalize(45),
    height:normalize(200),
    width:normalize(350),
 
    
}

});
