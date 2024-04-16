import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackButton from '../components/BackButton';
import PitchCard from '../components/PitchCard';
import DateTimePicker from '@react-native-community/datetimepicker';
import ButtonLarge from '../components/ButtonLarge';
import ButtonLargeOutline from '../components/ButtonLargeOutline';
import PitchServices from '../services/PitchServices';
import { useNavigation } from '@react-navigation/native';

const ReservationScreen = ({ route }) => {
  const navigation = useNavigation()
  const [showHours, setShowHours] = useState(true);
  const [selectedHour, setSelectedHour] = useState(null);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const currentYear = new Date().getFullYear(); // Şu anki yıl
  const maxDate = new Date(currentYear, 11, 31); // Şu anki yılın son günü
  const [pitch, setPitch] = useState(null)

  const getPitch = async () => {
    try {
      const data = await PitchServices.getPitchById(route.params.pitchId);
      setPitch(data);
    } catch (error) {
      console.log("Error searching pitches:", error);
    }
  };

  useEffect(() => {
    getPitch();
  }, []);


  const goBack = () => {
    navigation.goBack()
  }

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

  const selectHour = (hour) => {
    setSelectedHour(hour);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios'); // iOS'ta her zaman gösterilmez
    setDate(currentDate);
    setShow(false)
  };

  const showDatePicker = () => {
    setShow(true);
  };

  const handleReservation = () => {
    const selectedHourStart = selectedHour.toString().padStart(2, '0');
    console.log(pitch._id,date,selectedHourStart)
    PitchServices.reservePitch(pitch._id,date,selectedHourStart)
  }

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



  return (
    <View style={styles.main}>
      <View style={styles.head}>
        <TouchableOpacity style={styles.backButton} onPress={() => { goBack() }}>
          <BackButton icon={require('../assets/outlineBack.png')} />
        </TouchableOpacity>
        <View style={styles.headText}>
          <Text style={styles.headTextStyle}>Rezervasyon</Text>
        </View>
      </View>
      <View style={styles.bottomMain}>
        <View style={styles.selectedContainer}>
          <Text style={styles.selectedHeadText}>
            Halı Saha Seçimi
          </Text>
          <PitchCard dontShowBtn={1} dontShowDist={1} pitchName={pitch && pitch.name} rating={pitch && pitch.rating} />
        </View>
        <View style={styles.hourContainer}>
          <Text style={styles.selectedHeadText}>
            Tarih Ve Saat Seçimi
          </Text>
          <TouchableOpacity style={styles.reservationBtn} onPress={showDatePicker}>
            <Image source={require("../assets/calendar.png")} style={styles.icon} />
            <Text style={[styles.textStyle, { color: "black", marginLeft: 6 }]}>Tarih Seç</Text>
          </TouchableOpacity>
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
        </View>

        <View style={{marginTop:28}}>
          <ButtonLargeOutline onpress={handleReservation} text={"Rezerasyon Yap"}></ButtonLargeOutline>
        </View>
      </View>
    </View>
  )


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
  dateText: {
    fontFamily: "Montserrat-SemiBold",
    marginTop: 8,
    color: "#F7F6DC",
    marginBottom: 6
  },
  scrollView: {
    maxHeight: height / 1.75,
    minHeight: 400
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
    backgroundColor: "#7FB77E",
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
  reservationBtn: {
    alignSelf: 'baseline',
    flexDirection: 'row',
    backgroundColor: "#B1D7B4",
    borderRadius: 16,
    borderColor: "#F7F6DC",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 6
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 4,
    tintColor: "black"
  },
  bottomMain: {
    marginHorizontal: 40
  },
  selectedHeadText: {
    color: 'white',
    fontSize: 20,
    fontFamily: "Montserrat-ExtraBold",
    marginBottom: 6
  },
  selectedContainer: {
    flexDirection: "column",
    marginTop: 28
  },
  hourContainer: {
    flexDirection: "column",
    marginTop: 18
  },
});

export default ReservationScreen