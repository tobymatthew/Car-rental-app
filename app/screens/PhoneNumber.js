import { Text, View, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { Button } from "@rneui/themed";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { numberInfo, reset,bvnInfo } from "../redux/slice/auth/auth";
import { useNavigation } from "@react-navigation/native";
import ButtonLong from "../components/ButtonLong";
import BackArrow from "../components/BackArrow";
import ActivityLoader from "../components/ActivityLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import SafeArea from "../components/SafeArea";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const validationSchema = Yup.object({
  phone_number: Yup.string()
    .trim()
    .min(7, "Invalid number!")
    .required("Number is required!"),
});

export default function PhoneNumber({route}) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const {from}=route.params
  const dispatch = useDispatch();
  const navigation = useNavigation();

  
  const phoneInfo = from==='bvn'?
  {bvn_number:''}:
  {
    phone_number:''
  };

  const { tempNumber, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // const verifynumber = async (values) => {
  //   // setLoading(true)
  //   await axios
  //     .post(
  //       "https://api.myidentitypay.com/api/v2/biometrics/merchant/data/verification/phone_number/advance",
  //       {
  //         number: `${values.phone_number}`,
  //       },
  //       {
  //         headers: {
  //           "x-api-key": "YM6Bfcil.8RtF91gkrWPIu0DtwtH5oF3Qxd8iU8ZR",
  //           "app-id": "328c4d27-b2ca-42c7-b9a8-f672561f0224",
  //         },
  //       }
  //     )

  //     .then((response) => {
  //       console.log(response.data);
  //       setStatus(response.data.status);
  //       response.data.status===true ?  dispatch(numberInfo(values)) : setLoading(false);
      
     
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setLoading(false)
  //     });
  // };

  const updateInfo = async (values, actions) => {
    setLoading(true);
    // verifynumber(values);

     from==='bvn' ? dispatch(bvnInfo(values)):dispatch(numberInfo(values))
      console.log("Number has been updated", values);
     
     
   

    
   
  
   
    actions.setSubmitting(false);
  };

  useEffect(
    () => {
      if (isError) {
        console.log(message);
      }

      if(isSuccess){
        console.log("this",tempNumber);
        setLoading(false);
        // // navigation.navigate(VerifyOtp{
        //    from:'phone'
        // });
        
    }

      dispatch(reset());
    },
    [isLoading, isError, isSuccess, message, dispatch]
  );

 

  return (
    <SafeArea>
      <View style={style.phoneNumberContainer}>
        <BackArrow />
        <View style={style.phoneNumberTextContainer}>
          { from==='bvn' ?
          <>
          (

          <Text style={style.phoneNumberText}>Enter Your BVN Number</Text>
          <Text style={style.phoneNumberText2}>
            Please provide your orignal bvn number
          </Text>
          )
          </>
          :
          <>
          (
          <Text style={style.phoneNumberText}>Enter Your Phone Number</Text>
          <Text style={style.phoneNumberText2}>
            Please provide your active phone number
          </Text>
          )
          </>
    }
        </View>

        <Formik
          initialValues={phoneInfo}
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
            
            const number= from === 'bvn'? values.bvn_number:values.phone_number
            return (
              <>
                <View style={style.PhoneNumberInputContainer}>
                {status ===false ? (<Text style={style.valid}>Please enter a valid phone number</Text>):null}
                  <Input
                    value={number}
                    error={touched.phone_number && errors.phone_number}
                    onChangeText={handleChange("number")}
                    onBlur={handleBlur("number")}
                    style={style.PhoneNumberInput}
                    placeholder="234**************"
                  />
                </View>
                <View style={style.buttonContainer}>
                  {loading ? (
                    <ActivityLoader spacing={style.buttonExternal} />
                  ) : (
                    <ButtonLong
                      onPress={handleSubmit}
                      submitting={isSubmitting}
                      title="Save"
                      buttonExternal={[style.buttonExternal]}
                    />
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
  phoneNumberContainer: {
    backgroundColor: "#FAFAF5",
    height: screenHeight,
    width: screenWidth,
    paddingLeft: 22,
    paddingTop: screenHeight * 0.04,
    paddingRight: 22,
  },

  phoneNumberTextContainer:{
    marginTop: screenHeight * 0.03,
    marginBottom: screenHeight * 0.06,
  },

  phoneNumberText: {
    fontSize: 24,
    fontWeight: "bold",
  },

  phoneNumberText2: {
    fontSize: 16,
   
  },

  valid:{
    color: "red",
    marginBottom:screenHeight *0.01,
    marginLeft: screenWidth * 0.02
  },

  PhoneNumberInputContainer: {
    // marginTop: 80,
  },

  buttonContainer: {
    marginTop: screenHeight * 0.45,
  },
});
