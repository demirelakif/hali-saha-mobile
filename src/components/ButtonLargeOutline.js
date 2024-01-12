import * as React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";

const ButtonLargeOutline = ({ text, onpress }) => {
    return (
        <TouchableOpacity onPress={onpress} style={[styles.buttonLargeOutline, styles.textIconFlexBox]}>
            <View style={[styles.textIcon, styles.textIconFlexBox]}>
                <Text style={styles.signUp}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    textIconFlexBox: {
        alignItems: "center",
    },
    signUp: {
        fontSize: 21,
        lineHeight: 28,
        fontFamily: "Montserrat-ExtraBold",
        color: Colors.textColor,
        textAlign: "center"
    },
    textIcon: {
        flexDirection: "row"
    },
    buttonLargeOutline: {
        borderRadius: 16,
        backgroundColor: "#b1d7b4",
        shadowColor: Colors.buttonColor,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 0,
        elevation: 3,
        shadowOpacity: 1,
        borderStyle: "solid",
        borderColor: Colors.buttonColor,
        borderWidth: 2,
        width: "100%",
        padding: 16
    }
});

export default ButtonLargeOutline;
