import { Text, View, StyleSheet,Dimensions } from "react-native";
import React, { useEffect } from "react";
import Input from "../components/Input";
import { Button, Icon } from "@rneui/themed";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { updateFirstNameInfo, reset } from "../redux/slice/auth/auth";
import { useNavigation } from "@react-navigation/native";
import FormContainer from "../components/FormContainer";
import * as Yup from "yup";
import ButtonLong from "../components/ButtonLong";
import SafeArea from "../components/SafeArea";
import ScrollV from "../components/ScrollV"
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const validationSchema = Yup.object({
  first_name: Yup.string()
    .trim()
    .min(1, "Invalid name!")
    .required("Name is required!"),
});

export default function EditProfileFirstName() {
  const nameInfo = {
    first_name: "",
  };

  const dispatch = useDispatch();
  const navigation= useNavigation();

  const {isLoading, isError, isSuccess, message } = useSelector(
(state) => state.auth
);


  const updateInfo = async (values,actions) => {
    console.log("Name has been updated", values);
    dispatch(updateFirstNameInfo(values));
    actions.resetForm();
    actions.setSubmitting(false);
  };

    
  useEffect(
    () => {
      if (isError) {
        console.log(message);
      }

      if (isSuccess) {
      
        navigation.goBack()
        }
      

      dispatch(reset());
    },
    [isLoading, isError, isSuccess, message, dispatch]
  );

  return (
    <SafeArea>
    <View style={style.container}>
      <ScrollV>
      <View style={style.detailContainer}>
        <Icon
          onPress={() => navigation.goBack()}
          name="chevron-back-circle-outline"
          type="ionicon"
        />
        <Text style={style.headerText}>Account Name</Text>
        <Icon name="dots-vertical" type="material-community" />
      </View>
      <View>
        <Text style={style.EditTextProfile}>Update First Name</Text>
        <Text style={style.EditTextProfile2}>
          Ensure your first name tallies with that of your drivers liscence
        </Text>
      </View>
      <Formik
        initialValues={nameInfo}
        validationSchema={validationSchema}
        onSubmit={updateInfo}
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
          const { first_name } = values;
           return   (
          <>
          
          
              <Input
                value={first_name}
                error={touched.first_name && errors.first_name}
                onChangeText={handleChange("first_name")}
                onBlur={handleBlur("first_name")}
                placeholder="First Name"
              />
         
            <View style={style.buttonContainer}>
              <ButtonLong
                submitting={isSubmitting}
                onPress={handleSubmit}
                title="Save"
                buttonStyle={[style.button]}
                titleStyle={style.titleStyle}
              />
            </View>
          
          </>
              )
        }}
      </Formik>
    </ScrollV>
    </View>
    </SafeArea>
  );
}

const  style = StyleSheet.create({
  container: {
    paddingLeft: 22,
    backgroundColor: "#FAFAF5",
    height: screenHeight 
  },

  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: screenHeight*0.02,
    paddingRight: 10,
  },

  headerText: {
    fontSize: 20,
    fontWeight: "700",
  },

  EditTextProfile: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: screenHeight*0.04,
    marginBottom: screenHeight*0.01
  },

  EditTextProfile2: {
    fontSize: 15,
    width: 220,
  },

  PhoneNumberInputContainer: {
    marginTop: 35,
    paddingRight: 30,
  },

  buttonContainer: {
    marginTop: screenHeight*0.45,
    paddingRight: 22,
  },
  button: {
    backgroundColor: "#7BB66D",
    borderRadius: 25,
  },
});
