import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import Input from "./Input";
import { Button } from "@rneui/themed";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import SafeArea from "../components/SafeArea";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonLong from "./ButtonLong";
import { useNavigation } from "@react-navigation/native";
import BackArrow from "./BackArrow";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const validationSchema = Yup.object({
  address: Yup.string()
    .trim()
    .min(3, "Invalid add!")
    .required("Address is required!"),
});

export default function AccountVerifyAndPickup({ header, subtext, address }) {
  const Info = {
    address: "",
  };

  const navigation = useNavigation();

  const submitAddress = async (values, actions) => {
    console.log(values);
    try {
      const value = values.address;

      await AsyncStorage.setItem(address, value);

      if (!actions.isSubmitting) {
        navigation.goBack();
      }
    } catch (error) {}

    actions.setSubmitting(false);
  };

  return (
    <SafeArea>
      <View style={style.approveContainer}>
        <BackArrow />

        <View style={style.ApprovedToDrive}>
          <Text style={style.ApprovedToDriveText}>{header} </Text>
          <Text style={style.ApprovedToDriveText2}>{subtext}</Text>
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
            const { address } = values;
            return (
              <>
                <View style={style.inputContainer}>
                  <Input
                    value={address}
                    error={touched.address && errors.address}
                    onChangeText={handleChange("address")}
                    onBlur={handleBlur("address")}
                    autoCapitalize="none"
                    placeholder="Street Address"
                  />

                  <ButtonLong
                    onPress={handleSubmit}
                    submitting={isSubmitting}
                    title="Save"
                    buttonExternal={style.buttonExternal}
                  />
                </View>
              </>
            );
          }}
        </Formik>
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
    paddingTop: screenHeight * 0.04,
    paddingRight: 22,
  },

  ApprovedToDrive: {
    marginTop: screenHeight * 0.05,
    marginBottom: screenHeight * 0.06,
  },

  ApprovedToDriveText: {
    fontSize: 26,
    fontWeight: "bold",
  },
  ApprovedToDriveText2: {
    fontSize: 16,
    fontWeight: "400",
  },

  buttonExternal: {
    marginTop: screenHeight * 0.38,
  },
});
