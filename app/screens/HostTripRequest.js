import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Icon, Button } from "@rneui/themed";
import { useSelector, useDispatch } from "react-redux";
import ButtonSmall from "../components/ButtonSmall";
import BackArrow from "../components/BackArrow";
import SafeArea from "../components/SafeArea";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
import { TripbyId, updateTrip, reset } from "../redux/slice/vehicle/Vehicles";
import ButtonLong from "../components/ButtonLong";

export default function HostTripRequest({ route }) {
  const navigation = useNavigation();

  const { tripsId, frontView, carName } = route.params;

  const dispatch = useDispatch();

  const { TripId, tempUpdateTrip, isError, isSuccess, message } = useSelector(
    (state) => state.vehicles
  );

  const trips = TripId.length !== 0 ? TripId.data.map((trip) => trip) : null;

  let pickup = trips !== null ? trips[0].d_date_pickup : null;
  let dropoff = trips !== null ? trips[0].d_date_dropoff : null;

  pickup = trips !== null ? pickup.replace("T00:00:00.000Z", "") : null;
  dropoff = trips !== null ? dropoff.replace("T00:00:00.000Z", "") : null;

  const idtrip = async () => {
    await AsyncStorage.setItem("tripId", tripsId);
  };

  const notify = async () => {
    await axios.post(`https://app.nativenotify.com/api/indie/notification`, {
      subID: trips !== null ? `${trips[0].d_user_id}` : null,
      appId: 6250,
      appToken: "LUS7EDr5M1t7jkbtr48QDw",
      title: "Your Order Has Been Accepted",
      message:
        trips !== null
          ? `Your order to rent a ${carName} for ${trips[0].d_duration} days has been Accepted, you can go ahead to make your payment`
          : null,
    });
  };

  const notifyCancel = async () => {
    await axios.post(`https://app.nativenotify.com/api/indie/notification`, {
      subID: trips !== null ? `${trips[0].d_user_id}` : null,
      appId: 6250,
      appToken: "LUS7EDr5M1t7jkbtr48QDw",
      title: "Your Order Has Been rejected by host",
      message:
        trips !== null
          ? `Your order to rent a ${carName} for ${trips[0].d_duration} days has been rejected`
          : null,
    });
  };
  const onAccept = () => {
    const values = {
      query: "d_status",
      value: "accept",
    };

    dispatch(updateTrip(values));
    if (isSuccess) {
      console.log(tempUpdateTrip);
      console.log("success");
      dispatch(reset());
      navigation.goBack();
      alert("Trip has been confirmed thank you for accepting the trip!");
      notify();
    }
  };

  const onComplete = () => {
    const values = {
      query: "d_completed",
      value: 1,
    };

    dispatch(updateTrip(values));
    if (isSuccess) {
      console.log(tempUpdateTrip);
      console.log("success");
      dispatch(reset());
      navigation.goBack();
      alert("Your Trip has been completed");
    }
  };

  const onReject= () => {
    const values = {
      query: "d_status",
      value: "cancel",
    };

    dispatch(updateTrip(values));
    if (isSuccess) {
      console.log(tempUpdateTrip);
      console.log("success");
      dispatch(reset());
      navigation.goBack();
      alert("Trip has been cancelled");
      notifyCancel();
    }
  }

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(TripbyId(tripsId));
    idtrip();
  }, []);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
  }, [reset, dispatch, isError, message]);

  return (
    <SafeArea>
      <View style={style.container}>
        <ScrollView style={style.scroll} showsVerticalScrollIndicator={false}>
          <View style={style.OrderSummaryTab}>
            <BackArrow />
            <Text style={style.OrderSummaryTabText}>Trip Request</Text>
          </View>
          <View style={style.OrderSummaryCard}>
            <View style={style.OrderSummaryHeader}>
              <Image
                style={style.OrderSummaryHeaderImage}
                source={{ uri: frontView }}
              />
            </View>
            <View style={[style.OrderSummaryPrices]}>
              <Text style={style.OrderSummaryPricesText}>{carName}</Text>

              <View style={style.OrderSummaryPricesTextContainer}>
                <Text style={style.OrderSummaryPricesText2}>{trips !== null ? trips[0].d_price : null}/</Text>
                <Text style={style.OrderSummaryPricesText3}>Day</Text>
              </View>
            </View>
            <View style={style.OrderSummaryDescription}>
              <Text style={style.OrderSummaryDescriptionText}>Duration</Text>
              <Text style={style.OrderSummaryDescriptionText2}>
                {trips !== null ? trips[0].d_duration : null}
              </Text>
            </View>
            <View style={style.OrderSummaryDescription}>
              <Text style={style.OrderSummaryDescriptionText}>Pick Up Day</Text>
              <Text style={style.OrderSummaryDescriptionText2}>{pickup}</Text>
            </View>

            <View style={style.OrderSummaryDescription}>
              <Text style={style.OrderSummaryDescriptionText}>
                Drop Off Day
              </Text>
              <Text style={style.OrderSummaryDescriptionText2}>{dropoff}</Text>
            </View>

            <View style={style.OrderSummaryDescription}>
              <Text style={style.OrderSummaryDescriptionText}>Rent Fee</Text>
              <Text style={style.OrderSummaryDescriptionText2}>
                N{trips !== null ? trips[0].d_price : null}
              </Text>
            </View>
            <View style={style.OrderSummaryDescriptionTotal}>
              <Text style={style.OrderSummaryDescriptionTotalText}>
                Total Fee
              </Text>
              <Text style={style.OrderSummaryDescriptionTotalText}>
                N{trips !== null ? trips[0].d_total_fee : null}
              </Text>
            </View>
          </View>

          <View style={style.detailDescription}>
            <Text style={style.detailDescriptionHeader}>Pick Up Location</Text>
            <Text style={style.detailDescriptionText}>
              {trips !== null ? trips[0].d_dropoff_location : null}
            </Text>
          </View>

          {trips !== null ? (
            <>
              {trips[0].d_status === "pending" ? (
                <View style={style.buttonContainer}>
                  <>
                    <ButtonSmall
                      title="Accept"
                      externalButtonStyle={[style.left, style.utilityButton]}
                      externalContainerStyle={[style.utilityContainer]}
                      onPress={onAccept}
                    />
                    <ButtonSmall
                      title="Reject"
                      onPress={onReject}
                      externalButtonStyle={[style.right, style.utilityButton]}
                      externalContainerStyle={[
                        style.rightContainer,
                        style.utilityContainer,
                      ]}
                      // onPress={() => navigation.navigate("Login")}
                    />
                  </>
                </View>
              ) : (
                <>
                  {trips[0].d_completed === 1 ? (
                    <View style={style.opacityButton}>
                      <Icon name="check" type="evilicon" color="#ffffff" />

                      <Text style={style.opacityText}>
                        This Trip Has Been Completed
                      </Text>
                    </View>
                  ) : (
                    <ButtonLong
                      onPress={onComplete}
                      disabled={trips[0].d_is_paid ===0}
                      title="Mark Trip As Completed"
                      buttonExternal={style.btnExternal}
                    />
                  )}
                </>
              )}
            </>
          ) : null}
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
    width: screenWidth,
  },

  scroll: {
    marginBottom: screenHeight * 0.09,
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
    paddingLeft: screenWidth * 0.05,
    paddingRight: screenWidth * 0.05,

    paddingTop: 25,
    paddingBottom: 49,
    borderRadius: 8,
  },

  OrderSummaryHeaderImage: {
    width: screenWidth * 0.79,
    height: screenHeight * 0.24,
    borderRadius: 13.1,
  },

  OrderSummaryPrices: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: screenHeight * 0.01,
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
    // marginRight: 24,
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
  },

  OrderSummaryDescriptionTotalText: {
    fontSize: 16,
    fontWeight: "600",
  },

  note: {
    color: "#A9A9A9",
    marginTop: screenHeight * 0.02,
    fontSize: 12,
  },

  detailDescription: {
    borderWidth: 1,
    borderColor: "#7BB66D",
    backgroundColor: "#fff",
    width: screenWidth * 0.9,
    height: screenHeight * 0.13,
    marginTop: 38,
    paddingHorizontal: 17,
    padding: screenHeight * 0.02,
    borderRadius: 8,
  },

  detailDescriptionHeader: {
    fontSize: 14,
    fontWeight: "700",
  },

  detailDescriptionText: {
    fontSize: 14,
    marginTop: screenHeight * 0.02,
  },

  buttonContainer: {
    flexDirection: "row",
    marginTop: screenHeight * 0.09,
    marginBottom: screenHeight * 0.04,
    justifyContent: "space-between",
    paddingRight: screenHeight * 0.02,
  },

  right: {
    backgroundColor: "#7BB66D",
  },

  left: {
    backgroundColor: "#1A321E",
  },

  utilityContainer: {
    width: screenWidth * 0.4,
  },

  utilityButton: {
    paddingVertical: 16,
  },
  btnExternal: {
    marginTop: screenHeight * 0.09,
    marginBottom: screenHeight * 0.04,
    marginRight: screenHeight * 0.02,
    backgroundColor: "#1A321E",
  },

  opacityButton: {
    marginTop: screenHeight * 0.05,
    flexDirection: "row",

    backgroundColor: "#7BB66D",
    paddingTop: screenHeight * 0.019,
    paddingBottom: screenHeight * 0.019,
    paddingLeft: screenHeight * 0.019,
    marginBottom: screenHeight * 0.05,
    marginRight: 22,
  },

  opacityText: {
    color: "#FFFFFF",
    marginLeft: screenWidth * 0.06,
    marginTop: screenHeight * 0.004,
  },
});
