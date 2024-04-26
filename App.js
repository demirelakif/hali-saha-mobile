import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import StackNavigator from './src/navigators/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import AnimTab1 from './src/navigators/TabNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './src/context/AuthContext';
import { LocationProvider } from './src/context/LocationContext';
export default function App() {
  let [fontsLoaded] = useFonts({
    'Jomhuria-Regular': require('./assets/fonts/Jomhuria-Regular.ttf'),
    'Montserrat-ExtraBold': require('./assets/fonts/Montserrat-ExtraBold.ttf'),
    'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf')
  });

  if (!fontsLoaded) {
    // Fontlar yüklenmediğinde yükleniyor ekranını göster
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    // <GestureHandlerRootView>
    <NavigationContainer>
      <AuthProvider>
        <LocationProvider>
          <StackNavigator />
        </LocationProvider>
      </AuthProvider>
    </NavigationContainer>
    // </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
