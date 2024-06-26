import { View, Text, Dimensions, StyleSheet, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import PitchCard from '../components/PitchCard'
import { RefreshControl, TouchableOpacity } from 'react-native-gesture-handler'
import OwnerServices from '../services/OwnerServices'

const OwnerHomeScreen = ({ navigation }) => {

  const [myPitches, setMyPitches] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const goAddPitch = () => {
    navigation.navigate("AddPitch")
  }

  const goCalendar = () => {
    navigation.navigate("OwnerCalendar")
  }

  const goToPitchDetail = (pitchId) => {
    navigation.navigate('Detail', { pitchId }); // 'PitchDetail' isimli sayfaya pitchId parametresiyle yönlendiriyoruz
  };
  const goToUpdateScreen = (pitchId) => {
    navigation.navigate("AddPitch", { pitchId })
  }
  const getMyPitches = async () => {
    try {
      const data = await OwnerServices.getMyPitches();
      setMyPitches(data);
      setRefreshing(false);
    } catch (error) {
      console.log("Error getting history:", error);
    }
  };

  const goNotificationScreen = () =>{
    navigation.navigate("Notification")
  }

  useEffect(() => {
    const fetchData = async () => {
      await getMyPitches(); // Async call within the useEffect, but not returning a Promise
    };
    fetchData(); // Call the async function
  }, []); // No cleanup function needed, so we don't return anything from useEffect


  return (
    <View style={styles.main}>
      <View style={styles.head}>
        {/* <View style={styles.backButton}>
          <BackButton onpress={goToLogin} icon={require('../assets/outlineBack.png')} />
        </View> */}

        <View style={styles.headText}>
          <Text style={styles.headTextStyle}>AnaSayfa</Text>
        </View>
        <TouchableOpacity onPress={goNotificationScreen}>
          <Image style={{ width: 32, height: 32, right: 0 }} source={require("../assets/notification.png")} />
        </TouchableOpacity>

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
          <Text style={styles.historyText}>Sahalarım</Text>
          <ScrollView style={styles.scrollView}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                  getMyPitches()
                }}
              />
            }
          >
            {
              myPitches ?
                myPitches.map(
                  (pitch) => (
                    <PitchCard key={pitch._id} pitchName={pitch.name} dontShowDist={1} dontShowRtng={1} onPress_update={() => { goToUpdateScreen(pitch._id) }}
                      onPress={() => { goToPitchDetail(pitch.owner) }} />
                  ))
                :
                null
            }
          </ScrollView>
        </View>

      </View>

      <TouchableOpacity style={styles.button} onPress={goAddPitch}>
        <Text style={styles.buttonText}>
          Saha Ekle
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={goCalendar}>
        <Text style={styles.buttonText}>
          Takvim Düzenle
        </Text>
      </TouchableOpacity>
    </View>
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
    button: {
      backgroundColor: "#7FB77E",
      borderRadius: 16,
      paddingVertical: 8,
      justifyContent: 'center',
      width: width - 48,
      alignSelf: 'center',
      marginTop: 18
    },
    buttonText: {
      fontFamily: "Montserrat-ExtraBold",
      color: "#F7F6DC",
      marginLeft: 20,
      fontSize: 27
    },
    head: {
      flexDirection: 'row',
      marginTop: 54,
      alignItems: 'center',
      justifyContent:'space-between',
      marginHorizontal:24
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
      minHeight: 500,
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
      minHeight: 320,
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

export default OwnerHomeScreen