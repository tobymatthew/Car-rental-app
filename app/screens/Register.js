import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Input from "../components/Input";
import { CheckBox, Button } from "@rneui/themed";
import { Formik, formikActions } from "formik";
import * as Yup from "yup";
import FormContainer from "../components/FormContainer";
import { StackActions, useNavigation } from "@react-navigation/native";
import { register, reset } from "../redux/slice/auth/auth";
import { registerIndieID } from "native-notify";
import SafeArea from "../components/SafeArea";
import ButtonLong from "./../components/ButtonLong";
import ActivityLoader from "../components/ActivityLoader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";
import normalize from "react-native-normalize";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const validationSchema = Yup.object({
  first_name: Yup.string()
    .trim()
    .min(2, "Invalid name!")
    .required("First name is required!"),

  last_name: Yup.string()
    .trim()
    .min(2, "Invalid name!")
    .required("Last name is required!"),

  email: Yup.string().email("Invalid email!").required("Email is required!"),

  password: Yup.string()
    .trim()
    .min(3, "Password is too short!")
    .required("Password is required!"),
});

export default function Register({ navigation }) {
  const userInfo = {
    first_name: "",
    last_name: "",
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

  const signUp = async (values, actions) => {
    setLoading(true);
    dispatch(register(values));

   
      // actions.resetForm();
      actions.setSubmitting(false);
    
  };

  useEffect(() => {
    if (isError) {
      console.log("message",message);

    }

    if (isSuccess && user !== null) {
      if (user.msg) {
        console.log("messages",user.msg);
        setInvalid(user.msg);
        setLoading(false);
      } 
      else {
        registerIndieID(
          `${user.data.d_user_id}`,
          6250, 'LUS7EDr5M1t7jkbtr48QDw'
        );
        navigation.dispatch (StackActions.replace("VerifyEmail"));
        console.log("user",user);
        setLoading(false);
      }
    }

    dispatch(reset());
  }, [user, isLoading, isError, isSuccess, message, dispatch]);

  return (
    <>
      <SafeArea/>  
      <KeyboardAwareScrollView 
       enableOnAndroid={true}
       style={style.scrollAware}
      showsVerticalScrollIndicator={false}>
        
        <View style={style.container}>
          <View style={style.containerImage}>
            <Image
              style={style.coneLogo}
              source={require("../../assets/coneLogo.png")}
            />
            <Image source={require("../../assets/fullLogo.png")} />
          </View>
          <View style={style.header}>
            {/* <Text style={{ color: "black" }}>V1.0</Text> */}
            <Text style={style.textHeader}>Sign Up</Text>
            <Text style={style.subText}>Start your dream journey now.</Text>
          </View>

          <Formik
            initialValues={userInfo}
            validationSchema={validationSchema}
            onSubmit={signUp}
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
              const { first_name, last_name, email, password } = values;
              return (
                <>
                  <View style={style.inputContainer}>
                    <View style={style.inputStyle}>
                      <Input
                        value={first_name}
                        error={touched.first_name && errors.first_name}
                        onChangeText={handleChange("first_name")}
                        onBlur={handleBlur("first_name")}
                        placeholder="First Name"
                      />
                    </View>
                    <View style={style.inputStyle}>
                      <Input
                        value={last_name}
                        error={touched.last_name && errors.last_name}
                        onChangeText={handleChange("last_name")}
                        onBlur={handleBlur("last_name")}
                        placeholder="Last Name"
                      />
                    </View>

                    <View style={style.inputStyle}>
                      {invalid && (
                        <Text style={{ color: "red" }}>
                          Email already exist
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
                        right={
                          <TextInput.Icon
                            name={!showPassword ? "eye-off" : "eye"}
                            onPress={() => setShowPassword(!showPassword)}
                          />
                        }
                      />
                    </View>
                  </View>
                  <View style={style.checkboxContainer}>
                    {/* <CheckBox checkBoxStyle={[style.checkBox]} /> */}
                    <Text style={style.agree}> I Agree to CarGenies </Text>
                    <Text style={style.terms}>Terms & Conditions</Text>
                  </View>
                  {loading ? (
                    <ActivityLoader spacing={style.buttonExternal} />
                  ) : (
                    <ButtonLong
                      onPress={handleSubmit}
                      submitting={isSubmitting}
                      title="Sign Up"
                      buttonExternal={[style.buttonExternal]}
                    />
                  )}
                </>
              );
            }}
          </Formik>

          <View style={style.containerText}>
            <Text style={style.noLineText}>Already Signed Up? </Text>
            <Text
              style={style.underLineText}
              onPress={() => navigation.navigate("Login")}
            >
              Sign in
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
   
    </>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#FAFAF5",
    flex: 1,
    paddingLeft: screenWidth * 0.055,
    paddingBottom: "10%",
    height: screenHeight,
    width: screenWidth,
  },
  coneLogo: {
    position: "absolute",
    top: 0,
    right: 0,
  },

  // scrollAware:{
  //     marginBottom:s
  // },
  containerImage: {
    paddingTop:normalize(70),
  },

  header: {
    paddingTop:normalize(20),
  },
  textHeader: {
    color: "#000",
    fontWeight: "bold",
    fontSize:normalize(24),
  },
  subText: {
    color: "#000",
    fontSize:normalize(14),
    marginTop:normalize(8),
  },

  inputStyle: {
    marginBottom: "3%",
  },

  inputContainer: {
    paddingRight: normalize(22),
  },

  buttonExternal: {
    marginTop: screenHeight * 0.05,
    marginRight:normalize(22),
  
  },

  // buttonIndicator: {
  //   backgroundColor: "#7BB66D",
  //   borderRadius: 25,
  //   height: 50,
  // },

  inputStyleIcon: {
    height: normalize(60),
    backgroundColor: "#F2F2F2",
    borderRadius: 24,
    marginTop:normalize(20),
    paddingRight: normalize(22),
  },

  textInput: {
    height: normalize(60),
    width: "100%",
    borderTopLeftRadius: 28,
    borderBottomLeftRadius: 28,
    backgroundColor: "#f2f2f2",
    paddingLeft: normalize(22),
    paddingRight: normalize(22),
  },

  titleStyle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  containerText: {
    marginTop: "2%",
    flexDirection: "row",
    justifyContent: "center",
  },
  noLineText: {
    fontSize:normalize(16),
  },
  underLineText: {
    textDecorationLine: "underline",
    fontSize: normalize(16),
    fontWeight: "bold",
  },
  checkboxContainer: {
    flexDirection: "row",
    paddingTop: normalize(20),

    justifyContent: "center",
  },

  checkBox: {
    margin: 0,
  },

  terms: {
    textDecorationLine: "underline",
  },
});
