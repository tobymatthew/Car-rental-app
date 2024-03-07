import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Button, Icon } from "@rneui/themed";

export default function DriverLiscence() {
  return (
    <View style={style.container}>
       <View style={style.detailContainer}>
          <Icon
            onPress={() => navigation.navigate("Home")}
            name="chevron-back-circle-outline"
            type="ionicon"
          />
          <Text style={style.headerText}>Drivers Liscence</Text>
          <Icon name="dots-vertical" type="material-community" />
        </View>

        <View style={style.desc}>
            <Text style={style.descText}>Your drivers license has been uploaded and succesffuly approved!</Text>
        </View>

        <View style={style.liscenceConfirmation}>
            <Text style={style.liscenceConfirmationText} >Drivers Liscence</Text>
        </View>
    </View>
  )
}

style=StyleSheet.create({
   
    container:{
       paddingLeft:22,
       backgroundColor:"#FAFAF5",
       height:"100%"
    },

    detailContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 50,
        paddingRight: 10,
      },
    
      headerText: {
        fontSize: 20,
        fontWeight: "700",
      },

      desc:{
         paddingTop:55,
         width:307,
      },

      descText:{
        fontSize:14,
        fontWeight:"500"

      },

      liscenceConfirmation:{
        backgroundColor:"#fff",
        marginTop:28,
        borderRadius:37,
        padding:17,
        paddingLeft:22,
        marginRight:22
      },

      liscenceConfirmationText:{
         fontSize:16,
         fontWeight:"400"
      },


})