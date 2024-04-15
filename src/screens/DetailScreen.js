import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView, Linking, ActivityIndicator } from 'react-native';
import BackButton from '../components/BackButton';
import StarRating from '../components/StarRating';
import { useNavigation } from '@react-navigation/native';
import PitchServices from '../services/PitchServices';
import OwnerServices from '../services/OwnerServices';

const DetailScreen = ({ route }) => {
  const navigation = useNavigation()
  const [pitch, setPitch] = useState(null)
  const [owner, setOwner] = useState(null)
  const [visible,setVisible] = useState(true)

  const getPitch = async () => {
    try {
      const data = await PitchServices.getPitchById(route.params.pitchId);
      setPitch(data);
    } catch (error) {
      console.log("Error searching pitches:", error);
    }
  };

  const getOwner = async () => {
    try {
      const data = await OwnerServices.getOwnerById(pitch.owner);
      setOwner(data);
    } catch (error) {
      console.log("Error searching Owner:", error);
    }
  };

  useEffect(() => {
    getPitch();
  }, []);
  
  useEffect(() => {
    if (pitch && pitch.owner) {
      getOwner();
    }
  }, [pitch]);



  const goBack = () => {
    navigation.goBack()
  }

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

  const renderServices = () => {
    if (!pitch || !pitch.features) return null;

    return Object.entries(pitch.features).map(([feature, value]) => {
      if (value) {
        let source;
        let text;
        switch (feature) {
          case 'dus':
            source = require('../assets/shower.png');
            text = "Duş"
            break;
          case 'eldiven':
            source = require('../assets/glove.png');
            text = "Eldiven"
            break;
          case 'fileVarMi':
            source = require('../assets/net.png');
            text = "File"
            break;
          case 'icecekIkrami':
            source = require('../assets/drink.png');
            text = "İçecek\nServisi"
            break;
          case 'playground':
            source = require('../assets/playground.png');
            text = "Oyun\nAlanı"
            break;
          case 'tribun':
            source = require('../assets/tribun.png');
            text = "tribun"
            break;
          case 'parkAlani':
            source = require('../assets/park.png');
            text = "Park Alanı"
            break;
          case 'kapaliMi':
            source = require('../assets/roof.png');
            text = "Üstü\nKapalı"
            break;
          case 'kilitliDolap':
            source = require('../assets/wardrobe.png');
            text = "Dolap"
            break;
          case 'kramponHizmeti':
            source = require('../assets/shoes.png');
            text = "Krampon"
            break;
          // Diğer özellikler için aynı şekilde devam edebilirsiniz
          default:
            source = null;
        }

        if (source) {
          return (
            <View key={feature} style={styles.itemContainer}>
              <Image source={source} style={[styles.icon,{marginRight:0,marginBottom:2}]} />
              <Text style={[styles.servicesText,text.length > 6 && {textAlign:'center'}]}>{text}</Text>
            </View>
          );
        }
      }
    });
  };

  const formatPhoneNumber = (phoneNumber) => {
    return phoneNumber.replace(/(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");
  };

  const handlePhoneCall = () => {
    Linking.openURL(`tel:${owner.phoneNumber}`);
  };


  // Eğer pitch veya owner yüklenmediyse yüklenme göstergesi göster
  if (!pitch || !owner) {
    setTimeout(() => {
      setVisible(false);
    }, 200); // 1 saniye sonra loading indicator'ı kaldır
  }

  return (
    <>
    {visible ?       
      <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="black" />
      </View>
  :  

    <ScrollView style={styles.main}>
      <ImageBackground
        source={require('../assets/image.png')}
        style={styles.image}

      >
        <View style={styles.imageOverlay} />
        <TouchableOpacity style={styles.backButton} onPress={() => { goBack() }}>
          <BackButton icon={require('../assets/outlineBack.png')} />
        </TouchableOpacity>
        <View style={styles.textAndPoint}>
          <Text style={styles.textStyleMain}>{pitch ? pitch.name : ""}</Text>
          <StarRating rating={pitch ? pitch.rating : 0} />
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
          <TouchableOpacity style={styles.reservationBtn} onPress={() => { console.log("rez") }}>
            <Image source={require("../assets/reservation.png")} style={styles.icon} />
            <Text style={[styles.textStyle, { color: "black", marginLeft: 6 }]}>Rezervasyon Yap</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.line} />

        <View style={styles.locationContainer}>
          <Text style={styles.textSubHead}>Konum</Text>
          <View style={styles.locationIconAndText}>
            <Image source={require("../assets/location.png")} style={styles.icon} />
            <Text style={styles.locationText}>{pitch ? pitch.location.name : ""}</Text>
            <Image source={require("../assets/map.png")} style={styles.map} />
          </View>
        </View>

        <View style={[styles.line, { marginTop: 28 }]} />

        <View style={styles.servicesContainer}>
          <Text style={styles.textSubHead}>Hizmetler</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ alignSelf: 'center', marginTop: 8 }} contentContainerStyle={{}}>

            {renderServices()}
            {/* {data.map((item, index) => (
              <View key={index} style={styles.itemContainer}>
                <Image source={getImageByType(item.type)} style={styles.icon} />
                <Text style={styles.servicesText}>{item.name}</Text>
              </View>
            ))} */}
          </ScrollView>
        </View>

        <View style={[styles.line, { marginTop: 28 }]} />

        <View style={styles.descriptionContainer}>
          <Text style={styles.textSubHead}>Hakkında</Text>
          <Text style={styles.descriptionText}>Lorem ipsum dolor amalet szymanski fred ismail dzeko tadic irfan</Text>
        </View>

        <View style={[styles.line, { marginTop: 28 }]} />

        <View style={styles.descriptionContainer}>
          <Text style={styles.textSubHead}>İletişim</Text>
          <TouchableOpacity style={styles.locationIconAndText} onPress={()=>{handlePhoneCall()}}>
            <Image source={require("../assets/phone.png")} style={styles.icon} />
            <Text style={styles.phoneText}>{owner ? formatPhoneNumber(owner.phoneNumber) : ""}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
}</>
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
    loadingContainer:{
      position:'absolute',
      top:height/2,
      right:width/2
    },
    backButton: {
      marginTop: 54,
      marginLeft: 24,
    },
    imageOverlay: {
      ...StyleSheet.absoluteFillObject, // Ekranın tamamını kaplayacak
      backgroundColor: 'rgba(0,0,0,0.5)', // Siyah ve %50 opaklıkta bir arka plan rengi
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
      minHeight: height / 3
    },
    itemContainer: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      marginRight: 23,
      alignItems: 'center',

    },
    descriptionContainer: {
      marginTop: 18
    },
    textAndPoint: {
      marginTop: "auto",
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
    servicesText: {
      fontFamily: "Montserrat-Medium",
      fontSize: 10,
      color: "white",
    },
    descriptionText: {
      fontFamily: "Montserrat-Medium",
      fontSize: 12,
      color: "white",
      marginTop: 6
    },
    phoneText: {
      fontFamily: "Montserrat-ExtraBold",
      fontSize: 12,
      color: "white"
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
      flexDirection: "column",

    }
  });

export default DetailScreen;
