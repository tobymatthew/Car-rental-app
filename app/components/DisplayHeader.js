import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import { Icon, Card } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import FilterModal from "./FilterModal";
import { useSelector, useDispatch } from "react-redux";
import { getVehicle, reset } from "../redux/slice/vehicle/Vehicles";
import DisplayHeaderIcon from "./DisplayHeaderIcon";
import {
  userIDInfo,
  reset as userReset,
  profileInfo,
} from "../redux/slice/auth/auth";
import HeaderSlider from "./HeaderSlider";
import SmallProfileImage from "./SmallProfileImage";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function DisplayHeader() {
  const { vehicles } = useSelector((state) => state.vehicles);
  const { userID } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const Firstname =
    userID.length !== 0 
      ? userID.data.d_first_name
      : null;
  const Lastname =
    userID.length !== 0 
      ? userID.data.d_last_name
      : null;
  const profile =
    userID.length !== 0 
      ? userID.data.d_profile_photo
      : null;

  useEffect(() => {
    dispatch(getVehicle());
    dispatch(userIDInfo());
    // console.log("header", vehicles);
    
      dispatch(reset());
      dispatch(userReset());
  
  }, [dispatch]);

  // const name=user.data.first_name
  const [search, setSearch] = useState();
  //  console.log (search)

  // const filterSearch =  vehicles.filter((vehicle) =>
  //   vehicle.d_vehicle_make.includes(search)
  // );

  // const onPress = () => {
  //   navigation.navigate("SearchFilter", {
  //     vehicles: filterSearch,
  //   });
  // };
  const filterVehicle = typeof vehicles !== "string" && vehicles.length !==0 ? vehicles.filter((vehicle) =>vehicle.d_approved_for_listing===1):null
  const reverseVehicles= typeof vehicles !== "string" && vehicles.length !==0  ? filterVehicle.reverse() :null

  return (
    <View style={style.header}>
      { userID.length!==0? (
        <>
          <DisplayHeaderIcon
            Firstname={Firstname}
            profile={profile}
            vehicles={vehicles}
          />
        </>
      ):null }
         
       {  typeof vehicles !== "string" && vehicles.length !==0 ? (
        <>
          <FlatList
            data={reverseVehicles.slice(0,4)}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            keyExtractor={(item) => item.d_id}
            renderItem={({ item }) => <HeaderSlider vehicles={item} />}
          />
        </>
      ) : null}
    </View>
  );
}

const style = StyleSheet.create({
  header: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    paddingBottom: 27,
  },
  iconContainer: {
    marginTop: screenHeight * 0.05,
    flexDirection: "row",
    marginBottom: screenHeight * 0.05,
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
    marginLeft: screenWidth * 0.3,
    marginRight: screenWidth * 0.05,
  },

  inputSearch: {
    backgroundColor: "#F2F2F2",
    marginHorizontal: 20,
    flexDirection: "row",
    borderRadius: 28,
    paddingLeft: screenWidth * 0.05,
  },

  iconSearch: {
    marginTop: screenHeight * 0.025,
  },
});
