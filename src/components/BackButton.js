import * as React from "react";
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";

const ButtonMediumOutlineIc = ({icon}) => {
  	
  	return (
        <View>
    		<Image style={styles.buttonMediumOutlineIc} resizeMode="cover" source={icon} />
        </View>
    )
};

const styles = StyleSheet.create({
  	buttonMediumOutlineIc: {
    		width: 48,
            height: 50,

  	}
});

export default ButtonMediumOutlineIc;
