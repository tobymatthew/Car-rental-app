import { View, Text, StyleSheet,FlatList,Dimensions} from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function Features(props) {
  const {
    is_bluetooth,
    is_wheel_chair,
    is_gps,
    is_bike,
    is_child,
    is_back_camera,
    is_navigation,
    is_keyless,
    is_usb,
    is_heated,
  } = props;
  data = [
    {
      id: 1,
      name: "gps",
      icon: "ios-locate-outline",
      type: "ionicon",
      condition: is_gps ? is_gps : null,
    },

    {
      id: 2,
      name: "Wheelchair" + "\n" + "Accessible",
      icon: "wheelchair",
      type: "font-awesome",
      condition: is_wheel_chair ? is_wheel_chair: null,
    },

    {
      id: 3,
      name: "Bike Rack",
      icon: "bicycle",
      type: "font-awesome",
      condition: is_bike ? is_bike : null,
    },

    {
      id: 4,
      name: "Child Seat",
      icon: "car-child-seat",
      type: "material-community",
      condition: is_child ? is_child: null,
    },

    {
      id: 5,
      name: "Backup " + "\n" + " Camera",
      icon: "flip-camera-android",
      type: "material",
      condition: is_back_camera ? is_back_camera: null,
    },

    {
      id: 6,
      name: "Bluetooth",
      icon: "bluetooth-sharp",
      type: "ionicon",
      condition: is_bluetooth ? is_bluetooth: null,
    },

    {
      id: 7,
      name: "Keyless" + "\n" + "Entry",
      icon: "key-wireless",
      type: "material-community",
      condition: is_keyless ? is_keyless: null,
    },

    {
      id: 8,
      name: "Navigation"+ "\n" + " System",
      icon: "ios-navigate",
      type: "ionicon",
      condition: is_navigation ? is_navigation: null,
    },

    {
      id: 9,
      name: "USB Input",
      icon: "usb-port",
      type: "material-community",
      condition: is_usb ? is_usb: null,
    },

    {
      id: 10,
      name: "Heated "+ "\n" + " Seats",
      icon: "car-seat-heater",
      type: "material-community",
      condition: is_heated ? is_heated: null,
    },
  ];

  return (
    <View style={style.featureContainer}>
      
      <View style={style.featureTextContainer}>
        <Text style={style.featureText}>Features</Text>
      </View>
    
     
      <FlatList
       data={data}
       horizontal
       showsHorizontalScrollIndicator={false}
       keyExtractor={(item) => item.id.toString()}
       renderItem={({item})=> item.condition &&
       
       (

         
          
        <View style={style.featureCardContainer}>
        
          <View style={style.featureCard}>
            <Icon name={item.icon} type={item.type} />
          </View>
          <Text style={style.featureCardText}>{item.name}</Text>
        
      </View>
        
       )}
       
      />
    
   
         

      
    </View>
  );
}

const style = StyleSheet.create({
  featureContainer: {
    paddingTop: screenHeight *0.05,
    paddingLeft: screenWidth * 0.05,
  },

  featureTextContainer: {
    marginBottom: 16,
  },

  featureText: {
    fontSize: 18,
    fontWeight: "700",
  },

  featureCardContainer: {
    marginRight: screenWidth*0.06,
  },

  featureCard: {
    backgroundColor: "#fff",
    borderRadius: 5.33,
    padding: screenWidth*0.05,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: screenWidth* 0.001,
    shadowRadius:  1.3,
    
    elevation: 2,

    marginBottom: 3,
  },

  featureCardText:{
    textAlign:"center",
  }
});
