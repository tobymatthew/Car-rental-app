import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { Icon, Button } from "@rneui/themed";
import { Dropdown } from "react-native-element-dropdown";
import Input from "../components/Input";
import FormContainer from "../components/FormContainer";
import { Formik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SafeArea from "../components/SafeArea";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ActivityLoader from "./../components/ActivityLoader";
import ButtonLong from "../components/ButtonLong";
import * as Yup from "yup";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const vehicleType = [
  { key: "Car", value: "Car" },
  { key: "SUV", value: "SUV" },
  { key: "Mini Van", value: "Mini Van" },
  { key: "Van", value: "Van" },
  { key: "Truck", value: "Truck" },
];

const seats = [
  { key: "1", value: "1" },
  { key: "2", value: "2" },
  { key: "3", value: "3" },
  { key: "4", value: "4" },
  { key: "5", value: "5" },
  { key: "6", value: "6" },
  { key: "7", value: "7" },
  { key: "8", value: "8" },
];

const trans = [
  { key: "Manual", value: "Manual" },
  { key: "Automatic", value: "Automatic" },
];

export default function HostCarDetails({ navigation }) {
  const [type, setType] = useState(null);
  const [numSeat, setnumSeat] = useState(null);
  const [transmissions, settransmission] = useState(null);
  const [loading, setLoading] = useState(false);

  const [isFocus, setIsFocus] = useState(false);

  const vehicleInfo = {
    vehicle_make: "",
    vehicle_type: "",
    year_of_make: "",
    colour: "",
    number_of_seats: "",
    transmission: "",
    odometer: "",
  };

  const submitVehicle = async (values, actions) => {
    console.log(values);
    setLoading(true);
    if (
      values.vehicle_make &&
      values.vehicle_type &&
      values.year_of_make &&
      values.colour &&
      values.number_of_seats &&
      values.transmission &&
      values.odometer !== ""
    ) {
      try {
        const HostCarDetails = {
          vehicle_make: values.vehicle_make,
          vehicle_type: values.vehicle_type,
          year_of_make: values.year_of_make,
          colour: values.colour,
          number_of_seats: values.number_of_seats,
          transmission: values.transmission,
          odometer: values.odometer,
        };
        await AsyncStorage.setItem(
          "HostCarDetails",
          JSON.stringify(HostCarDetails)
        );

        if (!actions.isSubmitting) {
          setLoading(false);
          //  console.log("hello", await AsyncStorage.getItem("HostCarDetails"));
          navigation.navigate("HostCarFeatures");
        }
      } catch (error) {}
    } else {
      alert("fields can't be empty");
      setLoading(false);
    }
    actions.setSubmitting(false);
  };
  return (
    <>
      <SafeArea>
        <View style={style.container}>
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            showsVerticalScrollIndicator={false}
          >
            <ScrollView>
              <View style={style.detailContainer}>
                <Icon
                  onPress={() => navigation.goBack()}
                  name="chevron-back-circle-outline"
                  type="ionicon"
                />
                <Text style={style.headerText}>Car Details</Text>
                <Icon name="dots-vertical" type="material-community" />
              </View>

              {/* ///////////////////////////////////////////////////////////////// */}

              <FormContainer>
                <Formik initialValues={vehicleInfo} onSubmit={submitVehicle}>
                  {({
                    values,
                    errors,
                    touched,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                  }) => {
                    const {
                      vehicle_make,
                      vehicle_type,
                      year_of_make,
                      colour,
                      number_of_seats,
                      transmission,
                      odometer,
                    } = values;

                    return (
                      <>
                        <View style={style.spacing}>
                          <Input
                            placeholder="Vehicle Make e.g Toyota"
                            value={vehicle_make}
                            onChangeText={handleChange("vehicle_make")}
                            onBlur={handleBlur("vehicle_make")}
                            required
                          />
                        </View>

                        <View style={style.spacing}>
                          <Dropdown
                            style={[style.dropdown]}
                            placeholderStyle={style.placeholderStyle}
                            selectedTextStyle={style.selectedTextStyle}
                            inputSearchStyle={style.inputSearchStyle}
                            iconStyle={style.iconStyle}
                            data={vehicleType}
                            search
                            maxHeight={300}
                            labelField="key"
                            valueField="value"
                            placeholder={"Vehicle Type"}
                            searchPlaceholder="Search..."
                            value={vehicle_type}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={(e) => {
                              setType(e.value);
                              setIsFocus(false);
                              setFieldValue("vehicle_type", e.value);
                            }}
                            required
                          />
                        </View>

                        <View style={style.spacing}>
                          <Dropdown
                            style={[
                              style.dropdown,
                              isFocus && { borderColor: "blue" },
                            ]}
                            placeholderStyle={style.placeholderStyle}
                            selectedTextStyle={style.selectedTextStyle}
                            inputSearchStyle={style.inputSearchStyle}
                            iconStyle={style.iconStyle}
                            data={seats}
                            search
                            maxHeight={300}
                            labelField="key"
                            valueField="value"
                            placeholder={"Number Of Seats"}
                            searchPlaceholder="Search..."
                            value={number_of_seats}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={(e) => {
                              setnumSeat(e.value);
                              setIsFocus(false);
                              setFieldValue("number_of_seats", e.value);
                            }}
                            required
                          />
                        </View>

                        <View style={style.spacing}>
                          <Input
                            placeholder="Year Of Make"
                            value={year_of_make}
                            onChangeText={handleChange("year_of_make")}
                          />
                        </View>

                        <View style={style.spacing}>
                          <Input
                            placeholder="Colour"
                            value={colour}
                            onChangeText={handleChange("colour")}
                            required
                          />
                        </View>

                        <View style={style.spacing}>
                          <Dropdown
                            style={[
                              style.dropdown,
                              isFocus && { borderColor: "blue" },
                            ]}
                            placeholderStyle={style.placeholderStyle}
                            selectedTextStyle={style.selectedTextStyle}
                            inputSearchStyle={style.inputSearchStyle}
                            iconStyle={style.iconStyle}
                            data={trans}
                            search
                            maxHeight={300}
                            labelField="key"
                            valueField="value"
                            placeholder={"Transmission"}
                            searchPlaceholder="Search..."
                            value={transmission}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={(e) => {
                              settransmission(e.value);
                              setIsFocus(false);
                              handleChange("Transmission");
                              setFieldValue("transmission", e.value);
                            }}
                            required
                          />
                        </View>

                        <View style={style.spacing}>
                          <Input
                            placeholder="Odometer i.e 20000"
                            value={odometer}
                            onChangeText={handleChange("odometer")}
                            onBlur={handleBlur("odometer")}
                            required
                          />
                        </View>
                        <View style={style.buttonContainer}>
                          {loading ? (
                            <ActivityLoader />
                          ) : (
                            <ButtonLong
                              title="Next"
                              buttonStyle={[style.button]}
                              titleStyle={style.titleStyle}
                              submitting={isSubmitting}
                              onPress={handleSubmit}
                            />
                          )}
                        </View>
                      </>
                    );
                  }}
                </Formik>
              </FormContainer>
            </ScrollView>
          </KeyboardAwareScrollView>
        </View>
      </SafeArea>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#FAFAF5",
    paddingLeft: 22,
    paddingRight: 22,
    height: screenHeight,
  },

  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },

  headerText: {
    fontSize: 20,
    fontWeight: "700",
  },

  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    paddingLeft: 15,
    paddingRight: 10,
    borderRadius: 25,
  },

  placeholderStyle: {
    color: "#929292",
  },

  selectedTextStyle: {
    color: "#929292",
  },
  spacing: {
    marginTop: "6%",
  },
  buttonContainer: {
    marginTop: 50,
    marginBottom: 50,
  },

  button: {
    backgroundColor: "#7BB66D",
    borderRadius: 25,
  },
});
