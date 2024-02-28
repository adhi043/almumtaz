import React, { useEffect, useState } from 'react';
import { Dimensions, Image, PixelRatio, StatusBar, Text, View } from 'react-native';
import { Color, FontFamily, FontSize } from './Global';
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

    navigation.navigate('Slider')

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
    <LinearGradient colors={[Color.background2, Color.background]} style={{ flex: 1, backgroundColor: Color.background, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require('./assets/logo.png')} style={{ width: width - 100, height: 300 }} resizeMode='contain' />

      <Text style={{ color: Color.white, fontSize: fontSize(FontSize.font_size), fontWeight: '500', position: 'absolute', bottom: '5%',fontFamily:FontFamily.regular }}>Any work any task you'll get everything here</Text>
 
    </LinearGradient> 
  );
};

export default Splash;
