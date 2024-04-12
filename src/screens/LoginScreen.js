import { View, Text, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native'
import React, { useState } from 'react'
import Colors from '../constants/Colors';
import mvImage from "../assets/MV.png"
import MVText from '../components/MVText';
import FormInputBox from '../components/FormInputBox';
import ButtonLarge from '../components/ButtonLarge';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AsyncStorageManager, { saveData, saveSecureData } from '../storage/AsyncStorageManager';
import UserAuth from '../services/UserAuth';
import { useAuth } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    const { checkLoggedIn} = useAuth();
    const handleScreenPress = () => {
        Keyboard.dismiss()
    }
    const goToRegister = async () => {
        navigation.navigate("Register")

    }
    const handleLogin = async() => {
        const token = await UserAuth.signin(phoneNumber,password)
        if(token){
            checkLoggedIn();
            // navigation.navigate('Vertification')
        }
        
    }
    return (
        <View style={styles.main}>
            <View style={styles.marginView}>
                <TouchableWithoutFeedback style={styles.logoView} onPress={handleScreenPress}>
                    <MVText />
                </TouchableWithoutFeedback>
                <View style={styles.loginForm}>
                    <TouchableWithoutFeedback style={styles.formText} onPress={handleScreenPress}>
                        <Text style={styles.textStyle}>Giriş Yap</Text>
                    </TouchableWithoutFeedback>
                    <View style={styles.phoneLabel}>
                        <FormInputBox
                            icon={require("../assets/phone.png")}
                            numeric={true}
                            placeholder={"Telefon"}
                            text={phoneNumber}
                            onChangeText={setPhoneNumber}
                        />

                    </View>
                    <View style={styles.passwordLabel}>
                        <FormInputBox 
                        icon={require("../assets/lock.png")} 
                        placeholder={"Şifre"} 
                        text={password}
                        onChangeText={setPassword}
                        />
                    </View>
                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>Şifremi Unuttum</Text>
                    </TouchableOpacity>
                    <View style={styles.buttonView}>
                        <ButtonLarge text={"Giriş"} onPress={(handleLogin)} />
                    </View>
                    <TouchableOpacity style={styles.goRegisterView} onPress={goToRegister}>
                        <Text style={styles.yeniMisinKaytContainer}>
                            <Text style={styles.yeniMisin}>{`Yeni misin? `}</Text>
                            <Text style={styles.kaytOl}>Kayıt ol</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    main: {
        backgroundColor: Colors.bgColor,
        flex: 1
    },
    marginView: {
        marginHorizontal: 24,
    },
    logoView: {
        alignItems: 'center',
        marginTop: 60
    },
    loginForm: {
        marginTop: 60
    },
    formText: {
        alignItems: 'center',
        marginTop: 24
    },
    textStyle: {
        fontSize: 36,
        lineHeight: 40,
        fontFamily: "Montserrat-ExtraBold",
        color: Colors.textColor,
        textAlign: "center",
        width: 327

    },
    phoneLabel: {
        marginTop: 24
    },
    passwordLabel: {
        marginTop: 24
    },
    forgotPassword: {
        width: "100%",
        height: 18,
        marginTop: 4,//akomastika
    },
    forgotPasswordText: {
        fontSize: 13,
        lineHeight: 18,
        fontFamily: "Montserrat-Medium",
        color: Colors.textGreen,
        textAlign: "left",
        width: 327
    },
    buttonView: {
        marginTop: 24
    },



    goRegisterView: {
        marginTop: 32
    },
    yeniMisin: {
        fontFamily: "Montserrat-Medium",
        color: Colors.textColor,
    },
    kaytOl: {
        fontFamily: "Montserrat-Bold",
        color: Colors.textGreen,
    },
    yeniMisinKaytContainer: {
        fontSize: 13,
        textAlign: "center",
    },
    yeniMisinKaytOlParent: {
        flex: 1,
        width: "100%",
        height: 18
    }


});

export default LoginScreen