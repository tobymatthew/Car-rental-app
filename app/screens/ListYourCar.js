import { View, Text,StyleSheet,ScrollView,Dimensions } from "react-native";
import React from "react";
import { Icon, Button } from "@rneui/themed";
import SafeArea from "../components/SafeArea";
import ButtonLong from "../components/ButtonLong";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function ListYourCar ({navigation}) {
  return (
    <SafeArea>
    
    <View style={style.container}>
    <ScrollView style={style.scroll} showsVerticalScrollIndicator={false}>
      <View style={style.iconContainer}>
        <Icon
          onPress={() => navigation.goBack()}
          name="chevron-back-circle-outline"
          type="ionicon"
        />
      </View>

      <View style={style.headerContainer}>
        <Text style={style.headerContainerText}>How Does Listing Your </Text>
        <Text style={style.headerContainerText}>Car For Rent Work ?</Text>
      </View>

      <View style={style.buttonContainer}>
          <ButtonLong
            title="List Your Car"
            buttonStyle={[style.button]}
            titleStyle={style.titleStyle}
            onPress={()=>navigation.navigate("HostCarDetails")}
          />
        </View>

        </ScrollView>
    </View>
    </SafeArea>
  );
}

const style=StyleSheet.create({
    container: {
        backgroundColor:"#FAFAF5",
        paddingLeft:22,
        height:screenHeight,
       
    },

    scroll:{
      marginBottom:screenHeight*0.08,
    },

    iconContainer: {
        alignItems:"flex-start",
        marginTop:screenHeight *0.02,
      },

    headerContainer:{
        paddingTop:screenHeight *0.05
    },

    headerContainerText:{
        fontSize:24,
        fontWeight:"700"
    },
    buttonContainer: {
        marginTop:screenHeight * 0.6,
        paddingRight: 22,
      },
    
   
    
})
