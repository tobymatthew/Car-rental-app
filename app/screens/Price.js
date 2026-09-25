import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Input from "../components/Input";
import { Button } from "@rneui/themed";
import SafeArea from "../components/SafeArea";
import { Formik } from "formik";
import * as Yup from "yup";
import ButtonLong from "../components/ButtonLong";
import BackArrow from "../components/BackArrow";
import ActivityLoader from "../components/ActivityLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { createVehicle, reset } from "../redux/slice/vehicle/Vehicles";
import ScrollV from "../components/ScrollV";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const validationSchema = Yup.object({
  price: Yup.string().trim().required("Price is required!"),
});

export default function Price() {
  const navigation = useNavigation();
  const Info = {
    price: "",
  };

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const submitAddress = async (values, actions) => {
    setLoading(true);
    const hostCarDetails = await AsyncStorage.getItem("HostCarDetails");
    const hostCarFeatures = await AsyncStorage.getItem("HostCarFeatures");
    const proofOfOwnNumber = await AsyncStorage.getItem("proof_of_own_number");
    const proofOfOwnPhoto = await AsyncStorage.getItem("proof_of_own_photo");
    const vehicleRegistration = await AsyncStorage.getItem(
      "vehicle_registration"
    );
    const certificateOfRoad = await AsyncStorage.getItem("certificate_of_road");
    const insurance = await AsyncStorage.getItem("insurance");
    const frontViewImage = await AsyncStorage.getItem("front_view_image");
    const backViewImage = await AsyncStorage.getItem("back_view_image");
    const rightSideImage = await AsyncStorage.getItem("right_side_image");
    const leftSideImage = await AsyncStorage.getItem("left_side_image");
    const dashboardViewImage = await AsyncStorage.getItem(
      "dashboard_view_image"
    );
    const frontSeatImage = await AsyncStorage.getItem("front_seat_image");
    const backSeatImage = await AsyncStorage.getItem("back_seat_image");
    const trunkViewImage = await AsyncStorage.getItem("trunk_view_image");
    const pickupLocation = await AsyncStorage.getItem("pickup_location");
    const dropOffLocation = await AsyncStorage.getItem("drop_off_location");

    const detailsObject = JSON.parse(hostCarDetails);
    const featuresObject = JSON.parse(hostCarFeatures);

    const vehicleInfo = {
      ...detailsObject,
      ...featuresObject,
      price: values.price,
      pickup_location: pickupLocation,
      dropoff_location: dropOffLocation,
      proof_of_own_number: proofOfOwnNumber,
      proof_of_own_photo: proofOfOwnPhoto,
      vehicle_registration: vehicleRegistration,
      certificate_of_road: certificateOfRoad,
      insurance: insurance,
      front_view_image: frontViewImage,
      back_view_image: backViewImage,
      right_side_image: rightSideImage,
      left_side_image: leftSideImage,
      dashboard_view_image: dashboardViewImage,
      front_seat_image: frontSeatImage,
      back_seat_image: backSeatImage,
      trunk_view_image: trunkViewImage,
    };

    dispatch(createVehicle(vehicleInfo));

  
  };

   const removeItems= async()=>{
  
    const keys = [
      "HostCarDetails",
      "HostCarFeatures",
      "proof_of_own_number",
      "proof_of_own_photo",
      "vehicle_registration",
      "certificate_of_road",
      "insurance",
      "front_view_image",
      "back_view_image",
      "right_side_image",
      "left_side_image",
      "dashboard_view_image",
      "front_seat_image",
      "back_seat_image",
      "trunk_view_image",
      "pickup_location",
      "drop_off_location"
    ];
    
    await AsyncStorage.multiRemove(keys);


   }

  const { isCreated, tempVehicle, message, isError } = useSelector(
    (state) => state.vehicles
  );

  useEffect(() => {
    if (isError) {
      console.log("message", message);
      setLoading(false);
    }

    if (isCreated) {
    
      if (tempVehicle.msg==="vehicle_listed") {
     console.log("data", tempVehicle);
     dispatch(reset());
     setLoading(false);
     removeItems();
     navigation.navigate("Home");
   }
   else{
    setLoading(false);
   }
    setLoading(false);
    console.log("data", tempVehicle);
    }
    
  
 
  dispatch(reset());
  }, [reset,dispatch,message,isCreated]);

  return (
    <SafeArea>
      <View style={style.approveContainer}>
        <ScrollV>
        <BackArrow />
        <View style={style.ApprovedToDrive}>
          <Text style={style.ApprovedToDriveText}>Pricing </Text>
          <Text style={style.ApprovedToDriveText2}>
            Enter the price you would like to rent your car
          </Text>
        </View>
        <Formik
          initialValues={Info}
          validationSchema={validationSchema}
          onSubmit={submitAddress}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => {
            const { price } = values;
            return (
              <>
                <View style={style.inputContainer}>
                  <Input
                    value={price}
                    error={touched.price && errors.price}
                    onChangeText={handleChange("price")}
                    onBlur={handleBlur("price")}
                    autoCapitalize="none"
                    placeholder="₦ Enter Price"
                  />


                 
                </View>
                <View>
                {loading ? (
                    <ActivityLoader spacing={style.buttonExternal} />
                  ) : (
                    <ButtonLong
                      onPress={handleSubmit}
                      submitting={isSubmitting}
                      title="Save"
                      disabled={isSubmitting}
                      buttonExternal={[style.buttonExternal]}
                    />
                  )}
                </View>
              </>
            );
          }}
        </Formik>
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
    paddingRight: 22,
  },

  ApprovedToDrive: {
    marginTop: screenHeight * 0.03,
    marginBottom: screenHeight * 0.06,
  },

  ApprovedToDriveText: {
    fontSize: 26,
    marginBottom: screenHeight * 0.02,
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

  approvedBorderText: {
    fontSize: 16,
    fontWeight: "500",
  },

  buttonExternal: {
    marginTop: screenHeight * 0.48,
  },
});
