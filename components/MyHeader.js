import React from "react";
import { View, Text } from "react-native";
import { Header } from "react-native-elements";

const MyHeader = (props) => {
  return (
    <Header
      centerComponent={{
        text: props.title,
        style: { color: "#000", fontSize: 20, fontWeight: "bold" },
      }}
      backgroundColor="#fff"
    />
  );
};
export default MyHeader;
