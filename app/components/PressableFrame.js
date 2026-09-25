import { StyleSheet,Text,Pressable,View} from 'react-native'
import React from 'react'
import {Icon} from "@rneui/themed";
export default function PressableFrame({children,...props}) {
  return (
    <Pressable {...props} >
      {children}
    </Pressable>
  )
}

const style= StyleSheet.create({

})