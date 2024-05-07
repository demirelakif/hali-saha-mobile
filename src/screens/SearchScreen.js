import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native';
import PitchCard from '../components/PitchCard';
import PitchServices from '../services/PitchServices';
import FormInputBox from '../components/FormInputBox';
import OwnerServices from '../services/OwnerServices';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedPitches, setSearchedPitches] = useState([]);

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      searchPitches();
    } else {
      setSearchedPitches([]);
    }
  }, [searchQuery]);

  const searchPitches = async () => {
    try {
      const data = await OwnerServices.searchOwnersByName(searchQuery);
      setSearchedPitches(data);
    } catch (error) {
      console.log("Error searching pitches:", error);
    }
  };


  const goToPitchDetail = (pitchId) => {
    navigation.navigate('Detail', { pitchId }); // 'PitchDetail' isimli sayfaya pitchId parametresiyle yönlendiriyoruz
  };

  return (
    <View style={styles.main}>
      <View style={styles.head}>
        <View style={styles.headText}>
          <Text style={styles.headTextStyle}>Ara</Text>
        </View>
      </View>

      <View style={styles.box}>
        <View style={styles.nearbyPitches}>
          <View style={styles.textAndImage}>
            <FormInputBox
              placeholder={"Saha ara"}
              value={searchQuery}
              onChangeText={setSearchQuery}
              icon={require('../assets/search.png')}
            />
          </View>
          <ScrollView style={styles.scrollView}>
            {searchedPitches.map((pitch, index) => (
              <PitchCard
                key={index}
                pitchName={pitch.name}
                distance={pitch.distance}
                rating={pitch.rating}
                onPress={() => { goToPitchDetail(pitch.owner) }}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  main: {
    backgroundColor: "white",
    flex:1
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
    maxHeight: 430,
  },
  textAndImage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginTop: 24,
  },
});

export default SearchScreen;
