import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { Icon, Button } from "@rneui/themed";
import { useNavigation,useIsFocused } from "@react-navigation/native";
import SafeArea from "../components/SafeArea";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonLong from "../components/ButtonLong";
import ActivityLoader from "../components/ActivityLoader";
import { ScrollView } from "react-native-gesture-handler";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function UploadCarVerification({  }) {
 
  const IsFocused= useIsFocused();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [ownership, setOwnership] = useState(null);
  const [worthiness, setWorthiness] = useState(null);
  const [registration, setRegistration] = useState(null);
  const [insurance, setInsurance] = useState(null);

  const storage = async () => {
    if(IsFocused){
    const proofOfOwnPhoto = await AsyncStorage.getItem("proof_of_own_photo");
    const vehicleRegistration = await AsyncStorage.getItem(
      "vehicle_registration"
    );
    const certificateOfRoad = await AsyncStorage.getItem("certificate_of_road");
    const insurance = await AsyncStorage.getItem("insurance");
    setOwnership(proofOfOwnPhoto);
    setWorthiness(certificateOfRoad);
    setRegistration(vehicleRegistration);
    setInsurance(insurance);
    }
  };

  
  const onPress = () => {
    setLoading(true);
    navigation.navigate("HostCarExterior");
    setLoading(false);
  };
  useEffect(() => {
      
    IsFocused && storage();
  }, [IsFocused]);
  // const proofOfOwnPhoto = await AsyncStorage.getItem("proof_of_own_photo");

  return (
    <SafeArea>
      <View style={style.approveContainer}>
        <ScrollView style={style.scroll}>
        <View style={style.iconContainer}>
          <Icon
            onPress={() => navigation.goBack()}
            name="chevron-back-circle-outline"
            type="ionicon"
          />
        </View>
        <View style={style.ApprovedToDrive}>
          <Text style={style.ApprovedToDriveText}>Upload Your Car</Text>
          <Text style={style.ApprovedToDriveText}>Verification Details</Text>
          <Text style={style.ApprovedToDriveText2}>
            We need you to provide us with some information before your car can
            be listed on CarGenie
          </Text>
        </View>
        <View style={[style.number, style.approvedBorder]}>
          <Pressable
            style={[style.wrapping]}
            onPress={() =>
              navigation.navigate("ProofOfOwnerUplaod", {
                header: "Upload Your\nProof Of Ownership",
                subtext:
                  "Please upload a clear document of your\nproof of ownership document for your car",
                checkNumber: "proof_of_own_number",
                checkPhoto: "proof_of_own_photo",
              })
            }
          >
            <Text style={[style.numberText, style.approvedBorderText]}>
              Proof of ownership{" "}
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

        <View style={[style.liscence, style.approvedBorder]}>
          <Pressable
            style={[style.wrapping]}
            onPress={() =>
              navigation.navigate("ProofOfOwnerUplaod", {
                header: "Upload Your\nCertificate of Road worthiness",
                subtext:
                  "Please upload a clear document of your\nCertificate of Road worthiness document for your car",
                checkPhoto: "certificate_of_road",

                checkNumber: "empty",
              })
            }
          >
            <Text style={[style.liscenceText, style.approvedBorderText]}>
              Certificate of Road worthiness{" "}
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
        </View>

        <View style={[style.liscence, style.approvedBorder]}>
          <Pressable
            style={[style.wrapping]}
            onPress={() =>
              navigation.navigate("ProofOfOwnerUplaod", {
                header: "Upload Your\nVehicle registration",
                subtext:
                  "Please upload a clear document of your\nVehicle registration document for your car",
                checkPhoto: "vehicle_registration",
                checkNumber: "empty",
              })
            }
          >
            <Text style={[style.liscenceText, style.approvedBorderText]}>
              Vehicle registration
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
        </View>

        <View style={[style.liscence, style.approvedBorder]}>
          <Pressable
            style={[style.wrapping]}
            onPress={() =>
              navigation.navigate("ProofOfOwnerUplaod", {
                header: "Upload Your\nInsurance ",
                subtext:
                  "Please upload a clear document of your\nVehicle Insurance  for your car",
                checkPhoto: "insurance",
                checkNumber: "empty",
              })
            }
          >
            <Text style={[style.liscenceText, style.approvedBorderText]}>
              Insurance
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
        </View>

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
        </ScrollView>
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

  scroll:{
    marginBottom:screenHeight*0.08,
    paddingTop:screenHeight*0.001
  },

  iconContainer: {
    alignItems: "flex-start",
    marginTop: 25,
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
    width: screenWidth *0.9,
    backgroundColor: "#fff",
    paddingLeft: 18,
    paddingRight:10,
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
    marginTop:screenHeight * 0.05,
    paddingRight: 22,
  },
  button: {
    backgroundColor: "#7BB66D",
    borderRadius: 25,
  },
});
