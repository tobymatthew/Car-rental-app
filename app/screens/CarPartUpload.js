import { View, Text } from 'react-native'
import React from 'react'
import CarUpload from '../components/CarUpload';
import SafeArea from '../components/SafeArea';
export default function CarPartUpload({route}) {
  const  { header,subtext,checkPhoto,routing}= route.params
  return (
    <View>
     
      <CarUpload header={header} subtext={subtext} checkPhoto={checkPhoto} routing={routing}/>
 
      
    </View>
  )
}

