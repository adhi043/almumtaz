
import { View, Text, Pressable, TouchableOpacity, StatusBar, Image, Dimensions, ScrollView, TextInput, PixelRatio } from "react-native";
import { Color, FontSize, baseUrl } from "../../Global";
import tw from "twrnc";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useRef, useState } from "react";
import UserCircleIcon from "react-native-heroicons/solid/UserCircleIcon";
import LockClosedIcon from "react-native-heroicons/solid/LockClosedIcon";
import EyeIcon from "react-native-heroicons/solid/EyeIcon";
import EyeSlashIcon from "react-native-heroicons/solid/EyeSlashIcon";
import Noti from "../../Noti";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {

  const { width, height } = Dimensions.get('screen')
  const [hide, setHide] = useState(true)
  const [sel, setSel] = useState('Admin')
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [type, setType] = useState(null);
  const [msg, setMsg] = useState(null);
  const toastRef = useRef(null);

  const handleShowToast = () => {
    if (toastRef.current) {
      toastRef.current.show();
    }
  };


  const fontSize = (size) => {
    const fontScale = PixelRatio.getFontScale();
    return size / fontScale;
  }



  const storedata = async (data, login) => {
    try {
      await AsyncStorage.setItem("data", JSON.stringify(data));
      await AsyncStorage.setItem("login", JSON.stringify(login));
    } catch (error) {
      console.log(error);
    }
  };





  const submit = () => {

    if (!email) {
      setType('Error');
      setMsg('Must Enter Email!');
      handleShowToast()
    }
    else if (!password) {
      setType('Error');
      setMsg('Must Enter Password!');
      handleShowToast()
    }
    else {

      const param = {
        email: email,
        password: password,
        internet: true,
      }



      axios.post(`${baseUrl}/login/${sel === 'Admin' ? 'business' : 'employe'}`, param).then(res => {
        if (res.data.status === 'ok') {
          setType('Success');
          setMsg(res.data.message);
          storedata(res.data.data, sel)
          handleShowToast()
          sel === 'Admin' ? navigation.navigate('Business') : navigation.navigate('Employee')
        }
        else if (res.data.status === 'fail') {
          setType('Error');
          setMsg(res.data.message);
          handleShowToast()
        }
      }).catch(err => {
        setType('Error');
        setMsg(err.message);
        handleShowToast()
      })
    }
  }






  return (
  <>
    <Noti type={type} msg={msg} timeout={2000} ref={toastRef} />
    <View style={{ backgroundColor: Color.background, flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: Color.white, flex: 1 }}>

      <View style={{ position: 'absolute', zIndex: -1, left: 0, top: 0, }}>
        <Image source={require('../../assets/login1.png')} style={{ width: width, height: width + 18, }} resizeMode="contain" />
      </View>


      <View style={{ flexDirection:'column',justifyContent: 'center', alignItems: 'center', marginTop: 60,  }}>



        <View>
          <Image source={require('../../assets/slider11.png')} style={{ width: 220, height: 200 }} resizeMode="contain" />
        </View>

        <View>
          <Image source={require('../../assets/login5.png')} style={{ width: 250, height: 50 }} resizeMode="contain" />
        </View>


        <View style={{ marginVertical: 10, flexDirection: 'row', alignItems: 'center', gap: 15, }}>

          <TouchableOpacity style={[ { backgroundColor: Color.gray2, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation: 5, padding: 5,paddingHorizontal:30 }]} onPress={() => {
            navigation.navigate('Login1',{move:'Login'})
          }}>
            <Image source={require('../../assets/login4.png')} style={{ width: 70, height: 40 }} resizeMode="contain" />
          </TouchableOpacity>


          <TouchableOpacity style={[ { backgroundColor: Color.gray2, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation: 5, padding: 5,paddingHorizontal:30 }]} onPress={() => {
            navigation.navigate('Login1',{move:'Signup'})
          }}>
            <Image source={require('../../assets/login3.png')} style={{ width: 70, height: 40 }} resizeMode="contain" />
          </TouchableOpacity>


        </View>


        <View style={{marginTop: 80,}}>
          <Image source={require('../../assets/login2.png')} style={{ width: width, height: 300 }} resizeMode="contain" />
        </View>


      </View>



    </ScrollView>
    </View>
  </>
  );
};
export default Login;
