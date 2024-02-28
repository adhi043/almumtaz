
import { View, Text, Pressable, TouchableOpacity, StatusBar, Image, Dimensions, PixelRatio, ScrollView, PermissionsAndroid } from "react-native";
import { Color, FontSize } from "../../Global";
import tw from "twrnc";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import LottieView from "lottie-react-native";
import ImagePicker from 'react-native-image-crop-picker';

const Signup3 = ({ navigation }) => {

  const { width, height } = Dimensions.get('screen')

  const fontSize = (size) => {
    const fontScale = PixelRatio.getFontScale();
    return size / fontScale;
  }



  const [frontimage, setfrontImage] = useState(null);

  const getfrontImage = async () => {

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          'title': 'Al-Mumtaz App Camera Permission',
          'message': 'Al-Mumtaz App needs access to your camera ' +
            'so you can take awesome pictures.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        ImagePicker.openCamera({
          mediaType: 'photo', // Specify that you want to capture a photo
          useFrontCamera: true,
        }).then(image => {
          console.log(image?.path, 'imgs loaded');
          setfrontImage(image?.path);
        });
      } else if (PermissionsAndroid.RESULTS.DENIED) {
        console.log("Camera permission denied")
      }
    } catch (err) {
      console.warn(err)
    }


  }



  return (
    <>

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: Color.white }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>



          <View style={{ marginTop: 20 }}>
            <Image source={require('../../assets/slider11.png')} style={{ width: 120, height: 100 }} resizeMode="contain" />
          </View>

          <View style={{ marginBottom: 20, }}>
            {frontimage?<Image source={{ uri: frontimage }} style={{ width: width*0.8, height: height*0.45, borderRadius: 900 }} resizeMode='cover' />:<LottieView source={require('../../assets/24835-selfie.json')} autoPlay loop style={{  width: width*0.7, height: height*0.7  }} />}
          </View>

          <View style={{ marginVertical: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingHorizontal: 30 }}>
            <Text style={{ color: Color.black, fontSize: fontSize(FontSize.headline2_size), fontWeight: 'bold', }}>Selfie Verification</Text>

          </View>







        </View>
      </ScrollView>

      <View style={{ position: 'absolute', bottom: '5%', width: '100%', paddingHorizontal: 20 }}>
        {frontimage?
        <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.background, borderRadius: 10, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', elevation: 5 }]} onPress={() => { navigation.navigate('Signup4') }}>

          <Text style={{ color: Color.white, fontSize: fontSize(FontSize.headline3_size), fontWeight: '600' }}>Continue</Text>

        </TouchableOpacity>:
        <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.background, borderRadius: 10, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', elevation: 5 }]} onPress={() => { getfrontImage() }}>

          <Text style={{ color: Color.white, fontSize: fontSize(FontSize.headline3_size), fontWeight: '600' }}>Click</Text>

        </TouchableOpacity>
        }
      </View>

    </>
  );
};
export default Signup3;
