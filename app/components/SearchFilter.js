import { View, Text, FlatList, Dimensions, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import SmallCardItem from "./SmallCardItem";
import SafeArea from "./SafeArea";
import DisplayHeaderIcon from "./DisplayHeaderIcon";
import { useSelector, useDispatch } from "react-redux";
import { getVehicle, reset } from "../redux/slice/vehicle/Vehicles";
import { userIDInfo, reset as userReset } from "../redux/slice/auth/auth";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
export default function SearchFilter({ route }) {
  const { vehicles } = useSelector((state) => state.vehicles);
  const { userID } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { vehicle,iconTrue } = route.params;

  const navigation = useNavigation();

  const checkIcon= iconTrue==="iconTrue" ? "true":null

  useEffect(() => {
    dispatch(getVehicle());
    dispatch(userIDInfo());
    console.log("header", vehicles);
    return () => {
      dispatch(reset());
      dispatch(userReset());
    };
  }, [dispatch]);

  const Firstname = userID.data.d_first_name;
  const profile = userID.data.d_profile_photo;

  return (
    <SafeArea>
      <View
        style={{
          height: screenHeight,
          backgroundColor: "#FAFAF5",
          paddingBottom: screenHeight * 0.28,
          paddingTop: screenHeight * 0.01,
        }}
      >
        
      <DisplayHeaderIcon
         checkIcon={checkIcon}
          Firstname={Firstname}
          profile={profile}
          vehicles={vehicles}
        />
      
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={vehicle}
            keyExtractor={(item) => item.d_id}
            renderItem={({ item }) => <SmallCardItem vehicles={item} />}
          />
        </View>
      </View>
    </SafeArea>
  );
}
