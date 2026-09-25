import { View, Text,ScrollView, StyleSheet, Dimensions} from 'react-native'
import React from 'react'

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function Scroll({children}) {
  return (
    <ScrollView style={style.scroll}>
       {children}  
    </ScrollView>
  )
}

const style= StyleSheet.create({
 scroll:{
    marginBottom: screenHeight * 0.1,
    paddingLeft: screenWidth * 0.09,
    paddingTop: screenHeight * 0.04,
    paddingRight: screenWidth * 0.09,
 }
})