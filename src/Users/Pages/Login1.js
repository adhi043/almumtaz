
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

const Login1 = ({ navigation, route }) => {

    const { width, height } = Dimensions.get('screen')
    const { move } = route.params;
    const [hide, setHide] = useState(true)
    const [sel, setSel] = useState(move)
    const [email, setEmail] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [password, setPassword] = useState(null);
    const [repassword, setRepassword] = useState(null);

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
                                <Image source={require('../../assets/slider11.png')} style={{ width: 220, height: 200 }} resizeMode="contain" />
                            </View>
                        </View>


                        <View style={{ marginVertical: 20, flexDirection: 'row', alignItems: 'center', gap: 10, }}>

                            <TouchableOpacity style={[tw`p-2`, { backgroundColor: sel === 'Login' ? Color.background : Color.gray2, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minWidth: 70, gap: 5, elevation: 5, }]} onPress={() => {
                                setSel('Login')
                            }}>
                                <Text style={{ color: sel === 'Login' ? Color.white : Color.black, fontSize: fontSize(FontSize.font_size), fontWeight: '500' }}>Login</Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={[tw`p-2`, { backgroundColor: sel === 'Signup' ? Color.background : Color.gray2, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minWidth: 70, gap: 5, elevation: 5, }]} onPress={() => {
                                setSel('Signup')
                            }}>
                                <Text style={{ color: sel === 'Signup' ? Color.white : Color.black, fontSize: fontSize(FontSize.font_size), fontWeight: '500' }}>Signup</Text>
                            </TouchableOpacity>


                        </View>



                        {sel === 'Login' ?
                            <View>



                                <View style={{ padding: 5, backgroundColor: Color.white, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 15, borderWidth: 1, borderColor: Color.gray }}>
                                    <TextInput style={{ width: '80%', padding: 10, color: Color.black }} placeholder="Enter your mobile number" placeholderTextColor={Color.colorGray_100} defaultValue={phone} onChangeText={(value) => { setPhone(value) }} />
                                </View>




                                <View style={{ padding: 5, backgroundColor: Color.white, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 15, borderWidth: 1, borderColor: Color.gray }}>

                                    <TextInput style={{ width: '83%', padding: 10, color: Color.black }} placeholder="Password" placeholderTextColor={Color.colorGray_100} defaultValue={password} onChangeText={(value) => { setPassword(value) }} secureTextEntry={hide} />
                                    <TouchableOpacity style={[tw`p-2`, { borderRadius: 20, }]} onPress={() => { setHide(!hide) }}>
                                        {hide ? <EyeSlashIcon size={25} color={Color.colorGray_100} /> : <EyeIcon size={25} color={Color.colorGray_100} />}
                                    </TouchableOpacity>
                                </View>


                                <TouchableOpacity onPress={()=>{navigation.navigate('ForgetPass')}}>
                                    <Text style={{ color: Color.black, fontSize: fontSize(FontSize.font_size), fontWeight: '500', textAlign: 'center' }}>Forgot Password?</Text>
                                </TouchableOpacity>




                                <View style={{ marginTop: 80 }}>

                                    <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.background, borderRadius: 10, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', elevation: 5, marginTop: 50 }]} onPress={() => { navigation.navigate('PhoneVerify') }}>

                                        <Text style={{ color: Color.white, fontSize: fontSize(FontSize.headline3_size), fontWeight: '600' }}>Login</Text>

                                    </TouchableOpacity>

                                    <View style={{ marginVertical: 10 }}>
                                        <Text style={{ color: Color.black, fontSize: fontSize(FontSize.font_size), fontWeight: '400', textAlign: 'center' }}>Or login with social logins</Text>
                                    </View>


                                    <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 15 }}>
                                        <TouchableOpacity style={[{ backgroundColor: Color.gray2, borderRadius: 200, flexDirection: 'row', width: 60, justifyContent: 'center', alignItems: 'center', height: 60 }]} onPress={() => { submit() }}>
                                            <Image source={require('../../assets/login21.png')} style={{ width: 40, height: 40 }} resizeMode="contain" />

                                        </TouchableOpacity>
                                        <TouchableOpacity style={[{ backgroundColor: Color.gray2, borderRadius: 200, flexDirection: 'row', width: 60, justifyContent: 'center', alignItems: 'center', height: 60 }]} onPress={() => { submit() }}>
                                            <Image source={require('../../assets/login22.png')} style={{ width: 40, height: 40 }} resizeMode="contain" />

                                        </TouchableOpacity>
                                    </View>





                                </View>



                            </View> :
                            <View>

                                <View style={{ padding: 5, backgroundColor: Color.white, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 15, borderWidth: 1, borderColor: Color.gray }}>
                                    <TextInput style={{ width: '80%', padding: 10, color: Color.black }} placeholder="Enter your mobile number" placeholderTextColor={Color.colorGray_100} defaultValue={phone} onChangeText={(value) => { setPhone(value) }} />
                                </View>




                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',width:'100%',gap:10 }}>


                                    <View style={{ padding: 5, backgroundColor: Color.white, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 15, borderWidth: 1, borderColor: Color.gray,width:'48%' }}>
                                        <TextInput style={{ width: '80%', padding: 10, color: Color.black }} placeholder="First Name" placeholderTextColor={Color.colorGray_100} defaultValue={firstName} onChangeText={(value) => { setFirstName(value) }} />
                                    </View>

                                    <View style={{ padding: 5, backgroundColor: Color.white, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 15, borderWidth: 1, borderColor: Color.gray,width:'48%' }}>
                                        <TextInput style={{ width: '80%', padding: 10, color: Color.black }} placeholder="Last Name" placeholderTextColor={Color.colorGray_100} defaultValue={lastName} onChangeText={(value) => { setLastName(value) }} />
                                    </View>


                                </View>





                                <View style={{ padding: 5, backgroundColor: Color.white, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 15, borderWidth: 1, borderColor: Color.gray }}>
                                    <TextInput style={{ width: '80%', padding: 10, color: Color.black }} placeholder="Email" placeholderTextColor={Color.colorGray_100} defaultValue={email} onChangeText={(value) => { setEmail(value) }} />
                                </View>



                                <View style={{ padding: 5, backgroundColor: Color.white, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 15, borderWidth: 1, borderColor: Color.gray }}>

                                    <TextInput style={{ width: '83%', padding: 10, color: Color.black }} placeholder="Password" placeholderTextColor={Color.colorGray_100} defaultValue={password} onChangeText={(value) => { setPassword(value) }} secureTextEntry={hide} />
                                    <TouchableOpacity style={[tw`p-2`, { borderRadius: 20, }]} onPress={() => { setHide(!hide) }}>
                                        {hide ? <EyeSlashIcon size={25} color={Color.colorGray_100} /> : <EyeIcon size={25} color={Color.colorGray_100} />}
                                    </TouchableOpacity>
                                </View>




                                <View style={{ padding: 5, backgroundColor: Color.white, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 15, borderWidth: 1, borderColor: Color.gray }}>

                                    <TextInput style={{ width: '83%', padding: 10, color: Color.black }} placeholder="Re-enter your password" placeholderTextColor={Color.colorGray_100} defaultValue={repassword} onChangeText={(value) => { setRepassword(value) }} secureTextEntry={hide} />
                                    <TouchableOpacity style={[tw`p-2`, { borderRadius: 20, }]} onPress={() => { setHide(!hide) }}>
                                        {hide ? <EyeSlashIcon size={25} color={Color.colorGray_100} /> : <EyeIcon size={25} color={Color.colorGray_100} />}
                                    </TouchableOpacity>
                                </View>








                                <View style={{ marginTop: 0 }}>

                                    <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.background, borderRadius: 10, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', elevation: 5, marginTop: 20 }]} onPress={() => { navigation.navigate('PhoneVerify') }}>

                                        <Text style={{ color: Color.white, fontSize: fontSize(FontSize.headline3_size), fontWeight: '600' }}>Signup</Text>

                                    </TouchableOpacity>

                                    <View style={{ marginVertical: 10 }}>
                                        <Text style={{ color: Color.black, fontSize: fontSize(FontSize.font_size), fontWeight: '400', textAlign: 'center' }}>Or login with social logins</Text>
                                    </View>


                                    <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 15 }}>
                                        <TouchableOpacity style={[{ backgroundColor: Color.gray2, borderRadius: 200, flexDirection: 'row', width: 60, justifyContent: 'center', alignItems: 'center', height: 60 }]} onPress={() => { submit() }}>
                                            <Image source={require('../../assets/login21.png')} style={{ width: 40, height: 40 }} resizeMode="contain" />

                                        </TouchableOpacity>
                                        <TouchableOpacity style={[{ backgroundColor: Color.gray2, borderRadius: 200, flexDirection: 'row', width: 60, justifyContent: 'center', alignItems: 'center', height: 60 }]} onPress={() => { submit() }}>
                                            <Image source={require('../../assets/login22.png')} style={{ width: 40, height: 40 }} resizeMode="contain" />

                                        </TouchableOpacity>
                                    </View>





                                </View>



                            </View>
                        }





                    </View>
                </ScrollView>

            </View>
        </>
    );
};
export default Login1;
