import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import HomeIconO from "react-native-heroicons/outline/HomeIcon";
import PlusIconO from "react-native-heroicons/outline/PlusIcon";
import ArrowPathIconO from "react-native-heroicons/outline/ArrowPathIcon";
import ArrowPathIconS from "react-native-heroicons/solid/ArrowPathIcon";
import HomeIconS from "react-native-heroicons/solid/HomeIcon";
import ClipboardDocumentCheckIconO from "react-native-heroicons/outline/ClipboardDocumentCheckIcon";
import ClipboardDocumentCheckIconS from "react-native-heroicons/solid/ClipboardDocumentCheckIcon";
import UserIconO from "react-native-heroicons/outline/UserIcon";
import UserIconS from "react-native-heroicons/solid/UserIcon";
import tw from 'twrnc';

import Home from '../Pages/Home'
import { PixelRatio, Text, View } from 'react-native';
import { Color, FontSize } from '../../Global';
const BottomNavigator = () => {

    const Tab = createBottomTabNavigator()


    const fontSize = (size) => {
        const fontScale = PixelRatio.getFontScale();
        return size / fontScale;
    }

    return (
        <Tab.Navigator style={{ backgroundColor: Color.white }} screenOptions={{
            tabBarStyle: {
                backgroundColor: Color.background,
                // position:'absolute',
                elevation: 5,
                borderTopWidth: 0,
                marginHorizontal: 0,
                padding: 0,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                height: 70,

            },
        }}>
            <Tab.Screen name='Home' component={Home}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarLabelStyle: { color: 'white' },
                    tabBarIcon: ({ focused }) => focused ? (
                        <>
                            <HomeIconS size={25} color={Color.white} />
                            <Text style={{ color: Color.white, fontSize: fontSize(FontSize.size_3xs), fontWeight: '400', textAlign: 'center' }}>Get Offers</Text>
                        </>
                    ) : (
                        <>
                            <HomeIconO size={25} color={Color.black} />
                            <Text style={{ color: Color.black, fontSize: fontSize(FontSize.size_3xs), fontWeight: '400', textAlign: 'center' }}>Get Offers</Text>

                        </>
                    )
                }} />
            <Tab.Screen name='Search' component={Home}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarLabelStyle: { color: 'white' },
                    tabBarIcon: ({ focused }) => focused ? (
                        <>
                            <ClipboardDocumentCheckIconS size={25} color={Color.white} />
                            <Text style={{ color: Color.white, fontSize: fontSize(FontSize.size_3xs), fontWeight: '400', textAlign: 'center' }}>Your Orders</Text>
                        </>
                    ) : (
                        <>
                            <ClipboardDocumentCheckIconO size={25} color={Color.black} />
                            <Text style={{ color: Color.black, fontSize: fontSize(FontSize.size_3xs), fontWeight: '400', textAlign: 'center' }}>Your Orders</Text>

                        </>
                    )
                }} />

            <Tab.Screen name='Cart' component={Home}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarLabelStyle: { color: 'white' },
                    tabBarIcon: ({ focused }) => focused ? (
                        <>
                            <ArrowPathIconS size={25} color={Color.white} />
                            <Text style={{ color: Color.white, fontSize: fontSize(FontSize.size_3xs), fontWeight: '400', textAlign: 'center' }}>History</Text>
                        </>
                    ) : (
                        <>
                            <ArrowPathIconO size={25} color={Color.black} />
                            <Text style={{ color: Color.black, fontSize: fontSize(FontSize.size_3xs), fontWeight: '400', textAlign: 'center' }}>History</Text>

                        </>
                    )
                }} />

            <Tab.Screen name='User' component={Home}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarLabelStyle: { color: 'white' },
                    tabBarIcon: ({ focused }) => focused ? (
                        <>
                            <UserIconS size={25} color={Color.white} />
                            <Text style={{ color: Color.white, fontSize: fontSize(FontSize.size_3xs), fontWeight: '400', textAlign: 'center' }}>Profile</Text>
                        </>
                    ) : (
                        <>
                            <UserIconO size={25} color={Color.black} />
                            <Text style={{ color: Color.black, fontSize: fontSize(FontSize.size_3xs), fontWeight: '400', textAlign: 'center' }}>Profile</Text>

                        </>
                    )
                }} />



        </Tab.Navigator>
    )
}

export default BottomNavigator
