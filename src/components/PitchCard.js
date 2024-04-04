import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons, SimpleLineIcons } from '@expo/vector-icons'; // AntDesign kütüphanesini kullanarak yıldız ikonlarını ekliyoruz

const PitchCard = ({ distance, rating, pitchName, onPress }) => {
    // Yıldız ikonlarını oluşturmak için bir fonksiyon
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <Ionicons
                    key={i}
                    name={i <= rating ? 'star-sharp' : 'star-outline'}
                    size={16}
                    color={i <= rating ? '#FFC090' : '#D9D9D9'}
                />
            );
        }
        return stars;
    };

    return (
        <View style={styles.card}>
            <Text style={styles.title}>{pitchName}</Text>
            <View style={styles.bottomContainer}>
                <View style={styles.starView}>
                    {renderStars(rating)}
                </View>
                <View style={styles.distanceView}>
                    <SimpleLineIcons name="location-pin" size={16} color="black" />
                    <View style={styles.textView}>
                        <Text style={styles.distance}>{distance}</Text>
                        <Text style={styles.kmText}>km</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={onPress}>
                    <Text style={styles.buttonText}>Devam et</Text>
                    <AntDesign name="right" size={10} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#F7F6DC',
        borderRadius: 34,
        marginBottom: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        elevation: 2,
        maxWidth: "auto",
    },
    title: {
        fontSize: 20,
        fontFamily: 'Montserrat-Medium',
        marginBottom: 6,
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop:6
    },
    starView: {
        flexDirection: 'row'
    },
    textView:{
        flexDirection:'row',
        alignItems:'baseline'
    },
    distance: {
        marginLeft:2,
        fontFamily:"Montserrat-Medium",
        fontSize:12
    },
    kmText:{
        marginLeft:0,
        fontFamily:"Montserrat-Medium",
        fontSize:8
    },
    distanceView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#39473A',
        paddingVertical: 4,
        paddingHorizontal: 6,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'Montserrat-ExtraBold',
        fontSize: 8,
    },
});

export default PitchCard;
