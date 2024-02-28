
import { View, Text, Pressable, TouchableOpacity, StatusBar, Image, Dimensions, PixelRatio, ScrollView } from "react-native";
import { Color, FontFamily, FontSize } from "./Global";
import tw from "twrnc";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import Splash from "./Splash";

const Slider1 = ({ navigation }) => {

  const { width, height } = Dimensions.get('screen')

  const fontSize = (size) => {
    const fontScale = PixelRatio.getFontScale();
    return size / fontScale;
  }




  return (
    <>

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: Color.white }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>



          <View>
            <Image source={require('./assets/slider11.png')} style={{ width: width*0.5, height: height*0.3 }} resizeMode="contain" />
          </View>

          <View style={{ marginBottom: 20, }}>
            <Image source={require('./assets/slider21.png')} style={{ width: width*0.7, height: height*0.3 }} resizeMode="contain" />
          </View>

          <View style={{ marginVertical: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'column',paddingHorizontal:30 }}>
            <Text style={{ color: Color.black, fontSize: fontSize(FontSize.headline2_size), fontWeight: 'bold',fontFamily:FontFamily.bold }}>You'll get everything here</Text>

            <Text style={{ color: Color.black, fontSize: fontSize(FontSize.font_size), fontWeight: '500', textAlign: 'center',fontFamily:FontFamily.regular }}>Get everything done with just 3 clicks and get your work done with linkefy</Text>
          </View>






          <View style={{ paddingHorizontal: 20, width: width, marginTop: 20 }}>
            <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.background, borderRadius: 10, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', elevation: 5 }]} onPress={() => { navigation.navigate('Users') }}>

              <Text style={{ color: Color.white, fontSize: fontSize(FontSize.headline3_size), fontWeight: '600',fontFamily:FontFamily.bold }}>Next</Text>

            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

    </>
  );
};
export default Slider1;
