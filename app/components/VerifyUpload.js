import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { Camera, CameraType } from "expo-camera";
import {manipulateAsync} from 'expo-image-manipulator';
import * as ImagePicker from "expo-image-picker";
import Input from "./Input";
import SafeArea from "./SafeArea";
import identity from "../../assets/IdentificationCard.png";
import Button from "./ButtonLong";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ActivityLoader from "./ActivityLoader";
import ButtonLong from "./ButtonLong";
import { verifyLicenseInfo, reset } from "../redux/slice/auth/auth";
import ScrollV from "./ScrollV";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function VerifyUpload({
  header,
  subtext,
  checkPhoto,
  checkNumber,
}) {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const [upload, setUpload] = useState({});
  const [imageName, setimageName] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [savedValue, setSavedValue] = useState("");
  const [LicenceVerify, setLicenceVerify] = useState();
  const [loading, setLoading] = useState(false);

  const { user, isLoading, isVerified, tempLicense } = useSelector(
    (state) => state.auth
  );

  const userId = user.data.d_user_id;

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
    });

    console.log(result);

    if (!result.cancelled) {
      const manipulateResult = await manipulateAsync(
        result.uri,
        [{resize:{width:550 ,height:450}}],
       { compress: 0.1} 
   );
      setImage(result.uri);
      let localUri = manipulateResult.uri;
      let filename = localUri.split("/").pop();
      let type = result.type;

      setUpload({ uri: localUri, name: filename, type });
    }
  };

  const takeImage = async () => {
    const cameraStatus = await Camera.requestCameraPermissionsAsync();
    if (cameraStatus.status === "granted") {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.1,
      });
      console.log(result);
      if (!result.cancelled) {
        const manipulateResult = await manipulateAsync(
          result.uri,
          [{resize:{width:550 ,height:450}}],
         { compress: 0.1} 
     );
        setImage(result.uri);
        let localUri = manipulateResult.uri;
        let filename = localUri.split("/").pop();
        let type = result.type;

        setUpload({ uri: localUri, name: filename, type });
      }
    } else {
    }
  };

  const uploadCloudinary = () => {
    let formData = new FormData();
    formData.append("file", upload);
    formData.append("upload_preset", "p88rhpjd");
    formData.append("folder", `users/${userId}`);

    axios
      .post(
        "https://api.cloudinary.com/v1_1/dbwtfrkfs/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-Requested-With": "XMLHttpRequest",
          },
          auth: {
            username: "553783994779571",
            password: "pZDcLRM8D5IRlPN6bQboCDzmsN8",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setimageName(response.data.secure_url);
        verifylicense(response.data.secure_url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const storeImage = async () => {
    console.log("this is a cloudinary", imageName);
    try {
      await AsyncStorage.setItem(checkPhoto, imageName);
    } catch (error) {}
  };

  const saveValue = async () => {
    try {
      await AsyncStorage.setItem(checkNumber, inputValue);
    } catch (error) {
      console.error(error);
    }
  };

  const getSavedValue = async () => {
    if (checkNumber !== "empty") {
      try {
        const value = await AsyncStorage.getItem(checkNumber);
        if (value !== null) {
          setSavedValue(value);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const verifylicense = async (imageLicense) => {
    if (checkPhoto === "license") {
      setLoading(true);
      await axios
        .post(
          "https://api.myidentitypass.com/api/v2/biometrics/merchant/data/verification/drivers_license/image",
          {
            image: `${imageLicense}`,
          },
          {
            headers: {
              "x-api-key": "YM6Bfcil.8RtF91gkrWPIu0DtwtH5oF3Qxd8iU8ZR",
              "app-id": "328c4d27-b2ca-42c7-b9a8-f672561f0224",
            },
          }
        )

        .then((response) => {
          console.log("response", response.data);
          setLicenceVerify(response.data.status);
          console.log("status", response.data.status);
          console.log("verify", response.data.verification);
          
          if(response.data.status===true){
          dispatch(verifyLicenseInfo({userId:userId}));
          // setLoading(false);
          }
          else{
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  };

  const onPress = () => {
    setLoading(true);
    saveValue();
    getSavedValue();
    uploadCloudinary();
  };

  useEffect(() => {
    getSavedValue();
    savedValue !== "" ? console.log("Saved value", savedValue) : null;
  }, [saveValue !== ""]);

  useEffect(() => {
    imageName !== null ? storeImage() : null;
  }, [imageName !== null]);

  useEffect(() => {
    if (checkNumber !== "empty") {
      if (imageName && savedValue !== "") {
        console.log("hello", savedValue);
        setLoading(false);
        navigation.goBack();
      }
    } else if (checkPhoto === "license") {
      if(isVerified){
      console.log("stay");
      dispatch(reset());
      console.log("this",tempLicense)
      setLoading(false);
      }
    } else {
      imageName ? navigation.goBack() : null;
      setLoading(false);
    }
  }, [imageName !== null]);

  return (
    <View style={style.container}>
      {/* //////////////////// */}

      <ScrollV>
        <View style={style.iconContainer}>
          <Icon
            onPress={() => navigation.goBack()}
            name="chevron-back-circle-outline"
            type="ionicon"
          />
        </View>

        {/* //////////////////////////// */}

        <View>
          <Text style={style.textHeader}>{header}</Text>
          <Text style={style.textSubHeader}>{subtext}</Text>
          {LicenceVerify === false ? (
            <Text style={style.licenceText}>
              Verification Failed{"\n"}Please upload a clearer image or a valid
              drivers licence
            </Text>
          ) : null}
        </View>

        {/* //////////////////////////// */}

        {checkNumber !== "empty" && (
          <View style={style.inputContainer}>
            <Input
              placeholder="Document Number"
              onChangeText={(text) => setInputValue(text)}
            />
          </View>
        )}

        {/* //////////////////////////// */}
        <View style={style.imageContainer}>
          {image ? (
            <View style={style.uploadContainer}>
              <Image
                source={{ uri: image }}
                style={{ width: 340, height: 232 }}
              />
            </View>
          ) : (
            <View style={style.imageHolder}>
              <Image source={identity} style={style.img} />
            </View>
          )}
        </View>

        {/* //////////////////////////// */}
        <View style={style.pressableContainer}>
          <Pressable style={[style.pressable]} onPress={takeImage}>
            <Icon name="camera" type="font-awesome" />
            <Text style={style.pressableText}>Take Image</Text>
          </Pressable>

          <Pressable style={style.pressable} onPress={pickImage}>
            <Icon name="image" type="font-awesome" />
            <Text style={style.pressableText}>Upload from Gallery</Text>
          </Pressable>
        </View>
        {loading ? (
          <ActivityLoader spacing={style.spacing} />
        ) : (
          <ButtonLong
            disabled={
              checkNumber !== "empty" ? !image || inputValue === "" : !image
            }
            onPress={onPress}
            title="next"
            buttonExternal={[style.spacing]}
          />
        )}
      </ScrollV>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    height: screenHeight,
    width: screenWidth,
    backgroundColor: "#FAFAF5",
    paddingLeft: screenWidth * 0.05,
    paddingRight: screenWidth * 0.05,
  },

  scroll: {
    marginBottom: screenHeight * 0.08,
  },

  iconContainer: {
    alignItems: "flex-start",
    marginBottom: screenHeight * 0.01,
  },

  inputContainer: {},

  textHeader: {
    fontSize: 24,
    fontWeight: "700",
  },

  textSubHeader: {
    fontSize: 16,
    fontWeight: "400",
  },

  licenceText: {
    marginTop: screenHeight * 0.02,
    fontSize: 16,
    color: "red",
  },

  imageContainer: {
    marginTop: 32.17,
    marginBottom: 6,
  },
  imageHolder: {
    backgroundColor: "#FFFFFF",
    paddingTop: 74.75,
    paddingBottom: 74.75,
    paddingLeft: 108,
    paddingRight: 108,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
    marginHorizontal: 5,
  },

  uploadContainer: {
    marginRight: 22,
  },

  pressableContainer: {},

  pressable: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    padding: 16,
    borderRadius: 8,
    paddingLeft: 21,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,

    marginBottom: screenHeight * 0.02,
  },

  pressableText: {
    fontSize: 16,
    fontWeight: "400",
    marginLeft: 20,
  },

  spacing: {
    marginTop: screenHeight * 0.04,
    marginBottom: screenHeight * 0.06,
  },
});
