import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import React from "react";
import Features from "../components/Features";
import Specification from "../components/Specification";
import DetailHeader from "../components/DetailHeader";
import HostedBy from "../components/HostedBy";
import RatingAndReview from "../components/RatingAndReview";
import Guidelines from "../components/Guidelines";
import { Button } from "@rneui/themed";
import SafeArea from "../components/SafeArea";
import Scroll from "../components/Scroll";
import ButtonLong from "./../components/ButtonLong";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function CarDetail({ navigation, route }) {
  const {
    vehicle_make,
    price,
    front_view_image,
    userID,
    vehicleId,
    dropOff,
    back_view_image,
    right_side_image,
    left_side_image,
    dashboard_view_image,
    trunk_view_image,
    back_seat_image,
    front_seat_image,
    pickup,
    from
  } = route.params;

  const onPress = () => {
    navigation.navigate("RentDetails", {
      vehicle_make: vehicle_make,
      price: price,
      front_view_image: front_view_image,
      vehicleId: vehicleId,
      dropOff: dropOff,
      pickup:pickup,
      vUserId:userID

    });
  };

  return (
    <SafeArea>
      <View style={style.container}>
        <ScrollView style={style.scroll}>
          <View>
            <DetailHeader
              front_view_image={front_view_image}
              back_view_image={back_view_image}
              right_side_image={right_side_image}
              left_side_image={left_side_image}
              dashboard_view_image={dashboard_view_image}
              trunk_view_image={trunk_view_image}
              back_seat_image={back_seat_image}
              front_seat_image={front_seat_image}
              price={price}
              vehicle_make={vehicle_make}
              onPress={onPress}
            />
          </View>

          <View>
            <Specification
              colour={route.params.colour}
              vehicle_make={route.params.vehicle_make}
              vehicle_type={route.params.vehicle_type}
              year_of_make={route.params.year_of_make}
              number_of_seats={route.params.number_of_seats}
              transmission={route.params.transmission}
            />
          </View>

          <View style={style.features}>
            <Features
              is_bluetooth={route.params.is_bluetooth}
              is_wheel_chair={route.params.is_wheel_chair}
              is_gps={route.params.is_gps}
              is_bike={route.params.is_bike}
              is_child={route.params.is_child}
              is_back_camera={route.params.is_back_camera}
              is_navigation={route.params.is_navigation}
              is_keyless={route.params.is_keyless}
              is_usb={route.params.is_usb}
              is_heated={route.params.is_heated}
            />
          </View>

          <View style={style.hostedBy}>
            <HostedBy id={userID} from={from}/>
          </View>

          {/* <View style={style.RatingAndReview}>
            <RatingAndReview />
          </View>

          <View style={style.Guidelines}>
            <Guidelines />
          </View> */}
          { from==="history" ? null:

          <ButtonLong
            onPress={onPress}
            title="Rent Vehicle"
            buttonExternal={[style.buttonExternal]}
          />
       }
        </ScrollView>
      </View>
    </SafeArea>
  );
}

const style = StyleSheet.create({
  container: {
    height: screenHeight,
    width: screenWidth,
    backgroundColor: "#FAFAF5",
  },

  scroll: {
    marginBottom: screenHeight * 0.1,
  },

  features: {
    paddingBottom: 36,
  },

  hostedBy: {
    paddingBottom: 36,
  },

  RatingAndReview: {
    paddingBottom: 36,
  },

  Guidelines: {
    paddingBottom: 36,
  },

  buttonExternal: {
    marginHorizontal: screenWidth * 0.05,
    marginBottom: screenHeight * 0.03,
  },
  titleStyle: {
    color: "#fff",
  },
});
