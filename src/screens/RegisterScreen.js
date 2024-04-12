import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import FormInputBox from '../components/FormInputBox'
import Colors from '../constants/Colors'
import ButtonLarge from '../components/ButtonLarge'
import { useNavigation } from '@react-navigation/native'
import ButtonLargeOutline from '../components/ButtonLargeOutline'
import BackButton from '../components/BackButton'
import UserAuth from '../services/UserAuth'

const RegisterScreen = ({navigation}) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleScreenPress = () =>{
        Keyboard.dismiss()
    }
    const navigateToLogin = () =>{
        navigation.navigate("Login")
    }
    const handleRegister = async() =>{
        const res = await UserAuth.signup(name,phoneNumber,password)
        if(res){
            navigateToLogin()
        }
    }
    return (
        <KeyboardAvoidingView behavior='height' style={styles.main}>
            <View style={styles.marginView}>
                <View style={styles.backButton}>
                    <BackButton onpress={navigateToLogin} icon={require('../assets/outlineBack.png')}/>
                </View>
                <View style={styles.loginForm}>
                    <TouchableWithoutFeedback style={styles.formText}  onPress={handleScreenPress} >
                        <Text style={styles.textStyle}>Kayıt Ol</Text>
                    </TouchableWithoutFeedback>
                    <View style={styles.nameLabel}>
                        <FormInputBox icon={require("../assets/user.png")} placeholder={"İsim"} text={name} onChangeText={setName} />
                    </View>
                    <View style={styles.phoneLabel}>
                        <FormInputBox icon={require("../assets/phone.png")} numeric={true} placeholder={"Telefon"} text={phoneNumber} onChangeText={setPhoneNumber} />
                    </View>
                    <View style={styles.passwordLabel}>
                        <FormInputBox icon={require("../assets/lock.png")} placeholder={"Şifre"} text={password} onChangeText={setPassword} />
                    </View>
                    <View style={styles.buttonView}>
                        <ButtonLargeOutline text={"Kayıt Ol"} onpress={handleRegister} />
                    </View>
                    <TouchableOpacity style={styles.goRegisterView} onPress={navigateToLogin}>
                        <Text style={styles.yeniMisinKaytContainer}>
                            <Text style={styles.yeniMisin}>{`Üyeliğin Var Mı? `}</Text>
                            <Text style={styles.kaytOl}>Giriş Yap</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    main: {
        backgroundColor: Colors.bgColor,
        flex: 1
    },
    backButton:{
        top:54,
        position:"absolute"
    },
    marginView: {
        marginHorizontal: 24,
    },
    logoView: {
        alignItems: 'center',
        marginTop:60
    },
    loginForm: {
        marginTop:130
    },
    formText: {
        alignItems: 'center',
        marginTop:84
    },
    textStyle: {
        fontSize: 36,
        lineHeight: 40,
        fontFamily: "Montserrat-ExtraBold",
        color: Colors.textColor,
        textAlign: "center",
        width: 327

    },
    nameLabel:{
        marginTop:24
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



    goRegisterView:{
        marginTop:32
    },
    yeniMisin: {
        fontFamily: "Montserrat-Medium",
        color: Colors.textColor,
        },
        kaytOl: {
        fontFamily: "Montserrat-Bold",
        color:  Colors.textGreen,
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

export default RegisterScreen