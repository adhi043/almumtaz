import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { Text, View } from 'react-native'
import BottomNavigator from './BottomNavigator'
import TopNavigator from './TopNavigator'
import Attendance from '../Pages/Attendance'
import Splash from '../Pages/Splash'
import PhoneVerify from '../Pages/PhoneVerify'
import PhoneVerify1 from '../Pages/PhoneVerify1'
import Signup from '../Pages/Signup'
import Signup1 from '../Pages/Signup1'
import Signup2 from '../Pages/Signup2'

const StackNavigator =()=>  {

    const Stack=createNativeStackNavigator()
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{
            headerShown: false,
          }} initialRouteName={'Splash'}>
            <Stack.Screen name='Splash' component={Splash} options={{headerShown:false}} />
            <Stack.Screen name='PhoneVerify' component={PhoneVerify} options={{headerShown:false}} />
            <Stack.Screen name='PhoneVerify1' component={PhoneVerify1} options={{headerShown:false}} />
            <Stack.Screen name='Signup' component={Signup} options={{headerShown:false}} />
            <Stack.Screen name='Signup1' component={Signup1} options={{headerShown:false}} />
            <Stack.Screen name='Signup2' component={Signup2} options={{headerShown:false}} />
            <Stack.Screen name='Attendance' component={Attendance} options={{headerShown:false}} />
            <Stack.Screen name='Sellers' component={TopNavigator} options={{headerShown:false}} />
            <Stack.Screen name='Main' component={BottomNavigator} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
}

export default StackNavigator
