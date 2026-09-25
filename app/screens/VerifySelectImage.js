import { View, Text, StyleSheet, Image } from "react-native";
import React,{useState} from "react";
import { Icon, Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
export default function VerifySelectImage({ route }) {
  const navigation = useNavigation();
  const { result } = route.params;
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      navigation.navigate("VerifySelectImage", {
      });
    }
  };

  return (
    <View style={style.container}>
      <View style={style.iconContainer}>
        <Icon
          onPress={() => navigation.goBack()}
          name="chevron-back-circle-outline"
          type="ionicon"
        />
      </View>
      <Text>The Image</Text>
      { 
        image ?
     
       ( <Image source={{ uri: image }} style={{ width: 50, height: 50 }}/>)
      :(<Image source={{ uri: result }} style={{ width: 50, height: 50 }}/>)
      }

      <Button
        title="Use Image"
        buttonStyle={[style.button]}
        titleStyle={style.titleStyle}
        onPress={() =>
          navigation.navigate("VerifyUpload", {
             imageResult:image ? image :result,        
             
          })
        }
      />
       <Button
        title="Select Another"
        buttonStyle={[style.button]}
        titleStyle={style.titleStyle}
        onPress={pickImage}
        
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    paddingVertical: 50,
  },

  iconContainer: {
    alignItems: "flex-start",
    paddingVertical: 5,
  },
});
