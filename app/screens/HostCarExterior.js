import { View, Text, StyleSheet, Pressable,ScrollView,Dimensions } from "react-native";
import React ,{useState,useEffect}from "react";
import { Icon, Button } from "@rneui/themed";
import { useNavigation ,useIsFocused} from "@react-navigation/native";
import BackArrow from "../components/BackArrow";
import SafeArea from "../components/SafeArea";
import ButtonLong from "../components/ButtonLong";
import ActivityLoader from "../components/ActivityLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScrollV from "../components/ScrollV";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function HostCarExterior() {

  const IsFocused= useIsFocused();

  const [loading, setLoading] = useState(false);
  const [front, setFront] = useState(null);
  const [back, setBack] = useState(null);
  const [right, setRight] = useState(null);
  const [left, setLeft] = useState(null);
  

  const storage = async () => {
    if(IsFocused){
      const frontViewImage = await AsyncStorage.getItem("front_view_image");
      const backViewImage = await AsyncStorage.getItem("back_view_image");
      const rightSideImage = await AsyncStorage.getItem("right_side_image");
      const leftSideImage = await AsyncStorage.getItem("left_side_image");
    setFront(frontViewImage);
    setBack(backViewImage);
    setRight(rightSideImage);
    setLeft(leftSideImage);
    }
}

const onPress = () => {
  setLoading(true);
  navigation.navigate("HostCarInterior");
  setLoading(false);
};
  useEffect(() => {
    
    IsFocused && storage();
  }, [IsFocused]);


  const navigation = useNavigation();
  return (
    <SafeArea>
      <View style={style.approveContainer}>
        <ScrollV>
        <BackArrow />

        <View style={style.ApprovedToDrive}>
          <Text style={style.ApprovedToDriveText}>Upload Images Of The{"\n"}Exteriors Of Your Car</Text>
          <Text style={style.ApprovedToDriveText2}>
            We will need you to provide these images{"\n"}
            of your car
          </Text>
        </View>
        <View style={[style.number, style.approvedBorder]}>
          <Pressable
            onPress={() =>
              navigation.navigate("CarPartUpload", {
                header: "Upload an Image Of The\nFront View",
                subtext: "Please upload a clear Image of the\nFront View ",
                checkPhoto: "front_view_image",
                routing:"HostCarExterior"
              })
            }
            style={[style.wrapping]}
          >
            <Text style={[style.numberText, style.approvedBorderText]}>
              Front View{" "}
            </Text>
            {
              front?
            <Icon
              style={style.iconType}
              name='checkmark-done-outline'
              color="#1A321E"
              type="ionicon"
            />:null
              }
          </Pressable>
        </View>

        <Pressable
          style={[style.liscence, style.approvedBorder, style.wrapping]}
          onPress={() =>
            navigation.navigate("CarPartUpload", {
              header: "Upload an Image Of The\nBack View",
              subtext: "Please upload a clear Image of the\nBack View",
              checkPhoto:"back_view_image",
              routing:"HostCarExterior"
            })
          }
         
        >
          <Text style={[style.liscenceText, style.approvedBorderText]}>
            Back View
          </Text>
          {
              back ?
            <Icon
              style={style.iconType}
              name='checkmark-done-outline'
              color="#1A321E"
              type="ionicon"
            />:null
              }
        </Pressable>

        <Pressable
          style={[style.liscence, style.approvedBorder,  style.wrapping]}
          onPress={() =>
            navigation.navigate("CarPartUpload", {
              header: "Upload an Image Of The\nRight Side View ",
              subtext: "Please upload a clear Image of the Right\nSide View",
              checkPhoto:"right_side_image",
              routing:"HostCarExterior"
              
            })
          }
        >
          <Text style={[style.liscenceText, style.approvedBorderText]}>
            Right Side View{" "}
          </Text>
          {
              right?
            <Icon
              style={style.iconType}
              name='checkmark-done-outline'
              color="#1A321E"
              type="ionicon"
            />:null
              }
        </Pressable>

        <Pressable
          style={[style.liscence, style.approvedBorder,style.wrapping]}
          onPress={() =>
            navigation.navigate("CarPartUpload", {
              header: "Upload an Image Of The\nLeft Side View",
              subtext: "Please upload a clear Image of the Left\nSide View",
              checkPhoto:"left_side_image",
              routing:"HostCarExterior"
            })
          }
        >
          <Text style={[style.liscenceText, style.approvedBorderText]}>
            Left Side View
          </Text>
          {
              left?
            <Icon
              style={style.iconType}
              name='checkmark-done-outline'
              color="#1A321E"
              type="ionicon"
            />:null
              }
        </Pressable>

        <View style={style.buttonContainer}>
        {loading ? (
            <ActivityLoader spacing={style.spacing} />
          ) : (
            <ButtonLong
              title="Next"
              disabled={
                front===null || back===null || right===null || left===null
              }
              buttonExternal={[style.spacing]}
              onPress={onPress}
            />
          )}
        
        </View>
        </ScrollV>
      </View>
    
    </SafeArea>
  );
}

 const style = StyleSheet.create({
  approveContainer: {
    backgroundColor: "#FAFAF5",
    height: screenHeight,
    width: screenWidth,
    paddingLeft: 22,
    
  },

  ApprovedToDrive: {
    marginTop: 20,
  },

  ApprovedToDriveText: {
    fontSize: 26,
    fontWeight: "bold",
  },
  ApprovedToDriveText2: {
    fontSize: 16,
    fontWeight: "400",
  },

  number: {
    marginTop: 44,
  },

  approvedBorder: {
    marginBottom: 22,
    width: screenWidth *0.9,
    backgroundColor: "#fff",
    paddingLeft: 18,
    paddingRight:10,
    paddingTop: 22,
    paddingBottom: 22,
    borderRadius: 10,
  },

  approvedBorderText: {
    fontSize: 16,
    fontWeight: "500",
  },

  wrapping: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    marginTop:screenHeight * 0.05,
    paddingRight: 22,
  },
  button: {
    backgroundColor: "#7BB66D",
    borderRadius: 25,
  },
});
