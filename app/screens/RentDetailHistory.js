import { View, Text, Image, StyleSheet,TouchableOpacity,ScrollView,Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import SafeArea from "../components/SafeArea";
import ButtonLong from "../components/ButtonLong"
import normalize from 'react-native-normalize'
import { TripbyId, updateTrip, reset } from "../redux/slice/vehicle/Vehicles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import ActivityLoader from "../components/ActivityLoader";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function RentDetails({ route }) {
  const {
    frontViewImage,
    backViewImage,
    fronSeatImage,
    backSeatImage,
    vehicleName,
    dashboard,
    odometer,
    price,
    total,
    duration,
    trip,
    vehicles
  } = route.params;

  
  const { tempUpdateTrip, isError, isCancelled,isSuccess, message } = useSelector(
    (state) => state.vehicles
  );

   const dispatch= useDispatch();
   const [loading, setLoading] = useState(false);

  const onPress = () => {
      if(trip.d_status==="accept"  && trip.d_is_paid===0 && trip.d_completed===0 ){
        navigation.navigate("Pay",{
          name:vehicleName, 
           total:parseInt(total),
           duration: duration,
            price: price,
            front: frontViewImage
        })
      }

      else{
        navigation.navigate("CarDetail",{
        id: vehicles.d_id,
        userID:vehicles.d_user_id,
        front_view_image: vehicles.d_front_view_image,
        back_view_image: vehicles.d_back_view_image,
        right_side_image: vehicles.d_right_side_image,
        left_side_image: vehicles.d_left_side_image,
        dashboard_view_image: vehicles.d_dashboard_view_image,
        trunk_view_image: vehicles.d_trunk_view_image,
        colour: vehicles.d_colour,
        vehicle_make: vehicles.d_vehicle_make,
        vehicle_type: vehicles.d_vehicle_type,
        number_of_seats: vehicles.d_number_of_seats,
        year_of_make: vehicles.d_year_of_make,
        transmission: vehicles.d_transmission,
        odometer: vehicles.d_odometer,
        is_bluetooth: vehicles.d_is_bluetooth,
        is_wheel_chair: vehicles.d_is_wheel_chair,
        is_gps: vehicles.d_is_gps,
        is_bike: vehicles.d_is_bike,
        is_child: vehicles.d_is_child,
        is_back_camera: vehicles.d_is_back_camera,
        is_navigation: vehicles.d_is_navigation,
        is_keyless: vehicles.d_is_keyless,
        is_usb: vehicles.d_is_usb,
        is_heated: vehicles.d_is_heated,
        vehicle_make: vehicles.d_vehicle_make,
        price: vehicles.d_price,
        vehicleId: vehicles.d_vehicle_id,
        from:"history"
      }
        )
    }
  }
  const navigation = useNavigation();


  const idtrip = async () => {
    await AsyncStorage.setItem("tripId", trip.d_trip_id);
  };
  const notify = async () => {
    await axios.post(`https://app.nativenotify.com/api/indie/notification`, {
      subID: `${vehicles.d_user_id}` ,
      appId: 6250,
      appToken: "LUS7EDr5M1t7jkbtr48QDw",
      title: "Trip cancelled",
      message:
       
           `The request to rent a ${vehicles.d_vehicle_make} has been Cancelled`
          
    });
  };

  const onComplete = () => {
    setLoading(true);
    const values = {
      query: "d_status",
      value: "cancel",
    };

    dispatch(updateTrip(values));

   };



  useEffect(() => {
    if (isError) {
      console.log(message);
    }
      
    if (isCancelled) {
      setLoading(false);
      console.log(tempUpdateTrip);
      console.log("success");
      dispatch(reset());
      navigation.goBack();
      notify();
    }
   
 dispatch(reset());
  }, [reset,isCancelled,isError,message]);


  return (
    <SafeArea>
    <View style={style.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={style.scroll}>
      <View style={style.detailContainer}>
        <Icon
          onPress={() => navigation.goBack()}
          name="chevron-back-circle-outline"
          type="ionicon"
        />
        <Text style={style.detailText}>Details</Text>
        <Icon name="dots-vertical" type="material-community" />
      </View>
      <View style={style.headerContainer}>
        <Image  source={{ uri: frontViewImage }} style={style.imageHeader} />
        <View style={style.imageDetails}>
          <Image  source={{ uri: backViewImage }} style={style.image} />
          <Image  source={{ uri: fronSeatImage }} style={style.image} />
          <Image  source={{ uri: backSeatImage }} style={style.image} />
          <Image  source={{ uri: dashboard }} style={style.image} />
        </View>
        <Text style={style.textDetail1}>{vehicleName}</Text>

        <Text style={style.textDetail2}>{price}</Text>
      </View>
      <View style={style.specification}>
        <View style={style.specificationCard}>
        <Icon
                name="stethoscope"
                type="font-awesome"
                style={style.iconStart}
              />
          <Text style={[style.textCard2, style.spacing]}>{odometer}</Text>
          <Text style={[style.textCard3, style.spacing]}>Total Km</Text>
        </View>
        <View style={style.specificationCard}>
        <Icon name="calendar" type="feather" style={style.iconStart} />
          <Text style={[style.textCard2, style.spacing]}>{duration}</Text>
          <Text style={[style.textCard3, style.spacing]}>Days</Text>
        </View>
      </View>
      <View style={style.fee}>
        <View style={style.feeDetail}>
          <Text style={style.feeDetailText1}>Total Fee</Text>
          <Text style={style.feeDetailText2}>{duration}day</Text>
          <View style={style.feeDetailPrice}>
            <Text style={style.feeDetailText3}>N{price}/</Text>
            <Text style={style.feeDetailText4}>day</Text>
          </View>
        </View>

        <View style={style.feePrice}>
          <Text
          style={style.feePriceText}
          >
            {total}
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={onPress} style={style.opacityButton}>
       <View style={style.opacityTextContainer}> 
       <Icon name="clipboard-notes" type="foundation" color="#ffffff" />
        { trip.d_status==="accept"  && trip.d_is_paid===0 && trip.d_completed===0   ? 
         ( <Text style={style.opacityText}>Proceed to payment</Text>) : (<Text style={style.opacityText}>Car Details</Text>) 
        }
        </View>
        <Icon name="chevron-forward-outline" type="ionicon" color="#ffffff" />
      </TouchableOpacity>

       <View style={style.cancelButton} >
        
         {loading ? (
          <ActivityLoader />
        ) :
        
        (
          <>
          { trip.d_is_paid===0 && trip.d_completed===0?
            (
          <ButtonLong buttonExternal={style.buttonExternal} onPress={onComplete} title="Cancel Request"/>
            )
          :null
          
          }
          </>
        )
        }
       

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
  },
  scroll:{
     marginBottom: screenHeight * 0.1
  },

  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 22,
    paddingRight: 10,
    paddingTop: 50,
    backgroundColor: "#fff",
  },

  detailText: {
    fontSize: 20,
    fontWeight: "600",
  },

  headerContainer: {
    paddingTop: 46,
    paddingLeft: 22,
    paddingRight: 20,
    marginTop: 0,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: "#fff",
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    paddingBottom: 27,
  },
  imageHeader: {
    width: screenWidth* 0.9,
    height: screenHeight*0.2,
    borderRadius: 15,
  },
  imageDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
  },

  textDetail1: {
    fontSize: 22,
    marginTop: 32,
  },
  textPrice: {
    flexDirection: "row",
  },
  textDetail2: {
    fontSize: 24,
    fontWeight: "700",
    color: "#7BB66D",
  },

  specification: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 30,
  },

  specificationCard: {
    borderWidth: 5,
    borderColor: "#fff",
    width: 145,
    borderRadius: 8,
    paddingTop: 5,
    paddingLeft: 5,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  textCard2: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
  },

  spacing:{
   textAlign: "center",
  },

  textCard3: {
    fontSize: 14,
    marginTop: 5,
  },

  fee: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    marginTop: 22,
    paddingLeft: 22,
    paddingTop: 12,
    paddingBottom: 12,
  },

  feeDetailText1: {
    fontSize: 18,
  },
  feeDetailText2: {
    fontSize: 12,
    color: "#7BB66D",
    fontWeight: "600",
  },

  feeDetailPrice: {
    flexDirection: "row",
  },

  feeDetailText3: {
    fontSize: 14,
  },

  feeDetailText4: {
    fontSize: 10,
    marginTop: 5,
  },

  feePrice: {
    backgroundColor: "#7BB66D",
    width: 110,
    height: 46,
    paddingTop: 10,
    paddingLeft: 16,
    paddingRight: 10,
    paddingBottom: 7,
    borderBottomLeftRadius: 15.28,
    borderTopLeftRadius: 15.28,
    marginTop: 12,
  },

  feePriceText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  fee: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    marginTop: 22,
    paddingLeft: 22,
    paddingTop: 12,
    paddingBottom: 12,
  },

  feeDetailText1: {
    fontSize: 18,
  },
  feeDetailText2: {
    fontSize: 12,
    color: "#7BB66D",
    fontWeight: "600",
  },

  feeDetailPrice: {
    flexDirection: "row",
  },

  feeDetailText3: {
    fontSize: 14,
  },

  feeDetailText4: {
    fontSize: 10,
    marginTop: 5,
  },

  feePrice: {
    backgroundColor: "#7BB66D",
    paddingRight:screenWidth * 0.06,
    height: 46,
    paddingTop: 10,
    paddingLeft: 16,
    paddingRight: 10,
    paddingBottom: 7,
    borderBottomLeftRadius: 15.28,
    borderTopLeftRadius: 15.28,
    marginTop: 12,
  },

  feePriceText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },

  iconStart:{
    alignItems:"center",
  },

  opacityButton: {
     marginTop: screenHeight*0.05,
     flexDirection: "row",
     justifyContent: "space-between",
     backgroundColor: "#1A321E",
     paddingTop:screenHeight*0.019,
     paddingBottom:screenHeight*0.019,
     paddingLeft:screenHeight*0.019,
     marginBottom:screenHeight*0.05
  },

  opacityTextContainer:{
    flexDirection: "row",
  
  },

  opacityText:{
    color: "#FFFFFF",
    marginLeft:10,
    marginTop:screenHeight*0.009
  },

  cancelButton:{
      paddingLeft:normalize(22),
      paddingRight:normalize(22)

  },

  buttonExternal:{
    backgroundColor: "red",
  }
});
