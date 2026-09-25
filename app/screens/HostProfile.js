import { View, Text, StyleSheet, Image, Dimensions,ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Icon, Card } from "@rneui/themed";
import {
  useNavigation,
  StackActions,
  useIsFocused,
} from "@react-navigation/native";
import { getVehicleWithId, reset } from "../redux/slice/vehicle/Vehicles";
import { useSelector, useDispatch } from "react-redux";
import SmallCardItem from "../components/SmallCardItem";
import SafeArea from "../components/SafeArea";
import normalize from "react-native-normalize";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function HostProfile({ route }) {
  const { id, hostID,from } = route.params;

  console.log (from)
  let firstname = hostID.data.d_first_name;
  let lastname = hostID.data.d_last_name;
  let profileImage= hostID.data.d_profile_photo
  let number=  hostID.data.d_phone_number !==null ? hostID.data.d_phone_number:null;
  const fullname = firstname + " " + lastname;

  let { vehicleWithId, isSuccess } = useSelector((state) => state.vehicles);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  vehicleWithId=vehicleWithId.length !==0 ? vehicleWithId:null;

  useEffect(() => {
    dispatch(getVehicleWithId(id));
  }, [dispatch]);
  
   console.log("check",vehicleWithId)

  return (
    <SafeArea>
    <View style={style.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={style.scroll}>
      <View style={style.detailContainer}>
        <Icon
          onPress={() => navigation.navigate("Home")}
          name="chevron-back-circle-outline"
          type="ionicon"
        />
        <Text style={style.headerText}>Host Details</Text>
        <Icon name="dots-vertical" type="material-community" />
      </View>

      <View style={style.infoContainer}>
        <View style={style.infoContainerImage}>
          { profileImage ?

          (<Image  style={{
            width: screenWidth * 0.31,
            height: screenHeight * 0.14,
            borderRadius: 360,
          }} source={{uri:profileImage}} />):
          (<Image source={require("../../assets/Ellipse.png")} />)
           }
        </View>
        <Text style={style.infoContainerText}>{fullname}</Text>
        { from==="history" ?
        <Text style={style.infoContainerText2}>{number}</Text>
        :null
       }
      </View>

      <View
        onPress={() => navigation.navigate("CarDetail")}
        style={style.cardContainer}
      >
        <Text style={style.cardTextHeader}>{firstname} Vehicles</Text>

        {vehicleWithId && (
  <View style={style.cardContainer2}>
    {vehicleWithId.map((vehicle,index) => (
      <View key={`item-${index}`}>
        <SmallCardItem vehicles={vehicle} />
      </View>
    ))}
  </View>
)}
      
      </View>
      </ScrollView>
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

  scroll:{
     marginBottom:screenHeight *0.09
  },

  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingRight: 10,
    // backgroundColor: "#fff",
  },

  headerText: {
    fontSize: 20,
    fontWeight: "700",
  },
  infoContainer: {
    alignItems: "center",
    marginTop: screenHeight * 0.05,
    paddingRight:screenHeight * 0.03
   
  },

  infoContainerText: {
    marginTop: 10,
    fontSize:normalize(18),
    
  },

  infoContainerText2: {
    
    fontSize: normalize(15),
  },

  // infoContainerImage: {
  //   marginLeft: 18,
  // },

  cardContainer: {
    paddingBottom: 50,
  },
  cardContainer2: {
    flexDirection: "row",
  flexWrap:"wrap"
  },
  card: {
    width: 150,
    height: 190,
    padding: 0,
    borderRadius: 15,
  },

  cardImage: {
    height: 84,
  },

  cardTextHeader: {
    fontSize: 18,
    fontWeight: "500",
    marginTop: 28,
    marginHorizontal: 25,
  },

  cardText1: {
    fontSize: 16,
    fontWeight: "400",
    marginTop: 10,
    marginBottom: 30,
    marginHorizontal: 10,
  },
  cardText2: {
    fontSize: 12,
    fontWeight: "700",
    color: "#7BB66D",
    marginHorizontal: 10,
  },
});
