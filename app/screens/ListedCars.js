import * as React from "react";
import {
  View,
  useWindowDimensions,
  Text,
  StyleSheet,
  FlatList,
  Dimensions
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import BackArrow from "../components/BackArrow";
import ListedCarItem from "../components/ListedCarItem";
import SafeArea from "../components/SafeArea";
import normalize from "react-native-normalize";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const ListedCars = ({ route }) => {
  const { vehicles } = route.params;

  const ApproveVehicle = vehicles.length !==0 ? vehicles.filter(vehicle => vehicle.d_approved_for_listing===1):null;
  const pendingVehicle= vehicles.length !==0 ? vehicles.filter(vehicle => vehicle.d_approved_for_listing===0):null

  const FirstRoute = () => {
    return (
      <View
      style={style.listSpacing}
      >
        <FlatList
          contentContainerStyle={style.contentContainerStyle}
          data={pendingVehicle}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.d_id}
          renderItem={({ item }) => (
            <ListedCarItem
              from="listedCars"
              vehicleId={item.d_vehicle_id}
              tripId={item}
            />
          )}
        />
      </View>
    );
  };
  const SecondRoute = ({ route }) => {
    return (
      <View
      style={style.listSpacing}
      >
        <FlatList
           contentContainerStyle={style.contentContainerStyle}
          data={ApproveVehicle}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.d_id}
          renderItem={({ item }) => (
            <ListedCarItem
              from="listedCars"
              vehicleId={item.d_vehicle_id}
              tripId={item}
            />
          )}
        />
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
      <SafeArea></SafeArea>
      <View style={style.tabHeader}>
        <BackArrow />
        <Text style={style.tabHeaderText}>Listed Cars</Text>
      </View>
      <View style={{ height: "100%" }}>
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
    </>
  );
};

const style = StyleSheet.create({
  tabHeader: {
    paddingTop: "7%",
    paddingBottom: "10%",
    paddingLeft: 22,
    flexDirection: "row",
    backgroundColor: "#FAFAF5",
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
    // paddingBottom: normalize(272)
  },
  contentContainerStyle:{
    paddingBottom: normalize(210),
}
});

export default ListedCars;
