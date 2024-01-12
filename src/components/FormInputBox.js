import React, { useState } from "react";
import { StyleSheet, View, Image, Text, TextInput } from "react-native";
import Colors from "../constants/Colors";

const FormInputBox = ({ icon, placeholder, style, onChangeText, numeric }) => {
  const [text, setText] = useState("");

  const handleChangeText = (inputText) => {
    let formattedText = inputText;

    if (numeric) {
      // Telefon numarası girişi için +90 ekleyin
      if (!formattedText.startsWith("+90")) {
        formattedText = "+90" + formattedText;
      }

      // Sadece 10 hane alın
      formattedText = formattedText.slice(0, 13);
    }

    setText(formattedText);

    // Dışarıdan gelen onChangeText fonksiyonunu çağır
    if (onChangeText) {
      onChangeText(formattedText);
    }
  };

  return (
    <View style={[styles.formInputBox, style]}>
      <View style={styles.bg} />
      <View style={styles.textIcon}>
        {icon && <Image style={styles.icon} resizeMode="cover" source={icon} />}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          keyboardType={numeric ? "phone-pad" : "default"}
          placeholderTextColor={Colors.textColor}
          value={text}
          onChangeText={handleChangeText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    height: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    borderRadius: 16,
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderColor: "#18191f",
    borderWidth: 2,
    position: "absolute",
    width: "100%"
  },
  icon: {
    width: 24,
    height: 24
  },
  input: {
    flex: 1,
    fontSize: 21,
    fontFamily: "Montserrat-Medium",
    color: Colors.textColor,
    marginLeft: 12
  },
  textIcon: {
    top: 14,
    left: 16,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute"
  },
  formInputBox: {
    height: 56,
    width: "100%"
  }
});

export default FormInputBox;
