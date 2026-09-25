import { View, Text, StyleSheet, Image, SafeAreaView,Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import { Button } from "@rneui/themed";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { otpVerify, reset, userSlice } from "../redux/slice/auth/auth";
import { StackActions} from "@react-navigation/native";
import * as Yup from "yup";
import ActivityLoader from "../components/ActivityLoader";
import SafeArea from "../components/SafeArea";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const validationSchema = Yup.object({
  verify: Yup.string().trim().required("OTP is required"),
});

export default function PasswordReset({ navigation }) {
  const userInfo = {
    verify: "",
  };

  const dispatch = useDispatch();

  const { user, isLoading, isError,verifyisSuccess, message, tempotpVerify } =
    useSelector((state) => state.auth);

  const [invalid, setInvalid] = useState(null);
  const [loading, setLoading]= useState(false);


  const verifyOtp = async (values, actions) => {
    setLoading(true);
   const verification = {
      otp:values.verify,
      userId: user.data.d_user_id,
    };
    console.log(values.verify);
    dispatch(otpVerify(verification));
    // actions.resetForm();
    
   
    if (!actions.isSubmitting) {
       setLoading(false)
    }
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (verifyisSuccess && user!==null) {
      if (tempotpVerify.msg === "otp verified") {
        dispatch(reset());
        navigation.dispatch(StackActions.replace("Home"));
        setLoading(false)
        
      } else {
        setInvalid(tempotpVerify.msg);
        console.log(tempotpVerify.msg);
        setLoading(false);
        dispatch(reset());
      }
    }

    dispatch(reset());
  }, [user, isLoading, isError, verifyisSuccess, message, dispatch]);

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
          <Text style={style.textHeader}>Verify Your Email</Text>
          <Text style={style.subText}>
            Enter the OTP code that was sent to your email
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
            const { verify } = values;
            return (
              <>
                <View style={style.inputContainer}>
                  {invalid && (
                    <Text style={{ color: "red" }}>
                      Invalid Otp
                    </Text>
                  )}
                  <Input
                    value={verify}
                    error={touched.verify && errors.verify}
                    onChangeText={handleChange("verify")}
                    onBlur={handleBlur("verify")}
                    autoCapitalize="none"
                    placeholder="123456"
                  />
                </View>
                <View style={style.inputButton}>
                {loading ? 
                
               ( <ActivityLoader spacing={style.buttonExternal}/>):
                 ( <Button
                    onPress={handleSubmit}
                    submitting={isSubmitting}
                    title="Verify"
                    buttonStyle={[style.button]}
                    titleStyle={style.titleStyle}
                  />)
                 }
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
    height:screenHeight,
    width:screenWidth,
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
});
