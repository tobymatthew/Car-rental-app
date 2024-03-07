import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  FlatList,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import { Icon, Card } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import FilterModal from "./FilterModal";
import { useSelector, useDispatch } from "react-redux";
import { getVehicle, reset } from "../redux/slice/vehicle/Vehicles";
import normalize from "react-native-normalize";
import {
  userIDInfo,
  reset as userReset,
  profileInfo,
} from "../redux/slice/auth/auth";
import HeaderSlider from "./HeaderSlider";
import SmallProfileImage from "./SmallProfileImage";

export default function DisplayHeaderIcon({
  Firstname,
  profile,
  vehicles,
  checkIcon,
}) {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const navigation = useNavigation();

  const [search, setSearch] = useState();
  //  console.log (search)

  const style = styles({ screenWidth, screenHeight });

  const filterSearch =
    typeof vehicles !== "string" && vehicles.length !== 0
      ? vehicles.filter((vehicle) => vehicle.d_vehicle_make.includes(search))
      : null;

  const onPress = () => {
    filterSearch
      ? navigation.navigate("SearchFilter", {
          vehicle: filterSearch,
          iconTrue: "iconTrue",
        })
      : null;
  };

   const name= Firstname.length >5 ? Firstname.slice(0,5):Firstname

  return (
    <View>
      <View style={[style.iconContainers]}>
        <View style={style.profile}>
          {!profile ? (
            <View style={{ marginLeft: screenWidth * 0.04 }}>
              <SmallProfileImage />
            </View>
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
          <Text style={style.textUser}>Hello,{name}</Text>
        </View>
        <View style={style.iconContainer}>
          <Pressable
            onPress={() => {
              navigation.navigate("Notifications");
            }}
            style={style.iconBodyContainer}
          >
            <Icon
              style={style.iconNotification}
              name="notifications-outline"
              color="#1A321E"
              type="ionicon"
            />
          </Pressable>

          <FilterModal vehicles={vehicles} />
        </View>
      </View>

      <View style={checkIcon === "true" ? style.inputFlex : null}>
        {checkIcon === "true" ? (
          <Icon
            onPress={() => navigation.navigate("Home")}
            name="chevron-back-circle-outline"
            type="ionicon"
            style={style.iconBack}
          />
        ) : null}

        <View
          style={[
            checkIcon === "true" ? style.inputSearchFlex : style.inputSearch,
          ]}
        >
          <Pressable onPress={onPress}>
            <Icon
              style={style.iconSearch}
              name="search-outline"
              color="#1A321E"
              type="ionicon"
            />
          </Pressable>
          <View style={style.searchContainer}>
            <Input
              style={[
                checkIcon === "true" ? style.inputHolderFlex : style.input,
              ]}
              placeholder="Location, Car, Brand"
              onChangeText={(text) => setSearch(text)}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = ({ screenWidth, screenHeight }) => {
  return StyleSheet.create({
    header: {
      marginBottom: 20,
      backgroundColor: "#fff",
      borderBottomRightRadius: 25,
      borderBottomLeftRadius: 25,
      paddingBottom: 27,
    },
    iconContainers: {
      marginTop: screenHeight * 0.05,
      flexDirection: "row",
      marginBottom: screenHeight * 0.05,
      justifyContent: "space-between",
    },

    iconContainer: {
      flexDirection: "row",
      marginRight: normalize(screenWidth * 0.09),
    },

    iconBack: {
      alignItems: "flex-start",
      marginLeft: 22,
      marginTop: screenHeight * 0.03,
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

    iconNotification: {
      marginRight: normalize(screenWidth * 0.05),
    },

    inputSearch: {
      backgroundColor: "#F2F2F2",
      marginHorizontal: 20,
      flexDirection: "row",
      borderRadius: 28,
      paddingLeft: screenWidth * 0.05,
    },

    inputSearchFlex: {
      backgroundColor: "#F2F2F2",
      marginLeft: screenWidth * 0.02,
      flexDirection: "row",
      borderRadius: 28,
      paddingLeft: screenWidth * 0.05,

      width: screenWidth * 0.8,
    },

    inputFlex: {
      flexDirection: "row",
    },

    iconSearch: {
      marginTop: normalize(23, screenHeight),
    },

    input: {
      width: screenWidth * 0.62,
    },

    inputHolderFlex: {
      width: screenWidth * 0.5,
    },

    iconBodyContainer: {
      paddingHorizontal: 5,
    },
  });
};
