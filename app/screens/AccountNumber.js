import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import { Button } from "@rneui/themed";
import { AccountNumberInfo, reset, userSlice } from "../redux/slice/auth/auth";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import ButtonLong from "../components/ButtonLong";
import BackArrow from "../components/BackArrow";
import ActivityLoader from "../components/ActivityLoader";
import SafeArea from "../components/SafeArea";
import ScrollV from "../components/ScrollV";
import * as Yup from "yup";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const validationSchema = Yup.object({
  acc_no: Yup.string()
    .trim()
    .min(10, "Please enter a valid account number")
    .required("Account number is required!"),
});
export default function AccountNumber({ navigation }) {
  const userInfo = {
    acc_no: "",
    acc_name: "",
    bank_name: "",
  };

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { account, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [invalid, setInvalid] = useState("");

  const accountNumber = async (values, actions) => {
    dispatch(AccountNumberInfo(values));
    actions.resetForm();
    actions.setSubmitting(false);
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigation.goBack();
      console.log("info", account);
    }

    dispatch(reset());
  }, [account, isLoading, isError, isSuccess, message, dispatch]);

  return (
    <SafeArea>
    <View style={style.container}>
      <ScrollV>
      <BackArrow/>
      <View style={style.header}>
        <Text style={style.textHeader}>
          Enter Your Bank Account{"\n"}Details
        </Text>
        <Text style={style.subText}>
          Enter the account you would like your{"\n"}earnings to be paid to
        </Text>
      </View>

      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={accountNumber}
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
          const { acc_no, acc_name, bank_name } = values;
          return (
            <>
              <View style={style.inputContainer}>
                <View style={style.inputStyle}>
                  <Input
                    value={bank_name}
                    error={touched.bank_name && errors.bank_name}
                    onChangeText={handleChange("bank_name")}
                    onBlur={handleBlur("bank_name")}
                    autoCapitalize="none"
                    placeholder="Bank"
                  />
                </View>
                <View style={style.inputStyle}>
                  <Input
                    value={acc_no}
                    error={touched.acc_no && errors.acc_no}
                    onChangeText={handleChange("acc_no")}
                    onBlur={handleBlur("acc_no")}
                    autoCapitalize="none"
                    placeholder="Account Number"
                  />
                </View>
                <View style={style.inputStyle}>
                  <Input
                    value={acc_name}
                    error={touched.acc_name && errors.acc_name}
                    onChangeText={handleChange("acc_name")}
                    onBlur={handleBlur("acc_name")}
                    autoCapitalize="none"
                    placeholder="Account Name"
                  />
                </View>
                {loading ? (
                      <ActivityLoader spacing={style.buttonExternal}/>
                    ) : (
                <ButtonLong
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                  title="Save"
                  buttonExternal={style.buttonExternal}
                  />
                    )
                }
                
              </View>
            </>
          );
        }}
      </Formik>
      </ScrollV>
    </View>
    </SafeArea>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width:screenWidth,
    height:screenHeight,
    paddingLeft: 22,
  },

  inputStyle: {
    marginBottom: "3%",
  },

  header: {
    paddingTop:screenHeight*0.03,
  },

  textHeader: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 28,
  },
  subText: { color: "#000", fontSize: 16, marginTop: 8},
  inputContainer: {
    marginTop: 20,
    paddingRight: 22,
  },
  buttonExternal: {
    marginTop: screenHeight * 0.3
   
  },

  
});
