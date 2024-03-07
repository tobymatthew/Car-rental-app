import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";

export default function Input({ error, ...props }) {
  return (
    
    <View style={style.wrapper}>
      
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 5,
          }}
        >
          {error ? (
            <Text style={{ color: "red", fontSize: 14 }}>{error}</Text>
          ) : null}
        </View>

        <View style={style.inputContainer}>
          <TextInput
            autoCorrect={false}
            style={[style.placeholderText, style.textInput,{...props}]}
            placeholderTextColor="#666"
            {...props}
          />
        </View>
      
    </View>

  );
}

const style = StyleSheet.create({
  wrapper: {
  
  },

  inputContainer: {
    height: 60,
    backgroundColor: "#F2F2F2",
    borderRadius: 24,
    flexDirection: "row",
    paddingHorizontal: 30,
  },

  textInput:{
    width: "100%"
    
  }
});
