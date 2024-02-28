
import { View, Text, Pressable, TouchableOpacity, StatusBar, Image, Dimensions, ScrollView, TextInput, PixelRatio } from "react-native";
import { Color, FontSize, baseUrl } from "../../Global";
import tw from "twrnc";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useRef, useState } from "react";
import UserCircleIcon from "react-native-heroicons/solid/UserCircleIcon";
import PencilSquareIcon from "react-native-heroicons/outline/PencilSquareIcon";
import EyeIcon from "react-native-heroicons/solid/EyeIcon";
import EyeSlashIcon from "react-native-heroicons/solid/EyeSlashIcon";
import Noti from "../../Noti";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PhoneVerify = ({ navigation }) => {

    const { width, height } = Dimensions.get('screen')
    const [hide, setHide] = useState(true)
    const [sel, setSel] = useState('Login')
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



            axios.post(`${baseUrl}/login/${sel === 'Login' ? 'business' : 'Signup'}`, param).then(res => {
                if (res.data.status === 'ok') {
                    setType('Success');
                    setMsg(res.data.message);
                    storedata(res.data.data, sel)
                    handleShowToast()
                    sel === 'Login' ? navigation.navigate('Business') : navigation.navigate('Signupe')
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
            <View style={{ backgroundColor: Color.white, flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

                <ScrollView style={{}} showsVerticalScrollIndicator={false}>
                    <View style={{ padding: 20, }}>


                        <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                            <View>
                                <Image source={require('../../assets/slider11.png')} style={{  width: width*0.6, height: height*0.25 }} resizeMode="contain" />
                            </View>
                        </View>


                        <Text style={{ color: Color.black, fontSize: fontSize(FontSize.headline2_size), fontWeight: 'bold', }}>Let's begin <Text style={{ color: Color.background, fontSize: fontSize(FontSize.headline2_size), fontWeight: 'bold', }}>with the journey</Text></Text>


                        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', gap: 10, padding: 5 }}>

                            <Text style={{ color: Color.black, fontSize: fontSize(FontSize.font2_size), fontWeight: '400' }}>Phone number</Text>


                        </View>



                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <View style={{ padding: 5, backgroundColor: Color.white, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 15, borderWidth: 1, borderColor: Color.gray, width: '23%', }}>
                                    <TextInput style={{ padding: 10, color: Color.black }} placeholder="(+92)" placeholderTextColor={Color.colorGray_100} value='(+92)' editable={false} />
                                </View>




                                <View style={{ padding: 5, backgroundColor: Color.white, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 15, borderWidth: 1, borderColor: Color.gray, width: '75%', }}>

                                    <TextInput style={{ width: '80%', padding: 10, color: Color.black }} placeholder="3411514046" placeholderTextColor={Color.colorGray_100} defaultValue={password} onChangeText={(value) => { setPassword(value) }} />
                                    <TouchableOpacity style={[tw`p-2`, { borderRadius: 20, }]} onPress={() => { }}>
                                        <PencilSquareIcon size={20} color={Color.gray} />
                                    </TouchableOpacity>
                                </View>
                            </View>





                            <View style={{ marginVertical: 10, flexDirection: 'row', alignItems: 'center', gap: 10, }}>

                                <TouchableOpacity style={[{ backgroundColor: Color.gray2, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minWidth: 70, gap: 5, elevation: 5, padding: 10, width: '46%', height: 50 }]} onPress={() => {
                                    setSel('Login')
                                }}>
                                    <Image source={require('../../assets/phoneverify12.png.png')} style={{ width: 30, height: 30 }} resizeMode="contain" />
                                    <Text style={{ color: sel === 'Login' ? Color.black : Color.white, fontSize: fontSize(FontSize.font_size), fontWeight: '500' }}>Send via SMS</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={[{ backgroundColor: Color.gray2, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minWidth: 70, gap: 5, elevation: 5, padding: 10, width: '50%', height: 50 }]} onPress={() => {
                                    setSel('Whatsapp')
                                }}>
                                    <Image source={require('../../assets/phoneverify11.png')} style={{ width: 25, height: 25 }} resizeMode="contain" />
                                    <Text style={{ color: sel === 'Whatsapp' ? Color.black : Color.white, fontSize: fontSize(FontSize.font_size), fontWeight: '500' }}>Send via WhatsApp</Text>
                                </TouchableOpacity>



                            </View>





                            <TouchableOpacity style={{ marginTop: 30 }}>
                                <Text style={{ color: Color.error, fontSize: fontSize(FontSize.pxRegular_size), fontWeight: '500', textAlign: 'center' }}>Need help? Contact us</Text>
                            </TouchableOpacity>




                            <View style={{ marginTop: 130 }}>

                                <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.background, borderRadius: 10, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', elevation: 5,  }]} onPress={() => { navigation.navigate('PhoneVerify1') }}>

                                    <Text style={{ color: Color.white, fontSize: fontSize(FontSize.headline3_size), fontWeight: '600' }}>Verify</Text>

                                </TouchableOpacity>



                            </View>



                        </View>


                    </View>
                </ScrollView>

            </View>
        </>
    );
};
export default PhoneVerify;
