import React, { useEffect, useState } from 'react';
import { Button, Platform, Text, View, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions, Image } from 'react-native'
import BackButton from '../components/BackButton'
import PitchCard from '../components/PitchCard'
import { ScrollView } from 'react-native-gesture-handler'
import PitchServices from '../services/PitchServices';

const CalendarScreen = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [selectedHour, setSelectedHour] = useState(null);
  const [showHours, setShowHours] = useState(false);
  const [showFilter, setShowFilter] = useState(false); // Filtre penceresi gösterimi
  const [pitches, setPitches] = useState(null)

  const currentYear = new Date().getFullYear(); // Şu anki yıl
  const maxDate = new Date(currentYear, 11, 31); // Şu anki yılın son günü

  const getPitches = async () => {
    try {
      console.log(date,selectedHour)
      const data = await PitchServices.getPitchByDate(selectedHour, date);
      setPitches(data);
    } catch (error) {
      console.log("Error searching pitches:", error);
    }
  };

  useEffect(() => {
    getPitches();
  }, [selectedHour, date]);


  const aylar = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık"
  ];

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios'); // iOS'ta her zaman gösterilmez
    setDate(currentDate);
    setShow(false)
  };

  const showDatePicker = () => {
    setShow(!show);
    setShowHours(false); // Saat seçimi görünümünü kapat
  };

  const showHourPicker = () => {
    setShowHours(!showHours); // Saat seçimi görünümünü aç
    setShow(false)
  };

  const selectHour = (hour) => {
    setSelectedHour(hour);
    setShowHours(false); // Saat seçimi görünümünü kapat
  };

  const filterByPoint = () => {
    console.log("Puana göre sırala")
    setShowFilter(false)
  }

  const filterByDistance = () => {
    console.log("Uzaklığa göre sırala")
    setShowFilter(false)
  }

  const renderHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      const hourStart = i.toString().padStart(2, '0');
      const hourEnd = (i + 1).toString().padStart(2, '0');
      const hourRange = `${hourStart}:00 - ${hourEnd}:00`;
      hours.push(
        <TouchableOpacity
          key={i}
          style={[styles.hourButton, selectedHour === i ? styles.selectedHourButton : null]}
          onPress={() => selectHour(i)}
        >
          <Text style={selectedHour === i ? styles.selectedHourText : styles.hourText}>{hourRange}</Text>
        </TouchableOpacity>
      );
    }
    return hours;
  };

  const getResult = () => {
    if (selectedHour !== null) {
      const selectedHourStart = selectedHour.toString().padStart(2, '0');
      const selectedHourEnd = (selectedHour + 1).toString().padStart(2, '0');
      const selectedHourRange = `${selectedHourStart}:00 - ${selectedHourEnd}:00`;
      return `Tarih: ${date.getDate()} ${aylar[date.getMonth()]} Saat: ${selectedHourRange}`;
    } else {
      return 'Please select an hour';
    }
  };


  const goToPitchDetail = (pitchId) => {
    navigation.navigate('Detail', { pitchId }); // 'PitchDetail' isimli sayfaya pitchId parametresiyle yönlendiriyoruz
  };

  return (
    <View style={styles.main}>
      <View style={styles.head}>
        <View style={styles.headText}>
          <Text style={styles.headTextStyle}>Hızlı Bul/Takvim</Text>
        </View>
      </View>

      <View style={styles.box}>
        <View style={styles.nearbyPitches}>
          <View style={styles.topButtons}>
            <TouchableOpacity style={styles.reservationBtn} onPress={showDatePicker}>
              <Image source={require("../assets/calendar.png")} style={styles.icon} />
              <Text style={[styles.textStyle, { color: "black", marginLeft: 6 }]}>Tarih Seç</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reservationBtn} onPress={showHourPicker}>
              <Image source={require("../assets/clock.png")} style={styles.icon} />
              <Text style={[styles.textStyle, { color: "black", marginLeft: 6 }]}>Saat Seç</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reservationBtn} onPress={() => setShowFilter(true)}>
              <Image source={require("../assets/filter.png")} style={[styles.icon, { marginRight: 0 }]} />
            </TouchableOpacity>
            {/* Filtre penceresi */}
            <Modal
              visible={showFilter}
              transparent={true}
              onRequestClose={() => setShowFilter(false)}
            >

              <View style={styles.filterContainer}>
                <View style={styles.filterContent}>
                  <TouchableOpacity style={styles.filterOption} onPress={filterByDistance}>
                    <Text style={[styles.dateText, { color: "black" }]}>En Yakına Göre Sırala</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterOption} onPress={filterByPoint}>
                    <Text style={[styles.dateText, { color: "black" }]}>Puana Göre Sırala</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterOption} onPress={() => setShowFilter(false)}>
                    <Text style={[styles.dateText, { color: "black" }]}>Kapat</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
          <Text style={styles.dateText}>{getResult()}</Text>
          {showHours && <View style={styles.hoursContainer}>{renderHours()}</View>}
          {show && (
            <><View style={{ backgroundColor: "white", borderRadius: 16 }}>
              <DateTimePicker
                minimumDate={new Date()}
                maximumDate={maxDate}
                style={{}}
                value={date}
                mode="date"
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                onChange={onChange} />
            </View>
            </>
          )}
          {pitches && !showHours && !show ?
            <ScrollView
            style={styles.scrollView}
            >

              {pitches.map((pitch, index) => (
                <PitchCard
                  key={index}
                  pitchName={pitch.name}
                  distance={pitch.distance}
                  rating={pitch.rating}
                  onPress={() => { goToPitchDetail(pitch._id) }}
                />
              ))}
            </ScrollView>
            :
            null
          }
        </View>
      </View>





    </View>
  );
}


const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  scrollView: {
    maxHeight: height/1.75,
    minHeight:400
  },
  hoursContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',

  },
  hourButton: {
    paddingHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 16,
    marginTop: 8,
    backgroundColor: '#eee',
  },
  selectedHourButton: {
    backgroundColor: '#39473A',
  },
  hourText: {
    fontSize: 10,
  },
  selectedHourText: {
    fontSize: 10,
    color: 'white',
  },
  resultText: {
    marginTop: 20,
    textAlign: 'center',
  },
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
  textAndImageRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 4,
    tintColor: "black"
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
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateText: {
    fontFamily: "Montserrat-SemiBold",
    marginTop: 8,
    color: "#F7F6DC",
    marginBottom:6
  },
  textStyle: {
    color: '#F7F6DC',
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
  },
  filterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 40,
    top: height / 5.8

  },
  filterContent: {
    backgroundColor: '#F7F6DC',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    width: '100%',
    alignItems: 'center',
  },
  filterText: {
    fontSize: 18,
  },
});

export default CalendarScreen;
