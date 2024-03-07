import { Text, View, StyleSheet } from "react-native";
import React, { Component } from "react";
import Input from "../components/Input";
import { Button, Icon } from "@rneui/themed";

export default function EditPhoneNumber({navigation}){
    return (
      <View style={style.container}>
        <View style={style.detailContainer}>
          <Icon
            onPress={() => navigation.navigate("Home")}
            name="chevron-back-circle-outline"
            type="ionicon"
          />
          <Text style={style.headerText}>Phone Number</Text>
          <Icon name="dots-vertical" type="material-community" />
        </View>
        <View>
          <Text style={style.EditTextProfile}>Update Your Phone Number</Text>
          <Text style={style.EditTextProfile2}>
            Ensure your first name tallies with that of your drivers liscence
          </Text>
        </View>
        <View style={style.PhoneNumberInputContainer}>
          <Input style={style.PhoneNumberInput} placeholder="Firstname" />
        </View>
        <View style={style.buttonContainer}>
          <Button
            title="Save"
            buttonStyle={[style.button]}
            titleStyle={style.titleStyle}
          />
        </View>
      </View>
    );
  }


style = StyleSheet.create({
  container: {
    paddingLeft: 22,
    backgroundColor:"#FAFAF5",
  },

  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
    paddingRight: 10,
  },

  headerText: {
    fontSize: 20,
    fontWeight: "700",
  },

  EditTextProfile: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 55,
    width:184
  },

  EditTextProfile2: {
    marginTop:8,
    fontSize: 15,
    width:220

  },

  PhoneNumberInputContainer: {
    marginTop: 35,
    paddingRight: 30,
  },

  buttonContainer: {
    marginTop: 368,
    paddingRight: 22,
  },
  button: {
    backgroundColor: "#7BB66D",
    borderRadius: 25,
  },
});
