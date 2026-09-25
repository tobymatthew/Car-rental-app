import { View, Text,ActivityIndicator, StyleSheet,Dimensions } from 'react-native'
import React from 'react'

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function ActivityLoader({spacing}) {
  return (
 
     < ActivityIndicator style={[style.activityStyle,spacing]}  size="large" color="#ffffff" />

  )
}

const style = StyleSheet.create({
    activityStyle:{
        paddingVertical:screenHeight*0.01,
        backgroundColor: "#7BB66D",
        borderRadius: 25,
        height: 50,
      },
})