import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Icon } from "@rneui/themed";
import SafeArea from "./SafeArea";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { MultiSelect } from "react-native-element-dropdown";
import Button from "./ButtonLong";
import { isDate } from "moment/moment";
import { useNavigation } from "@react-navigation/native";

import { typeOfcolor, seat, vehicleNames } from "./../static/data";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function FilterModal({ vehicles }) {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [price, setPrice] = useState([0, 500000]);
  const [year, setYear] = useState([1970, 2023]);
  const [vehicleMake, setVehicleMake] = useState([]);
  const [color, setColor] = useState([]);
  const [seats, setSeats] = useState([]);

  const [car, setCar] = useState(null);
  const [suv, setSuv] = useState(null);
  const [van, setVan] = useState(null);
  const [miniVan, setMiniVan] = useState(null);
  const [truck, setTruck] = useState(null);
  const [manual, setManual] = useState(null);
  const [auto, setAuto] = useState(null);

  const isCar = () => {
    car === null ? setCar("car") : setCar(null);
  };

  const isSuv = () => {
    suv === null ? setSuv("SUV") : setSuv(null);
  };

  const isVan = () => {
    van === null ? setVan("vans") : setVan(null);
  };
  const isMiniVan = () => {
    miniVan === null ? setMiniVan("mini vans") : setMiniVan(null);
  };

  const isTruck = () => {
    truck === null ? setTruck("trucks") : setTruck(null);
  };

  const isManual = () => {
    manual === null ? setManual("manual") : setManual(null);
  };

  const isAuto = () => {
    auto === null ? setAuto("automatic") : setAuto(null);
  };

  const VehicleType = [
    {
      icon: "car-side",
      label: "Cars",
      type: "material-community",
      functions: isCar,
      state: car,
    },
    {
      icon: "car-estate",
      label: "SUVs",
      type: "material-community",
      functions: isSuv,
      state: suv,
    },
    {
      icon: "van-utility",
      label: "Mini Vans",
      type: "material-community",
      functions: isMiniVan,
      state: miniVan,
    },
    {
      icon: "van-passenger",
      label: "Vans",
      type: "material-community",
      functions: isVan,
      state: van,
    },
    {
      icon: "truck-pickup",
      label: "Trucks",
      type: "font-awesome-5",
      functions: isTruck,
      state: truck,
    },
  ];

  const filter = () => {
    const filters = [
      (vehicle) =>
        vehicleMake.length === 0 ||
        vehicleMake.some((make) => vehicle.d_vehicle_make.includes(make)),

      (vehicle) =>
        color.length === 0 ||
        color.some((make) => vehicle.d_colour.includes(make)),
      (vehicle) =>
        seats.length === 0 ||
        seats.some((seat) => seat.includes(vehicle.d_number_of_seats)),
      (vehicle) =>
        year.length === 0 ||
        (vehicle.d_year_of_make >= year[0] &&
          vehicle.d_year_of_make <= year[1]),

      (vehicle) =>
        price.length === 0 ||
        (parseInt(vehicle.d_price) >= price[0] &&
          parseInt(vehicle.d_price) <= price[1]),

      (vehicle) => manual === null || vehicle.d_transmission.includes(manual),
      (vehicle) => auto === null || vehicle.d_transmission.includes(auto),
      (vehicle) => car === null || vehicle.d_vehicle_type.includes(car),
      (vehicle) => suv === null || vehicle.d_vehicle_type.includes(suv),
      (vehicle) => miniVan === null || vehicle.d_vehicle_type.includes(miniVan),
      (vehicle) => van === null || vehicle.d_vehicle_type.includes(van),
      (vehicle) => truck === null || vehicle.d_vehicle_type.includes(truck),
    ];
    return  vehicles.length !==0 ? vehicles.filter((vehicle) =>
      filters.every((filter) => filter(vehicle))
    ) :null;
  };

  const onFilter = () => {
    // console.log(vehicleMake);
    // console.log(filter());
    // console.log(vehicles.map((vehicle) => typeof vehicle.d_year_of_make));
    navigation.navigate("SearchFilter", {
      vehicle: filter(),
      iconTrue: "iconTrue",
    });
    setIsVisible(false);
  };

  return (
    <View>
      <Modal
        visible={isVisible}
        animationType="slide"
        onRequestClose={() => setIsVisible(false)}
      >
        <SafeArea>
          <View style={style.container}>
            <ScrollView style={style.scrollContainer}>
              <TouchableOpacity onPress={() => setIsVisible(false)}>
                <Icon
                  style={style.iconCancel}
                  name="md-close-circle-outline"
                  color="#1A321E"
                  type="ionicon"
                />
              </TouchableOpacity>

              <View style={[style.sliderWrapper, style.spacing]}>
                <Text style={style.filterText}>Price Range</Text>
                <MultiSlider
                  values={price}
                  onValuesChange={setPrice}
                  min={0}
                  max={500000}
                  step={1}
                  sliderLength={300}
                  markerStyle={style.markerContainer}
                  trackStyle={style.trackStyle}
                  selectedStyle={style.selectedContainer}
                />

                <View style={style.sliderLabelWrapper}>
                  <Text style={style.sliderLabel}>N{price[0]}</Text>
                  <Text style={style.sliderLabel}>N{price[1]}</Text>
                </View>
              </View>

              <View style={[style.multiSelect, style.spacing]}>
                <Text style={style.filterText}>Vehicle Make</Text>
                <MultiSelect
                  style={style.dropdown}
                  placeholderStyle={style.placeholderStyle}
                  selectedTextStyle={style.selectedTextStyle}
                  inputSearchStyle={style.inputSearchStyle}
                  iconStyle={style.iconStyle}
                  search
                  data={vehicleNames}
                  labelField="label"
                  valueField="value"
                  placeholder="Vehicle make"
                  searchPlaceholder="Search..."
                  value={vehicleMake}
                  onChange={(item) => {
                    setVehicleMake(item);
                  }}
                />
              </View>

              <View style={[style.typeContainer, style.spacing]}>
                <Text style={style.filterText}>Vehicle Type</Text>
                <View style={style.typeWrap}>
                  {VehicleType.map((item, index) => (
                    <View key={`item-${index}`} style={style.typeVehicle}>
                      <TouchableOpacity
                        onPress={item.functions}
                        style={[
                          item.state !== null
                            ? style.typeBackgroundActive
                            : style.typeBackground,
                        ]}
                      >
                        <Icon
                          style={style.iconType}
                          name={item.icon}
                          color="#1A321E"
                          type={item.type}
                        />
                      </TouchableOpacity>
                      <Text style={style.labelText}>{item.label}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={[style.multiSelect, style.spacing]}>
                <Text style={style.filterText}>Colour</Text>
                <MultiSelect
                  style={style.dropdown}
                  placeholderStyle={style.placeholderStyle}
                  selectedTextStyle={style.selectedTextStyle}
                  inputSearchStyle={style.inputSearchStyle}
                  iconStyle={style.iconStyle}
                  search
                  data={typeOfcolor}
                  labelField="label"
                  valueField="value"
                  placeholder="Colour"
                  searchPlaceholder="Search..."
                  value={color}
                  onChange={(item) => {
                    setColor(item);
                  }}
                />
              </View>

              <View style={[style.multiSelect, style.spacing]}>
                <Text style={style.filterText}>Number Of Seats</Text>
                <MultiSelect
                  style={style.dropdown}
                  placeholderStyle={style.placeholderStyle}
                  selectedTextStyle={style.selectedTextStyle}
                  inputSearchStyle={style.inputSearchStyle}
                  iconStyle={style.iconStyle}
                  search
                  data={seat}
                  labelField="label"
                  valueField="value"
                  placeholder="Seats"
                  searchPlaceholder="Search..."
                  value={seats}
                  onChange={(item) => {
                    setSeats(item);
                  }}
                />
              </View>
              <View style={[style.sliderWrapper, style.spacing]}>
                <Text style={style.filterText}>Year Of Make</Text>
                <MultiSlider
                  values={year}
                  onValuesChange={setYear}
                  min={1970}
                  max={2023}
                  step={1}
                  sliderLength={300}
                  markerStyle={style.markerContainer}
                  trackStyle={style.trackStyle}
                  selectedStyle={style.selectedContainer}
                />

                <View style={style.sliderLabelWrapper}>
                  <Text style={style.sliderLabel}>N{year[0]}</Text>
                  <Text style={style.sliderLabel}>N{year[1]}</Text>
                </View>
              </View>

              <View style={style.transmissionContainer}>
                <Text style={style.filterText}>Vehicle Type</Text>
                <View style={style.transmissionWrapper}>
                  <TouchableOpacity
                    onPress={isManual}
                    style={[
                      manual !== null ? style.isCliked : style.isNotCliked,

                      style.transmission,
                    ]}
                  >
                    <Text
                      style={[
                        manual !== null
                          ? style.isClikedText
                          : style.isNotClikedText,
                      ]}
                    >
                      Manual
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={isAuto}
                    style={[
                      auto !== null ? style.isCliked : style.isNotCliked,
                      style.transmission,
                    ]}
                  >
                    <Text
                      style={[
                        auto !== null
                          ? style.isClikedText
                          : style.isNotClikedText,
                      ]}
                    >
                      Automatic
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={style.button}>
                <Button onPress={onFilter} title="Search" />
              </View>
            </ScrollView>
          </View>
        </SafeArea>
      </Modal>

      <TouchableOpacity onPress={() => setIsVisible(true)}>
        <Icon
          style={style.iconFilter}
          name="filter-outline"
          color="#1A321E"
          type="ionicon"
        />
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#FAFAF5",
    height: screenHeight,
    width: screenWidth,
  },

  scrollContainer: {
    marginBottom: screenHeight * 0.1,
    paddingLeft: screenWidth * 0.09,
    paddingTop: screenHeight * 0.04,
    paddingRight: screenWidth * 0.09,
  },
  spacing: {
    marginBottom: screenHeight * 0.02,
  },

  sliderWrapper: {
    marginLeft: screenWidth * 0.015,
  },

  sliderLabelWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: screenWidth * 0.1,
  },

  markerContainer: {
    backgroundColor: "#1A321E",
    borderColor: "#1A321E",
  },

  trackStyle: {
    backgroundColor: "rgba(123, 182, 109, 0.58)",
  },

  selectedContainer: {
    backgroundColor: "#1A321E",
  },
  dropdown: {
    height: 50,
    borderColor: "#FFFFFF",
    borderWidth: 2,
    paddingLeft: 15,
    paddingRight: 10,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  selectedStyle: {
    borderRadius: 12,
  },

  iconCancel: {
    alignItems: "flex-end",
  },

  // multiSelect: {

  // },

  filterText: {
    fontSize: screenHeight * 0.022,
    fontWeight: "600",
    marginBottom: screenHeight * 0.012,
    marginLeft: screenWidth * 0.015,
  },

  // typeContainer:{
  //   paddingRight: screenWidth * 0.09
  // },

  typeBackground: {
    backgroundColor: "white",
    borderRadius: 360,
    padding: screenWidth * 0.03,
    marginBottom: screenHeight * 0.01,
  },

  typeBackgroundActive: {
    backgroundColor: "#7BB66D",
    borderRadius: 360,
    padding: screenWidth * 0.03,
    marginBottom: screenHeight * 0.01,
  },

  typeWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  typeVehicle: {
    marginRight: screenWidth * 0.071,
    marginTop: screenHeight * 0.013,
  },
  labelText: {
    textAlign: "center",
  },

  transmissionWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  transmissionContainer: {
    marginBottom: screenHeight * 0.05,
  },

  isNotCliked: {
    backgroundColor: "#FFFFFF",
  },

  isCliked: {
    backgroundColor: "#1A321E",
  },

  transmission: {
    paddingVertical: screenHeight * 0.02,
    paddingHorizontal: screenHeight * 0.05,
    borderRadius: 24,
  },
  button: {
    marginBottom: screenHeight * 0.08,
  },

  isNotClikedText: {
    color: "#000000",
  },

  isClikedText: {
    color: "#FFFFFF",
  },
});
