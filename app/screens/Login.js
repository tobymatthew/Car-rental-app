import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import { Button, Icon } from "@rneui/themed";
import { login, reset, userSlice } from "../redux/slice/auth/auth";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import SafeArea from "../components/SafeArea";
import { registerIndieID } from "native-notify";
import ButtonLong from "./../components/ButtonLong";
import ActivityLoader from "../components/ActivityLoader";
import { StackActions} from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from 'react-native-paper';
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email!").required("Email is required!"),

  password: Yup.string()
    .trim()
    .min(3, "Password is too short!")
    .required("Password is required!"),
});
export default function Login({ navigation }) {
  const userInfo = {
    email: "",
    password: "",
  };

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [invalid, setInvalid] = useState(null);

  const [showPassword, setShowPassword] = useState(false);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const SignIn = async (values, actions) => {
    setLoading(true);
    dispatch(login(values));
    // actions.resetForm();
    actions.setSubmitting(false);
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccess && user !== null) {
      if (user.msg) {
        setInvalid(user.msg);
        setLoading(false);
        dispatch(reset());
      } else {
        registerIndieID(
          `${user.data.d_user_id}`,
         6250, 'LUS7EDr5M1t7jkbtr48QDw'
        );
        setLoading(false);
        dispatch(reset());
        navigation.dispatch(StackActions.replace("Home"));
      }
    }

    dispatch(reset());
  }, [user, isLoading, isError, isSuccess, message, dispatch]);

  return (
    <SafeArea>
     
      <View style={style.container}>
      <KeyboardAwareScrollView
       enableOnAndroid={true}
      showsVerticalScrollIndicator={false}
      >
        <View style={style.containerImage}>
          <Image
            style={style.coneLogo}
            source={require("../../assets/coneLogo.png")}
          />
          <Image source={require("../../assets/fullLogo.png")} />
        </View>
        <View style={style.header}>
          <Text style={style.textHeader}>Welcome Back!</Text>
          <Text style={style.subText}>
            Your ride your choice, at your pace and convenience{" "}
          </Text>
        </View>

        <Formik
          initialValues={userInfo}
          validationSchema={validationSchema}
          onSubmit={SignIn}
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
            const { firstname, lastname, email, password } = values;
            return (
              <>
                <View style={style.inputContainer}>
                  {/* <Text style={{ color: "black" }}>V1.0</Text> */}
                  <View style={style.inputStyle}>
                    {invalid && (
                      <Text style={{ color: "red" }}>
                        Invalid email or password
                      </Text>
                    )}
                    <Input
                      value={email}
                      error={touched.email && errors.email}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      autoCapitalize="none"
                      placeholder="examp@gmail.com"
                    />
                  </View>

                  <View style={style.inputStyleIcon}>
                    <TextInput
                      style={style.textInput}
                      value={password}
                      // error={touched.password && errors.password}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      autoCapitalize="none"
                      secureTextEntry={!showPassword}
                      placeholder="********"
                      underlineColor="none"
                      activeUnderlineColor="none"
                      
                      right={<TextInput.Icon  name= { !showPassword ? "eye-off": "eye"} 
                      onPress={() => setShowPassword(!showPassword)}
                      />}
                    />
                   
                  </View>
                  <Text
                    onPress={() => navigation.navigate("PasswordReset")}
                    style={style.forgotText}
                  >
                    Forgot Password?{" "}
                  </Text>
                  {loading ? (
                    <View style={style.buttonIndicator}>
                      <ActivityLoader spacing={style.buttonExternal} />
                    </View>
                  ) : (
                    <ButtonLong
                      onPress={handleSubmit}
                      submitting={isSubmitting}
                      title="Sign In"
                      buttonExternal={[style.buttonExternal]}
                    />
                  )}
                </View>
              </>
            );
          }}
        </Formik>

        <View style={style.containerText}>
          <Text style={style.newText}>New here?</Text>
          <Text
            onPress={() => navigation.navigate("Register")}
            style={style.signUpText}
          >
            Sign up
          </Text>
        </View>
        </KeyboardAwareScrollView>
      </View>
     
    </SafeArea>
  );
}

const style = StyleSheet.create({
  container: {
    height: screenHeight,
    width: screenWidth,
    backgroundColor: "#fff",
    paddingLeft: 22,
  },

  coneLogo: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  containerImage: {
    marginTop: 0,
    paddingTop: 70,
  },

  header: {
    paddingTop: 50,
  },

  inputStyle: {
    marginBottom: "3%",
  },

  inputStyleIcon: {
    height: 60,
    backgroundColor: "#F2F2F2",
    borderRadius: 24,
    marginTop: 20,
    paddingRight: 22,
   
    
  },

  textInput:{
    height: 60,
    width: "100%",
    borderTopLeftRadius:28,
    borderBottomLeftRadius:28,
    backgroundColor: "#f2f2f2",
    paddingRight: 22,
  },

  // iconShow: {
  //   marginTop: screenHeight*0.035,
  //   padding: 10,
  //   backgroundColor: "#F2F2F2",
    
  // },

  textHeader: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 28,
  },
  subText: { color: "#000", fontSize: 16, marginTop: 8, width: 203 },
  inputContainer: {
    marginTop: 20,
    paddingRight: 22,
  },

  buttonExternal: {
    marginTop: screenHeight * 0.05,
  },
  titleStyle: {
    color: "#fff",
  },
  containerText: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 120,
  },
  forgotText: {
    color: "#000",
    textAlign: "right",
    marginTop: screenHeight * 0.005,
    textDecorationLine: "underline",
  },
  newText: {
    fontSize: 14,
    marginRight: 6,
  },

  signUpText: {
    fontSize: 14,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});
