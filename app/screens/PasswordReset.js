import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import { Button } from "@rneui/themed";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import {
  requestOtp,
  userByEmail,
  reset,
  userSlice,
} from "../redux/slice/auth/auth";
import * as Yup from "yup";
import ActivityLoader from "../components/ActivityLoader";
import ButtonSmall from "../components/ButtonSmall";
import SafeArea from "../components/SafeArea";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const validationSchema = Yup.object({
  email: Yup.string().trim().required("Your email is required!"),
});

export default function PasswordReset() {
  const userInfo = {
    email: "",
  };
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    isLoading,
    isError,
    isSuccess,
    isEmail,
    message,
    tempotp,
    tempEmail,
  } = useSelector((state) => state.auth);

  const [invalid, setInvalid] = useState(null);
  const [loading, setLoading] = useState(false);

  const verifyOtp = async (values, actions) => {
    setLoading(true);
    console.log(values.email);

    dispatch(userByEmail(values.email));
    setLoading(true);
    if (isEmail) {
      console.log(tempEmail.data.d_user_id);
      if (!tempEmail.msg) {
        const verification = {
          email: values.email,
          userId: tempEmail.data.d_user_id,
        };
        dispatch(requestOtp(verification));
      } else {
        setInvalid(tempEmail.msg);
        console.log(tempEmail.msg);
      }
    }

    // actions.resetForm();

    if (!actions.isSubmitting) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccess) {
      if (!tempotp.msg) {
        dispatch(reset());
        navigation.navigate("VerifyOtp");
        setLoading(false);
        console.log("this", tempotp);
      } else {
        console.log(tempotp.msg);
        setLoading(false);
        dispatch(reset());
      }
    }

    dispatch(reset());
  }, [isLoading, isError, isSuccess, message, dispatch]);

  return (
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
            Please Enter the email on your CarGenie account
          </Text>
        </View>

        <Formik
          initialValues={userInfo}
          validationSchema={validationSchema}
          onSubmit={verifyOtp}
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
            const { email } = values;
            return (
              <>
                <View style={style.inputContainer}>
                  {invalid && (
                    <Text style={{ color: "red" }}>Invalid email</Text>
                  )}
                  <Input
                    value={email}
                    error={touched.email && errors.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    autoCapitalize="none"
                    placeholder="sososo@soso.com"
                  />
                </View>
                <View style={style.inputButton}>
                  {loading ? (
                    <ActivityLoader spacing={style.buttonExternal} />
                  ) : (
                    <View style={style.buttonContainer}>
                      <>
                        <ButtonSmall
                          title="Continue"
                          externalButtonStyle={[
                            style.left,
                            style.utilityButton,
                          ]}
                          externalContainerStyle={[style.utilityContainer]}
                          onPress={handleSubmit}
                          submitting={isSubmitting}
                        />
                        <ButtonSmall
                          title="Go Back"
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
    </SafeArea>
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

  textHeader: {
    fontSize: 24,
    fontWeight: "800",
  },

  subText: {
    width: 203,
    fontSize: 14,
  },

  inputContainer: {
    marginTop: 20,
    paddingRight: 22,
  },

  button: {
    marginTop: 20,
    backgroundColor: "#7BB66D",
    borderRadius: 25,
    height: 50,
  },

  titleStyle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  inputButton: {
    paddingRight: 22,
    marginTop: 50,
  },

  buttonContainer: {
    flexDirection: "row",
    marginTop: screenHeight * 0.35,
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
