import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';

const RequestCard = ({ name, phone, date, onPressDecline, onPressAccept}) => {
    return (
        <View style={styles.card}>
            <View style={{ flexDirection: 'column' }}>
                <Text style={{ fontFamily: "Montserrat-SemiBold" }}>{name}</Text>
                <Text style={{ marginTop: 12, fontFamily: "Montserrat-Medium" }}>{phone}</Text>
                <View style={styles.bottomContainer}>
                    <Text style={{ fontFamily: "Montserrat-Medium" }}>{date}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={onPressDecline}>
                            <Image style={styles.icon} source={require("../assets/x.png")} />
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={onPressAccept}>
                            <Image style={[styles.icon, { marginLeft: 8 }]} source={require("../assets/tick.png")} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 34,
        marginBottom: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        elevation: 2,
        maxWidth: "auto",
    },
    icon: {
        width: 24,
        height: 24
    },
    title: {
        fontSize: 20,
        fontFamily: 'Montserrat-Medium',
        marginBottom: 6,
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
        justifyContent: 'space-between'
    },
    starView: {
        flexDirection: 'row'
    },
    textView: {
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    distance: {
        marginLeft: 2,
        fontFamily: "Montserrat-Medium",
        fontSize: 12
    },
    kmText: {
        marginLeft: 0,
        fontFamily: "Montserrat-Medium",
        fontSize: 8
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

export default RequestCard