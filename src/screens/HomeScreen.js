import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import BackButton from '../components/BackButton'

const HomeScreen = ({ navigation }) => {

  const goToLogin = () => {
    // navigation.navigate("Login")
  }

  return (
    <View style={styles.main}>
      <View style={styles.head}>
        <View style={styles.backButton}>
          <BackButton onpress={goToLogin} icon={require('../assets/outlineBack.png')} />
        </View>
        <View style={styles.headText}>
          <Text style={styles.headTextStyle}>Anasayfa</Text>
        </View>
      </View>

      <View style={styles.box}>
        <View style={styles.nearbyPitches}>
          <Text style={styles.mainTextStyle}>
            Yakındaki Sahalar
          </Text>
        </View>

      </View>

    </View>

  )
}


const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create(
  {
    main: {
      backgroundColor: "white",
      flex: 1
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
      marginLeft: 16
    },
    headTextStyle: {
      fontSize: 27,
      fontFamily: "Montserrat-ExtraBold",
      color: "#18191f",
      textAlign: "center"
    },
    box: {
      justifyContent: "flex-end",
      borderRadius: 16,
      boxShadow: "0px 4px 0px 0px #18191F",
      borderColor: "rgba(24, 25, 31, 1)",
      borderStyle: "solid",
      borderWidth: 2,
      backgroundColor: "#7FB77E",//textGreen
      display: "flex",
      maxWidth: 327,
      flexDirection: "column",
    }
  });

export default HomeScreen