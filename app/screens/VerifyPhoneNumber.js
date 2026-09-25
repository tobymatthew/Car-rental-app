import { Text, View, StyleSheet } from "react-native";
import React, { Component } from "react";
import Input from "../components/Input";
import { Button } from "@rneui/themed";

export default class PhoneNumber extends Component {
  render() {
    return (
      <View style={style.phoneNumberContainer}>
        <Text style={style.phoneNumberText}>Verify Your Phone Number</Text>
        <Text style={style.phoneNumberText2}>
        Enter the OTP code sent to 081 6571 4829
        </Text>
        <View style={style.PhoneNumberInputContainer}>
          <Input style={style.PhoneNumberInput} placeholder="123456" />
        </View>
        <View style={style.buttonContainer}>
          <Button
            title="Next"
            buttonStyle={[style.button]}
            titleStyle={style.titleStyle}
          />
        </View>
      </View>
    );
  }
}

style = StyleSheet.create({
  phoneNumberContainer: {
    paddingLeft: 22,
  },

  phoneNumberText: {
    fontSize: 24,
    fontWeight: "bold",
    width: 184,
    marginTop: 94,
  },

  phoneNumberText2: {
    fontSize: 16,
    width: 267,
  },

  PhoneNumberInputContainer: {
    marginTop: 80,
    paddingRight: 30,
  },

  buttonContainer: {
    marginTop: 375,
    paddingRight: 22,
  },
  button:{
    backgroundColor:"#7BB66D",
    borderRadius:25
  }
});
