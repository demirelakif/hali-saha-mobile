import { View, Text, Dimensions, StyleSheet, Image, Keyboard } from 'react-native'
import React from 'react'
import BackButton from '../components/BackButton'
import PitchCard from '../components/PitchCard'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import FormInputBox from '../components/FormInputBox'

const SearchScreen = ({ navigation }) => {

  const goToLogin = () => {
    // navigation.navigate("Login")
  }
  const handlePressOutside = () => {
    Keyboard.dismiss(); // Klavyeyi kapat
  };

  return (
    <TouchableWithoutFeedback style={styles.main} onPress={handlePressOutside}>
      <View style={styles.head}>
        {/* <View style={styles.backButton}>
          <BackButton onpress={goToLogin} icon={require('../assets/outlineBack.png')} />
        </View> */}
        <View style={styles.headText}>
          <Text style={styles.headTextStyle}>Ara</Text>
        </View>
      </View>

      <View style={styles.box}>
        <View style={styles.nearbyPitches}>
          <View style={styles.textAndImage}>
            <FormInputBox placeholder={"Saha ara"} icon={require('../assets/search.png')}/>
          </View>
          <ScrollView style={styles.scrollView}>
            <PitchCard pitchName={"Rampalı Halısaha"} distance={32} rating={2} onPress={() => { console.log("pressed") }} />
            <PitchCard pitchName={"Acarlar Halısaha"} distance={24} rating={4} onPress={() => { console.log("pressed") }} />
            <PitchCard pitchName={"Rampalı Halısaha"} distance={32} rating={2} onPress={() => { console.log("pressed") }} />
            <PitchCard pitchName={"Acarlar Halısaha"} distance={24} rating={4} onPress={() => { console.log("pressed") }} />
            <PitchCard pitchName={"Rampalı Halısaha"} distance={32} rating={2} onPress={() => { console.log("pressed") }} />
            <PitchCard pitchName={"Acarlar Halısaha"} distance={24} rating={4} onPress={() => { console.log("pressed") }} />
            <PitchCard pitchName={"Rampalı Halısaha"} distance={32} rating={2} onPress={() => { console.log("pressed") }} />
            <PitchCard pitchName={"Acarlar Halısaha"} distance={24} rating={4} onPress={() => { console.log("pressed") }} />
          </ScrollView>
        </View>

      </View>

    </TouchableWithoutFeedback>

  )
}


const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create(
  {
    main: {
      backgroundColor: "white",
    },
    backButton: {
      marginLeft: 24
    },
    head: {
      flexDirection: 'row',
      marginTop: 54,
      alignItems: 'center',

    },
    headText: {
      marginLeft: 24
    },
    headTextStyle: {
      fontSize: 27,
      fontFamily: "Montserrat-ExtraBold",
      color: "#18191f",
      textAlign: "center",
    },
    box: {
      borderRadius: 16,
      borderStyle: "solid",
      borderWidth: 2,
      borderBottomWidth:6,
      backgroundColor: "#7FB77E",//textGreen,
      marginTop: 16,
      flexDirection: "column",
      marginHorizontal: 24,
      minHeight: 540,
    },
    nearbyPitches: {
      fontSize: 27,
      color: "#F7F6DC",
      fontWeight: "800",
      justifyContent: "space-between",
      marginHorizontal:16,
    },
    scrollView: {
      maxHeight: 430,
    },
    nearbyText: {
      fontFamily: "Montserrat-ExtraBold",
      color: "#F7F6DC",
      fontSize: 27
    },
    textAndImage:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      marginBottom: 24,
      marginTop: 24,
    },
    imageStyle:{
      maxWidth:80,
      maxHeight:80,
      tintColor:"#007109"
    }

  });

export default SearchScreen