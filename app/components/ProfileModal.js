import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Pressable
} from "react-native";
import React, { useState,useEffect } from "react";
import {manipulateAsync} from 'expo-image-manipulator';
import { Icon } from "@rneui/themed";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useNavigation} from "@react-navigation/native";
import Input from "./Input";
import SafeArea from "./SafeArea";
import identity from "../../assets/IdentificationCard.png";
import Button from "./ButtonLong";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {profileInfo, reset } from "../redux/slice/auth/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ActivityLoader from "./ActivityLoader";
import ButtonLong from "./ButtonLong";


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
export default function ProfileModal() {
    const [isVisible, setIsVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [upload, setUpload] = useState({});
    const [imageName, setimageName] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [savedValue, setSavedValue] = useState("");
    const [LicenceVerify, setLicenceVerify] = useState();
    const [loading, setLoading] = useState(false);

    
  const { user, isLoading,isprofile,isError, isSuccess, message, userID,tempProfile } = useSelector(
    (state) => state.auth
  );

  const navigation = useNavigation();

  const dispatch = useDispatch();

  // console.log(user.data.d_user_id);

  const userId = userID.length !== 0 
  ? userID.data.d_user_id :null;

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
            [{resize:{width:761 ,height:761}}],
           { compress: 0.1 } // from 0 to 1 "1 for best quality"
       );
          setImage(result.uri);
          let localUri = manipulateResult.uri;
          let filename = localUri.split("/").pop();
          let type = manipulateResult.type;
          setUpload({ uri: localUri, name: filename, type });
        }
      };
    
      const takeImage = async () => {
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        if (cameraStatus.status === "granted") {
          const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.1,
          });
          // console.log(result);
          if (!result.cancelled) {
            const manipulateResult = await manipulateAsync(
              result.uri,
              [{resize:{width:761 ,height:761}}],
             { compress: 0.1 } 
         );
            setImage(result.uri);
            let localUri = manipulateResult.uri;
            let filename = localUri.split("/").pop();
            let type = result.type;
        

         console.log(manipulateResult.uri)
    
            setUpload({ uri: localUri, name: filename, type });
          }
        } else {
        }
      };
    
      const uploadCloudinary =async () => {
        let formData = new FormData();
        formData.append("file", upload);
        formData.append("upload_preset", "p88rhpjd");
        formData.append("folder", `users/${userId}`);
        
        axios
          .post(
            "https://api.cloudinary.com/v1_1/dbwtfrkfs/image/upload/",
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

     const updateProfile = async()=>{
        const profile={
            profileImage:imageName
        }
        dispatch( profileInfo(profile))
        const result = JSON.stringify( profile);
        await AsyncStorage.setItem("profileImage",result);
        console.log("image",imageName);
     }
    
      const onPress = () => {
        setLoading(true);
       uploadCloudinary();
      
     
      };

      useEffect(() => {
        imageName !== null ? updateProfile() : null;
      }, [imageName !== null]);
    

      useEffect(() => {

     if(isError){
         console.log(message);
         setLoading(false);
     }

        if(isprofile){
          console.log('uploading profile',tempProfile)
          console.log("image",imageName);
          setLoading(false);
          setIsVisible(false);
        }
        return () => {
            dispatch(reset());
          };
      }, [isprofile,isError,message,tempProfile]);

 

  return (
    <View>
      <Modal
        visible={isVisible}
        animationType="slide"
        onRequestClose={() => setIsVisible(false)}
      >
     <SafeArea>
      <View style={style.container}>
      {/* //////////////////// */}

      <ScrollView  showsVerticalScrollIndicator={false}  style={style.scroll}>
      <TouchableOpacity onPress={() => setIsVisible(false)}>
                <Icon
                  style={style.iconCancel}
                  name="md-close-circle-outline"
                  color="#1A321E"
                  type="ionicon"
                />
              </TouchableOpacity>

      {/* //////////////////////////// */}

      <View>
        <Text style={style.textHeader}>Upload Your{"\n"}Profile Image</Text>
        <Text style={style.textSubHeader}>Please provide a clear picture of your{"\n"}face.</Text>
      
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
            <Image source={identity} style={style.img} />
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
        
      </View>
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
    </ScrollView>
    </View>
    </SafeArea>
      </Modal>

      <TouchableOpacity onPress={() => setIsVisible(true)} style={style.cameraIcon}>
        <Icon
          style={style.iconFilter}
          name="camera-outline"
          color="#fff"
          type="ionicon"
        />
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
    container: {
      height: screenHeight,
      width: screenWidth,
      backgroundColor: "#FAFAF5",
      paddingLeft: screenWidth * 0.05,
      paddingTop: screenHeight * 0.02,
      paddingRight: screenWidth * 0.05,
    },
  
    scroll:{
      marginBottom:screenHeight * 0.08
    },
  
    // cameraIcon: {
    //     position: "absolute",
    //     top: "45%",
    //     right: "60%",
    //     backgroundColor: "#1A321E",
    //     borderRadius: 360,
    //     padding: 10,
    //   },
    iconContainer: {
      alignItems: "flex-start",
      marginBottom: 20,
    },
  
    inputContainer: {
      
    },
  
    textHeader: {
      fontSize: 24,
      fontWeight: "700",
    },
  
    textSubHeader: {
      fontSize: 16,
      fontWeight: "400",
    },
  
    licenceText:{
      marginTop:screenHeight*0.02,
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
  
    pressableContainer: {
      
    },
    iconCancel: {
        alignItems: "flex-end",
      },
  
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
    
      marginBottom: screenHeight *0.02
      
    },
  
  
    pressableText: {
      fontSize: 16,
      fontWeight: "400",
      marginLeft: 20,
    },
  
    spacing: {
      marginTop: screenHeight * 0.04,
      marginBottom:  screenHeight * 0.05 
  
    },
  });
