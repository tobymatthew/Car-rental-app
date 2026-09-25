import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import DatePicker from "../components/DatePicker";
import ButtonLong from "../components/ButtonLong";
import SafeArea from "../components/SafeArea";
import { useNavigation } from '@react-navigation/native';
import normalize from "react-native-normalize";
// import CachedImage from 'react-native-expo-cached-image';
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function RentDetails({ route }) {
  const { vehicle_make, price, front_view_image,vehicleId,dropOff,pickup,vUserId } = route.params;

  const navigation = useNavigation();

  

  return (
    <SafeArea>
    <View style={style.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom:screenHeight*0.08}}>
        <View style={style.detailContainer}>
          <Icon
            onPress={() => navigation.goBack()}
            name="chevron-back-circle-outline"
            type="ionicon"
          />
          <Text style={style.headerText}>Rent Details</Text>
          <Icon name="dots-vertical" type="material-community" />
        </View>

        <View style={style.headerDetails}>
          <View style={style.headerImage}>
          <Image style={style.imageHeader} source={{ uri: front_view_image }} />
          </View>
          <View style={style.headerDetailsInfo}>
            <Text style={style.headerDetailsInfoText1}>{vehicle_make}</Text>

            <View style={style.headerDetailsInfoPrice}>
              <Text style={style.headerDetailsInfoText2}>{price}/</Text>
              <Text style={style.headerDetailsInfoText3}>Day</Text>
            </View>
          </View>
        </View>

        <DatePicker drop={pickup} price={price} front={front_view_image} name={vehicle_make} vehicleId={vehicleId} vUserId={vUserId}/>

       
        
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
  },
  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: normalize(45),
    paddingLeft:normalize(10),
    paddingRight: normalize(10),
  },

  headerText: {
    fontSize: normalize(20),
    fontWeight: "700",
  },

  headerDetails: {
    flexDirection: "row",
    marginTop: 43,
    paddingLeft: 22,
    paddingRight: 24,
  },

  headerDetailsInfo: {
    marginLeft: 20,
  },
  headerDetailsInfoText1: {
    fontSize: 20,
    color: "#000",
  },

  headerDetailsInfoPrice: {
    flexDirection: "row",
  },

  headerDetailsInfoText2: {
    fontSize: 22,
    color: "#7BB66D",
    fontWeight: "700",
  },

  headerDetailsInfoText3: {
    fontSize: 16,
    color: "#7BB66D",
    marginTop: 8,
    fontWeight: "600",
  },
 imageHeader:{
   width:screenWidth* 0.5,
   height:screenHeight* 0.2,
   borderRadius:13
 },


});
