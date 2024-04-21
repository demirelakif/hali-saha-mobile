import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackButton from '../components/BackButton';

const OwnerCalendarScreen = () => {
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

})


export default OwnerCalendarScreen