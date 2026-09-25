import { View, Text, StyleSheet, Image, Dimensions,ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Icon, Button } from "@rneui/themed";
import { useSelector, useDispatch } from "react-redux";
import { createTripRequest, reset,resetState } from "../redux/slice/vehicle/Vehicles";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import SafeArea from "../components/SafeArea";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonLong from "../components/ButtonLong";
import axios from "axios";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function OrderSummary({ route }) {
  const { price, pickup, dropOff, total, front, name, duration, vId,vUserId } =
    route.params;

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { tempTrips, vehicles, isError, isOrder, message } = useSelector(
    (state) => state.vehicles
  );
  const { user } = useSelector((state) => state.auth);

  let id = user.data.d_user_id;
  let totalPrice = total;
  let durations = duration;
  let vehicleId = vId;

  console.log("id", vehicleId);

  const reFormatDate = (date) => {
    const dateParts = date.split("-");
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  };

  let pickupDate = reFormatDate(pickup);
  let dropoffDate = reFormatDate(dropOff);

  // console.log("check", typeof tempTrips.data[0].d_is_paid);

  const getTripid = async (tripsId) => {
    await AsyncStorage.setItem("tripId", tripsId);
  };

  const onPress = () => {
    setLoading(true);

    const trip = {
      userId: id,
      vehicleId: vehicleId,
      totalPrice: `${totalPrice}`,
      pickupDate: pickupDate,
      dropoffDate: dropoffDate,
      duration: `${durations}`,
    };

    dispatch(createTripRequest(trip));
   
  };

  const notifyHost = async () => {
    await axios.post(`https://app.nativenotify.com/api/indie/notification`, {
      subID:`${vUserId}` ,
      appId: 6250,
      appToken: "LUS7EDr5M1t7jkbtr48QDw",
      title: "You Have A New Trip Request",
      message:
     
         ` A Guest has made a request to book your ${name}`
        ,
    });
  };

  const notifyGuest = async () => {
    await axios.post(`https://app.nativenotify.com/api/indie/notification`, {
      subID:`${user.data.d_user_id}` ,
      appId: 6250,
      appToken: "LUS7EDr5M1t7jkbtr48QDw",
      title: "Your order has been placed",
      message:
      
         `You will be notified once your order has been accepted by the host`
        ,
    });
  };


  useEffect(() => {
    if (isError) {
      console.log("info", message);
      setLoading(false);
    }
    dispatch(reset())

      if (isOrder) {
        
        console.log("info", tempTrips);
        setLoading(false);
        notifyHost();
        notifyGuest();
        tempTrips.length !==0 ? getTripid(tempTrips.data[0].d_trip_id):null;

        dispatch(reset())
        navigation.navigate("History");
      }

     
      

       dispatch(reset())

    
  }, [tempTrips, isOrder, message, dispatch, reset]);

  return (
    <SafeArea>
      <View style={style.container}>
        <ScrollView style={style.scroll}>
        <View style={style.OrderSummaryTab}>
          <Icon
            onPress={() => navigation.goBack()}
            name="chevron-back-circle-outline"
            type="ionicon"
          />
          <Text style={style.OrderSummaryTabText}>OrderSummary</Text>
        </View>
        <View style={style.OrderSummaryCard}>
          <View style={style.OrderSummaryHeader}>
            <Image
              style={style.OrderSummaryHeaderImage}
              source={{ uri: front }}
              resizeMode="cover"
            />
          </View>
          <View style={[style.OrderSummaryPrices]}>
            <Text style={style.OrderSummaryPricesText}>{name}</Text>

            <View style={style.OrderSummaryPricesTextContainer}>
              <Text style={style.OrderSummaryPricesText2}>{price}/</Text>
              <Text style={style.OrderSummaryPricesText3}>Day</Text>
            </View>
          </View>
          <View style={style.OrderSummaryDescription}>
            <Text style={style.OrderSummaryDescriptionText}>Duration</Text>
            <Text style={style.OrderSummaryDescriptionText2}>
              {duration} day
            </Text>
          </View>
          <View style={style.OrderSummaryDescription}>
            <Text style={style.OrderSummaryDescriptionText}>Pick Up Day</Text>
            <Text style={style.OrderSummaryDescriptionText2}>{pickup}</Text>
          </View>
          <View style={style.OrderSummaryDescription}>
            <Text style={style.OrderSummaryDescriptionText}>Drop Off Day</Text>
            <Text style={style.OrderSummaryDescriptionText2}>{dropOff}</Text>
          </View>

          <View style={style.OrderSummaryDescription}>
            <Text style={style.OrderSummaryDescriptionText}>Rent Fee</Text>
            <Text style={style.OrderSummaryDescriptionText2}>N{price}</Text>
          </View>
          <View style={style.OrderSummaryDescriptionTotal}>
            <Text style={style.OrderSummaryDescriptionTotalText}>
              Total Fee
            </Text>
            <Text style={style.OrderSummaryDescriptionTotalText}>N{total}</Text>
          </View>
        </View>
        <View style={style.buttonContainer}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <ButtonLong
              onPress={onPress}
              title="Place Order"
              buttonStyle={[style.button]}
              titleStyle={style.titleStyle}
            />
          )}
        </View>
        </ScrollView>
      </View>
    </SafeArea>
  );
}

const style = StyleSheet.create({
  container: {
    paddingTop: 35,
    paddingLeft: 22,
    backgroundColor: "#FAFAF5",
    height: screenHeight,
  },

  scroll:{
    marginBottom:screenHeight *0.08,
  },

  OrderSummaryTab: {
    flexDirection: "row",
    paddingTop: 15,
  },

  OrderSummaryTabText: {
    marginLeft: 100,
    fontSize: 20,
    fontWeight: "600",
  },

  OrderSummaryCard: {
    backgroundColor: "#fff",
    marginRight: 22,
    marginTop: 32,
    paddingLeft: 22,
    paddingTop: 25,
    paddingBottom: 49,
    borderRadius: 8,
  },

  OrderSummaryHeaderImage: {
    width: screenWidth *0.8,
    height: screenHeight *0.25,
    borderRadius:8
   
  },

  OrderSummaryPrices: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 32,
  },

  OrderSummaryPricesText: {
    fontSize: 21,
  },

  OrderSummaryPricesTextContainer: {
    flexDirection: "row",
    marginTop: 5,
    marginLeft: 33,
  },

  OrderSummaryPricesText2: {
    color: "#7BB66D",
    fontSize: 15,
  },

  OrderSummaryPricesText3: {
    color: "#7BB66D",
    fontSize: 12,
    marginTop: 5,
  },
  OrderSummaryDescription: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 24,
    borderBottomWidth: 2,
    borderBottomColor: "#E6E6E6",
    marginBottom: 16,
    paddingBottom: 8,
  },

  OrderSummaryDescriptionText: {
    fontSize: 16,
  },

  OrderSummaryDescriptionText2: {
    fontSize: 14,
  },

  OrderSummaryDescriptionTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 24,
  },

  OrderSummaryDescriptionTotalText: {
    fontSize: 16,
    fontWeight: "600",
  },

  buttonContainer: {
    marginTop: screenHeight *0.03,
    paddingRight: 22,
  },


});
