import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { readData } from "../storage/AsyncStorageManager";
const API_URL = "5000/pitch/";

class PitchServices {
  async getAllPitches() {
    try {
      const response = await axios.get(API_URL + "getAllPitches");
      const pitches = response.data.pitches;
      return pitches
    } catch (error) {
      console.error("Pitchler alınırken bir hata oluştu:", error);
      Alert.alert("Hata", "Pitchler alınırken bir hata oluştu.");
      return [];
    }
  }
  async searchPitchesByName(name) {
    try {
      const response = await axios.post(API_URL + "getPitchesByName", {
        name
      });
      const pitches = response.data.pitches;

      return pitches;
    } catch (error) {
      console.error("Sahalar aranırken bir hata oluştu:", error.response.data);
      Alert.alert("Hata", "Sahalar aranırken bir hata oluştu.");
      return [];
    }
  }


  async getPitchById(id) {
    try {
      const response = await axios.post(API_URL + "getPitchById", {
        id
      });
      const pitch = response.data.pitch;

      return pitch;
    } catch (error) {
      console.error("Sahalar aranırken bir hata oluştu:", error.response.data);
      Alert.alert("Hata", "Sahalar aranırken bir hata oluştu.");
      return [];
    }
  }

  async getPitchByDate(hour, date) {
    try {
      const response = await axios.post(API_URL + "getPitchByDate", {
        hour,
        date
      });
      const pitches = response.data.owners;


      return pitches;
    } catch (error) {
      console.error("Sahalar aranırken bir hata oluştu:", error.response.data);
      Alert.alert("Hata", "Sahalar aranırken bir hata oluştu.");
      return [];
    }
  }

  async reservePitch(pitchId, date, start_time) {
    const token = await readData("Token")
    console.log(token)
    try {
      const response = await axios.post(
        API_URL + "reservePitch",
        { pitchId, date, start_time },
        {
          headers: { "x-access-token": token }
        }
      );
      Alert.alert("Rezervasyon Başarılı:", `Saat: ${parseInt(start_time)} - ${parseInt(start_time)+1} arası rezerasyon talebiniz alındı.`);
      return response.data;
    } catch (error) {
      console.log("Rezervasyon yaparken bir hata oluştu:", error.response.data.error);
      Alert.alert("Rezervasyon yaparken bir hata oluştu:", error.response.data.error);
      return [];
    }
  }

  async addPitch(name, features) {
    const token = await readData("Token")
    console.log(token)
    try {
      const response = await axios.post(
        API_URL + "addPitch",
        { name, features},
        {
          headers: { "x-access-token": token }
        }
      );
      Alert.alert("Saha Ekleme Başarılı:");
      return response.data;
    } catch (error) {
      console.log("Rezervasyon yaparken bir hata oluştu:", error.response.data.error);
      Alert.alert("Rezervasyon yaparken bir hata oluştu:", error.response.data.error);
      return [];
    }
  }


  async cancelReservation(request) {
    token = await readData("Token")
    return axios.post(API_URL + "cancelReservation",{request}, { headers: { "x-access-token": token }}).
    then(async (res) => {
      return res.data
    }).catch((err) => {
      console.log(err.response.data)
    })
      ;
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
  // Hesaplama işlemini gerçekleştirin ve sonucu bir tam sayıya yuvarlayın
  const distance = Math.round(Math.sqrt((lat2 - lat1) ** 2 + (lng2 - lng1) ** 2));
  return distance;
}



export default new PitchServices();
