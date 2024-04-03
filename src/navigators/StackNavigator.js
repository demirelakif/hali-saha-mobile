import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import VertificationScreen from '../screens/VertificationScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen options={{headerShown:false}} name="Login" component={LoginScreen} />
      <Stack.Screen options={{headerShown:false}} name="Register" component={RegisterScreen} />
      <Stack.Screen options={{headerShown:false}} name="Vertification" component={VertificationScreen} /> */}
      <Stack.Screen options={{headerShown:false}} name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigator;