import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Icon } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import PressableFrame from "../components/PressableFrame";
import { useSelector, useDispatch } from "react-redux";
import SafeArea from "../components/SafeArea";
import CustomAlert from "../components/CustomAlert";
import {
  userIDInfo,
  reset,
  logout,
  DeleteInfo,
} from "../redux/slice/auth/auth";
import { StackActions, useIsFocused } from "@react-navigation/native";
import axios from "axios";
import ProfileModal from "../components/ProfileModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import normalize from "react-native-normalize";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function Profile({ navigation }) {
  const [image, setImage] = useState(null);
  const [imageName, setimageName] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const {
    user,
    isLoading,
    isError,
    isSuccess,
    message,
    userID,
    isDeleted,
    tempDelete,
    logoutState,
  } = useSelector((state) => state.auth);

  // console.log(userID)

  const Firstname =
    userID !== undefined && userID.length !== 0
      ? userID.data.d_first_name
      : null;
  const Lastname =
    userID !== undefined && userID.length !== 0
      ? userID.data.d_last_name
      : null;
  const userId =
    userID !== undefined && userID.length !== 0 ? userID.data.d_user_id : null;
  const email =
    userID !== undefined && userID.length !== 0 ? userID.data.d_email : null;
  const phoneNumber =
    userID !== undefined && userID.length !== 0
      ? userID.data.d_phone_number
      : null;
  const profile =
    userID !== undefined && userID.length !== 0
      ? userID.data.d_profile_photo
      : null;

  // console.log(profile);
  const getImage = async () => {
    const profileImage = await AsyncStorage.getItem("profileImage");
    const profile = JSON.parse(profileImage);
    setImage(profile.profileImage);
  };

  const deleteUserAcct = () => {
    const values = {
      query: "d_account_deleted",
      value: 1,
      vehicle_query: "d_deleted",
      vehicle_value: 1,
    };

    dispatch(DeleteInfo(values));
    console.log("acct deleted");
  };

  const onLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(userIDInfo());
    getImage();

    dispatch(reset());
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      console.log("message", message);
    }

    if (isDeleted) {
      console.log("acct test");
      console.log("hell", tempDelete);
      dispatch(logout());
    }

    // if (logoutState) {
    //   navigation.dispatch(StackActions.replace("OnBoarding"),{
    //     from:"delete"
    //   });
    // }

    dispatch(reset());
  }, [isDeleted, reset, isError, logoutState]);

  useEffect(() => {
    if (logoutState) {
      navigation.dispatch(StackActions.replace("OnBoarding"));
    }

    dispatch(reset());
  }, [reset, logoutState]);

  return (
    <SafeArea>
      <CustomAlert
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={"Warning"}
        message={
          "This will cause your account to be permanently deleted."
        }
        ios={{
          title:{
         color:'red'
          }
        }}
        android={{
          title:{
            color:'red'
             }
        }}
        buttons={[
          { text: "No" },
          {
            text: "Yes",
            func: () => {
              deleteUserAcct();
            },
          },
        ]}
      />
      <View style={style.container}>
        <View style={style.detailContainer}>
          <Icon
            onPress={() => navigation.navigate("More")}
            name="chevron-back-circle-outline"
            type="ionicon"
            size={28}
          />
          <Text style={style.headerText}>Profile</Text>
          <Icon name="dots-vertical" type="material-community" />
        </View>

        <View style={style.headerContainer}>
          {profile !== null ? (
            <View>
              <Image
                source={{ uri: profile }}
                style={{ width: 81, height: 81, borderRadius: 360 }}
              />
              <View style={style.cameraIcon}>
                <ProfileModal />
              </View>
            </View>
          ) : (
            <View>
              <Image source={require("../../assets/Ellipse.png")} />
              <View style={style.cameraIcon}>
                <ProfileModal />
              </View>
            </View>
          )}
          <Text style={style.headerContainerText}>
            {Firstname} {Lastname}
          </Text>
        </View>
        <View>
          <ScrollView contentContainerStyle={{ paddingBottom: normalize(350) }}>
            <PressableFrame
              onPress={() => navigation.navigate("EditProfileFirstName")}
              style={[style.number, style.approvedBorder]}
            >
              <Text style={style.nameInfo}>First Name</Text>
              <Text style={[style.numberText, style.approvedBorderText]}>
                {Firstname}
              </Text>
            </PressableFrame>

            <PressableFrame
              style={[style.liscence, style.approvedBorder]}
              onPress={() => navigation.navigate("EditProfileLastName")}
            >
              <Text style={style.nameInfo}>Last Name</Text>
              <Text style={[style.approvedBorderText]}>{Lastname}</Text>
            </PressableFrame>

            <PressableFrame style={[style.liscence, style.approvedBorder]}>
              <Text style={style.nameInfo}>Email</Text>
              <Text style={[style.approvedBorderText]}>{email}</Text>
            </PressableFrame>

            <PressableFrame
              onPress={() => navigation.navigate("PhoneNumber",{
                from:'phoneNumber',
              })}
              style={[style.number, style.approvedBorder]}
            >
              <Text style={style.nameInfo}>Phone Number</Text>
              <Text style={[style.numberText, style.approvedBorderText]}>
                {phoneNumber}
              </Text>
            </PressableFrame>

            <PressableFrame
              onPress={() => navigation.navigate("PhoneNumber",{
                from:'bvn',
              })}
              style={[style.number, style.approvedBorder]}
            >
              <Text style={style.nameInfo}>Bvn Number</Text>
              <Text style={[style.numberText, style.approvedBorderText]}>
                {phoneNumber}
              </Text>
            </PressableFrame>

            <PressableFrame
              onPress={() =>
                navigation.navigate("ProofOfOwnerUplaod", {
                  header: "Upload Your\nDrivers License",
                  subtext:
                    "Please upload a clear document of your\nproof of ownership document for your car",
                  checkNumber: "empty",
                  checkPhoto: "license",
                })
              }
              style={[style.liscence, style.approvedBorder]}
            >
              <Text style={[style.liscenceText, style.approvedBorderText]}>
                Upload Your Drivers License
              </Text>
            </PressableFrame>

            <PressableFrame
              onPress={() => setModalVisible(true)}
              style={[style.deleteStyle, style.approvedBorder]}
            >
              <Text
                style={[
                  style.liscenceText,
                  style.approvedBorderText,
                  style.deleteText,
                ]}
              >
                Delete Account
              </Text>
            </PressableFrame>
          </ScrollView>
        </View>
      </View>
    </SafeArea>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#FAFAF5",
    height: screenHeight,
  },
  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: normalize(50),
    paddingLeft: normalize(22),
    paddingRight: normalize(10),
    backgroundColor: "#fff",
  },

  headerText: {
    fontSize: normalize(20),
    fontWeight: "700",
  },

  headerContainer: {
    paddingTop: normalize(30),
    paddingLeft: screenWidth * 0.4,
    marginTop: 0,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: "#fff",
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    paddingBottom: normalize(27),
    marginBottom: "5%",
  },

  headerContainerText: {
    fontSize: screenHeight * 0.025,
    marginTop: screenHeight * 0.015,
    fontWeight: "500",
  },

  approvedBorder: {
    width: normalize(350),
    backgroundColor: "#fff",
    paddingLeft: normalize(18),
    paddingRight: 89,
    paddingBottom: 15,
    paddingTop: 15,
    borderRadius: 30,
    marginBottom: "5%",
    marginHorizontal: 20,
  },

  approvedBorderText: {
    fontSize: 16,
    marginLeft: "3%",
    marginTop: "1%",
  },

  nameInfo: {
    color: "#C9C9C9",
    fontSize: 10,
    fontWeight: "400",
    marginLeft: "3%",
  },

  cameraIcon: {
    position: "absolute",
    top: normalize(45),
    right: "60%",
    backgroundColor: "#1A321E",
    borderRadius: 360,
    padding: normalize(10),
  },

  deleteText: {
    color: "red",
  },
});
