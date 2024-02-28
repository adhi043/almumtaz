import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { Text, View } from 'react-native'
import BottomNavigator from './BottomNavigator'
import Splash from '../Pages/Splash'
import PhoneVerify from '../Pages/PhoneVerify'
import PhoneVerify1 from '../Pages/PhoneVerify1'
import Signup from '../Pages/Signup'
import Signup1 from '../Pages/Signup1'
import Signup2 from '../Pages/Signup2'
import Signup3 from '../Pages/Signup3'
import Signup4 from '../Pages/Signup4'

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
            <Stack.Screen name='Signup3' component={Signup3} options={{headerShown:false}} />
            <Stack.Screen name='Signup4' component={Signup4} options={{headerShown:false}} />
            <Stack.Screen name='Main' component={BottomNavigator} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
}

export default StackNavigator
