import { View, Text, StyleSheet,Image, Pressable,Dimensions } from "react-native";
import React from "react";
import { Icon, Card } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import normalize from 'react-native-normalize'

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
export default function SmallCardItem({ vehicles }) {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate("CarDetail", {
      id: vehicles.d_id,
      vehicleId: vehicles.d_vehicle_id,
      userID:vehicles.d_user_id,
      front_view_image: vehicles.d_front_view_image,
      back_view_image: vehicles.d_back_view_image,
      right_side_image: vehicles.d_right_side_image,
      left_side_image: vehicles.d_left_side_image,
      dashboard_view_image: vehicles.d_dashboard_view_image,
      trunk_view_image: vehicles.d_trunk_view_image,
      back_seat_image: vehicles.d_back_seat_image,
      front_seat_image:vehicles.d_front_seat_image,
      colour: vehicles.d_colour,
      vehicle_make: vehicles.d_vehicle_make,
      vehicle_type: vehicles.d_vehicle_type,
      number_of_seats: vehicles.d_number_of_seats,
      year_of_make: vehicles.d_year_of_make,
      colour: vehicles.d_colour,
      transmission: vehicles.d_transmission,
      odometer: vehicles.d_odometer,
      is_bluetooth: vehicles.d_is_bluetooth,
      is_wheel_chair: vehicles.d_is_wheel_chair,
      is_gps: vehicles.d_is_gps,
      is_bike: vehicles.d_is_bike,
      is_child: vehicles.d_is_child,
      is_back_camera: vehicles.d_is_back_camera,
      is_navigation: vehicles.d_is_navigation,
      is_keyless: vehicles.d_is_keyless,
      is_usb: vehicles.d_is_usb,
      is_heated: vehicles.d_is_heated,
      vehicle_make: vehicles.d_vehicle_make,
      price: vehicles.d_price,
      dropOff: vehicles.d_dropoff_location,
      pickup: vehicles.d_pickup_location
      
    });
  };
  
  return (
    <View style={style.cardContainer}>
      <Pressable  onPress={onPress}>
      <Card containerStyle={style.card}>
        <Image
         
          style={style.cardImage}
          resizeMode="cover"
          source={{uri:vehicles.d_front_view_image}}
          // source={require("../../assets/car3.jpg")}
        />
        <Text style={style.cardText1}>{vehicles.d_vehicle_make}</Text>
        <Text style={style.cardText2}>{vehicles.d_price}/day </Text>
      </Card>
      </Pressable>
    </View>
  );
}

const style = StyleSheet.create({

  // cardContainer:{
  //  height: screenHeight,
  //  width: screenWidth
  // },

  card: {
    width: screenWidth*0.38,
    height: screenHeight*0.28,
    // width: 150,
    // // height:80,
    padding: 0,
    borderRadius: 15,
    marginBottom:screenHeight*0.02,
    paddingBottom:screenHeight*0.024
  },

  cardImage: {
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    height: screenHeight*0.15,
    width: "100%",
  },

  cardText1: {
    fontSize:normalize(17),
    fontWeight: "400",
    marginTop: 10,
    marginBottom: normalize(10),
    marginHorizontal: 10,
  },
  cardText2: {
    fontSize:normalize(15),
    fontWeight: "700",
    color: "#7BB66D",
    marginHorizontal: 10,
  },
});
