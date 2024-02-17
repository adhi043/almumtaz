
import { View, Text, Pressable, TouchableOpacity, StatusBar, Image, Dimensions, PixelRatio, ScrollView, TextInput } from "react-native";
import { Color, FontSize } from "../../Global";
import tw from "twrnc";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import Splash from "../../Splash";
import LottieView from "lottie-react-native";

const ForgetPass1 = ({ navigation }) => {

  const { width, height } = Dimensions.get('screen')

  const [phone,setPhone] =useState(null)

  const fontSize = (size) => {
    const fontScale = PixelRatio.getFontScale();
    return size / fontScale;
  }




  return (
    <>

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: Color.white }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>



          <View>
            <Image source={require('../../assets/slider11.png')} style={{ width: 220, height: 200 }} resizeMode="contain" />
          </View>

          <View style={{ marginTop: 20, }}>
            <LottieView source={require('../../assets/120607-sms-sent.json')} autoPlay loop style={{ width: 200, height: 200 }} />
          </View>

          <View style={{ marginVertical: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingHorizontal: 30 }}>
            <Text style={{ color: Color.black, fontSize: fontSize(FontSize.headline2_size), fontWeight: 'bold', }}>Resend Code</Text>

            <Text style={{ color: Color.black, fontSize: fontSize(FontSize.font_size), fontWeight: '500', textAlign: 'center' }}>Please verify your mobile number to resend your one time password.</Text>
          </View>



          <View style={{ padding: 5, backgroundColor: Color.white, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 15, borderWidth: 1, borderColor: Color.gray }}>
            <TextInput style={{ width: '90%', padding: 10, color: Color.black }} placeholder="Enter your registered mobile number" placeholderTextColor={Color.colorGray_100} defaultValue={phone} onChangeText={(value) => { setPhone(value) }} />
          </View>





          <View style={{ paddingHorizontal: 20, width: width, marginTop: 60 }}>
            <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.background, borderRadius: 10, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', elevation: 5 }]} onPress={() => { navigation.navigate('PhoneVerify') }}>

              <Text style={{ color: Color.white, fontSize: fontSize(FontSize.headline3_size), fontWeight: '600' }}>Resend Code</Text>

            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

    </>
  );
};
export default ForgetPass1;
