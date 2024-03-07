import { View, Text, StyleSheet, TextInput, Dimensions,Image } from "react-native";
import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import ButtonSmall from "../components/ButtonSmall";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { PasswordReset, reset } from "../redux/slice/auth/auth";
import SafeArea from "../components/SafeArea";
import ActivityLoader from "../components/ActivityLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const validationSchema = Yup.object({
  new_password: Yup.string()
    .trim()
    .min(8, "Password is too short!")
    .required("Password is required!"),
  confirmPassword: Yup.string().equals(
    [Yup.ref("new_password"), null],
    "Password does not match!"
  ),
});

export default function NewPassword() {
  const PasswordInfo = {
    new_password: "",
    confirmPassword: "",
  };

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  
  const NewPassWordInfo =(values, actions) => {
     setLoading(true);   
    dispatch(PasswordReset(values.new_password));
    actions.resetForm();
    actions.setSubmitting(false);
  };
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    
    if (isError) {
      console.log(message);
      
    }

    if (isSuccess) {
      console.log("Success");
      navigation.navigate("Login");
      setLoading(false);
    }
    else{
      setLoading(false);
    }

    dispatch(reset());
  }, [isLoading, isError, isSuccess, message, dispatch]);

  return (
    <>
      <SafeArea>
        <View style={style.container}>
          <View style={style.containerImage}>
            <Image
              style={style.coneLogo}
              source={require("../../assets/coneLogo.png")}
            />
            <Image source={require("../../assets/fullLogo.png")} />
          </View>
          <View style={style.header}>
            <Text style={style.textHeader}>Reset Your Password</Text>
            <Text style={style.subText}>
            Enter your new password and you’re all done!
            </Text>
          </View>

          <View style={style.inputContainer}>
            <Formik
              initialValues={PasswordInfo}
              validationSchema={validationSchema}
              onSubmit={NewPassWordInfo}
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
                const { new_password, confirmPassword } = values;
                return (
                  <>
                   <View style={style.inputStyle}>
                    <Input
                      value={new_password}
                      error={touched.new_password && errors.new_password}
                      onChangeText={handleChange("new_password")}
                      onBlur={handleBlur("new_password")}
                      placeholder="New Password"
                    />
                   </View>

                   <View style={style.inputStyle}>
                    <Input
                      value={confirmPassword}
                      error={touched.confirmPassword && errors.confirmPassword}
                      onChangeText={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                      placeholder="Confirm Password"
                    />
                   </View>
                    <View style={style.inputButton}>
                      {loading ? (
                        <ActivityLoader spacing={style.buttonExternal} />
                      ) : (
                        <View style={style.buttonContainer}>
                          <>
                            <ButtonSmall
                              title="Reset"
                              externalButtonStyle={[
                                style.left,
                                style.utilityButton,
                              ]}
                              externalContainerStyle={[style.utilityContainer]}
                              onPress={handleSubmit}
                              submitting={isSubmitting}
                            />
                            <ButtonSmall
                              title="Cancel"
                              externalButtonStyle={[
                                style.right,
                                style.utilityButton,
                              ]}
                              externalContainerStyle={[
                                style.rightContainer,
                                style.utilityContainer,
                              ]}
                              onPress={() => navigation.navigate("Login")}
                            />
                          </>
                        </View>
                      )}
                    </View>
                  </>
                );
              }}
            </Formik>
          </View>
        </View>
      </SafeArea>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#FAFAF5",
    height: screenHeight,
    width: screenWidth,
    paddingLeft: 22,
  },

  coneLogo: {
    position: "absolute",
    top: 1,
    right: 0,
  },
  containerImage: {
    paddingTop: 65,
  },

  header: {
    marginTop: 66,
  },

  inputContainer:{
    marginTop:screenHeight*0.05,
    paddingRight:22,
  },

  inputStyle: {
    marginBottom: "3%",
  },

  textHeader: {
    fontSize: 24,
    fontWeight: "800",
  },

  subText: {
    width: 203,
    fontSize: 14,
  },

  buttonContainer: {
    flexDirection: "row",
    marginTop: screenHeight * 0.25,
    marginBottom: screenHeight * 0.04,
    justifyContent: "space-between",
    paddingRight: screenHeight * 0.02,
  },

  right: {
    backgroundColor: "#7BB66D",
  },

  left: {
    backgroundColor: "#1A321E",
  },

  utilityContainer: {
    width: screenWidth * 0.4,
  },

  utilityButton: {
    paddingVertical: 16,
  },
});
