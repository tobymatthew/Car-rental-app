import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Button, Icon } from "@rneui/themed";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import BackArrow from "../components/BackArrow";
import SafeArea from "../components/SafeArea";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { createVehicle, reset } from "../redux/slice/vehicle/Vehicles";
import ButtonLong from "../components/ButtonLong";
import ActivityLoader from "../components/ActivityLoader";
import ScrollV from "../components/ScrollV";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function HostCarInterior() {
  const navigation = useNavigation();
  const IsFocused = useIsFocused();

  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ownership, setOwnership] = useState(null);
  const [worthiness, setWorthiness] = useState(null);
  const [registration, setRegistration] = useState(null);
  const [insurance, setInsurance] = useState(null);
  const storage = async () => {
    if (IsFocused) {
      const dashboardViewImage = await AsyncStorage.getItem(
        "dashboard_view_image"
      );
      const frontSeatImage = await AsyncStorage.getItem("front_seat_image");
      const backSeatImage = await AsyncStorage.getItem("back_seat_image");
      const trunkViewImage = await AsyncStorage.getItem("trunk_view_image");

      setOwnership(dashboardViewImage);
      setWorthiness(frontSeatImage);
      setRegistration(backSeatImage);
      setInsurance(trunkViewImage);
    }
  };

  const onPress = () => {
    setLoading(true);
    navigation.navigate("SpecifyLocation");
    setLoading(false);
  };

  useEffect(() => {
    IsFocused && storage();
  }, [IsFocused]);

  return (
    <SafeArea>
      <View style={style.approveContainer}>
        <ScrollV>
          <BackArrow />
          <View style={style.ApprovedToDrive}>
            <Text style={style.ApprovedToDriveText}>
              Upload Images Of The{"\n"}Interior Of Your Car
            </Text>

            <Text style={style.ApprovedToDriveText2}>
              We will need you to provide these images{"\n"}of your car
            </Text>
          </View>
          <Pressable
            style={[style.number, style.approvedBorder, style.wrapping]}
            onPress={() =>
              navigation.navigate("CarPartUpload", {
                header: "Upload an Image Of The\nDashboard View",
                subtext: "Please upload a clear Image of the\nDashboard View ",
                checkPhoto: "dashboard_view_image",
                routing: "HostCarInterior",
              })
            }
          >
            <Text style={[style.numberText, style.approvedBorderText]}>
              Dashboard View
            </Text>
            {ownership ? (
              <Icon
                style={style.iconType}
                name="checkmark-done-outline"
                color="#1A321E"
                type="ionicon"
              />
            ) : null}
          </Pressable>

          <Pressable
            style={[style.liscence, style.approvedBorder, style.wrapping]}
            onPress={() =>
              navigation.navigate("CarPartUpload", {
                header: "Upload an Image Of The\nFront Seat View",
                subtext: "Please upload a clear Image of the Front\nSeat View",
                checkPhoto: "front_seat_image",
                routing: "HostCarExterior",
              })
            }
          >
            <Text
              style={[
                style.liscenceText,
                style.approvedBorderText,
                style.wrapping,
              ]}
            >
              Front Seat View
            </Text>
            {worthiness ? (
              <Icon
                style={style.iconType}
                name="checkmark-done-outline"
                color="#1A321E"
                type="ionicon"
              />
            ) : null}
          </Pressable>

          <Pressable
            style={[style.liscence, style.approvedBorder, style.wrapping]}
            onPress={() =>
              navigation.navigate("CarPartUpload", {
                header: "Upload an Image Of The\nBack Seat View",
                subtext: "Please upload a clear Image of the Back\nSeat View ",
                checkPhoto: "back_seat_image",
                routing: "HostCarExterior",
              })
            }
          >
            <Text
              style={[
                style.liscenceText,
                style.approvedBorderText,
                style.wrapping,
              ]}
            >
              Back Seat View
            </Text>
            {registration ? (
              <Icon
                style={style.iconType}
                name="checkmark-done-outline"
                color="#1A321E"
                type="ionicon"
              />
            ) : null}
          </Pressable>

          <Pressable
            style={[style.liscence, style.approvedBorder, style.wrapping]}
            onPress={() =>
              navigation.navigate("CarPartUpload", {
                header: "Upload an Image Of The\nTrunk",
                subtext: "Please upload a clear Image of the\nTrunk ",
                checkPhoto: "trunk_view_image",
                routing: "HostCarExterior",
              })
            }
          >
            <Text
              style={[
                style.liscenceText,
                style.approvedBorderText,
                style.wrapping,
              ]}
            >
              Trunk
            </Text>
            {insurance ? (
              <Icon
                style={style.iconType}
                name="checkmark-done-outline"
                color="#1A321E"
                type="ionicon"
              />
            ) : null}
          </Pressable>

          <View style={style.buttonContainer}>
            {loading ? (
              <ActivityLoader spacing={style.spacing} />
            ) : (
              <ButtonLong
                title="Next"
                disabled={
                  !ownership || !worthiness || !insurance || !registration
                }
                buttonExternal={[style.spacing]}
                onPress={onPress}
              />
            )}
          </View>
        </ScrollV>
      </View>
    </SafeArea>
  );
}

const style = StyleSheet.create({
  approveContainer: {
    backgroundColor: "#FAFAF5",
    height: screenHeight,
    width: screenWidth,
    paddingLeft: 22,
  },

  ApprovedToDrive: {
    marginTop: 20,
  },

  ApprovedToDriveText: {
    fontSize: 26,
    fontWeight: "bold",
  },
  ApprovedToDriveText2: {
    fontSize: 16,
    fontWeight: "400",
  },

  number: {
    marginTop: 44,
  },

  approvedBorder: {
    marginBottom: 22,
    width: 350,
    backgroundColor: "#fff",
    paddingLeft: 18,
    paddingTop: 22,
    paddingBottom: 22,
    borderRadius: 8,
  },

  approvedBorder: {
    marginBottom: 22,
    width: screenWidth * 0.9,
    backgroundColor: "#fff",
    paddingLeft: 18,
    paddingRight: 10,
    paddingTop: 22,
    paddingBottom: 22,
    borderRadius: 10,
  },

  approvedBorderText: {
    fontSize: 16,
    fontWeight: "500",
  },

  wrapping: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    marginTop: screenHeight * 0.05,
    paddingRight: 22,
  },
  button: {
    backgroundColor: "#7BB66D",
    borderRadius: 25,
  },
});
