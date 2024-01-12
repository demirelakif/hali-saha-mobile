// AsyncStorageManager.js

import AsyncStorage from '@react-native-async-storage/async-storage';

const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log(`Data saved to AsyncStorage with key: ${key}`);
  } catch (error) {
    console.error(`Error saving data to AsyncStorage with key ${key}: `, error);
  }
};

const readData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log(`Data read from AsyncStorage with key ${key}:`, value);
      return value;
    }
  } catch (error) {
    console.error(`Error reading data from AsyncStorage with key ${key}: `, error);
  }
};

const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Data removed from AsyncStorage with key: ${key}`);
  } catch (error) {
    console.error(`Error removing data from AsyncStorage with key ${key}: `, error);
  }
};

export { saveData, readData, removeData };
