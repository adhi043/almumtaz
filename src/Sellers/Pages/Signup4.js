
import { View, Text, Pressable, TouchableOpacity, StatusBar, Image, Dimensions, PixelRatio, ScrollView, PermissionsAndroid } from "react-native";
import { Color, FontSize } from "../../Global";
import tw from "twrnc";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import LottieView from "lottie-react-native";

const Signup4 = ({ navigation }) => {

  const { width, height } = Dimensions.get('screen')

  const fontSize = (size) => {
    const fontScale = PixelRatio.getFontScale();
    return size / fontScale;
  }




  return (
    <>

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: Color.white }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>



          <View style={{ marginTop: 20,marginBottom:40 }}>
            <Image source={require('../../assets/slider11.png')} style={{ width: 120, height: 100 }} resizeMode="contain" />
          </View>

          <View style={{ marginBottom: 0, }}>
            <LottieView source={require('../../assets/99297-loading-files.json')} autoPlay loop style={{ width: 300, height: 150 }} />
          </View>

          <View style={{ marginVertical: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingHorizontal: 5 }}>
            <Text style={{ color: Color.black, fontSize: fontSize(FontSize.headline2_size), fontWeight: 'bold', }}>Your account is being Verified!</Text>
            <Text style={{ color: Color.black, fontSize: fontSize(FontSize.headline3_size), fontWeight: 'bold', }}>Our team is schedulling a call with you</Text>
            <Text style={{ color: Color.gray, fontSize: fontSize(FontSize.headline3_size), fontWeight: '500',marginTop:10 }}>You'll receive a call shortly</Text>

          </View>







        </View>
      </ScrollView>

      <View style={{ position: 'absolute', bottom: '5%', width: '100%', paddingHorizontal: 20 }}>
        <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.background, borderRadius: 10, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', elevation: 5 }]} onPress={() => { navigation.navigate('Main') }}>

          <Text style={{ color: Color.white, fontSize: fontSize(FontSize.headline3_size), fontWeight: '600' }}>Continue</Text>

        </TouchableOpacity>
      </View>

    </>
  );
};
export default Signup4;
