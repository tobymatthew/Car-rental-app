import React, { useEffect } from "react";
import {
  View,
  useWindowDimensions,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import BackArrow from "../components/BackArrow";
import ListedCarItem from "../components/ListedCarItem";
import SafeArea from "../components/SafeArea";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation,StackActions,useIsFocused } from "@react-navigation/native";
import { getAllTripRequest, reset } from "../redux/slice/vehicle/Vehicles";
import { ScrollView } from "native-base";
import normalize from "react-native-normalize";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function History() {
  const layout = useWindowDimensions();
  const dispatch = useDispatch();

  const IsFocused= useIsFocused();
  const { allTrips, vehicles } = useSelector((state) => state.vehicles);


  // console.log(allTrips);
   
  const paidTrips =  allTrips.length !==0  ?  allTrips.data.filter((item) => item.d_is_paid === 1) : null;
  const notPaidTrips =allTrips.length !==0  ? allTrips.data.filter((item) => item.d_is_paid === 0): null;
  const completedTrips =allTrips.length !==0 ? allTrips.data.filter((item) => item.d_completed === 1): null;
  


 const revNotPaid = notPaidTrips !== null ? notPaidTrips.reverse():null;
 const revPaid = paidTrips !== null ? paidTrips.reverse():null;
 const revCompleted = completedTrips !== null ? completedTrips.reverse():null;

 
  // console.log("reversed",revPaid)


  console.log("check",paidTrips);
  useEffect(() => {
    IsFocused && dispatch(getAllTripRequest());
    
      dispatch(reset());
  
  }, [dispatch,IsFocused]);

  const FirstRoute = () => {
    return (
      <View
      style={style.listSpacing}
      >
        { revNotPaid !== null ?
       ( <FlatList
        contentContainerStyle={style.contentContainerStyle}
          data={revNotPaid}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.d_id}
          renderItem={({ item }) => (
            <>
             
                <ListedCarItem
                  from="history"
                  vehicleId={item.d_vehicle_id}
                  tripId={item}
                />
             
            </>
          )}
        />):null}
      </View>
    );
  };

  const SecondRoute = () => {
    return (
      <View
      style={style.listSpacing}
      >
        { revPaid !==null ?
       ( <FlatList
        contentContainerStyle={style.contentContainerStyle}
          data={revPaid}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.d_id}
          renderItem={({ item }) => (
            <ListedCarItem
              from="history"
              vehicleId={item.d_vehicle_id}
              tripId={item}
            />
          )}
        />):null}
      </View>
    );
  };

  const ThirdRoute = () => {
    return (
      <View
        style={style.listSpacing}
      >
        { revCompleted!==null ?
        (<FlatList
          contentContainerStyle={style.contentContainerStyle}
          data={revCompleted}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.d_id}
          renderItem={({ item }) => (
            <>
              {item.d_completed === 1 ? (
                <ListedCarItem
                  from="history"
                  vehicleId={item.d_vehicle_id}
                  tripId={item}
                />
              ) : null}
            </>
          )}
        />):null}
      </View>
    );
  };

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Pending" },
    { key: "second", title: "Ongoing" },
    { key: "third", title: "Completed" },
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
        <Text style={style.tabHeaderText}>History</Text>
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
}

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
    paddingBottom: normalize(280),
}
});


