import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, PixelRatio, StatusBar, Text, View } from 'react-native';
import { Color, FontSize } from '../../Global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';


const Splash = ({ navigation }) => {
  
  const { width, height } = Dimensions.get('screen');
  const [animatedText, setAnimatedText] = useState('');
  const [showSecondCircle, setShowSecondCircle] = useState(false);



  const fontSize = (size) => {
    const fontScale = PixelRatio.getFontScale();
    return size / fontScale;
  }



  setTimeout(async () => {

    navigation.navigate('PhoneVerify')

  }, 1000);
 
 
  return (
    <LinearGradient colors={[Color.background2, Color.background]} style={{ flex: 1, backgroundColor: Color.background, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require('../../assets/logo.png')} style={{ width: width*0.6, height: height*0.5 }} resizeMode='contain' />

      <Image source={require('../../assets/sellersplash1.png')} style={{ width: width*0.4, height: height*0.2,position: 'absolute', bottom: '3%' }} resizeMode='contain' />

    </LinearGradient>
    
  );
};

export default Splash;
