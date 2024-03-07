import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Icon, Button } from "@rneui/themed";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../redux/slice/auth/auth";
import {
  useNavigation,
  StackActions,
  useIsFocused,
} from "@react-navigation/native";
import PressableFrame from "../components/PressableFrame";
import SmallProfileImage from "../components/SmallProfileImage";
import normalize from "react-native-normalize";

import {
  getVehicleByHost,
  reset as resetVehicle,
} from "../redux/slice/vehicle/Vehicles";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function More({}) {
  const IsFocused = useIsFocused();

  const { vehicleByID, isSuccess } = useSelector((state) => state.vehicles);
  const { userID, logoutState } = useSelector((state) => state.auth);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const Firstname =
    userID !== undefined && userID !== null ? userID.data.d_first_name : null;

  const profile =
    userID !== undefined && userID !== null
      ? userID.data.d_profile_photo
      : null;

  const [HostId, setHostId] = useState(null);

  useEffect(() => {
    if (IsFocused) {
      IsFocused && dispatch(getVehicleByHost());
    }

    if (isSuccess) {
      if (
        (!vehicleByID.msg && vehicleByID.length > 0 && typeof vehicleByID === "object") ||
        typeof vehicleByID === "array" 
      ) {
        setHostId(vehicleByID);
        // console.log("image",HostId.d_left_side_image);
      }
    }

    dispatch(resetVehicle());
  }, [IsFocused, dispatch]);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    if (logoutState) {
      navigation.dispatch(StackActions.replace("OnBoarding"));
    }
  };

  console.log(HostId);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1A321E" }}>
      <View style={style.container}>
        <ScrollView style={style.scroll} showsVerticalScrollIndicator={false}>
          <View style={style.iconContainer}>
            <View style={style.profile}>
              {profile === null ? (
                <SmallProfileImage />
              ) : (
                <Image
                  source={{ uri: profile }}
                  style={{
                    width: screenWidth * 0.11,
                    height: screenHeight * 0.05,
                    borderRadius: 360,
                    marginLeft: screenWidth * 0.04,
                  }}
                />
              )}
              <Text style={style.textUser}>Hello,{Firstname}</Text>
            </View>
            <Pressable
              onPress={() => {
                navigation.navigate("Notifications");
              }}
            >
              <Icon
                style={style.iconNotification}
                name="notifications-outline"
                color="#1A321E"
                type="ionicon"
              />
            </Pressable>
          </View>

          <View style={style.headerCard}>
            <Text style={style.headerCardText1}>List Your Car On Cargenie</Text>
            <Text style={style.headerCardText2}>
              Turn your cars to income generating assests. Put up cars for hire
              on CarGenie.
            </Text>

            <View style={style.headerCardFlex}>
              <Button
                title="Start Now"
                buttonStyle={[style.button]}
                titleStyle={style.titleStyle}
                onPress={() => navigation.navigate("ListYourCar")}
                // onPress={() => navigation.navigate("HostCarExterior")}
              />
              <Image source={require("../../assets/car.png")} />
            </View>
          </View>

          <PressableFrame
            onPress={() => navigation.navigate("Profile")}
            style={[style.number, style.approvedBorder]}
          >
            <View style={style.pressableChild}>
              <Icon
                name="person-circle-outline"
                type="ionicon"
                style={style.iconStart}
              />
              <Text style={[style.approvedBorderText]}>My Profile</Text>
              <Icon
                name="chevron-forward-outline"
                type="ionicon"
                style={[style.iconEnd, { marginLeft: "83%" }]}
              />
            </View>
          </PressableFrame>

          {(HostId !== null) & IsFocused ? (
            <PressableFrame
              onPress={() =>
                navigation.navigate("ListedCars", {
                  vehicles: vehicleByID,
                })
              }
              style={[style.number, style.approvedBorder]}
            >
              <View style={style.pressableChild}>
                <Icon
                  name="car-sport-outline"
                  type="ionicon"
                  style={style.iconStart}
                />
                <Text style={[style.approvedBorderText]}>Listed Cars</Text>
                <Icon
                  name="chevron-forward-outline"
                  type="ionicon"
                  style={[style.iconEnd, { marginLeft: "80%" }]}
                />
              </View>
            </PressableFrame>
          ) : null}

          {HostId && (
            <PressableFrame
              onPress={async () =>
                navigation.navigate("Trips", {
                  vehicles: vehicleByID,
                })
              }
              style={[style.number, style.approvedBorder]}
            >
              <View style={style.pressableChild}>
                <Icon
                  name="stethoscope"
                  type="font-awesome"
                  style={style.iconStart}
                />
                <Text style={[style.approvedBorderText]}>Trip Requests</Text>
                <Icon
                  name="chevron-forward-outline"
                  type="ionicon"
                  style={[style.iconEnd, { marginLeft: "75%" }]}
                />
              </View>
            </PressableFrame>
          )}

          {HostId && (
            <PressableFrame
              onPress={async () =>
                navigation.navigate("AccountNumber", {
                  vehicles: vehicleByID,
                })
              }
              style={[style.number, style.approvedBorder]}
            >
              <View style={style.pressableChild}>
                <Icon
                  name="account-balance-wallet"
                  type="material"
                  style={style.iconStart}
                />
                <Text style={[style.approvedBorderText]}>Account Number</Text>
                <Icon
                  name="chevron-forward-outline"
                  type="ionicon"
                  style={[style.iconEnd, { marginLeft: "65%" }]}
                />
              </View>
            </PressableFrame>
          )}

          {/* <PressableFrame
           onPress={() => navigation.navigate("Pay")}
          style={[style.number, style.approvedBorder]}
        >
          <View style={style.pressableChild}>
            <Icon
              name="person-circle-outline"
              type="ionicon"
              style={style.iconStart}
            />
            <Text style={[style.approvedBorderText]}>Payment Methods</Text>
            <Icon
              name="chevron-forward-outline"
              type="ionicon"
              style={[style.iconEnd,{marginLeft:"60%"}]}
            />
          </View>
        </PressableFrame> */}

          <PressableFrame
            // onPress={() => navigation.navigate("Profile")}
            style={[style.number, style.approvedBorder]}
          >
            <View style={style.pressableChild}>
              <Icon
                name="clipboard-outline"
                type="ionicon"
                style={style.iconStart}
              />
              <Text style={[style.approvedBorderText]}>Terms & Conditions</Text>
              <Icon
                name="chevron-forward-outline"
                type="ionicon"
                style={[style.iconEnd, { marginLeft: "58%" }]}
              />
            </View>
          </PressableFrame>

          <PressableFrame
            onPress={onLogout}
            style={[style.logSpacing, style.approvedBorder]}
          >
            <View style={style.pressableChild}>
              <Icon
                name="log-out-outline"
                type="ionicon"
                style={style.iconStart}
              />
              <Text style={[style.approvedBorderText]}>Log Out</Text>
              <Icon
                name="chevron-forward-outline"
                type="ionicon"
                style={[style.iconEnd, { marginLeft: "85%" }]}
              />
            </View>
          </PressableFrame>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    paddingLeft: 22,
    backgroundColor: "#FAFAF5",
    height: screenHeight,
  },

  scroll: {
    marginBottom: normalize(108),
  },
  iconContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 22,
  },

  profile: {
    flexDirection: "row",
  },

  textUser: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 8,
    marginTop: screenHeight * 0.015,
  },

  headerCard: {
    backgroundColor: "white",
    marginRight: 22,
    paddingLeft: 23,
    paddingTop: 13,
    paddingBottom: 14,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 35,
  },
  headerCardFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  headerCardText1: {
    fontSize: 20,
    fontWeight: "700",
  },

  headerCardText2: {
    fontSize: 14,
  },

  button: {
    backgroundColor: "#1A321E",
    borderRadius: 15.44,
    padding: 10,
    paddingLeft: 19,
    paddingRight: 26,
  },

  approvedBorder: {
    width: normalize(350),
    backgroundColor: "#fff",
    paddingLeft: normalize(18),
    paddingRight: 89,
    paddingBottom: normalize(15),
    paddingTop: 15,

    borderRadius: normalize(30),
    marginBottom: "5%",
  },

  approvedBorderText: {
    fontSize: 16,
    marginLeft: "3%",
    marginTop: "1%",
  },

  pressableChild: {
    flexDirection: "row",
  },

  logSpacing: {
    margingBottom: normalize(100),
  },
});
