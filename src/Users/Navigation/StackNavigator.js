import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { Text, View } from 'react-native'
import BottomNavigator from './BottomNavigator'
import Notification from '../Pages/Notification'
import Login from '../Pages/Login'
import Login1 from '../Pages/Login1'
import PhoneVerify from '../Pages/PhoneVerify'
import PhoneVerify1 from '../Pages/PhoneVerify1'
import ForgetPass from '../Pages/ForgetPass'
import ForgetPass1 from '../Pages/ForgetPass1'
import OpenMap from '../Pages/OpenMap'
import OpenMap1 from '../Pages/OpenMap1'
import SideNavigator from './SideNavigator'
import Home from '../Pages/Home'
import Home2 from '../Pages/Home2'
import AcceptOrders from '../Pages/AcceptOrders'
import OrderStatus from '../Pages/OrderStatus'
import Support from '../Pages/Support'

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
            <Stack.Screen name='OpenMap' component={OpenMap} options={{headerShown:false}} />
            <Stack.Screen name='OpenMap1' component={OpenMap1} options={{headerShown:false}} />
            <Stack.Screen name='Notification' component={Notification} options={{headerShown:false}} />
            {/* <Stack.Screen name='Main' component={SideNavigator} options={{headerShown:false}}/> */}
            <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
            <Stack.Screen name='Home1' component={BottomNavigator} options={{headerShown:false}}/>
            <Stack.Screen name='Home2' component={Home2} options={{headerShown:false}}/>
            <Stack.Screen name='AcceptOrders' component={AcceptOrders} options={{headerShown:false}}/>
            <Stack.Screen name='OrderStatus' component={OrderStatus} options={{headerShown:false}}/>
            <Stack.Screen name='Support' component={Support} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
}

export default StackNavigator
