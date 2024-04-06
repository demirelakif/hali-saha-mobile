import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, Text, View } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ReservationScreen from '../screens/ReservationScreen';
import DetailScreen from '../screens/DetailScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    position: "absolute",
                    bottom: 36,
                    left: 32,
                    right: 32,
                    elevation: 0,
                    borderRadius: 15,
                    backgroundColor: "transparent",
                    borderColor: "white",
                    borderWidth:0,
                    borderTopWidth:0
                }

            }}
        >
            <Tab.Screen options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{}}>
                        {
                            focused ?
                                <>
                                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                        <Image
                                            source={require("../assets/home.png")} style={{ height: 40, width: 40, tintColor: "#7FB77E" }} />
                                        <View style={{
                                            width: 24,
                                            height: 44,
                                            borderRadius: 12,
                                            marginTop: 12,
                                            marginBottom: 20,
                                            backgroundColor: '#7FB77E', // İçi dolu daire için backgroundColor özelliği
                                        }}></View>
                                    </View>
                                </>
                                :
                                <>
                                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                        <Image
                                            source={require("../assets/home.png")} style={{ height: 40, width: 40, tintColor: "#7FB77E", marginBottom: 12 }} />
                                        <View style={{
                                            width: 24,
                                            height: 24,
                                            borderRadius: 12,
                                            backgroundColor: '#7FB77E', // İçi dolu daire için backgroundColor özelliği
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}></View>
                                    </View>
                                </>
                        }
                    </View>
                ),
                tabBarShowLabel: false,
            }} name="AnaSayfa" component={HomeScreen} />


            <Tab.Screen name="Search" component={SearchScreen}

                options={
                    {
                        tabBarIcon: ({ focused }) => (
                            <View style={{ marginVertical: 14 }}>
                                {
                                    focused ?
                                        <>
                                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                                <Image
                                                    source={require("../assets/searchBottom.png")} style={{ height: 40, width: 40, tintColor: "#7FB77E" }} />
                                                <View style={{
                                                    width: 24,
                                                    height: 44,
                                                    borderRadius: 12,
                                                    marginTop: 12,
                                                    marginBottom: 20,
                                                    backgroundColor: '#7FB77E', // İçi dolu daire için backgroundColor özelliği
                                                }}></View>
                                            </View>
                                        </>
                                        :
                                        <>
                                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                                <Image
                                                    source={require("../assets/searchBottom.png")} style={{ height: 40, width: 40, tintColor: "#7FB77E", marginBottom: 12 }} />
                                                <View style={{
                                                    width: 24,
                                                    height: 24,
                                                    borderRadius: 12,
                                                    backgroundColor: '#7FB77E', // İçi dolu daire için backgroundColor özelliği
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}></View>
                                            </View>
                                        </>
                                }
                            </View>
                        ),
                        tabBarShowLabel: false,
                    }
                }
            />

<Tab.Screen name="ReservationScreen" component={ReservationScreen}

options={
    {
        tabBarIcon: ({ focused }) => (
            <View style={{ marginVertical: 14 }}>
                {
                    focused ?
                        <>
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <Image
                                    source={require("../assets/calendar.png")} style={{ height: 44, width: 44, tintColor: "#7FB77E" }} />
                                <View style={{
                                    width: 24,
                                    height: 44,
                                    borderRadius: 12,
                                    marginTop: 12,
                                    marginBottom: 20,
                                    backgroundColor: '#7FB77E', // İçi dolu daire için backgroundColor özelliği
                                }}></View>
                            </View>
                        </>
                        :
                        <>
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <Image
                                    source={require("../assets/calendar.png")} style={{ height: 44, width: 44, tintColor: "#7FB77E", marginBottom: 12 }} />
                                <View style={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: 12,
                                    backgroundColor: '#7FB77E', // İçi dolu daire için backgroundColor özelliği
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}></View>
                            </View>
                        </>
                }
            </View>
        ),
        tabBarShowLabel: false,
    }
}
/>

            <Tab.Screen name="Profile" component={DetailScreen}

                options={
                    {
                        tabBarIcon: ({ focused }) => (
                            <View style={{ marginVertical: 14 }}>
                                {
                                    focused ?
                                        <>
                                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                                <Image
                                                    source={require("../assets/profile.png")} style={{ height: 32, width: 28, tintColor: "#7FB77E" }} />
                                                <View style={{
                                                    width: 24,
                                                    height: 44,
                                                    borderRadius: 12,
                                                    marginTop: 12,
                                                    marginBottom: 20,
                                                    backgroundColor: '#7FB77E', // İçi dolu daire için backgroundColor özelliği
                                                }}></View>
                                            </View>
                                        </>
                                        :
                                        <>
                                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                                <Image
                                                    source={require("../assets/profile.png")} style={{ height: 32, width: 28, tintColor: "#7FB77E", marginBottom: 12 }} />
                                                <View style={{
                                                    width: 24,
                                                    height: 24,
                                                    borderRadius: 12,
                                                    backgroundColor: '#7FB77E', // İçi dolu daire için backgroundColor özelliği
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}></View>
                                            </View>
                                        </>
                                }
                            </View>
                        ),
                        tabBarShowLabel: false,
                    }
                }
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
})
export default TabNavigator;