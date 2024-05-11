import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackButton from '../components/BackButton';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import OwnerServices from '../services/OwnerServices';

const NotificationScreen = () => {

    const navigation = useNavigation()
    const [myRequests, setMyRequests] = useState([]);

    const goBack = () => {
        navigation.goBack()
    }

    const handleAccept = (pitchId,reservationId) => {
        const res = OwnerServices.acceptRequest(pitchId,reservationId,"Meşgul")
        console.log(res)
    }

    useEffect(() => {
        async function fetchData() {
            const requests = await OwnerServices.getMyRequests()
            setMyRequests(requests)
            console.log(requests)
        }

        fetchData();

    }, [])

    return (
        <View style={styles.main}>
            <View style={styles.head}>
                <TouchableOpacity style={styles.backButton} onPress={() => { goBack() }}>
                    <BackButton icon={require('../assets/outlineBack.png')} />
                </TouchableOpacity>
                <View style={styles.headText}>
                    <Text style={styles.headTextStyle}>Bildirimler</Text>
                </View>
            </View>

            <ScrollView style={styles.scrollView}>
                {
                    myRequests ?
                        myRequests.map(
                            (request) => (
                                <View style={styles.requestCard}>
                                    <View>
                                        <Text style={styles.textStyle}>{request.pitchName}</Text>
                                        <Text style={styles.textStyle}>{new Date(request.date).toDateString()}</Text>
                                        <Text style={styles.textStyle}>{request.time + ":00 - " + (parseInt(request.time) + 1) + ":00"}</Text>

                                    </View>
                                    <View style={{ alignItems: 'flex-end' }}>
                                        <Text style={styles.textStyle}>{request.username}</Text>
                                        <Text style={styles.textStyle}>{request.phoneNumber}</Text>
                                        <View style={{ flexDirection: 'row'}}>
                                            <TouchableOpacity onPress={{}}>
                                                <Image style={{ width: 24, height: 24}} source={require("../assets/x.png")} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={handleAccept(request.pitchId,request.reservationDayId)}>
                                                <Image style={{ width: 24, height: 24, tintColor: "green",marginLeft:24 }} source={require("../assets/tick.png")} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            ))
                        :
                        null
                }
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
    buttons: {
        marginTop: 18,
        flexDirection: 'row',
        justifyContent: 'flex-end'
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
    scrollView: {
        maxHeight: 430,
        minHeight: 320,
        marginTop: 24
    },
    requestCard: {
        marginHorizontal: 24,
        backgroundColor: "gray",
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textStyle: {
        fontFamily: "Montserrat-SemiBold",
        color: "white"
    }
})


export default NotificationScreen