import React, { useEffect, useState } from "react";
import {
  View,
  useWindowDimensions,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import BackArrow from "../components/BackArrow";
import ListedCarItem from "../components/ListedCarItem";
import SafeArea from "../components/SafeArea";
import AsyncStorage from "@react-native-async-storage/async-storage";
import endPoint from "./../api/endpoint";
import normalize from "react-native-normalize";
import { vehicleIdTrips, reset } from "../redux/slice/vehicle/Vehicles";

import { useSelector, useDispatch } from "react-redux";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function Trips({ route }) {
  const dispatch = useDispatch();

  const [hostID, setHostID] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { vehicles } = route.params;

  const id = vehicles.map((item) => item.d_vehicle_id);

  // console.log("id",id);

  const { vehicleIdTrip, isSuccess, isError, message } = useSelector(
    (state) => state.vehicles
  );

  // console.log("number",vehicleIdTrip[1].data)
  // console.log("number",flatTrips)

  const flatTrips =
    vehicleIdTrip !== undefined
      ? vehicleIdTrip.flatMap((item) => item.data)
      : null;

  const pendingTrips =
    vehicleIdTrip !== undefined && flatTrips !== null
      ? flatTrips.filter((item) => item.d_status === "pending")
      : null;
  const acceptedTrips =
    vehicleIdTrip !== undefined && flatTrips !== null
      ? flatTrips.filter((item) => item.d_status === "accept")
      : null;

  const revpending= pendingTrips !== null ? pendingTrips.reverse():null;
  const revaccepted= acceptedTrips !== null ? acceptedTrips.reverse():null;

  // const acceptedTrips=null;
  // console.log("number",pendingTrips)

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(vehicleIdTrips(id));
  }, []);

  const FirstRoute = () => {
    return (
      <View style={style.listSpacing}>
        {pendingTrips !== null ? (
          <FlatList
          contentContainerStyle={style.contentContainerStyle}
            data={pendingTrips}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.d_id}
            renderItem={({ item }) => (
              <>
                <ListedCarItem
                  from="trips"
                  vehicleId={item.d_vehicle_id}
                  tripId={item}
                />
              </>
            )}
          />
        ) : null}
      </View>
    );
  };
  const SecondRoute = ({ route }) => {
    return (
      <View style={style.listSpacing}>
        {acceptedTrips !== null ? (
          <FlatList
           contentContainerStyle={style.contentContainerStyle}
            data={acceptedTrips}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.d_id}
            renderItem={({ item }) => (
              <>
                <ListedCarItem
                  from="trips"
                  vehicleId={item.d_vehicle_id}
                  tripId={item}
                />
              </>
            )}
          />
        ) : null}
      </View>
    );
  };

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Pending" },
    { key: "second", title: "Approved" },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      inactiveColor={"rgba(26, 50, 30, 0.34)"}
      activeColor={"#1A321E"}
      indicatorStyle={{ backgroundColor: "#1A321E" }}
      style={{ backgroundColor: "#FAFAF5" }}
    />
  );

  return (
    <>
      <SafeArea>
        <View style={style.contianer}>
          <View style={style.tabHeader}>
            <BackArrow />
            <Text style={style.tabHeaderText}>Trip Request</Text>
          </View>
          <View style={{ height: screenHeight }}>
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width: layout.width }}
              indicatorStyle={{ backgroundColor: "white" }}
              renderTabBar={renderTabBar}
              style={{ borderBottom: "none" }}
            />
          </View>
        </View>
      </SafeArea>
    </>
  );
}

const style = StyleSheet.create({
  tabHeader: {
    paddingTop: "7%",
    paddingBottom: "10%",
    paddingLeft: 22,
    flexDirection: "row",
    backgroundColor: "#FAFAF5",
  },

  contianer: {
    height: screenHeight,
  },

  tabHeaderText: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: "auto",
    marginRight: "43%",
  },
  listSpacing: {
    height: screenHeight,
    backgroundColor: "#FAFAF5",
    // paddingBottom: normalize(200),
  },
  contentContainerStyle:{
      paddingBottom: normalize(210),
  }
});
