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
import ShoppingCartIconO from "react-native-heroicons/outline/ShoppingCartIcon";
import ShoppingCartIconS from "react-native-heroicons/solid/ShoppingCartIcon";
import tw from 'twrnc';

import { PixelRatio, Text, View } from 'react-native';
import { Color, FontSize } from '../../Global';
import Home1 from '../Pages/Home1';
import Checkout from '../Pages/Checkout';
import Orders from '../Pages/Orders';
import ActiveOrders from '../Pages/ActiveOrders';
import OrdersHistory from '../Pages/OrdersHistory';
import Profile from '../Pages/Profile';
const BottomNavigator = () => {

    const Tab = createBottomTabNavigator()


    const fontSize = (size) => {
        const fontScale = PixelRatio.getFontScale();
        return size / fontScale;
    }

    return (
        <Tab.Navigator style={{ backgroundColor: Color.white, }} screenOptions={{
            tabBarStyle: {
                backgroundColor: Color.white,
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
            <Tab.Screen name='Home1' component={Home1}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarLabelStyle: { color: 'white' },
                    tabBarIcon: ({ focused }) => focused ? (
                        <View style={{backgroundColor:Color.background,flexDirection:'column',justifyContent:'center',alignItems:'center',padding:5,borderRadius:10,paddingHorizontal:10}}>
                            <HomeIconS size={25} color={Color.white} />
                            <Text style={{ color: Color.white, fontSize: fontSize(FontSize.size_3xs), fontWeight: '400', textAlign: 'center' }}>Home</Text>
                        </View>
                    ) : (
                        <>
                            <HomeIconO size={25} color={Color.black} />
                            <Text style={{ color: Color.black, fontSize: fontSize(FontSize.size_3xs), fontWeight: '400', textAlign: 'center' }}>Home</Text>

                        </>
                    )
                }} />
                <Tab.Screen name='ActiveOrders' component={ActiveOrders}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarLabelStyle: { color: 'white' },
                    tabBarIcon: ({ focused }) => focused ? (
                        <View style={{backgroundColor:Color.background,flexDirection:'column',justifyContent:'center',alignItems:'center',padding:5,borderRadius:10,paddingHorizontal:10}}>
                            <ClipboardDocumentCheckIconS size={25} color={Color.white} />
                            <Text style={{ color: Color.white, fontSize: fontSize(FontSize.size_3xs), fontWeight: '400', textAlign: 'center' }}>Active Orders</Text>
                        </View>
                    ) : (
                        <>
                            <ClipboardDocumentCheckIconO size={25} color={Color.black} />
                            <Text style={{ color: Color.black, fontSize: fontSize(FontSize.size_3xs), fontWeight: '400', textAlign: 'center' }}>Active Orders</Text>

                        </>
                    )
                }} />
            <Tab.Screen name='Orders' component={Orders}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarLabelStyle: { color: 'white' },
                    tabBarIcon: ({ focused }) => focused ? (
                        <View style={{backgroundColor:Color.background,flexDirection:'column',justifyContent:'center',alignItems:'center',padding:5,borderRadius:10,paddingHorizontal:10}}>
                            <ClipboardDocumentCheckIconS size={25} color={Color.white} />
                            <Text style={{ color: Color.white, fontSize: fontSize(FontSize.size_3xs), fontWeight: '400', textAlign: 'center' }}>Orders</Text>
                        </View>
                    ) : (
                        <>
                            <ClipboardDocumentCheckIconO size={25} color={Color.black} />
                            <Text style={{ color: Color.black, fontSize: fontSize(FontSize.size_3xs), fontWeight: '400', textAlign: 'center' }}>Orders</Text>

                        </>
                    )
                }} />
            
            <Tab.Screen name='Cart' component={Checkout}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarLabelStyle: { color: 'white' },
                    tabBarIcon: ({ focused }) => focused ? (
                        <View style={{backgroundColor:Color.background,flexDirection:'column',justifyContent:'center',alignItems:'center',padding:5,borderRadius:10,paddingHorizontal:10}}>
                            <ShoppingCartIconS size={25} color={Color.white} />
                            <Text style={{ color: Color.white, fontSize: fontSize(FontSize.size_3xs), fontWeight: '400', textAlign: 'center' }}>Cart</Text>
                        </View>
                    ) : (
                        <>
                            <ShoppingCartIconO size={25} color={Color.black} />
                            <Text style={{ color: Color.black, fontSize: fontSize(FontSize.size_3xs), fontWeight: '400', textAlign: 'center' }}>Cart</Text>

                        </>
                    )
                }} />

            <Tab.Screen name='History' component={OrdersHistory}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarLabelStyle: { color: 'white' },
                    tabBarIcon: ({ focused }) => focused ? (
                        <View style={{backgroundColor:Color.background,flexDirection:'column',justifyContent:'center',alignItems:'center',padding:5,borderRadius:10,paddingHorizontal:10}}>
                            <ArrowPathIconS size={25} color={Color.white} />
                            <Text style={{ color: Color.white, fontSize: fontSize(FontSize.size_3xs), fontWeight: '400', textAlign: 'center' }}>History</Text>
                        </View>
                    ) : (
                        <>
                            <ArrowPathIconO size={25} color={Color.black} />
                            <Text style={{ color: Color.black, fontSize: fontSize(FontSize.size_3xs), fontWeight: '400', textAlign: 'center' }}>History</Text>

                        </>
                    )
                }} />

            <Tab.Screen name='User' component={Profile}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarLabelStyle: { color: 'white' },
                    tabBarIcon: ({ focused }) => focused ? (
                        <View style={{backgroundColor:Color.background,flexDirection:'column',justifyContent:'center',alignItems:'center',padding:5,borderRadius:10,paddingHorizontal:10}}>
                            <UserIconS size={25} color={Color.white} />
                            <Text style={{ color: Color.white, fontSize: fontSize(FontSize.size_3xs), fontWeight: '400', textAlign: 'center' }}>Profile</Text>
                        </View>
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
