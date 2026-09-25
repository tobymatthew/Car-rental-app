import { View, Text, SafeAreaView,Platform, StatusBar } from 'react-native'
import React from 'react'

export default function SafeArea({children}) {
  return (
    <SafeAreaView style={{ backgroundColor: "#1A321E",paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}}>
      {children}
    </SafeAreaView>
  )
}