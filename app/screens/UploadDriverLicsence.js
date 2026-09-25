import {View,Text,Image} from "react-native";
import React from "react";

export default function UploadDriverLicsence() {
  return (
    <View>
      <View>
        <Text>UploadDriverLicsence</Text>
        <Text>
          Please upload your drivers liscence to get approved to drive
        </Text>
      </View>

      <View>
       <Image source={require("../../assets/IdentificationCard.png")}/>
      </View>

      <View> <Text>Take Image </Text> </View>
      <View> <Text>Upload from Gallery </Text> </View>

  
    </View>
  );
}
