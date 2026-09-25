import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Dimensions,
  } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import {manipulateAsync} from 'expo-image-manipulator';
import Input from "./Input";
import SafeArea from "./SafeArea";
import identity from "../../assets/IdentificationCard.png";
import Button from "./ButtonLong";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ActivityLoader from "./ActivityLoader";
import placeholder from "../../assets/placeholder.png"
import ScrollV from "./ScrollV";
import ButtonLong from "./ButtonLong";
import { ScreenHeight } from "@rneui/base";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
export default function CarUpload({header, subtext,checkPhoto,routing}) {
  const navigation = useNavigation();

 
  const [image, setImage] = useState(null);
  const [upload, setUpload] = useState({});
  const [imageName, setimageName] = useState(null);
  const [storedImg, setStoredImg] = useState();
  const [loading, setLoading] = useState(false);




  const { user, isLoading, isError, isSuccess, message, userID } = useSelector(
    (state) => state.auth
  );

  const userId = user.data.d_user_id;

  const width=750;
  const height=750;
  const compress=0.1;

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: compress,
    });

    console.log(result);

    if (!result.cancelled) {
      const manipulateResult = await manipulateAsync(
        result.uri,
        [{resize:{width:width ,height:height}}],
       { compress: compress } 
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
        quality: compress,
      });
      console.log(result);
      if (!result.cancelled) {
        const manipulateResult = await manipulateAsync(
          result.uri,
          [{resize:{width:width ,height:height}}],
         { compress:compress} 
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


  const onPress = () => {
    setLoading(true)
    uploadCloudinary();
  };



  useEffect(() => {
    imageName !== null ? storeImage() : null;
    
  }, [imageName!== null]);

  useEffect(() => {
  
  if (imageName) {
        console.log("navigate")
        
        navigation.goBack({key:routing, refresh:true});
        setLoading(false);
  }
  }, [imageName!== null]);

  return (
    <SafeArea>
    <View style={style.container}>
    <ScrollV>
      {/* //////////////////// */}

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
      </View>

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
            <Image source={placeholder}/>
          </View>
        )}
      </View>

      {/* //////////////////////////// */}
      <View style={style.pressableContainer}>
        <Pressable
          style={[style.pressable]}
          onPress={takeImage}
        >
          <Icon name="camera" type="font-awesome" />
          <Text style={style.pressableText}>Take Image</Text>
        </Pressable>

        <Pressable style={style.pressable} onPress={pickImage}>
          <Icon name="image" type="font-awesome" />
          <Text style={style.pressableText}>Upload from Gallery</Text>
        </Pressable>
        {loading ? (
          <ActivityLoader spacing={style.spacing} />
        ) : (
          <ButtonLong
            disabled={!image}
            onPress={onPress}
            title="next"
            buttonExternal={[style.spacing]}
          />
        )}
      </View>
   </ScrollV>
    </View>
    </SafeArea>
  );
}


const style = StyleSheet.create({
  container: {
    height: ScreenHeight,
    backgroundColor: "#FAFAF5",
    paddingLeft: 22,
    
  },

  iconContainer: {
    alignItems: "flex-start",
    marginBottom: 20,
  },

  inputContainer: {
    paddingRight: 22,
  },

  textHeader: {
    fontSize: 24,
    fontWeight: "700",
  },

  textSubHeader: {
    fontSize: 16,
    fontWeight: "400",
  },

  imageContainer: {
    marginTop: 32.17,
    marginBottom: 50,
    paddingRight: 22,
  },
  imageHolder: {
    backgroundColor: "#FFFFFF",
    paddingTop: 17,
    paddingBottom: 17,
    paddingLeft: 16,
    paddingRight: 16,
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

  pressableContainer: {
    paddingRight: 22,
  },

  pressable: {
    backgroundColor: "#FFFFFF",
    flexDirection:"row",
    padding: 16,
    borderRadius: 8,
    paddingLeft:21,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
    marginHorizontal: 5,
    marginBottom: screenHeight * 0.02,
  },

  pressableText: {
      fontSize: 16,
      fontWeight: "400",
      marginLeft:20
  },

  spacing: {
    marginTop: screenHeight * 0.04,
    marginBottom: screenHeight * 0.05,
  },
});
