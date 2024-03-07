import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  getIndieNotificationInbox,
  deleteIndieNotificationInbox,
} from "native-notify";
import { useSelector } from "react-redux";
import SafeArea from "../components/SafeArea";
import { Icon } from "@rneui/themed";
import normalize from "react-native-normalize";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function Notifications() {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const { user } = useSelector((state) => state.auth);

 

  const getNotification = async () => {
    let notifications = await getIndieNotificationInbox(
      `${user.data.d_user_id}`,
      6250,
      "LUS7EDr5M1t7jkbtr48QDw"
    );
    console.log("notifications: ", notifications);
    setData(notifications);
  };

 

  useEffect(() => {
    getNotification();
 
  }, []);

 
  return (
    <SafeArea>
      <View style={style.container}>
        <View style={style.OrderSummaryTab}>
          <Icon
            onPress={() => navigation.goBack()}
            name="chevron-back-circle-outline"
            type="ionicon"
          />
          <Text style={style.OrderSummaryTabText}>Notifications</Text>
        </View>
        <View style={style.notificationsContainer}>

          <FlatList
           showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={(item) => item.notification_id}
            renderItem={({ item }) => {
              return (
                <View style={style.notificationContainer}>
                  <Text style={style.notificationHeader}>
                    {item.title}
                  </Text>

                  <Text style={style.notificationBodyText}>
                    {item.message}
                  </Text>
                  <Text style={style.notificationDate}>{item.date}</Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    </SafeArea>
  );
}

const style = StyleSheet.create({
  container: {
    height: screenHeight,
    width: screenWidth,
    backgroundColor: "#FAFAF5",
    paddingHorizontal: screenWidth * 0.05,
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

  notificationsContainer: {
    marginTop: screenHeight * 0.05,
  },
  notificationContainer: {
    paddingBottom: screenHeight * 0.01,
    paddingTop: screenHeight * 0.01,

    borderBottomWidth: 2,
    borderBottomColor: "#E6E6E6",
  },

  notificationHeader: {
    fontWeight: "bold",
    marginBottom: screenHeight * 0.003,
    marginTop: screenHeight * 0.006,
    fontSize: normalize(20),
  },
  notificationBodyText: {
    color: "rgba(0, 0, 0, 0.65)",
    fontSize:  normalize(16),
    marginBottom: screenHeight * 0.003,
  },

  notificationDate: {
    color: "#929292",
  },
});
