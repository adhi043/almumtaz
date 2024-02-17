import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { Text, View } from 'react-native'
import Sellers from './Sellers/Navigation/StackNavigator'
import Users from './Users/Navigation/StackNavigator'
import Slider from './Slider'
import Splash from './Splash'
import Slider1 from './Slider1'

const StackNavigator =()=>  {

    const Stack=createNativeStackNavigator()
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{
            headerShown: false,
          }} initialRouteName={'Splash'}>
            <Stack.Screen name='Splash' component={Splash} options={{headerShown:false}} />
            <Stack.Screen name='Slider' component={Slider} options={{headerShown:false}} />
            <Stack.Screen name='Slider1' component={Slider1} options={{headerShown:false}} />
            <Stack.Screen name='Sellers' component={Sellers} options={{headerShown:false}} />
            <Stack.Screen name='Users' component={Users} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
}

export default StackNavigator
