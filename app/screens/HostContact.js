import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

import React, { useEffect, useState } from "react";
import { Icon, Button } from "@rneui/themed";
import { useSelector, useDispatch } from "react-redux";
import { userIDInfo, reset } from "../redux/slice/auth/auth";
import { useNavigation } from "@react-navigation/native";
import SafeArea from "../components/SafeArea";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function HostContact() {
  const { userID } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  useEffect(() => {
    dispatch(userIDInfo());

   
  }, [dispatch]);

  const Firstname =
    userID.length !== 0 || userID !== undefined
      ? userID.data.d_first_name
      : null;
  const Lastname =
    userID.length !== 0 || userID !== undefined
      ? userID.data.d_last_name
      : null;
  const profile =
    userID.length !== 0 || userID !== undefined
      ? userID.data.d_profile_photo
      : null;
  const phoneNumber =
    userID !== undefined && userID.length !== 0
      ? userID.data.d_phone_number
      : null;

  return (
    <SafeArea>
      <View style={style.container}>
      <View style={style.detailContainer}>
          <Icon
            onPress={() => navigation.navigate("Home")}
            name="chevron-back-circle-outline"
            type="ionicon"
          />
          <Text style={style.headerText}>Contact Host</Text>
          <Icon name="dots-vertical" type="material-community" />
        </View>
        {/* <View style={style.header}>
          <Text style={style.headerText}>Contact Host</Text>
        </View> */}
        <View style={style.infoContainer}>
          <View style={style.infoContainerImage}>
            {profile ? (
              <Image
                style={{
                  width: screenWidth * 0.31,
                  height: screenHeight * 0.14,
                  borderRadius: 360,
                }}
                source={{ uri: profile }}
              />
            ) : (
              <Image source={require("../../assets/Ellipse.png")} />
            )}
          </View>
          <Text style={style.infoContainerText}>
            {Firstname} {Lastname}
          </Text>
          {/* <Text style={style.infoContainerText2}> 58 Trips</Text> */}
        </View>
        <View style={style.contact}>
          <Text style={style.contactText}>Contact Info</Text>
          <Text style={style.contactText2}>{phoneNumber}</Text>
        </View>
        {/* <View style={style.buttonContainer}>
        <Button
          onPress={() => navigation.navigate("CarDetail")}
          title="Call Kevin"
          buttonStyle={[style.button, style.buttonCall]}
          titleStyle={style.titleStyle}
        />

        <Button
          onPress={() => navigation.navigate("Home")}
          title="Copy Phone Number"
          buttonStyle={[style.button, style.buttonCopy]}
          titleStyle={style.titleStyle}
        />
        </View> */}
      </View>
    </SafeArea>
  );
}

const style = StyleSheet.create({
  container: {
    height: screenHeight,
    width: screenWidth,
    paddingLeft: 22,
    backgroundColor: "#FAFAF5"
  },

  header: {
    marginTop: 40,
    paddingLeft: 120,
   
  },

  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingLeft: 22,
    paddingRight: 10,
    
  },


  headerText: {
    fontSize: 20,
    fontWeight: "600",
  },

  infoContainer: {
    paddingLeft: screenWidth *0.3,
    marginTop: 27,
    paddingTop: 50,
  },

  infoContainerText: {
    marginTop: 10,
    fontSize: 18,
    marginLeft:screenWidth * 0.055

  },

  // infoContainerText2: {
  //   marginLeft: 30,
  //   fontSize: 12,
  // },

 

  contact: {
    marginTop: 50,
    marginLeft: 38,
    backgroundColor: "rgba(175, 242, 159, 0.26)",
    paddingLeft: 72,
    paddingTop: 24,
    paddingBottom: 40,
    width: 284,
  },

  contactText: {
    fontSize: 12,
    fontWeight: "400",
    marginLeft: 35,
  },

  contactText2: {
    fontSize: 22,
    fontWeight: "500",
  },

  buttonContainer: {
    marginTop: 60,
    paddingRight: 22,
  },

  button: {
    marginTop: 20,
    backgroundColor: "#7BB66D",
    borderRadius: 25,
    height: 50,
  },

  buttonCall: {
    backgroundColor: "#1A321E",
  },
});
