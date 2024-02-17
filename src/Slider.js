
import { View, Text, Pressable, TouchableOpacity, StatusBar, Image, Dimensions, PixelRatio, ScrollView } from "react-native";
import { Color, FontSize } from "./Global";
import tw from "twrnc";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import Splash from "./Splash";

const Slider = ({ navigation }) => {

  const { width, height } = Dimensions.get('screen')

  const fontSize = (size) => {
    const fontScale = PixelRatio.getFontScale();
    return size / fontScale;
  }




  return (
    <>

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: Color.white }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>

          <TouchableOpacity style={{position:'absolute',top:'2%',right:'5%'}} onPress={()=>{navigation.navigate('Sellers')}}>
            <Text style={{ color: Color.gray, fontSize: fontSize(FontSize.pxRegular_size), fontWeight: '500', textAlign: 'center' }}>Seller</Text>
          </TouchableOpacity>


          <View>
            <Image source={require('./assets/slider11.png')} style={{ width: 220, height: 200 }} resizeMode="contain" />
          </View>

          <View style={{ marginBottom: 20, }}>
            <Image source={require('./assets/slider12.png')} style={{ width: width - 50, height: 300 }} resizeMode="contain" />
          </View>

          <View style={{ marginVertical: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Text style={{ color: Color.black, fontSize: fontSize(FontSize.headline2_size), fontWeight: 'bold', }}>Welcom to Al-Mumtaz</Text>

            <Text style={{ color: Color.black, fontSize: fontSize(FontSize.font_size), fontWeight: '500', textAlign: 'center' }}>Now get all the services at your door step get verified technician at your doorstep in 60 mins</Text>
          </View>






          <View style={{ paddingHorizontal: 20, width: width, marginTop: 20 }}>
            <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.background, borderRadius: 10, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', elevation: 5 }]} onPress={() => { navigation.navigate('Slider1') }}>

              <Text style={{ color: Color.white, fontSize: fontSize(FontSize.headline3_size), fontWeight: '600' }}>Next</Text>

            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

    </>
  );
};
export default Slider;
