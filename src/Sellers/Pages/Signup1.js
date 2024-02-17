
import { View, Text, Pressable, TouchableOpacity, StatusBar, Image, Dimensions, ScrollView, TextInput, PixelRatio, PermissionsAndroid } from "react-native";
import { Color, FontSize, baseUrl } from "../../Global";
import tw from "twrnc";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useRef, useState } from "react";
import UserCircleIcon from "react-native-heroicons/solid/UserCircleIcon";
import PhotoIcon from "react-native-heroicons/outline/PhotoIcon";
import EyeIcon from "react-native-heroicons/solid/EyeIcon";
import EyeSlashIcon from "react-native-heroicons/solid/EyeSlashIcon";
import Noti from "../../Noti";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImagePicker from 'react-native-image-crop-picker';

const Signup1 = ({ navigation }) => {

    const { width, height } = Dimensions.get('screen')
    const [hide, setHide] = useState(true)
    const [sel, setSel] = useState('Male')
    const [email, setEmail] = useState(null);
    const [idcard, setIdcard] = useState(null);

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
        else if (!idcard) {
            setType('Error');
            setMsg('Must Enter Password!');
            handleShowToast()
        }
        else {

            const param = {
                email: email,
                password: idcard,
                internet: true,
            }



            axios.post(`${baseUrl}/login/`, param).then(res => {
                if (res.data.status === 'ok') {
                    setType('Success');
                    setMsg(res.data.message);
                    storedata(res.data.data)
                    handleShowToast()
                    navigation.navigate('Business')
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
                    cropping: true
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

    const [backimage, setbackImage] = useState(null);


    const getbackImage = async () => {

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
                    cropping: true
                }).then(image => {
                    console.log(image?.path, 'imgs loaded');
                    setbackImage(image?.path);
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
            <Noti type={type} msg={msg} timeout={2000} ref={toastRef} />
            <View style={{ backgroundColor: Color.white, flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

                <ScrollView style={{}} showsVerticalScrollIndicator={false}>
                    <View style={{ padding: 20, }}>


                        <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                            <View>
                                <Image source={require('../../assets/slider11.png')} style={{ width: 120, height: 100 }} resizeMode="contain" />
                            </View>
                        </View>





                        <View>


                            <View style={{ flexDirection: 'column', gap: 5, marginBottom: 15, marginTop: 20, }}>

                                <Text style={{ color: Color.black, fontSize: fontSize(FontSize.headline3_size), fontWeight: 'bold' }}>ID card front side</Text>


                                <TouchableOpacity style={{ padding: 5, paddingHorizontal: 10, backgroundColor: Color.white, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1, borderColor: Color.gray, width: '100%',minHeight:180 }}  onPress={getfrontImage} >

                                    {frontimage ? <Image source={{ uri: frontimage }} style={{ width: '100%', height: '100%', borderRadius: 10 }} resizeMode='cover' /> : <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',width:'100%'}}>
                                        <PhotoIcon  size={52} color={Color.gray2} />
                                        <Text style={{ color: Color.gray2 }}>Upload front side of Id card</Text>
                                    </View>}
                                </TouchableOpacity>
                            </View>


                            <View style={{ flexDirection: 'column', gap: 5, marginBottom: 15,  }}>

                                <Text style={{ color: Color.black, fontSize: fontSize(FontSize.headline3_size), fontWeight: 'bold' }}>ID card back side</Text>


                                <TouchableOpacity style={{ padding: 5, paddingHorizontal: 10, backgroundColor: Color.white, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1, borderColor: Color.gray, width: '100%',minHeight:180 }}  onPress={getbackImage}>

                                    {backimage ? <Image source={{ uri: backimage }} style={{ width: '100%', height: '100%', borderRadius: 10 }} resizeMode='cover' /> : <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',width:'100%'}}>
                                        <PhotoIcon  size={52} color={Color.gray2} />
                                        <Text style={{ color: Color.gray2 }}>Upload back side of Id card</Text>
                                    </View>}
                                </TouchableOpacity>
                            </View>



                            <View style={{ flexDirection: 'column', gap: 5, marginBottom: 15, }}>

                                <Text style={{ color: Color.black, fontSize: fontSize(FontSize.headline3_size), fontWeight: 'bold' }}>ID card number</Text>


                                <View style={{ padding: 5, paddingHorizontal: 10, backgroundColor: Color.white, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1, borderColor: Color.gray, width: '100%', }}>

                                    <TextInput style={{ width: '80%', padding: 5, color: Color.black }} placeholder="Enter your id card number" placeholderTextColor={Color.colorGray_100} defaultValue={idcard} onChangeText={(value) => { setIdcard(value) }} />
                                </View>
                            </View>





                            <View style={{ marginTop: 20 }}>

                                <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.background, borderRadius: 10, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', elevation: 5, marginTop: 50 }]} onPress={() => { navigation.navigate('Signup2') }}>

                                    <Text style={{ color: Color.white, fontSize: fontSize(FontSize.headline3_size), fontWeight: '600' }}>Continue</Text>

                                </TouchableOpacity>



                            </View>



                        </View>


                    </View>
                </ScrollView>

            </View>
        </>
    );
};
export default Signup1;
