import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React from "react";
import Payment from "../components/Payment";
import SafeArea from "../components/SafeArea";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
export default function Pay({ route }) {
  const navigation= useNavigation();
  const { name, front, total, duration, price } = route.params;
  return (
    <SafeArea>
      <View style={style.container}>
      <View style={style.OrderSummaryTab}>
        <Icon
          style={style.icon}
          onPress={() => navigation.goBack()}
          name="chevron-back-circle-outline"
          type="ionicon"
        />
        <Text style={style.OrderSummaryTabText}>Checkout</Text>
      </View>
        <View style={style.detailsInfo}>
          <View>
            <Image
              style={style.image}
              source={{ uri: front }}
              resizeMode="cover"
            />
          </View>
          <View style={style.headerDetailsInfo}>
            <View>
            <Text style={style.headerDetailsInfoText1}>{name}</Text>
            </View>
            <View>
              <Text style={style.headerDetailsInfoText2Header}>Total Fee</Text>
              <Text style={style.headerDetailsInfoText2}>N{total}</Text>
            </View>
            <View style={style.headerDetailsInfoPrice}>
              <View style={style.duration}>
                <Text style={style.headerDetailsInfoText3}>{duration} day</Text>
              </View>
              <Text style={style.headerDetailsInfoText3}>N{price}/</Text>

              <Text style={style.headerDetailsInfoText3}>day</Text>
            </View>
          </View>
        </View>
        <View style={style.buttonContainer}>
        <Payment total={total} />
        </View>
      </View>
    </SafeArea>
  );
}

const style = StyleSheet.create({
  container: {
    height: screenHeight,
    width: screenWidth,
    backgroundColor: "#FAFAF5",
    paddingLeft:22,
    paddingRight:22,
  },

 

  OrderSummaryTab: {
    flexDirection: "row",
    paddingTop: 15,
  },

  
  OrderSummaryTabText: {
    marginLeft: screenWidth*0.2,
    fontSize: 20,
    fontWeight: "600",
  },

  
  image: {
    width: screenWidth * 0.4,
    height: screenHeight * 0.2,
    borderRadius: 24,
  },

  detailsInfo: {
    flexDirection: "row",
    // paddingLeft: screenWidth * 0.03,
    backgroundColor: "#FAFAF5",
    paddingTop: 54,
  },
  headerDetailsInfo: {
    marginLeft: screenWidth * 0.05,
    marginTop: screenHeight * 0.02,
  },
  headerDetailsInfoText1: {
    fontSize: 20,
    color: "#000000",
  },
  headerDetailsInfoPrice: {
    flexDirection: "row",
  },
  headerDetailsInfoText2Header:{
     marginTop:screenHeight*0.01
  }, 

  headerDetailsInfoText2: {
    fontSize: 22,
    color: "#7BB66D",
    fontWeight: "bold",
  },
  headerDetailsInfoText3: {
    fontSize: screenHeight*0.016,
    color: "#C9C9C9",
    marginTop: 8,
  },
  duration:{
    marginRight:screenWidth*0.015,
  },

  buttonContainer:{
   marginTop:screenHeight*0.1
  },
});
