import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import BackButton from '../components/BackButton'

const DetailScreen = () => {


  const goToLogin = () => {
    // navigation.navigate("Login")
  }
  
  return (
    <View style={styles.main}>
      <View style={styles.head}>
        <View style={styles.backButton}>
          <BackButton onpress={goToLogin} icon={require('../assets/outlineBack.png')} />
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
    },
    backButton: {
      marginLeft: 24
    },
    head: {
      flexDirection: 'row',
      marginTop: 54,
      alignItems: 'center',

    },

  });

export default DetailScreen