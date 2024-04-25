import React, { createContext, useState, useContext, useEffect } from 'react';
import { readData, removeData, saveData } from '../storage/AsyncStorageManager'; // AsyncStorageManager'daki uygun fonksiyonları kullanabilirsiniz
import UserAuth from '../services/UserAuth';
import OwnerServices from '../services/OwnerServices';

// AuthContext oluşturuluyor
const AuthContext = createContext();

// AuthProvider bileşeni
export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(true);
    const [ownerLoggedIn, setOwnerLoggedIn] = useState(false)

    // AsyncStorage'den token okuma işlevi
    const checkLoggedIn = async () => {
        const token = await readData("Token");  // Token'ı oku
        const userFailed = await UserAuth.checkUser();  // Kullanıcı giriş kontrolü
        const ownerFailed = await OwnerServices.checkOwner();  // Sahip giriş kontrolü
        //removeData("Token")
        // Eğer token yoksa, her iki durumu da oturum kapalı yap
        if (!token) {
            console.log("Token yok. Girdi");
            setLoggedIn(false);
            setOwnerLoggedIn(false);
            removeData("Token");  // Token'ı kaldır
        } else {
            // Eğer owner giriş yapmışsa
            if (ownerFailed) {
                console.log("Owner girdi");
                setOwnerLoggedIn(true);  // Owner logged in
                setLoggedIn(false);  // User logged out
            } 
            // Eğer user giriş yapmışsa
            else if (userFailed) {
                console.log("User girdi");
                setLoggedIn(true);  // User logged in
                setOwnerLoggedIn(false);  // Owner logged out
            } 
            // Eğer ne owner ne de user giriş yapmamışsa
            else {
                console.log("Herhangi biri giriş yapmamış");
                setLoggedIn(false);  // User logged out
                setOwnerLoggedIn(false);  // Owner logged out
            }
        }
    };

    // useEffect(()=>{
    //     if(!loggedIn){
    //         checkLoggedIn()
    //     }
        
    // })

    // Çıkış işlevi
    const signOut = async () => {
        await removeData("Token");
        setLoggedIn(false);
        setOwnerLoggedIn(false);
    };

    // AuthContext değerlerini döndüren bir provider
    return (
        <AuthContext.Provider
            value={{
                loggedIn,
                signOut,
                checkLoggedIn,
                ownerLoggedIn
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Özel bir hook oluşturuluyor
export const useAuth = () => useContext(AuthContext);
