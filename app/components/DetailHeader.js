import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import { Icon, Button } from "@rneui/themed";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import normalize from 'react-native-normalize';
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function DetailHeader(props) {
  const {
    front_view_image,
    back_view_image,
    right_side_image,
    left_side_image,
    dashboard_view_image,
    trunk_view_image,
    back_seat_image,
    front_seat_image,
    vehicle_make,
    price,
    onPress,
  } = props;
  const navigation = useNavigation();

  const imgSlide = [
    {
      id:1,
      img: front_view_image,
    },

    {
      id:2,
      img: back_view_image,
    },

    {
      id:3,
      img: right_side_image,
    },

    {
      id:4,
      img: left_side_image,
    },

    {
      id:5,
      img: dashboard_view_image,
    },

    {
      id:6,
      img: front_seat_image,
    },

    {
      id:7,
      img: back_seat_image,
    },

    {
      id:8,
      img: trunk_view_image,
    },
  ];

  return (
    <View style={style.headerContainer}>
      <View style={style.iconContainer}>
        <Icon
          onPress={() => navigation.goBack()}
          name="chevron-back-circle-outline"
          type="ionicon"
        />
      </View>
      <FlatList
            data={imgSlide}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) =>  
             (
            <View style={style.imageContainer}>
            <Image source={{ uri:item.img }} style={style.imageHeader} />
            </View>
             )
          }
          />
     
     
      <Text style={style.textDetail1}>{vehicle_make}</Text>
      <View style={style.textPrice}>
        <Text style={style.textDetail2}>{price}/</Text>
        <Text style={style.textDetail2_1}>Day</Text>
      </View>
      <Text onPress={onPress} style={style.textDetail3}>
        Rent Vehicle
      </Text>
    </View>
  );
}

const style = StyleSheet.create({
  iconContainer: {
    marginBottom: normalize(30),
    alignItems: "flex-start",
  },
  containerImage:{
  marginTop:normalize(50),
  paddingHorizontal:normalize(20)
  },

  headerContainer: {
    paddingTop: screenHeight * 0.05,
    paddingLeft: screenWidth * 0.05,
    paddingRight: screenWidth * 0.05,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: "#fff",
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    paddingBottom: screenHeight * 0.05,
  },
  imageHeader: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.35,
    borderRadius: 16,
  },
  imageDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: screenHeight * 0.02,
  },

  textDetail1: {
    fontSize: screenHeight * 0.025,
    marginTop: screenHeight * 0.03,
  },
  textPrice: {
    flexDirection: "row",
  },
  textDetail2: {
    fontSize: screenHeight * 0.028,
    fontWeight: "700",
    color: "#7BB66D",
  },
  textDetail2_1: {
    fontSize: screenHeight * 0.02,
    color: "#7BB66D",
    marginTop: screenHeight * 0.01,
  },
  textDetail3: {
    fontSize: screenHeight * 0.02,
    textDecorationLine: "underline",
  },
});
