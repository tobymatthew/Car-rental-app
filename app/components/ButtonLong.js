import { StyleSheet} from "react-native";
import React from "react";
import { Button } from "@rneui/themed";

export default function ButtonLong({buttonExternal ,...props }) {
  return (
    <Button
      {...props}
      buttonStyle={[style.button,buttonExternal]}
      titleStyle={style.titleStyle}
    />
  );
}

const style = StyleSheet.create({
  button: {
    backgroundColor: "#7BB66D",
    borderRadius: 25,
    height: 50,
  },
  titleStyle: {
    color: "#fff",
  },
});
