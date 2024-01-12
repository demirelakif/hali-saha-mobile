import { View, Text, KeyboardAvoidingView, StyleSheet, Keyboard, Image, useWindowDimensions, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Colors from '../constants/Colors'
import BackButton from '../components/BackButton'
import PhoneInput from '../components/PhoneInput'
import ButtonLarge from '../components/ButtonLarge'
import { readData, readSecureData } from '../storage/AsyncStorageManager'

const VertificationScreen = ({ navigation }) => {
    const [token, setToken] = useState(null)
    useEffect(() => {
        // Veriyi okuma
        const token = readData('token');
        setToken(token)
      }, []);

    const handleScreenPress = () => {
        Keyboard.dismiss()
    }
    const goToLogin = () => {
        navigation.navigate("Login")
    }
    return (
        <KeyboardAvoidingView behavior='padding' style={styles.main}>
            <View onPress={handleScreenPress}>
                <View style={styles.topContainer}>
                    <View style={styles.head}>
                        <View style={styles.backButton}>
                            <BackButton onpress={goToLogin} icon={require('../assets/outlineBack.png')} />
                        </View>
                        <View style={styles.headText}>
                            <Text style={styles.headTextStyle}>Doğrulama</Text>
                        </View>
                    </View>
                    <TouchableWithoutFeedback style={styles.imageContainer} onPress={handleScreenPress}>
                        <Image style={styles.image} source={require('../assets/vertification-man.png')} />
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.downContainer}>
                    <View style={styles.downView}>
                        <PhoneInput onOtpChange={((change) => { console.log(change) })} />
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.didntGetFavContainer}>
                            <Text style={styles.dorulamaKoduAlmadn}>{`Doğrulama kodu almadın mı? `}</Text>
                            <Text style={styles.yenidenGnder}>Yeniden gönder</Text>
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.button}>
                        <ButtonLarge icon={true} text={"Doğrula"} />
                    </View>
                    <Text></Text>
                </View>

            </View>
        </KeyboardAvoidingView>
    )
}


const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create(
    {
        main: {
            backgroundColor: "white",
            flex: 1
        },
        backButton: {
            marginLeft: 24
        },
        downView: {
            marginHorizontal: 40,
            marginTop: 24
        },
        topContainer: {
            backgroundColor: "#b1d7b4",
            width: width,
            height: height / 2,
        },
        head: {
            flexDirection: 'row',
            marginTop: 54,
            alignItems: 'center',

        },
        headText: {
            marginLeft: 16
        },
        headTextStyle: {
            fontSize: 27,
            fontFamily: "Montserrat-ExtraBold",
            color: "#18191f",
            textAlign: "center"
        },
        imageContainer: {
            alignSelf: 'center',
        },
        image: {
            width: 163,
            height: 431
        },
        downContainer: {
            backgroundColor: "white",
            marginHorizontal: 24
        },
        dorulamaKoduAlmadn: {
            fontFamily: "Montserrat-Medium",
            color: "#18191f"
        },
        yenidenGnder: {
            fontFamily: "Montserrat-Bold",
            color: "#7fb77e"
        },
        didntGetFavContainer: {
            fontSize: 13,
            lineHeight: 18,
            textAlign: "center",
            width: 327,
            alignSelf: 'center'
        },
        button: {
            marginTop: 24
        }
    });

export default VertificationScreen