import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import * as Location from 'expo-location';
const API_URL = "http://192.168.1.104:5000/pitch/";

class PitchServices {
  async getAllPitches() {
    try {
      // Kullanıcı konumunu al
      const location = await getLocation();
      if (!location) {
        throw new Error("Konum bilgisi bulunamadı");
      }

      const response = await axios.get(API_URL + "getAllPitches");
      const pitches = response.data.pitches;

      // Her bir pitch için uzaklığı hesaplayın ve pitch objesine ekleyin
      const pitchesWithDistance = pitches.map((pitch) => {
        const distance = calculateDistance(location, pitch.location);
        return { ...pitch, distance };
      });

      return pitchesWithDistance;
    } catch (error) {
      console.error("Pitchler alınırken bir hata oluştu:", error);
      Alert.alert("Hata", "Pitchler alınırken bir hata oluştu.");
      return [];
    }
  }
}

// Kullanıcı konumunu alma işlemini gerçekleştiren fonksiyon
async function getLocation() {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Konum izni reddedildi');
    }

    const location = await Location.getCurrentPositionAsync({});
    return {
      lat: location.coords.latitude,
      lng: location.coords.longitude
    };
  } catch (error) {
    console.error('Konum alınırken bir hata oluştu:', error);
    return null;
  }
}

// İki nokta arasındaki mesafeyi hesaplayan yardımcı fonksiyon
function calculateDistance(location1, location2) {
    const { lat: lat1, lng: lng1 } = location1;
    const { lat: lat2, lng: lng2 } = location2;
    console.log(lat1,lng1)
    console.log(lat2,lng2)
    // Hesaplama işlemini gerçekleştirin ve sonucu bir tam sayıya yuvarlayın
    const distance = Math.round(Math.sqrt((lat2 - lat1) ** 2 + (lng2 - lng1) ** 2));
    return distance;
  }
  
  

export default new PitchServices();
