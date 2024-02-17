import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { Text, View } from 'react-native'
import BottomNavigator from './BottomNavigator'
import TopNavigator from './TopNavigator'
import Attendance from '../Pages/Attendance'
import ApplyLeave from '../Pages/ApplyLeave'
import AdminComplaint from '../Pages/AdminComplaint'
import Notification from '../Pages/Notification'
import Login from '../Pages/Login'
import Login1 from '../Pages/Login1'
import PhoneVerify from '../Pages/PhoneVerify'
import PhoneVerify1 from '../Pages/PhoneVerify1'
import ForgetPass from '../Pages/ForgetPass'
import ForgetPass1 from '../Pages/ForgetPass1'

const StackNavigator =()=>  {

    const Stack=createNativeStackNavigator()
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{
            headerShown: false,
          }} initialRouteName={'Login'}>
            <Stack.Screen name='Login' component={Login} options={{headerShown:false}} />
            <Stack.Screen name='Login1' component={Login1} options={{headerShown:false}} />
            <Stack.Screen name='PhoneVerify' component={PhoneVerify} options={{headerShown:false}} />
            <Stack.Screen name='PhoneVerify1' component={PhoneVerify1} options={{headerShown:false}} />
            <Stack.Screen name='ForgetPass' component={ForgetPass} options={{headerShown:false}} />
            <Stack.Screen name='ForgetPass1' component={ForgetPass1} options={{headerShown:false}} />
            <Stack.Screen name='Attendance' component={Attendance} options={{headerShown:false}} />
            <Stack.Screen name='ApplyLeave' component={ApplyLeave} options={{headerShown:false}} />
            <Stack.Screen name='AdminComplaint' component={AdminComplaint} options={{headerShown:false}} />
            <Stack.Screen name='Notification' component={Notification} options={{headerShown:false}} />
            <Stack.Screen name='Sellers' component={TopNavigator} options={{headerShown:false}} />
            <Stack.Screen name='Main' component={BottomNavigator} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
}

export default StackNavigator
