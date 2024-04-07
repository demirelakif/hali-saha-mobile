import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import VertificationScreen from '../screens/VertificationScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import TabNavigator from './TabNavigator';
import DetailScreen from '../screens/DetailScreen';
import ProfileScreen from '../screens/ProfileScreen';


const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen options={{headerShown:false}} name="Login" component={LoginScreen} />
      <Stack.Screen options={{headerShown:false}} name="Register" component={RegisterScreen} />
      <Stack.Screen options={{headerShown:false}} name="Vertification" component={VertificationScreen} /> */}
      {/* <Stack.Screen options={{headerShown:false}} name="Home" component={HomeScreen} /> */}
      {/* <Stack.Screen options={{headerShown:false}} name="Profile" component={ProfileScreen} /> */}
      <Stack.Screen options={{headerShown:false}} name="Stack" component={TabNavigator} />
    </Stack.Navigator>
  );
}

export default StackNavigator;