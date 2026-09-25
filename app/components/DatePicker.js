import {
  View,
  Text,
  StyleSheet,
  Platform,
  Button,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import "react-native-gesture-handler";
import React, { useState, useRef } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Icon } from "@rneui/themed";
import SafeArea from "./SafeArea";
import ButtonLong from "./ButtonLong";
import { useNavigation } from "@react-navigation/native";
import normalize from "react-native-normalize";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function DatePicker({ price, name, front, vehicleId, drop,vUserId}) {
  const navigation = useNavigation();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [pickupDate, setPickUpDate] = useState(null);
  const [pickup, setPickUp] = useState(new Date());
  const [dropOff, setdropOff] = useState(new Date());

  const [dropUpDate, setDropUpDate] = useState(null);
  const [pickUpTime, setPickUpTime] = useState(null);
  const [dropTime, setDropTime] = useState(null);

  const [total, setTotal] = useState(parseInt(price));
  const [change, setChange] = useState();

  const onPickup = (date) => {
    setPickUpDate(date);
    hideDatePicker();
    setPickUp(date);
  };

  const onDropoff = (date) => {
    setDropUpDate(date);
   hideDatePicker();
    setdropOff(date);
    setTotal(totalPrice);
};

  const onPicktime = (date) => {
   
    hideDatePicker();
    setPickUpTime(date);
  };

  const onDropTime = (date) => {
   
    hideDatePicker();
    setDropTime(date);
  };

  const showMode = (currentMode, onchange) => {
    setDatePickerVisibility(true);
    setMode(currentMode);
    setChange(onchange);
  };

    const handleConfirm = (date) => {
      console.log("A date has been picked: ", date);
      setPickUpDate(date);
    hideDatePicker();
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  let duration = Math.abs(pickup - dropOff);
  let getduration = Math.ceil(duration / (1000 * 60 * 60 * 24));
 
  const durationInDays = getduration + 1;
 
  const priceNumber = parseInt(price.replace(',', ''), 10);
 
  const totalPrice = durationInDays * priceNumber;

  console.log(priceNumber);



 

  
  const onPress = () => {
    navigation.navigate("OrderSummary", {
      price: price,
      pickup: pickupDate.toLocaleDateString("es-CL"),
      dropOff:dropUpDate.toLocaleDateString("es-CL"),
      total: totalPrice,
      front: front,
      name: name,
      duration: durationInDays,
      vId: vehicleId,
      vUserId:vUserId
    });
  };

  return (
    <View style={style.detailTimeContainer}>
      <View style={style.detailTime}>
        <TouchableOpacity
          style={style.detailDatePicker}
          onPress={() => showMode("date", "pickUp")}
        >
          <Text style={style.detailDatePickerText}>{ pickupDate ? pickupDate.toLocaleDateString("es-CL") : 'Pick Up Date'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={style.detailDatePicker}
          onPress={() => showMode("time", "pickTime")}
        >
          <Text style={style.detailTimePickerText}>{pickUpTime ? pickUpTime.toLocaleTimeString("es-CL"):'Pick Up Time'}</Text>
        </TouchableOpacity>
      </View>

      <View style={style.detailTime}>
        <TouchableOpacity
          style={style.detailDatePicker}
          onPress={() => {
            showMode("date", "dropDate");
            // setTotal(totalPrice);
          }}
        >
          <Text>{dropUpDate ? dropUpDate.toLocaleDateString("es-CL"):'Drop Off Date' }</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={style.detailDatePicker}
          onPress={() => {
            showMode("time", "dropOff");
          }}
        >
          <Text>{dropTime ? dropTime.toLocaleTimeString("es-CL"):'Drop Off Time'}</Text>
        </TouchableOpacity>
      </View>

      {change === "pickUp" && (
        <DateTimePickerModal
         
          isVisible={isDatePickerVisible}
          mode={mode}
          onConfirm={onPickup}
          onCancel={hideDatePicker}
          style={style.dateModal} 
          
          // minimumDate={new Date()}
        />
      )}

      {change === "dropDate" && (
        <DateTimePickerModal
          // testID="DateTimePickerModal"
          isVisible={isDatePickerVisible}
          value={date}
          mode={mode}
          is24Hour={false}
          onConfirm={onDropoff}
          onCancel={hideDatePicker}
          style={style.dateModal} 
          
        />
      )}

      {change === "dropOff" && (
        <DateTimePickerModal
          // testID="DateTimePickerModal"
          isVisible={isDatePickerVisible}
          // value={date}
          mode={mode}
          is24Hour={false}
          onConfirm={onDropTime}
          onCancel={hideDatePicker}
          style={style.dateModal} 
        />
      )}
      <View>
        {change === "pickTime" && (
          <DateTimePickerModal
            // testID="DateTimePickerModal"
            isVisible={isDatePickerVisible}
            value={date}
            mode={mode}
            is24Hour={false}
            onConfirm={onPicktime}
            onCancel={hideDatePicker}
            style={style.dateModal} 
          />
        )}
      </View>

      <View>
        <View style={style.detailDescription}>
          <Text style={style.detailDescriptionTextHeader}>
            Pick Up Location
          </Text>
          <Text style={style.detailDescriptionText}>{drop}</Text>
        </View>
{/* 
        <View>
          <View style={style.distance}>
            <Text style={[style.distanceText, style.distanceText1]}>
              Distance Included
            </Text>
            <Text style={[style.distanceText, style.distanceText2]}>
              1050km
            </Text>
          </View>
          <Text style={style.distanceText3}>
            N1000/mi fee for additional miles driven
          </Text>
          <Text style={style.distanceText4}>Insurance and Protection</Text>
        </View> */}

        <View style={style.fee}>
          <View style={style.feeDetail}>
            <Text style={style.feeDetailText1}>Total Fee</Text>
            <Text style={style.feeDetailText2}>{durationInDays} day</Text>
            <View style={style.feeDetailPrice}>
              <Text style={style.feeDetailText3}>{price}/</Text>
              <Text style={style.feeDetailText4}>day</Text>
            </View>
          </View>

          <View style={style.feePrice}>
            <Text style={style.feePriceText}>N{totalPrice.toLocaleString()}</Text>
          </View>
        </View>
      </View>
      <View style={style.detailButton}>
        <ButtonLong
          onPress={onPress}
          disabled={
            !pickupDate ||
            !dropUpDate ||
           !pickUpTime ||
            !dropTime
          }
          title="Continue"
          buttonExternal={[style.buttonExternal]}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  detailTimeContainer: {
    marginTop: 38,
    marginLeft: 10,
    marginRight: 10,
  },

  // dateContainer:{
  //   backgroundColor: "grey",
  //   marginTop:50,
  //   height: screenHeight ,
  //   width: screenWidth
  // },

  // picker:{
  //   marginTop: screenHeight * 0.1,
  // },

  detailTime: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  detailDatePicker: {
    borderWidth: normalize(2),
    borderColor: "#F2F2F2",
    backgroundColor: "#F2F2F2",
    width: screenWidth * 0.46,
    borderRadius: 25,
    padding: 12,
    paddingLeft: screenWidth * 0.09,
    marginBottom: screenHeight * 0.025,
  },

  detailTimePicker: {
    borderWidth: 1,
    borderColor: "#F2F2F2",
    backgroundColor: "#F2F2F2",
    borderRadius: 25,
    paddingLeft: 24,
    padding: 12,
    paddingRight: 76,
    marginLeft: 20,
    marginBottom: 20,
  },

  detailDescription: {
    borderWidth: 1,
    borderColor: "#7BB66D",
    backgroundColor: "#fff",
    marginTop: normalize(38),
    marginLeft: normalize(22),
    marginRight: normalize(22),
    paddingHorizontal: normalize(17),
    paddingBottom: normalize(20),
    borderRadius: normalize(8),
  },

  dateModal:{
    width: screenWidth * 0.9,
    height: screenHeight * 0.2,
   },

  dateModalText:{
    color: "#000000"
  },

  detailDescriptionTextHeader: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginTop: 12,
    marginBottom: 5,
  },

  detailDescriptionText: {
    fontSize: 14,
  },

  distance: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 38,
    paddingHorizontal: 26,
  },
  distanceText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  distanceText2: {
    marginRight: 22,
  },

  distanceText3: {
    color: "rgba(0, 0, 0, 0.19)",
    fontSize: 14,
    marginLeft: 26,
  },
  distanceText4: {
    fontSize: 16,
    marginLeft: 26,
    marginTop: 16,
    fontWeight: "bold",
  },

  fee: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    marginTop: 22,
    paddingLeft: 22,
    paddingTop: 12,
    paddingBottom: 12,
  },

  feeDetailText1: {
    fontSize: 18,
  },
  feeDetailText2: {
    fontSize: 12,
    color: "#7BB66D",
    fontWeight: "600",
  },

  feeDetailPrice: {
    flexDirection: "row",
  },

  feeDetailText3: {
    fontSize: 14,
  },

  feeDetailText4: {
    fontSize: 10,
    marginTop: 5,
  },

  feePrice: {
    backgroundColor: "#7BB66D",
    paddingRight: screenWidth * 0.05,
    height: 46,
    paddingTop: 10,
    paddingLeft: 16,
    paddingRight: 10,
    paddingBottom: 7,
    borderBottomLeftRadius: 15.28,
    borderTopLeftRadius: 15.28,
    marginTop: 12,
  },

  feePriceText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },

  detailButton: {
    marginTop: 22,
    marginBottom: 32,
    paddingLeft: 22,
    paddingRight: 22,
    paddingTop: 12,
    paddingBottom: 12,
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingTop: normalize(30),
    borderRadius: 20,
    elevation: 20,
  },
  iconCancel: {
    alignItems: "flex-end",
  },
});
