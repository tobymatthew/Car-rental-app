import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

export default function Guidelines() {
  return (
    <View style={style.guidelineContainer}>
    <View >
      <Text style={style.guidelineText}>Guidelines</Text>
    </View>

    <View style={style.bulletList}>
        <View style={style.bulletlistButton}></View>
        <Text style={style.bulletListText}>This vehicle takes Premium fuel only.</Text>
    </View>

    </View>
  )
};

const style= StyleSheet.create({
  
      guidelineContainer:{
        paddingLeft:22
      },

      guidelineText:{
        fontSize:18,
        color:"#1A321E"
      },

      bulletList:{
         flexDirection:"row",  
      },

      bulletlistButton:{
         width:6,
         height:6,
         backgroundColor:"#000",
         borderRadius:360,
         marginTop:10,
         marginRight:15
      },

      bulletListText:{
         fontSize:14
      },
     
});