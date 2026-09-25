import { View, Text, StyleSheet, Pressable, Dimensions,ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { Button, Icon } from "@rneui/themed";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import SafeArea from "../components/SafeArea";
import ButtonLong from "../components/ButtonLong";
import ActivityLoader from "../components/ActivityLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userIDInfo, reset} from "../redux/slice/auth/auth";
import { useSelector, useDispatch } from "react-redux";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
export default function SpecifyLocation() {
  const navigation = useNavigation();
  const IsFocused = useIsFocused();
  const dispatch = useDispatch();
  const { userID} = useSelector(
    (state) => state.auth
  );
  const [loading, setLoading] = useState(false);
  const [ownership, setOwnership] = useState(null);
  const [worthiness, setWorthiness] = useState(null);

  const phoneNumber= userID.data.d_phone_number;

  const storage = async () => {
    if (IsFocused) {
      const pickupLocation = await AsyncStorage.getItem("pickup_location");
      const dropOffLocation = await AsyncStorage.getItem("drop_off_location");
      setOwnership(pickupLocation);
      setWorthiness(dropOffLocation);
    }
  };

   console.log(typeof phoneNumber)

  const onPress = () => {
    setLoading(true);
    navigation.navigate("Price");
    setLoading(false);
  };
  useEffect(() => {
    IsFocused && storage();
    dispatch(userIDInfo());
  }, [IsFocused]);

  return (
    <SafeArea>
      <View style={style.approveContainer}>
        <ScrollView>
        <View style={style.ApprovedToDrive}>
          <Text style={style.ApprovedToDriveText}>
            Specify Pick Up And Drop{" "}
          </Text>
          <Text style={style.ApprovedToDriveText}>Off Locations</Text>
          <Text style={style.ApprovedToDriveText2}>
            Please specify the locations for pick up and drop off of your
            vehicle
          </Text>
        </View>
        <View style={[style.number, style.approvedBorder]}>
          <Pressable
            style={[style.wrapping]}
            onPress={() =>
              navigation.navigate("SpecifyPickup", {
                header: "Specify Pick Up And Drop \n Off Locations",
                subtext:
                  "Please specify the locations for pick up\nand drop off of your vehicle",
                address: "pickup_location",
              })
            }
          >
            <Text style={[style.numberText, style.approvedBorderText]}>
              Pick Up Location{" "}
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
        </View>
        <Pressable
          style={[style.liscence, style.approvedBorder, style.wrapping]}
          onPress={() =>
            navigation.navigate("SpecifyPickup", {
              header: "Specify Drop Off Location",
              subtext:
                "Please Enter a specific location you would\nlike your vehicle to be dropped off from\nwhen being reurned. ",
              address: "drop_off_location",
            })
          }
        >
          <Text style={[style.liscenceText, style.approvedBorderText]}>
            Drop Off Location{" "}
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
          onPress={() => navigation.navigate("PhoneNumber",{
            from:'bvn',
          })}
        >
          <Text style={[style.liscenceText, style.approvedBorderText]}>
          BVN Number{" "}
          </Text>
          {phoneNumber !==null ? (
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
              title="Save"
              disabled={!ownership || !worthiness || phoneNumber===null}
              buttonExternal={[style.spacing]}
              onPress={onPress}
            />
          )}
        </View>
        </ScrollView>
      </View>
    </SafeArea>
  );
}

style = StyleSheet.create({
  approveContainer: {
    backgroundColor: "#FAFAF5",
    height: screenHeight,
    width: screenWidth,
    paddingLeft: 22,
    paddingTop: screenHeight * 0.05,
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
    marginTop: screenHeight * 0.2,
    paddingRight: 22,
  },
  button: {
    backgroundColor: "#7BB66D",
    borderRadius: 25,
  },
});
