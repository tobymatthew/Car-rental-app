import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { Icon,Button} from "@rneui/themed";

export default function PaymentDetails({navigation}) {
  return (
    <View style={style.PaymentDetailsContainer}>
      <View style={style.PaymentDetailsHeader}>
      <Icon
          onPress={() => navigation.navigate("RentDetails")}
          name="chevron-back-circle-outline"
          type="ionicon"
        />
        <Text style={style.PaymentDetailsHeaderText}>Payment Details</Text>
      </View>

      <View style={style.headerDetails}>
        {/* <Image source={require("../../assets/range.png")} /> */}
        <View style={style.headerDetailsInfo}>
          <Text style={style.headerDetailsInfoText1}>Blue Cordi Jeep</Text>

          <View style={style.headerDetailsInfoPrice}>
            <Text style={style.headerDetailsInfoText2}>N10,000/</Text>
            <Text style={style.headerDetailsInfoText3}>Day</Text>
          </View>
        </View>
      </View>
      <View style={[style.number, style.approvedBorder]}>
          <Text style={[style.numberText, style.approvedBorderText]}>
            Pay With Bank Transfer
          </Text>
        </View>
        <View style={[style.liscence, style.approvedBorder]}>
          <Text style={[style.liscenceText, style.approvedBorderText]}>
            Pay With Card
          </Text>
        </View>

        <View style={style.buttonContainer}>
        <Button
          onPress={() => navigation.navigate("HostContact")}
          title="Pay"
          buttonStyle={[style.button]}
          titleStyle={style.titleStyle}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({

  PaymentDetailsContainer:{
    backgroundColor:"#f8f8ff",
    flex:1,
    paddingLeft:22
  },

   PaymentDetailsHeader:{
    flexDirection:"row",
    marginTop:50,
   },

   PaymentDetailsHeaderText:{
      marginLeft:100,
      fontSize:20
   },

  headerDetails: {
    flexDirection: "row",
    marginTop: 43,
    paddingRight: 24,
  },

  headerDetailsInfo: {
    marginLeft: 20,
  },
  headerDetailsInfoText1: {
    fontSize: 20,
    color: "#000",
  },

  headerDetailsInfoPrice: {
    flexDirection: "row",
  },

  headerDetailsInfoText2: {
    fontSize: 22,
    color: "#7BB66D",
    fontWeight: "700",
  },

  headerDetailsInfoText3: {
    fontSize: 16,
    color: "#7BB66D",
    marginTop: 8,
    fontWeight: "600",
  },
  number:{
    marginTop:44
},

approvedBorder:{

// marginRight:20,
marginBottom:22,
width:320,
backgroundColor:"#fff",
paddingLeft:18,
paddingRight:89,
paddingTop:22,
paddingBottom:22,
borderRadius:8,  
},

approvedBorderText:{
fontSize:16
},
buttonContainer:{
  marginTop:60,
  paddingRight:22
 },

 button: {
   marginTop: 20,
   backgroundColor: "#7BB66D",
   borderRadius: 25,
   height: 50,
 },
});
