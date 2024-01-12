import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const PhoneInput = ({ onOtpChange }) => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputs = useRef([]);

    const handleOtpChange = (value, index) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move focus to the next box if the current one has a value
        if (value && index < newOtp.length - 1) {
            inputs.current[index + 1]?.focus();
        }

        // Move focus to the previous box if the current one is empty
        if (!value && index > 0) {
            inputs.current[index - 1]?.focus();
        }

        // Pass the updated OTP value to the parent component
        const updatedOtp = newOtp.join('');
        onOtpChange(updatedOtp);
    };

    return (
        <View style={styles.container}>
            {otp.map((digit, index) => (
                <TextInput
                    key={index}
                    style={styles.box}
                    maxLength={1}
                    placeholder='_'
                    placeholderTextColor={"black"}
                    keyboardType="numeric"
                    onChangeText={(value) => handleOtpChange(value, index)}
                    value={digit}
                    ref={(input) => {
                        inputs.current[index] = input;
                    }}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        borderWidth: 1,
        borderColor: 'black',
        width: 56,
        height: 56,
        margin: 16,
        borderRadius: 16,
        textAlign: 'center',
        fontSize: 24,
        fontFamily: "Montserrat-ExtraBold",
        color: "#18191f",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
});

export default PhoneInput;
