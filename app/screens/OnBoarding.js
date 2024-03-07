import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  SafeAreaView,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import Slide from "../components/Slide";
import Indicator from "../components/Indicator";
import ButtonSmall from "../components/ButtonSmall";
import SafeArea from "../components/SafeArea";
import { ScrollView } from "react-native-gesture-handler";
import { StackActions } from "@react-navigation/native";
import normalize from "react-native-normalize";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const slide = [
  {
    key: 1,
    title: "Rent The Best  " + "\n" + "Luxury Cars.",
    desc:
      "Choose contentment, and select  " +
      "\n" +
      " satisfaction when you need a car.",
    BackgroundImage: require("../../assets/audi.png"),
    margin: -10,
  },

  {
    key: 2,
    title: "Get The Keys  " + "\n" + "To Your Dream Car.",
    desc: "Get the keys to your dream car " + "\n" + "in just 3 steps.",
    BackgroundImage: require("../../assets/project-5.png"),

    margin: -25,
  },

  {
    key: 3,
    title: "Turn Your  " + "\n" + "Cars To Assets.",
    desc: "Let Your Cars work for you" + "\n" + " on CarGenie.",
    BackgroundImage: require("../../assets/project-3.png"),

    margin: -35,
  },

  {
    key: 4,
    title: "Experience " + "\n" + '"MAGIC ON WHEELS."',
    desc: "Your ride your choice, at  " + "\n" + "your pace and convenience.",
    BackgroundImage: require("../../assets/project-6.png"),

    margin: -40,
  },
];

export default function OnBoarding({ navigation,route }) {
  const flatListRef = useRef();

  // const {from}=route.params;

  // if(from==="delete"){
  //    Alert('Your account has been deleted');
  // }

  // const infiniteScroll = (dataList)=>{
  //   const numberOfData = dataList.length
  //   let scrollValue = 0, scrolled = 0
  //   setInterval(function() {
  //     scrolled ++
  //     if(scrolled < numberOfData){
  //     scrollValue = scrollValue + width
  //    console.log(scrollValue)
  //     }
  //     else{
  //         scrollValue = 0
  //         scrolled = 0
  //     }

  //     flatListRef.current.scrollToOffset({ animated: true, offset: scrollValue})

  // }, 3000)
  // }

  if (!slide || !slide.length) return null;

  // const [dataList,setDataList]= useState(slide);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const onViewableItemsChanged = useRef((item) => {
    const index = item.viewableItems[0].index;
    setCurrentSlideIndex(index);
  });

  //   useEffect(()=> {
  //     setDataList(slide)
  //     infiniteScroll(dataList)

  // },[])

  return (
    
      <SafeArea>
        <View style={style.container}>
          {/* <ScrollView style={style.scroll} showsVerticalScrollIndicator={false}> */}
          <View>
            <Image
              style={style.imageLogo}
              source={require("../../assets/logo.png")}
            />

            <FlatList
              ref={flatListRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              onViewableItemsChanged={onViewableItemsChanged.current}
              data={slide}
              keyExtractor={(item) => item.key.toString()}
              renderItem={({ item }) => <Slide item={item} />}
            />
            
            </View>
            <View style={style.indicatorContainer}>
              <Indicator
                currentSlideIndex={currentSlideIndex}
                indicatorCount={slide.length}
              />
            </View>

            <View style={style.buttonContainer}>
              <ButtonSmall
                title="Sign up"
                externalButtonStyle={[style.left, style.utilityButton]}
                externalContainerStyle={[
                  style.leftContainer,
                  style.utilityContainer,
                ]}
                onPress={() =>
                  navigation.dispatch(StackActions.replace("Register"))
                }
              />
              <ButtonSmall
                title="Sign in"
                externalButtonStyle={[style.right, style.utilityButton]}
                externalContainerStyle={[
                  style.rightContainer,
                  style.utilityContainer,
                ]}
                onPress={() =>
                  navigation.dispatch(StackActions.replace("Login"))
                }
              />
            </View>
          {/* </ScrollView> */}
        </View>
      </SafeArea>
    
  );
}
const { width } = Dimensions.get("window");
const style = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: screenHeight,

    //  paddingTop: normalize(20)
  },

  //  scroll:{
  //     marginBottom:screenHeight*0.08,
  //  },

  indicatorContainer: {
    marginTop:screenHeight *0.1,
    flexDirection: "row",
    justifyContent: "center",
  },

  text: {
    color: "black",
  },

  imageLogo: {
    alignSelf: "center",
    marginTop: normalize(15),
    //  height: normalize(50),
    //  width: normalize(50)
  },

  utilityContainer: {
    width: normalize(148),
  },

  utilityButton: {
    paddingVertical: normalize(16),
  },

  right: {
    backgroundColor: "#7BB66D",
  },

  left: {
    backgroundColor: "#1A321E",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: screenHeight *0.055,
  },
});
