import React from "react";
import { Text, StyleSheet, Image, TouchableOpacity, View } from "react-native";
import Colors from "../constants/Colors";

const ButtonLarge = ({ text, onPress, icon }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.buttonLarge, styles.textIconFlexBox]}>
        <View style={[styles.textIcon, styles.textIconFlexBox]}>
          <Text style={styles.buttonText}>{text}</Text>
          {
            icon ?
              null
              :
              <Image
                style={styles.featherChevronRight}
                resizeMode="cover"
                source={require("../assets/chevron-right.png")}
              />
          }

        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textIconFlexBox: {
    alignItems: "center",
    overflow: "hidden"
  },
  buttonText: {
    fontSize: 21,
    lineHeight: 28,
    fontFamily: "Montserrat-ExtraBold",
    color: Colors.buttonTextColor,
    textAlign: "center"
  },
  featherChevronRight: {
    width: 24,
    height: 24,
    marginLeft: 6
  },
  textIcon: {
    flexDirection: "row"
  },
  buttonLarge: {
    borderRadius: 16,
    backgroundColor: Colors.buttonColor,
    width: "100%",
    padding: 16
  }
});

export default ButtonLarge;
