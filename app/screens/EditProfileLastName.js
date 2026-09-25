import { Text, View, StyleSheet,Dimensions } from "react-native";
import React, { useEffect } from "react";
import Input from "../components/Input";
import { Button, Icon } from "@rneui/themed";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { updateLastNameInfo, reset } from "../redux/slice/auth/auth";
import { useNavigation } from "@react-navigation/native";
import ScrollV from "../components/ScrollV"
import ButtonLong from "../components/ButtonLong";
import SafeArea from "../components/SafeArea";


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const validationSchema = Yup.object({
  last_name: Yup.string()
    .trim()
    .min(1, "Invalid name!")
    .required("Name is required!"),
});

export default function EditProfileLastName() {
  const nameInfo = {
    last_name: "",
  };

    const dispatch = useDispatch();
    const navigation = useNavigation();

    

      const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );


  const updateInfo = async (values,actions) => {
    

    console.log("Name has been updated", values);
    dispatch(updateLastNameInfo(values));
    actions.resetForm();
    actions.setSubmitting(false);
    
  };

  
  useEffect(
    () => {
      if (isError) {
        console.log(message);
      }

      if (isSuccess) {
      
       navigation.goBack();
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
        <Text style={style.EditTextProfile}>Update Last Name</Text>
        <Text style={style.EditTextProfile2}>
        Ensure your last name tallies with that of your drivers liscence
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
          const { last_name } = values;
           return   (
          <>
          
          
              <Input
                value={last_name}
                error={touched.last_name && errors.last_name}
                onChangeText={handleChange("last_name")}
                onBlur={handleBlur("last_name")}
                placeholder="Last Name"
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
