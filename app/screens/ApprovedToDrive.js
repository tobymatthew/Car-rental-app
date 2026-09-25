import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function ApprovedToDrive() {
  return (
    <View style={style.approveContainer}>
      <View style={style.ApprovedToDrive}>
        <Text style={style.ApprovedToDriveText}>Get approved to drive</Text>
        <Text style={style.ApprovedToDriveText2}>
          We need you to provide us with some information before you checkout
        </Text>
      </View>
      <View style={[style.number, style.approvedBorder]}>
        <Text style={[style.numberText, style.approvedBorderText]}>Enter Your Mobile Number</Text>
      </View>
      <View style={[style.liscence, style.approvedBorder]}> 
        <Text style={[style.liscenceText,style.approvedBorderText]}>Upload Your Drivers Liscence</Text>
      </View>
    </View>
  );
}

style = StyleSheet.create({

    approveContainer:{
        backgroundColor:"#f8f8ff",
        height:"100%"
    },

    ApprovedToDrive:{
           marginTop:93,
           paddingHorizontal:22
    },

    ApprovedToDriveText:{
        fontSize:26,
        fontWeight:"bold"
        
    },
    ApprovedToDriveText2:{
        fontSize:16,
        fontWeight:"400",
    },

    number:{
        marginTop:44
    },

   approvedBorder:{
    marginLeft:22,
    marginRight:22,
    marginBottom:22,
    width:320,
    backgroundColor:"#fff",
    paddingLeft:18,
    paddingRight:89,
    paddingTop:22,
    paddingBottom:22,
    borderRadius:8,  
   },

   approvedBorderText:{
    fontSize:16
   }
  
});
