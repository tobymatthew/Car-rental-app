import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { Icon, Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import normalize from 'react-native-normalize';
export default function BackArrow({...props}) {
  const navigation = useNavigation();

 

  return (
    <View style={[style.iconContainer,{...props}]}  >
          <Icon
            onPress={() => navigation.goBack()}
            name="chevron-back-circle-outline"
            type="ionicon"
            size= {28}
           
          />
    </View>
  )
}



const style= StyleSheet.create({
    iconContainer: {
        alignItems: "flex-start",
        fontSize: normalize(50)
      },
})