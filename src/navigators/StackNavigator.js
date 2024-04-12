import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import VertificationScreen from '../screens/VertificationScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import TabNavigator from './TabNavigator';
import DetailScreen from '../screens/DetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CalendarScreen from '../screens/CalendarScreen';
import { useEffect, useState } from 'react';
import { readData, removeData } from '../storage/AsyncStorageManager';
import { useAuth } from '../context/AuthContext';


const Stack = createStackNavigator();

const StackNavigator = () => {
  const { loggedIn,checkLoggedIn} = useAuth();
  useEffect(()=>{
    checkLoggedIn()
  },[])
  return (
    <Stack.Navigator>
      {
        !loggedIn ?
          <>
            <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterScreen} />
          </>
          :
          <Stack.Screen options={{ headerShown: false }} name="Stack" component={TabNavigator} />
      }
      {/* <Stack.Screen options={{headerShown:false}} name="Vertification" component={VertificationScreen} /> */}
      {/* <Stack.Screen options={{headerShown:false}} name="Home" component={HomeScreen} /> */}
      {/* <Stack.Screen options={{headerShown:false}} name="Profile" component={ProfileScreen} /> */}

      {/* <Stack.Screen options={{headerShown:false}} name="Stack" component={CalendarScreen} /> */}
    </Stack.Navigator>
  );
}

export default StackNavigator;