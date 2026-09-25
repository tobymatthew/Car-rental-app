import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useEffect } from "react";
import AvailableCarsItem from "../components/AvailableCarsItem";
import DisplayHeader from "../components/DisplayHeader";

// q4qrtc
export default function Home() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor:"#1A321E"}}>
    
      <View style={style.container}> 
      <ScrollView showsVerticalScrollIndicator={false}>
      <DisplayHeader/>
      <AvailableCarsItem />
      </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#FAFAF5",
    height: "100%"
    
  },
});
