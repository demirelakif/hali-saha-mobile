import * as React from "react";
import {Image, StyleSheet, TouchableOpacity} from "react-native";

const ButtonMediumOutlineIc = ({icon,onpress}) => {
  	
  	return (
        <TouchableOpacity onPress={onpress}>
    		<Image style={styles.buttonMediumOutlineIc} resizeMode="cover" source={icon} />
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
  	buttonMediumOutlineIc: {
    		width: 48,
            height: 50,

  	}
});

export default ButtonMediumOutlineIc;
