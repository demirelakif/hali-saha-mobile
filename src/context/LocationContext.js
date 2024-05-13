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
            const lat = location.coords.latitude
            const lng = location.coords.longitude
            setLocation({lat,lng})
            return {
                lat: location.coords.latitude,
                lng: location.coords.longitude
            };
        } catch (error) {
            console.error('Konum alınırken bir hata oluştu:', error);
            return null;
        }
    }

    useEffect(()=>{
        // const location = getLocation()
        // setLocation(location)
        getLocation();
    },[])


    // AuthContext değerlerini döndüren bir provider
    return (
        <LocationContext.Provider
            value={{
                location,
                getLocation
            }}
        >
            {children}
        </LocationContext.Provider>
    );
};

// Özel bir hook oluşturuluyor
export const useLocation = () => useContext(LocationContext);
