import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import OnBoarding from "../screens/OnBoarding";
import Login from "../screens/Login";
import Register from "../screens/Register";
import PasswordReset from "../screens/PasswordReset";
import NewPassword from "../screens/NewPassword";
import Home from "../screens/Home";
import CarDetail from "../screens/CarDetail";
import RentDetails from "../screens/RentDetails";
import RentDetailHistory from "../screens/RentDetailHistory";
import ApprovedToDrive from "../screens/ApprovedToDrive";
import PhoneNumber from "../screens/PhoneNumber";
import UploadDriverLicsence from "../screens/UploadDriverLicsence";
import OrderSummary from "../screens/OrderSummary";
import PaymentDetails from "../screens/PaymentDetails";
import HostContact from "../screens/HostContact";
import VerifyEmail from "../screens/VerifyEmail";
import History from "../screens/History";
import More from "../screens/More";
import Profile from "../screens/Profile";
import EditProfileFirstName from "../screens/EditProfileFirstName";
import ListYourCar from "../screens/ListYourCar";
import HostCarDetails from "../screens/HostCarDetails";
import UploadCarVerification from "../screens/UploadCarVerification";
import ProofOfOwnerUplaod from "../screens/ProofOfOwnerUplaod";
import VerifySelectImage from "../screens/VerifySelectImage";
import VerifyTakeImage from "../screens/VerifyTakeImage";
import HostCarExterior from "../screens/HostCarExterior";
import CarPartUpload from "../screens/CarPartUpload";
import HostCarInterior from "../screens/HostCarInterior";
import SpecifyLocation from "../screens/SpecifyLocation";
import SpecifyPickup from "../screens/SpecifyPickup";
import SpecifyDropOff from "../screens/SpecifyDropOff";
import Price from "../screens/Price";
import AccountNumber from "../screens/AccountNumber";
import VerifyUpload from "../components/VerifyUpload";
import EditProfileLastName from "../screens/EditProfileLastName";
import HostCarFeatures from "../screens/HostCarFeatures";
import Pay from "../screens/Pay";
import ListedCars from "../screens/ListedCars";
import Notifications from "../screens/Notifications";
import SearchFilter from "../components/SearchFilter";
import Trips from "../components/Trips";
import HostTripRequest from "../screens/HostTripRequest";
import VerifyOtp from "../screens/VerifyOtp";
import HostProfile from "../screens/HostProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@rneui/themed";
import { otpVerify } from "../redux/slice/auth/auth";
import { userIDInfo, reset, logout } from "../redux/slice/auth/auth";

const Stack = createStackNavigator();
const Tab =  createBottomTabNavigator();
const HomeStack = createStackNavigator();
const Navigation = () => {
  const dispatch = useDispatch();

  const { user, tempotpVerify, userID, isSuccess } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(userIDInfo());
    dispatch(reset());
    routName;
  }, [user, isSuccess,routName]);

  // console.log("user",userID);
  // console.log(user)

  const userData = () => {
    const emailVerified =
      userID.length !== 0 && !userID.msg ? userID.data.d_email_verified : null;

    if (user != null) {
      if (user != null && !user.msg && emailVerified === 1) {
        return user.data.d_user_id;
      } else if (user != null && !user.msg) {
        return null;
        // return user.data.d_user_id;
      } else if (user != null && !user.msg && emailVerified === 1) {
        return user.data.d_user_id;
      }
    } else if (user != null && user.msg) {
      user = null;
      return null;
    } else {
      return user;
    }
  };

  const theme = {
    ...DefaultTheme,

    colors: {
      ...DefaultTheme.colors,

      background: "black",
    },
  };

  const routName = userData() ? "Home" : "OnBoarding";

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#1A321E" },
      }}
      initialRouteName={routName}
    >
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
      <Stack.Screen name="Home" component={HomeTabs} />
      <Stack.Screen name="CarDetail" component={CarDetail} />
      <Stack.Screen name="RentDetails" component={RentDetails} />
      <Stack.Screen name="OrderSummary" component={OrderSummary} />
      <Stack.Screen name="PaymentDetails" component={PaymentDetails} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen
        name="EditProfileFirstName"
        component={EditProfileFirstName}
      />
      <Stack.Screen name="ListYourCar" component={ListYourCar} />
      <Stack.Screen name="HostCarDetails" component={HostCarDetails} />
      <Stack.Screen
        name="UploadCarVerification"
        component={UploadCarVerification}
      />
      <Stack.Screen name="ProofOfOwnerUplaod" component={ProofOfOwnerUplaod} />
      <Stack.Screen name="VerifySelectImage" component={VerifySelectImage} />
      <Stack.Screen name="VerifyTakeImage" component={VerifyTakeImage} />
      <Stack.Screen name="HostCarExterior" component={HostCarExterior} />
      <Stack.Screen name="CarPartUpload" component={CarPartUpload} />
      <Stack.Screen name="HostCarInterior" component={HostCarInterior} />
      <Stack.Screen name="SpecifyLocation" component={SpecifyLocation} />
      <Stack.Screen name="Price" component={Price} />
      <Stack.Screen name="SpecifyPickup" component={SpecifyPickup} />
      <Stack.Screen name="AccountNumber" component={AccountNumber} />
      <Stack.Screen name="VerifyUpload" component={VerifyUpload} />
      <Stack.Screen name="Pay" component={Pay} />
      <Stack.Screen
        name="EditProfileLastName"
        component={EditProfileLastName}
      />
      <Stack.Screen name="PhoneNumber" component={PhoneNumber} />
      <Stack.Screen
        name="UploadDriverLicsence"
        component={UploadDriverLicsence}
      />
      <Stack.Screen name="NewPassword" component={NewPassword} />
      <Stack.Screen name="PasswordReset" component={PasswordReset} />
      <Stack.Screen name="ApprovedToDrive" component={ApprovedToDrive} />
      <Stack.Screen name="HostCarFeatures" component={HostCarFeatures} />
      <Stack.Screen name="ListedCars" component={ListedCars} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="SearchFilter" component={SearchFilter} />
      <Stack.Screen name="SpecifyDropOff" component={SpecifyDropOff} />
      <Stack.Screen name="RentDetailHistory" component={RentDetailHistory} />
      <Stack.Screen name="Trips" component={Trips} />
      <Stack.Screen name="HostTripRequest" component={HostTripRequest} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
      <Stack.Screen name="HostProfile" component={HostProfile} />
      <Stack.Screen name="HostContact" component={HostContact} />
    </Stack.Navigator>
  );
};

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarActiveTintColor: '#1A321E' }}
      barStyle={{ backgroundColor: 'white' }}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({}) => <Icon name='home' type='antdesign' />,
        }}
        name='HomeStack'
        component={HomeStackNavigator}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({}) => (
            <Icon name='note-text-outline' type='material-community' />
          ),
        }}
        name='History'
        component={History}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({}) => (
            <Icon name='dots-grid' type='material-community' />
          ),
        }}
        name='More'
        component={More}
      />
    </Tab.Navigator>
  );
};


const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  );
};

export default Navigation;
