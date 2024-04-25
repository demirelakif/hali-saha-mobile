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
import ReservationScreen from '../screens/ReservationScreen';
import HoursScreen from '../screens/HoursScreen';
import AddPitchScreen from '../screens/AddPitchScreen';
import RequestsScreen from '../screens/RequestsScreen';
import OwnerCalendarScreen from '../screens/OwnerCalendarScreen'
import OwnerHomeScreen from '../screens/OwnerHomeScreen';
import OwnerLoginScreen from '../screens/OwnerLoginScreen';
import OwnerRegisterScreen from '../screens/OwnerRegisterScreen';


const Stack = createStackNavigator();

const StackNavigator = () => {
  const { loggedIn, checkLoggedIn, ownerLoggedIn } = useAuth();
  console.log("User Logged In", loggedIn)
  console.log("Owner Logged In", ownerLoggedIn)
  useEffect(() => {
    checkLoggedIn()
  }, [])
  return (
    <Stack.Navigator>
      {
        !loggedIn && !ownerLoggedIn ?
          <>
            <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterScreen} />
            <Stack.Screen options={{ headerShown: false }} name="OwnerLogin" component={OwnerLoginScreen} />
            <Stack.Screen options={{ headerShown: false }} name="OwnerRegister" component={OwnerRegisterScreen} />
          </>
          :
          loggedIn && !ownerLoggedIn ?
            <>
              <Stack.Screen options={{ headerShown: false }} name="Stack" component={TabNavigator} />
              <Stack.Screen options={{ headerShown: false }} name="Detail" component={DetailScreen} />
              <Stack.Screen options={{ headerShown: false }} name="Reservation" component={ReservationScreen} />
              <Stack.Screen options={{ headerShown: false }} name="Hours" component={HoursScreen} />
            </>
            :

            <>
              <Stack.Screen options={{ headerShown: false }} name="OwnerHome" component={OwnerHomeScreen} />
              <Stack.Screen options={{ headerShown: false }} name="OwnerCalendar" component={OwnerCalendarScreen} />
              <Stack.Screen options={{ headerShown: false }} name="AddPitch" component={AddPitchScreen} />
              <Stack.Screen options={{ headerShown: false }} name="Detail" component={DetailScreen} />
            </>

      }


      {/* <Stack.Screen options={{headerShown:false}} name="Home" component={OwnerLoginScreen} /> */}
      {/* <Stack.Screen options={{headerShown:false}} name="Profile" component={ProfileScreen} /> */}

      {/* <Stack.Screen options={{headerShown:false}} name="Stack" component={CalendarScreen} /> */}
    </Stack.Navigator>
  );
}

export default StackNavigator;