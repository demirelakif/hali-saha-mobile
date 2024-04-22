import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackButton from '../components/BackButton';
import PitchCard from '../components/PitchCard';
import RequestCard from '../components/RequestCard';

const RequestsScreen = () => {
    return (
        <View style={styles.main}>
            <View style={styles.head}>
                <TouchableOpacity style={styles.backButton} onPress={() => { goBack() }}>
                    <BackButton icon={require('../assets/outlineBack.png')} />
                </TouchableOpacity>
                <View style={styles.headText}>
                    <Text style={styles.headTextStyle}>İstekler</Text>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.selectedContainer}>
                    <Text style={styles.selectedHeadText}>
                        Halı Saha Seçimi
                    </Text>
                    <PitchCard dontShowBtn={1} dontShowDist={1} pitchName="Akasya Halı Saha" rating={3} />
                </View>
                <Text style={styles.selectedHeadText}>
                    İstekler
                </Text>
                <RequestCard name={"Mehmet Karadüldül"} phone={"+90 536 212 09 85"} date={"13 Nisan Perşembe 21.00-22.00"}/>
            </View>
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
        marginHorizontal: 24,
        flexDirection: 'column',
        marginTop: 18
    },
    selectedHeadText: {
        color: 'white',
        fontSize: 20,
        fontFamily: "Montserrat-ExtraBold",
        marginBottom: 6
    },

})


export default RequestsScreen