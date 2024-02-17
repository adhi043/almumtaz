import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, PixelRatio, StatusBar, Text, View } from 'react-native';
import { Color, FontSize } from '../../Global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const Splash = ({ navigation }) => {

  const [animatedText, setAnimatedText] = useState('');
  const [showSecondCircle, setShowSecondCircle] = useState(false);



  const fontSize = (size) => {
    const fontScale = PixelRatio.getFontScale();
    return size / fontScale;
  }



  setTimeout(async () => {

    navigation.navigate('PhoneVerify')

    // const mydata = JSON.parse(await AsyncStorage.getItem('data'))
    // const login = JSON.parse(await AsyncStorage.getItem('login'))

    // console.log(mydata,login);
    // if(mydata && login==='Admin'){
    //     navigation.navigate('Business')
    // }
    // if(mydata && login==='Employe'){
    //     navigation.navigate('Employee')
    // }
    // else{
    //     navigation.navigate('Slider')
    //     console.log('navigation error on login page');
    // }

  }, 2000);
 
 
  return (
    <ImageBackground source={require('../../assets/sellersplash.png')} style={{ flex: 1, backgroundColor: Color.background, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require('../../assets/logo.png')} style={{ width: width - 100, height: 300 }} resizeMode='contain' />


    </ImageBackground> 
  );
};

export default Splash;
