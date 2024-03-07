import { View, Text, Image, StyleSheet,Dimensions } from "react-native";
import React from "react";
import normalize from "react-native-normalize";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function Specification(props) {
  const {
    colour,
    vehicle_make,
    vehicle_type,
    year_of_make,
    number_of_seats,
    transmission
  }=props
  return (
    <View style={style.specificationSection}>
    <Text style={style.specification}>Specifications</Text>
    <View style={style.specificationCardContainer}>
      <View
        style={{ flexDirection: "row", justifyContent: "space-around" }}
      >
        <View style={style.specificationCard}>
          <Text style={style.textCard}>Colour</Text>
          <Text style={style.textCard2}>{ colour}</Text>
        </View>
        <View style={style.specificationCard}>
          <Text style={style.textCard}>Vehicle Make</Text>
          <Text style={style.textCard2}>{vehicle_make}</Text>
        </View>
      </View>
      <View
        style={{ flexDirection: "row", justifyContent: "space-around" }}
      >
        <View style={style.specificationCard}>
          <Text style={style.textCard}>Vehicle Type</Text>
          <Text style={style.textCard2}>{ vehicle_type}</Text>
        </View>
        <View style={style.specificationCard}>
          <Text style={style.textCard}>Year Of Make</Text>
          <Text style={style.textCard2}>{ year_of_make}</Text>
        </View>
      </View>
      <View
        style={{ flexDirection: "row", justifyContent: "space-around" }}
      >
        <View style={style.specificationCard}>
          <Text style={style.textCard}>Number Of Seats</Text>
          <Text style={style.textCard2}>{ number_of_seats}</Text>
        </View>
        <View style={style.specificationCard}>
          <Text style={style.textCard}>Transmission</Text>
          <Text style={style.textCard2}>{ transmission}</Text>
        </View>
      </View>
    </View>
  </View>
  )
}

const style= StyleSheet.create({

      specificationCard: {
        width: screenWidth*0.4,
        paddingBottom: normalize(10),
        borderRadius: 8,
        paddingLeft: normalize(10),
        backgroundColor: "#fff",
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: screenWidth* 0.001,
        shadowRadius:  1.3,
        
        elevation: 2,
   
      },
      specification: {
        margin: screenHeight*0.025,
        fontSize: 18,
        fontWeight: "700",
        color: "#1A321E",
      },
    
      textCard: {
        fontSize: screenHeight * 0.015,
        marginTop:screenHeight*0.009,
      },
      textCard2: {
        fontSize: screenHeight * 0.018,
        marginTop:screenHeight*0.01,
        fontWeight: "700",
      },
})