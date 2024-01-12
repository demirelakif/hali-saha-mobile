import * as React from "react";
import { Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
const MVText = () => {
    return (
        <Text style={styles.mv}>MV</Text>);
};
const styles = StyleSheet.create({
    mv: {
        fontSize: 140,
        letterSpacing: -2.8,
        fontFamily: "Jomhuria-Regular",
        color: Colors.textColor,
        display: "flex",
        width: 105
    }
});
export default MVText;