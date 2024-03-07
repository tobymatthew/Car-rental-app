import {
  View,
  Text,
  StyleSheet,
 Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import SmallCardItem from "./SmallCardItem";
import { useSelector, useDispatch } from "react-redux";
import { getVehicle, reset } from "../redux/slice/vehicle/Vehicles";
import normalize from 'react-native-normalize';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
export default function AvailableCarsItem() {
  const { vehicles } = useSelector((state) => state.vehicles);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVehicle());
    // console.log(vehicles);
   
      dispatch(reset());
  
  }, [dispatch]);

  // console.log(vehicles);
  const filterVehicle = typeof vehicles !== "string" && vehicles.length !==0 ? vehicles.filter((vehicle) =>vehicle.d_approved_for_listing===1):null
  const reverseVehicles= typeof vehicles !== "string" && vehicles.length !==0  ? filterVehicle.reverse() :null

  return (
    <View style={style.cardContainer}>
      <Text style={style.cardTextHeader}>Available Cars</Text>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          paddingLeft:screenWidth*0.05
        }}
      >
        {typeof vehicles !== "string" && vehicles.length !==0  ?  reverseVehicles.map((vehicle, index) => (
          <View key={index}>
            <SmallCardItem vehicles={vehicle} />
          </View>
        )):<Text style={style.cardText}>No available cars</Text>}
      </View>

    
    </View>
  );
}

const style = StyleSheet.create({
  cardContainer2: {
    flexDirection: "row",

    flexWrap: "wrap",
  },

  cardContainer: {
    paddingBottom: normalize(30,'height'),
  },
  cardContainer2: {
    flexDirection: "row",

    flexWrap: "wrap",
  },

  cardTextHeader: {
    fontSize: 18,
    fontWeight: "500",
    marginTop: normalize(10),
    marginLeft:screenWidth*0.1
  },
  cardText: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 28,
    marginHorizontal: 25,
    color: "#929292",
  },
});
