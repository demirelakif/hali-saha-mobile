import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Image, Alert, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackButton from '../components/BackButton';
import FormInputBox from '../components/FormInputBox';
import { ScrollView } from 'react-native-gesture-handler';
import ButtonLarge from '../components/ButtonLarge';


const features = [
    { key: 'dus', image: require('../assets/shower.png'), text: 'Duş' },
    { key: 'eldiven', image: require('../assets/glove.png'), text: 'Eldiven' },
    { key: 'fileVarMi', image: require('../assets/net.png'), text: 'File' },
    { key: 'icecekIkrami', image: require('../assets/drink.png'), text: 'İçecek\nServisi' },
    { key: 'playground', image: require('../assets/playground.png'), text: 'Oyun\nAlanı' },
    { key: 'tribun', image: require('../assets/tribun.png'), text: 'Tribün' },
    { key: 'parkAlani', image: require('../assets/park.png'), text: 'Park Alanı' },
    { key: 'kapaliMi', image: require('../assets/roof.png'), text: 'Üstü\nKapalı' },
    { key: 'kilitliDolap', image: require('../assets/wardrobe.png'), text: 'Dolap' },
    { key: 'kramponHizmeti', image: require('../assets/shoes.png'), text: 'Krampon' },
];

const AddPitchScreen = () => {
    const [pitchName, setPitchName] = useState(null)


    const [selectedFeatures, setSelectedFeatures] = useState([]);

    // Özelliği seçmek için bir işlev
    const toggleFeature = (feature) => {
        if (selectedFeatures.includes(feature)) {
            // Seçili ise, kaldır
            setSelectedFeatures(selectedFeatures.filter((f) => f !== feature));
        } else {
            // Değilse, ekle
            setSelectedFeatures([...selectedFeatures, feature]);
        }
    };

    // Her bir özelliği göstermek için bir öğe bileşeni
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.featureContainer,
                selectedFeatures.includes(item.key) && styles.selected,
            ]}
            onPress={() => toggleFeature(item.key)}
        >
            <Image source={item.image} style={styles.image} />
            <Text style={styles.text}>{item.text}</Text>
        </TouchableOpacity>
    );


    return (
        <View style={styles.main}>
            <View style={styles.head}>
                <TouchableOpacity style={styles.backButton} onPress={() => { goBack() }}>
                    <BackButton icon={require('../assets/outlineBack.png')} />
                </TouchableOpacity>
                <View style={styles.headText}>
                    <Text style={styles.headTextStyle}>Saha Ekle</Text>
                </View>
            </View>

            <ScrollView style={styles.bottomContainer}>
                <FormInputBox placeholder={"Saha İsmi"} text={pitchName} onChangeText={setPitchName} />
                <View style={styles.selectServicesContainer}>
                    <Text style={styles.textSubHead}>Hizmet Ekle</Text>
                    <FlatList
                        data={features}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.key}
                        numColumns={3} // İkili sütunlar halinde görüntülemek için
                    />
                </View>
                <ButtonLarge text={"Ekle"} onPress={()=>{console.log(selectedFeatures)}}/>
            </ScrollView>
        </View>
    )
}


const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({

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
    bottomContainer: {
        flexDirection: 'column',
        marginHorizontal: 24,
        marginTop: 18
    },
    selectServicesContainer: {
        marginTop:18
    },
    textSubHead: {
        fontFamily: "Montserrat-ExtraBold",
        fontSize: 24,
        color: "black"
    },
    featureContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
      },
      selected: {
        backgroundColor: '#cceeff', // Seçilen özellikler için farklı bir renk
      },
      image: {
        width: 50,
        height: 50,
      },
      text: {
        textAlign: 'center',
      },

})


export default AddPitchScreen