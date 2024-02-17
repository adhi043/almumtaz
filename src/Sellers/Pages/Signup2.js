
import { View, Text, Pressable, TouchableOpacity, StatusBar, Image, Dimensions, ScrollView, TextInput, PixelRatio, PermissionsAndroid } from "react-native";
import { Color, FontSize, baseUrl } from "../../Global";
import tw from "twrnc";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useRef, useState } from "react";
import UserCircleIcon from "react-native-heroicons/solid/UserCircleIcon";
import PhotoIcon from "react-native-heroicons/outline/PhotoIcon";
import ChevronDownIcon from "react-native-heroicons/solid/ChevronDownIcon";
import EyeSlashIcon from "react-native-heroicons/solid/EyeSlashIcon";
import Noti from "../../Noti";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImagePicker from 'react-native-image-crop-picker';

const Signup2 = ({ navigation }) => {

    const { width, height } = Dimensions.get('screen')
    const [hide, setHide] = useState(true)
    const [category, setCategory] = useState('Male')
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










    return (
        <>
            <Noti type={type} msg={msg} timeout={2000} ref={toastRef} />
            <View style={{ backgroundColor: Color.white, flex: 1, }}>

                <ScrollView style={{}} showsVerticalScrollIndicator={false}>
                    <View style={{ padding: 20, }}>


                        <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                            <View>
                                <Image source={require('../../assets/slider11.png')} style={{ width: 120, height: 100 }} resizeMode="contain" />
                            </View>
                        </View>





                        <View>



                            <View style={{ flexDirection: 'column', gap: 5, marginBottom: 15, }}>

                            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                <Text style={{ color: Color.black, fontSize: fontSize(FontSize.headline3_size), fontWeight: 'bold' }}>Choose Category</Text>
                                <ChevronDownIcon  size={20} color={Color.black} />
                            </View>


                                <TouchableOpacity style={{ padding: 5, paddingHorizontal: 10, backgroundColor: Color.white, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1, borderColor: Color.gray, width: '100%', }}>

                                    <TextInput style={{ width: '80%', padding: 5, color: Color.black }} placeholder="Select Option" placeholderTextColor={Color.colorGray_100} editable={false} />
                                </TouchableOpacity>


                            </View>









                        </View>


                    </View>
                </ScrollView>

                <View style={{ position: 'absolute', bottom: '5%', width: '100%', paddingHorizontal: 20 }}>

                    <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.background, borderRadius: 10, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', elevation: 5, marginTop: 50 }]} onPress={() => { navigation.navigate('PhoneVerify1') }}>

                        <Text style={{ color: Color.white, fontSize: fontSize(FontSize.headline3_size), fontWeight: '600' }}>Continue</Text>

                    </TouchableOpacity>



                </View>

            </View>
        </>
    );
};
export default Signup2;
