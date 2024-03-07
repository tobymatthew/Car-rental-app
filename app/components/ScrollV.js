import { View, Text,ScrollView, StyleSheet, Dimensions} from 'react-native'
import React from 'react'

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function ScrollV({children}) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={style.scroll}>
       {children}  
    </ScrollView>
  )
}

const style= StyleSheet.create({
 scroll:{
    marginBottom: screenHeight * 0.08,
    paddingTop:screenHeight*0.025
 }
})