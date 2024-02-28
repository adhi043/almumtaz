import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeIconO from "react-native-heroicons/outline/HomeIcon";
import PlusIconO from "react-native-heroicons/outline/PlusIcon";
import ShoppingCartIconO from "react-native-heroicons/outline/ShoppingCartIcon";
import ShoppingCartIconS from "react-native-heroicons/solid/ShoppingCartIcon";
import HomeIconS from "react-native-heroicons/solid/HomeIcon";
import MagnifyingGlassIconO from "react-native-heroicons/outline/MagnifyingGlassIcon";
import MagnifyingGlassIconS from "react-native-heroicons/solid/MagnifyingGlassIcon";
import UserIconO from "react-native-heroicons/outline/UserIcon";
import UserIconS from "react-native-heroicons/solid/UserIcon";
import tw from 'twrnc';

import Home from '../Pages/Home'
import { Text, View } from 'react-native';
import { Color } from '../../Global';
const SideNavigator = () => {


    const Drawer = createDrawerNavigator();

    return (
        <NavigationContainer independent={true}>
            <Drawer.Navigator>
                <Drawer.Screen name="Home" component={Home} options={{ headerShown: false, }} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default SideNavigator
