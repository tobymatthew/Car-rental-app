import { View, Text,Image, StyleSheet,Dimensions} from "react-native";
import React, { useEffect, useState,} from "react";
import SmallProfileImage from "./SmallProfileImage";
import endPoint from "./../api/endpoint";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import normalize from "react-native-normalize"

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
export default function HostedBy({ id, from }) {
  const [hostID, setHostID] = useState(null);

  const navigation = useNavigation();

  const getHostID = async () => {
    const getAPI = `/api/get_user_by_id/${id}`;
    const response = await endPoint.get(getAPI);
    const result = JSON.stringify(response.data);
    await AsyncStorage.setItem("hostName", result);
    const hostName = await AsyncStorage.getItem("hostName");
    const hostt = JSON.parse(hostName);
    setHostID(hostt);
  };

  useEffect(() => {
    getHostID();
  }, [setHostID]);

  return (
    <View style={style.hostedByContainer}>
      <View style={style.headerTextContainer}>
        <Text style={style.headerText}>Hosted By</Text>
      </View>

      <View style={style.hostDetailContainer}>
        <View style={style.profile}>

          { hostID && 
           <>
          {hostID.data.d_profile_photo === null ? (
            <SmallProfileImage />
          ) : (
            <Image
              source={{ uri: hostID.data.d_profile_photo }}
              style={{
                width: screenWidth * 0.11,
                height: screenHeight * 0.05,
                borderRadius: 360,
                marginRight:normalize(10),
              }}
            />
          )}
          </>
            }

        </View>

        <View style={style.hostDetail}>
          <Text style={style.hostDetailText}>
            {hostID && <Text>{hostID.data.d_first_name}</Text>}{" "}
            {hostID && (
              <Text style={style.hostDetailText2}>
                {hostID.data.d_last_name}
              </Text>
            )}
          </Text>

          {/* <View>
            <Text style={style.hostRatingText}>5 Stars</Text>
          </View> */}

          <Text
            onPress={() =>
              navigation.navigate("HostProfile", {
                id: id,
                hostID: hostID,
                from: from,
              })
            }
            style={style.viewHostLink}
          >
            view host
          </Text>
        </View>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  hostedByContainer: {
    paddingLeft: 22,
  },

  headerTextContainer: {
    paddingBottom: 16,
  },

  headerText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A321E",
  },

  hostDetailContainer: {
    flexDirection: "row",
    paddingBottom: 10,
  },

  hostImageContainer: {
    marginRight: 16,
  },

  hostImage: {
    backgroundColor: "#D9D9D9",
    width: 50,
    height: 50,
    borderRadius: 360,
  },

  hostDetailText: {
    fontSize: 16,
    paddingRight: 20,
  },

  hostDetailText2: {
    marginLeft: 4,
  },

  hostRatingText: {
    fontSize: 12,
  },

  viewHostLink: {
    textDecorationLine: "underline",
  },
});
