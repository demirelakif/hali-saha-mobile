import { View, Text, Dimensions, StyleSheet, Image, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackButton from '../components/BackButton'
import PitchCard from '../components/PitchCard'
import { RefreshControl, ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import FormInputBox from '../components/FormInputBox'
import PitchServices from '../services/PitchServices'
import UserAuth from '../services/UserAuth'
import { readData } from '../storage/AsyncStorageManager'

const ProfileScreen = ({ navigation }) => {
  const [history, setHistory] = useState(null);
  const [refreshing, setRefreshing] = useState(false);


  const getHistory = async () => {
    try {
      // console.log(await readData("Token"))
      const data = await UserAuth.getHistory();
      setHistory(data);

      setRefreshing(false)
    } catch (error) {
      console.log("Error getting history:", error);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

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
          <Text style={styles.headTextStyle}>Profil</Text>
        </View>
      </View>

      <View style={styles.box}>
        <View style={styles.nearbyPitches}>
          <View style={styles.textAndImage}>
            <View style={styles.profileCard}>
              <View style={styles.profileRow}>
                <Image style={styles.profileImage} source={require("../assets/profileImage.png")} />
                <View style={styles.nameAndId}>
                  <Text style={styles.nameText}>Akif Demirel</Text>
                  <Text style={styles.idText}>Id:2030233199</Text>
                </View>
              </View>
            </View>
          </View>
          <Text style={styles.historyText}>Geçmiş</Text>
          <ScrollView style={styles.scrollView}
                      refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                  getHistory();
                }}
              />
            }
          >
            {history ?

              history.map((history, index) => (
                <PitchCard
                  key={index}
                  pitchName={history.owner.name}
                  //distance={pitch.distance}
                  rating={history.owner.rating}
                  status={history.reservation.isAvailable == "Meşgul" ? "Tamamlandı" : history.reservation.isAvailable}
                  dontShowDist={1}
                  onPress={() => { goToPitchDetail(pitch._id) }}
                />
              ))
              :
              <Text>Asd</Text>
            }
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
      width: width,
      height: height
    },
    backButton: {
      marginLeft: 24
    },
    head: {
      flexDirection: 'row',
      marginTop: 54,
      alignItems: 'center',

    },
    profileImage: {
      width: 60,
      height: 60
    },
    nameAndId: {
      marginLeft: 12,
    },
    historyText: {
      fontFamily: "Montserrat-Bold",
      fontSize: 20,
      marginBottom: 12
    },
    nameText: {
      fontFamily: "Montserrat-Medium",
      fontSize: 16,
      marginBottom: 12
    },
    idText: {
      fontFamily: "Montserrat-Medium",
      fontSize: 16
    },
    headText: {
      marginLeft: 24
    },
    profileRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    profileCard: {
      backgroundColor: "white",
      minWidth: width / 2,
      height: 80,
      borderRadius: 16,
      borderColor: "black",
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center'
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
      borderBottomWidth: 6,
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
      marginHorizontal: 16,
    },
    scrollView: {
      maxHeight: 430,
    },
    nearbyText: {
      fontFamily: "Montserrat-ExtraBold",
      color: "#F7F6DC",
      fontSize: 27
    },
    textAndImage: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 24,
      marginTop: 24,
    },
    imageStyle: {
      maxWidth: 80,
      maxHeight: 80,
      tintColor: "#007109"
    }

  });

export default ProfileScreen