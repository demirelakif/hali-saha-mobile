import React from 'react';
import { View, Text, Dimensions, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import BackButton from '../components/BackButton';
import StarRating from '../components/StarRating';

const DetailScreen = () => {

  const goToLogin = () => {
    // navigation.navigate("Login")
  }

  const data = [
    { type: 'shower', name: "Duş" },
    { type: 'camera', name: "Duş" },
    { type: 'roof', name: "Kapalı" },
    { type: 'drink', name: "İçecek" },
    { type: 'park', name: "Park Alanı" },
    // Buraya istediğiniz kadar veri ekleyebilirsiniz
  ];

  const getImageByType = (type) => {
    switch (type) {
      case 'shower':
        return require('../assets/shower.png');
      case 'camera':
        return require('../assets/camera.png');
      case 'roof':
        return require('../assets/roof.png');
      case 'drink':
        return require('../assets/drink.png');
      case 'park':
        return require('../assets/park.png');
    }
  };

  return (
    <View style={styles.main}>
      <ImageBackground
        source={require('../assets/image.png')}
        style={styles.image}
      >
        <View style={styles.backButton}>
          <BackButton onPress={goToLogin} icon={require('../assets/outlineBack.png')} />
        </View>
        <View style={styles.textAndPoint}>
          <Text style={styles.textStyleMain}>Varan Halı Saha Hizmetleri</Text>
          <StarRating rating={3} />
        </View>
      </ImageBackground>
      <View style={styles.bottomMainContainer}>

        <View style={styles.interactiveContainer}>
          <View style={styles.interactiveContainerInside}>
            <TouchableOpacity style={styles.textAndImageRow}>
              <Image source={require("../assets/price.png")} style={styles.icon} />
              <Text style={styles.textStyle}>Ücretlere Göz At</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.textAndImageRow}>
              <Image source={require("../assets/clock.png")} style={styles.icon} />
              <Text style={styles.textStyle}>Saatlere Göz At</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.reservationBtn}>
            <Image source={require("../assets/reservation.png")} style={styles.icon} />
            <Text style={[styles.textStyle, { color: "black", marginLeft: 6 }]}>Rezervasyon Yap</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.line} />

        <View style={styles.locationContainer}>
          <Text style={styles.textSubHead}>Konum</Text>
          <View style={styles.locationIconAndText}>
            <Image source={require("../assets/location.png")} style={styles.icon} />
            <Text style={styles.locationText}>Yenişehir, Şht. Kazım Sk. No:51, 41050 İzmit/Kocaeli</Text>
            <Image source={require("../assets/map.png")} style={styles.map} />
          </View>
        </View>

        <View style={[styles.line, { marginTop: 28 }]} />

        <View style={styles.servicesContainer}>
          <Text style={styles.textSubHead}>Hizmetler</Text>
          <ScrollView horizontal={true} style={{}} >
            {data.map((item, index) => (
              <View key={index} style={styles.itemContainer}>
                <Image source={getImageByType(item.type)} style={styles.icon} />
                <Text style={styles.servicesText}>{item.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>

  )
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create(
  {
    main: {
      backgroundColor: "#7FB77E",
      width: width,
      height: height
    },
    backButton: {
      marginTop: 54,
      marginLeft: 24,
    },
    textStyleMain: {
      color: '#F7F6DC',
      fontSize: 27,
      textAlign: 'left',
      fontFamily: "Montserrat-ExtraBold",
      maxWidth: width / 1.3,
    },
    image: {
      width: width,
    },
    itemContainer: {
      flexDirection: 'column',

    },
    textAndPoint: {
      marginTop: 69,
      flexDirection: 'column',
      marginLeft: 24,
      marginBottom: 18
    },
    bottomMainContainer: {
      flexDirection: 'column',
      marginHorizontal: 24,
      marginTop: 18
    },
    interactiveContainer: {
      flexDirection: 'column',
    },
    interactiveContainerInside: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    textAndImageRow: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    textStyle: {
      color: '#F7F6DC',
      fontSize: 14,
      fontFamily: "Montserrat-Medium",
    },
    servicesText:{
      fontFamily:"Montserrat-Medium",
      fontSize:10,
      color:"white"
    },
    icon: {
      width: 24,
      height: 24,
      marginRight: 4,
    },
    reservationBtn: {
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 18,
      backgroundColor: "#B1D7B4",
      borderRadius: 16,
      borderColor: "#F7F6DC",
      borderWidth: 1,
      paddingHorizontal: 10,
      paddingVertical: 4
    },
    line: {
      width: width - 48,
      alignSelf: 'center',
      marginTop: 18,
      backgroundColor: "white",
      height: 2,
      borderRadius: 48
    },
    locationContainer: {
      marginTop: 18,
      flexDirection: "column",
    },
    textSubHead: {
      fontFamily: "Montserrat-ExtraBold",
      fontSize: 14,
      color: "#D9D9D9"
    },
    locationIconAndText: {
      flexDirection: 'row',
      marginTop: 10,
      alignItems: 'center'
    },
    locationText: {
      fontFamily: "Montserrat-Medium",
      maxWidth: width / 2,
      fontSize: 12,
      color: "white",
    },
    map: {
      width: 94,
      height: 57,
      position: 'absolute',
      right: 0
    },
    servicesContainer: {
      marginTop: 18,
      flexDirection: "column"
    }
  });

export default DetailScreen;
