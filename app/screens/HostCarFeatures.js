import { View, Text, StyleSheet, TouchableOpacity,ScrollView,Dimensions } from "react-native";
import React, { useState } from "react";
import { Icon, Button } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import SafeArea from "../components/SafeArea";
import ButtonLong from "../components/ButtonLong";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;


export default function HostCarFeatures() {
  const navigation = useNavigation();

  const [isBluetooth, setBluetooth] = useState("0");
  const [isWheelChair, setWheelChair] = useState("0");
  const [isGPS, setGPS] = useState("0");
  const [isUsb, setUsb] = useState("0");
  const [isHeated, setHeated] = useState("0");
  const [isBike, setBike] = useState("0");
  const [isChildSeat, setChildSeat] = useState("0");
  const [isCamera, setCamera] = useState("0");
  const [isNavigation, setNavigation] = useState("0");
  const [isKeyless, setKeyless] = useState("0");

  const bluetooth = () => {
    isBluetooth === "0" ? setBluetooth("1") : setBluetooth("0");
  };

  const wheelChair = () => {
    isWheelChair === "0" ? setWheelChair("1") : setWheelChair("0");
  };

  const gps = () => {
    isGPS === "0" ? setGPS("1") : setGPS("0");
  };

  const usb = () => {
    isUsb === "0" ? setUsb("1") : setUsb("0");
  };

  const heated = () => {
    isHeated === "0" ? setHeated("1") : setHeated("0");
  };

  const bike = () => {
    isBike === "0" ? setBike("1") : setBike("0");
  };

  const childSeat = () => {
    isChildSeat === "0" ? setChildSeat("1") : setChildSeat("0");
  };

  const camera = () => {
    isCamera === "0" ? setCamera("1") : setCamera("0");
  };

  const navigations = () => {
    isNavigation === "0" ? setNavigation("1") : setNavigation("0");
  };

  const keyless = () => {
    isKeyless === "0" ? setKeyless("1") : setKeyless("0");
  };

  const onPress = async () => {
    try {
      const HostCarFeatures = {
        is_bluetooth: isBluetooth,
        is_wheel_chair: isWheelChair,
        is_gps: isGPS,
        is_usb: isUsb,
        is_heated: isHeated,
        is_bike: isBike,
        is_child: isChildSeat,
        is_keyless: isKeyless,
        is_back_camera: isCamera,
        is_navigation: isNavigation,
      };

      await AsyncStorage.setItem(
        "HostCarFeatures",
        JSON.stringify(HostCarFeatures)
      );

     

      navigation.navigate("UploadCarVerification");
    } catch (error) {}
  };

  return (
    <SafeArea>
    <View style={style.container}>
      <ScrollView  showsVerticalScrollIndicator={false} style={style.scroll}>
      <View style={style.detailContainer}>
        <Icon
          onPress={() => navigation.navigate("Home")}
          name="chevron-back-circle-outline"
          type="ionicon"
        />
        <Text style={style.headerText}>Car Features</Text>
        <Icon name="dots-vertical" type="material-community" />
      </View>

      <View style={style.specification}>
        <View style={style.specificationCardContainer}>
          <TouchableOpacity
            onPress={bluetooth}
            style={[
              isBluetooth === "1"
                ? style.specificationCardActive
                : style.specificationCard,
            ]}
          >
            <Text style={style.textCard}>Bluetooth</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={wheelChair}
            style={[
              isWheelChair === "1"
                ? style.specificationCardActive
                : style.specificationCard,
            ]}
          >
            <Text style={style.textCard}>Wheelchair Accessible</Text>
          </TouchableOpacity>
        </View>
        <View style={style.specificationCardContainer}>
          <TouchableOpacity
            onPress={gps}
            style={[
              isGPS === "1"
                ? style.specificationCardActive
                : style.specificationCard,
            ]}
          >
            <Text style={style.textCard}>GPS</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={usb}
            style={[
              isUsb === "1"
                ? style.specificationCardActive
                : style.specificationCard,
            ]}
          >
            <Text style={style.textCard}>USB Input</Text>
          </TouchableOpacity>
        </View>
        <View style={style.specificationCardContainer}>
          <TouchableOpacity
            onPress={heated}
            style={[
              isHeated === "1"
                ? style.specificationCardActive
                : style.specificationCard,
            ]}
          >
            <Text style={style.textCard}>Heated Seats</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={bike}
            style={[
              isBike === "1"
                ? style.specificationCardActive
                : style.specificationCard,
            ]}
          >
            <Text style={style.textCard}>Bike Rack</Text>
          </TouchableOpacity>
        </View>
        <View style={style.specificationCardContainer}>
          <TouchableOpacity
            onPress={childSeat}
            style={[
              isChildSeat === "1"
                ? style.specificationCardActive
                : style.specificationCard,
            ]}
          >
            <Text style={style.textCard}>Child Seat</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={keyless}
            style={[
              isKeyless === "1"
                ? style.specificationCardActive
                : style.specificationCard,
            ]}
          >
            <Text style={style.textCard}>Keyless Entry</Text>
          </TouchableOpacity>
        </View>

        <View style={style.specificationCardContainer}>
          <TouchableOpacity
            onPress={camera}
            style={[
              isCamera === "1"
                ? style.specificationCardActive
                : style.specificationCard,
            ]}
          >
            <Text style={style.textCard}>Backup Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={navigations}
            style={[
              isNavigation === "1"
                ? style.specificationCardActive
                : style.specificationCard,
            ]}
          >
            <Text style={style.textCard}>Navigation System</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={style.buttonContainer}>
        <ButtonLong
          onPress={onPress}
          title="Next"
          buttonStyle={[style.button]}
          titleStyle={style.titleStyle}
        />
      </View>
      </ScrollView>
    </View>
    </SafeArea>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#FAFAF5",
    paddingLeft: 22,
    height: screenHeight,
  },

scroll:{
    marginBottom:screenHeight *0.08
},

  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: screenHeight *0.05,
    paddingRight: 10,
  },

  headerText: {
    fontSize: 20,
    fontWeight: "700",
  },

  specification: {
    paddingTop: 80,
    paddingRight: 22,
  },

  specificationCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  specificationCard: {
    borderWidth: 5,
    borderColor: "#fff",
    width: 140,
    borderRadius: 5,
    padding: 5,
    backgroundColor: "#fff",
    marginBottom: 15,
  },

  specificationCardActive: {
    borderWidth: 5,
    borderColor: "#7BB66D",
    width: 140,
    borderRadius: 5,
    padding: 5,
    backgroundColor: "#7BB66D",
    marginBottom: 15,
  },

  textCard: {
    fontSize: 16,
    marginBottom: 5,
  },

  buttonContainer: {
    marginTop: screenHeight *0.2,
    paddingRight: 22,
  },
  button: {
    backgroundColor: "#7BB66D",
    borderRadius: 25,
  },
});
