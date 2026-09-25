import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
import { useSelector, useDispatch } from "react-redux";
import normalize from 'react-native-normalize'
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function History({
  vehicleName,
  vehiclePrice,
  image,
  from,
  trips,
  tripId,
  vehicleId,
}) {
  const { vehicles, isSuccess } = useSelector((state) => state.vehicles);

  const vehicleInfo =
    vehicles !== 0 ? vehicles.find((v) => v.d_vehicle_id === vehicleId) : null;

  //  const vehicleShow=vehicleInfo.map(v => v[0]);

  const navigation = useNavigation();
  const idtrip = async () => {
    await AsyncStorage.setItem("tripId", tripId.d_trip_id);
  };
  const onPress = () => {
    if (from === "history") {
      idtrip();
      vehicles !== 0
        ? navigation.navigate("RentDetailHistory", {
            frontViewImage: vehicleInfo.d_front_view_image,
            backViewImage: vehicleInfo.d_back_view_image,
            fronSeatImage: vehicleInfo.d_fron_seat_image,
            backSeatImage: vehicleInfo.d_back_Seat_image,
            vehicleName: vehicleInfo.d_vehicle_make,
            odometer: vehicleInfo.d_odometer,
            dashboard: vehicleInfo.d_dashboard_view_image,
            price: tripId.d_price,
            total: tripId.d_total_fee,
            duration: tripId.d_duration,
            trip: tripId,
            vehicles: vehicleInfo,
          })
        : null;
    } else if (from === "trips") {
      vehicles !== 0
        ? navigation.navigate("HostTripRequest", {
            tripsId: tripId.d_trip_id,
            frontView: vehicleInfo.d_front_view_image,
            carName: vehicleInfo.d_vehicle_make,
          })
        : null;
    }
  };

  const status = tripId.d_status;
  const listCars =vehicleInfo.d_approved_for_listing;


  return (
    <View style={style.detailsInfo}>
      <Pressable onPress={onPress}>
        {vehicleInfo !== undefined && (
          <Image 
            style={style.image}
            source={{ uri: vehicleInfo.d_front_view_image }}
            resizeMode="cover"
          />
        )}
      </Pressable>
      <View style={style.headerDetailsInfo}>
        {vehicleInfo !== undefined && (
          <Text style={style.headerDetailsInfoText1}>
            {vehicleInfo.d_vehicle_make}
          </Text>
        )}
        <View style={style.headerDetailsInfoPrice}>
          {vehicleInfo !== undefined && (
            <Text style={style.headerDetailsInfoText2}>
              N{vehicleInfo.d_price}/
            </Text>
          )}
          <Text style={style.headerDetailsInfoText3}>Day</Text>
        </View>
        { from!=='listedCars' ? (
        <View>
          { status !=="cancel" ?
          (
          <>
          {status === "accept" ? (
            <View style={[style.approveContainer,style.statContainer]}>
              <Text style={style.stat}>Approved </Text>
            </View>
          ) : (
            <View style={[style.pendingContainer,style.statContainer]}>
              <Text style={style.stat}>Pending</Text>
            </View>
          )}
          </>
          ): 
          (
          <View style={[style.cancelContainer,style.statContainer]}>
              <Text style={style.stat}>Cancelled</Text>
            </View>
          )
          }
        </View>
        ) : 
        <View>
       
        
        <>
        {listCars === 1 ? (
          <View style={[style.approveContainer,style.statContainer]}>
            <Text style={style.stat}>Approved </Text>
          </View>
        ) : (
          <View style={[style.pendingContainer,style.statContainer]}>
            <Text style={style.stat}>Pending</Text>
          </View>
        )}
        </>
       
      
        
      </View>
       }
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  image: {
    width: screenWidth * 0.35,
    height: screenHeight * 0.15,
    borderRadius: 24,
  },

  detailsInfo: {
    flexDirection: "row",
    paddingLeft: screenWidth * 0.03,
    backgroundColor: "#FAFAF5",
    paddingTop: normalize(30),
  },
  headerDetailsInfo: {
    marginLeft: screenWidth * 0.05,
    marginTop: screenHeight * 0.02,
  },
  headerDetailsInfoText1: {
    fontSize: normalize(15),
    color: "#000000",
  },
  headerDetailsInfoPrice: {
    flexDirection: "row",
  },
  headerDetailsInfoText2: {
    fontSize:normalize(15),
    color: "#7BB66D",
    fontWeight: "700",
  },
  headerDetailsInfoText3: {
    fontSize: normalize(12),
    color: "#7BB66D",
    marginTop: normalize(5),
    fontWeight: "600",
  },

  approveContainer: {
    backgroundColor: "#1A321E",
   
  },
  statContainer:{
    marginTop: normalize(8),
    paddingLeft:normalize(15),
    paddingVertical:normalize(5),
    borderRadius:normalize(28),
    width:normalize(90)
  },
  stat: {
    color: "#FFFFFF",
    fontSize:normalize(11)
  },

  pendingContainer: {
    backgroundColor: "#FF9C00",
  },

  cancelContainer:{
    backgroundColor: "red",
  }
});
