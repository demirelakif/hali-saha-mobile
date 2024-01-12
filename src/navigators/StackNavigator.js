import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import PhoneInput from '../screens/VertificationScreen';
import VertificationScreen from '../screens/VertificationScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown:false}} name="Login" component={LoginScreen} />
      <Stack.Screen options={{headerShown:false}} name="Register" component={RegisterScreen} />
      <Stack.Screen options={{headerShown:false}} name="Vertification" component={VertificationScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigator;