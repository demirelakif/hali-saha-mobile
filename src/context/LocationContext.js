import React, { createContext, useState, useContext, useEffect } from 'react';
import { readData, removeData, saveData } from '../storage/AsyncStorageManager'; // AsyncStorageManager'daki uygun fonksiyonları kullanabilirsiniz
import UserAuth from '../services/UserAuth';
import OwnerServices from '../services/OwnerServices';
import * as Location from 'expo-location';

// AuthContext oluşturuluyor
const LocationContext = createContext();

// AuthProvider bileşeni
export const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState(null);

    async function getLocation() {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                throw new Error('Konum izni reddedildi');
            }

            const location = await Location.getCurrentPositionAsync({});
            return {
                lat: location.coords.latitude,
                lng: location.coords.longitude
            };
        } catch (error) {
            console.error('Konum alınırken bir hata oluştu:', error);
            return null;
        }
    }

    useEffect(async()=>{
        const location =  await getLocation()
        setLocation(location)
        console.log(location)
    },[])


    // AuthContext değerlerini döndüren bir provider
    return (
        <LocationContext.Provider
            value={{
                location
            }}
        >
            {children}
        </LocationContext.Provider>
    );
};

// Özel bir hook oluşturuluyor
export const useLocation = () => useContext(LocationContext);
