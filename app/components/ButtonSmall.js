import { View,StyleSheet } from 'react-native'
import React from 'react'
import { Button } from "@rneui/themed";
import { styleProps } from 'react-native-web/dist/cjs/modules/forwardedProps';

export default function ButtonSmall({title,externalButtonStyle,externalContainerStyle,...props}) {
  return (
    <View>
      <Button title={title}
               buttonStyle={[externalButtonStyle,style.buttonStyle]}
               containerStyle={externalContainerStyle}
               {...props}
      />
    </View>
  )
}

 const style = StyleSheet.create({

    buttonStyle: {
      
      borderRadius: 25,
    }

 })