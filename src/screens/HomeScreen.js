import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, ScrollView } from 'react-native';
import PitchCard from '../components/PitchCard';
import PitchServices from '../services/PitchServices';
import { RefreshControl } from 'react-native-gesture-handler';
import { useLocation } from '../context/LocationContext';
import { calculateDistance } from '../utils/utility';
import OwnerServices from '../services/OwnerServices';


const HomeScreen = ({ navigation }) => {
  const [pitches, setPitches] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const { location } = useLocation();

  // İki nokta arasındaki mesafeyi hesaplayan yardımcı fonksiyon


  const fetchPitches = async () => {
    try {
      const data = await OwnerServices.getAllOwners();
      if(location){
        const pitchesWithDistance = data.map((owner) => {
          const distance = calculateDistance(location, owner.location); // Mesafeyi hesapla
          return { ...owner, distance };
        });
        pitchesWithDistance.sort((a, b) => a.distance - b.distance); // En yakın pitch'leri ilk sıraya yerleştir
        setPitches(pitchesWithDistance); // Güncellenmiş pitch'leri ayarla
      }else{
        setPitches(data)
      }

      setRefreshing(false)
    } catch (error) {
      console.log("Error fetching pitches:", error);
    } finally {

    }
  };


  useEffect(() => {
    fetchPitches();
  }, [location]);


  const goToPitchDetail = (pitchId) => {
    navigation.navigate('Detail', { pitchId }); // 'PitchDetail' isimli sayfaya pitchId parametresiyle yönlendiriyoruz
  };

  return (
    <View style={styles.main}>
      <View style={styles.head}>
        <View style={styles.headText}>
          <Text style={styles.headTextStyle}>Anasayfa</Text>
        </View>
      </View>

      <View style={styles.box}>
        <View style={styles.nearbyPitches}>
          <View style={styles.textAndImage}>
            <View style={styles.boxText}>
              <Text style={styles.nearbyText}>
                Yakındaki
              </Text>
              <Text style={styles.nearbyText}>
                Sahalar
              </Text>
            </View>
            <Image style={styles.imageStyle} source={require('../assets/playerPng.png')} />
          </View>
          <ScrollView
            style={styles.scrollView}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                  fetchPitches();
                }}
              />
            }
          >
            {pitches ? 
              
              pitches.map((pitch, index) => (
              <PitchCard
                key={index}
                pitchName={pitch.name}
                distance={pitch.distance}
                rating={pitch.rating}
                onPress={() => { goToPitchDetail(pitch._id) }}
              />
            ))
            :
            null
            }
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create(
  {
    main: {
      backgroundColor: "white",
      flex: 1
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
      borderBottomWidth: 6,
      backgroundColor: "#7FB77E", //textGreen,
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
      maxHeight: 405,
      minHeight: 400
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
  }
);

export default HomeScreen;
