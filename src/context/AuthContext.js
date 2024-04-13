import React, { createContext, useState, useContext, useEffect } from 'react';
import { readData, removeData, saveData } from '../storage/AsyncStorageManager'; // AsyncStorageManager'daki uygun fonksiyonları kullanabilirsiniz

// AuthContext oluşturuluyor
const AuthContext = createContext();

// AuthProvider bileşeni
export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(true);

    // AsyncStorage'den token okuma işlevi
    const checkLoggedIn = async () => {
        const token = await readData("Token");
        if (!token) {
            setLoggedIn(false);
        }else{
            setLoggedIn(true)
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
    };

    // AuthContext değerlerini döndüren bir provider
    return (
        <AuthContext.Provider
            value={{
                loggedIn,
                signOut,
                checkLoggedIn,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Özel bir hook oluşturuluyor
export const useAuth = () => useContext(AuthContext);
