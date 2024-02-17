
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

const Signup = ({ navigation }) => {

    const { width, height } = Dimensions.get('screen')
    const [hide, setHide] = useState(true)
    const [sel, setSel] = useState('Male')
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
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
            <View style={{ backgroundColor: Color.white, flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

                <ScrollView style={{}} showsVerticalScrollIndicator={false}>
                    <View style={{ padding: 20, }}>


                        <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                            <View>
                                <Image source={require('../../assets/slider11.png')} style={{ width: 160, height: 140 }} resizeMode="contain" />
                            </View>
                        </View>


                        <Text style={{ color: Color.black, fontSize: fontSize(FontSize.headline3_size), fontWeight: 'bold', }}>Welcome to Al-Mumtaz</Text>
                        <Text style={{ color: Color.colorGray_100, fontSize: fontSize(FontSize.headline3_size), fontWeight: '500', }}>Let's get started with your name</Text>


                        



                        <View>


                            <View style={{ flexDirection: 'column',  gap: 5,marginBottom: 15,marginTop: 20, }}>
                                
                            <Text style={{ color: Color.black, fontSize: fontSize(FontSize.font2_size), fontWeight: 'bold' }}>First Name</Text>


                                <View style={{ padding: 5,paddingHorizontal:10, backgroundColor: Color.white, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 10,  borderWidth: 1, borderColor: Color.gray, width: '100%', }}>

                                    <TextInput style={{ width: '80%', padding: 5, color: Color.black }} placeholder="Enter your First Name" placeholderTextColor={Color.colorGray_100} defaultValue={firstName} onChangeText={(value) => { setFirstName(value) }} />
                                </View>
                            </View>



                            <View style={{ flexDirection: 'column',  gap: 5,marginBottom: 15, }}>
                                
                            <Text style={{ color: Color.black, fontSize: fontSize(FontSize.font2_size), fontWeight: 'bold' }}>Last Name</Text>


                                <View style={{ padding: 5,paddingHorizontal:10, backgroundColor: Color.white, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 10,  borderWidth: 1, borderColor: Color.gray, width: '100%', }}>

                                    <TextInput style={{ width: '80%', padding: 5, color: Color.black }} placeholder="Enter your Last Name" placeholderTextColor={Color.colorGray_100} defaultValue={lastName} onChangeText={(value) => { setLastName(value) }} />
                                </View>
                            </View>





                            <View style={{ flexDirection: 'column',  gap: 5,marginBottom: 15, }}>
                                
                            <Text style={{ color: Color.black, fontSize: fontSize(FontSize.font2_size), fontWeight: 'bold' }}>Your Email</Text>


                                <View style={{ padding: 5,paddingHorizontal:10, backgroundColor: Color.white, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 10,  borderWidth: 1, borderColor: Color.gray, width: '100%', }}>

                                    <TextInput style={{ width: '80%', padding: 5, color: Color.black }} placeholder="Example@gmail.com" placeholderTextColor={Color.colorGray_100} defaultValue={email} onChangeText={(value) => { setEmail(value) }} />
                                </View>
                            </View>




                            <View style={{ flexDirection: 'column',  gap: 5,marginBottom: 15, }}>
                                
                            <Text style={{ color: Color.black, fontSize: fontSize(FontSize.font2_size), fontWeight: 'bold' }}>Enter Your Password</Text>


                                <View style={{ padding: 5,paddingHorizontal:10, backgroundColor: Color.white, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 10,  borderWidth: 1, borderColor: Color.gray, width: '100%', }}>

                                    <TextInput style={{ width: '85%', padding: 5, color: Color.black }} placeholder="Enter Password" placeholderTextColor={Color.colorGray_100} defaultValue={password} onChangeText={(value) => { setPassword(value) }} secureTextEntry={hide} />
                                    <TouchableOpacity style={[tw`p-2`, { borderRadius: 20, }]} onPress={() => { setHide(!hide) }}>
                                        {hide ? <EyeSlashIcon size={25} color={Color.colorGray_100} /> : <EyeIcon size={25} color={Color.colorGray_100} />}
                                    </TouchableOpacity>
                                </View>

                                <View style={{ padding: 5,paddingHorizontal:10, backgroundColor: Color.white, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 10,  borderWidth: 1, borderColor: Color.gray, width: '100%', }}>

                                    <TextInput style={{ width: '85%', padding: 5, color: Color.black }} placeholder="Confirm Password" placeholderTextColor={Color.colorGray_100} defaultValue={repassword} onChangeText={(value) => { setRepassword(value) }} secureTextEntry={hide} />
                                    <TouchableOpacity style={[tw`p-2`, { borderRadius: 20, }]} onPress={() => { setHide(!hide) }}>
                                        {hide ? <EyeSlashIcon size={25} color={Color.colorGray_100} /> : <EyeIcon size={25} color={Color.colorGray_100} />}
                                    </TouchableOpacity>
                                </View>



                            </View>






                            <View style={{ flexDirection: 'column',  gap: 5,marginBottom: 15, }}>
                                
                            <Text style={{ color: Color.black, fontSize: fontSize(FontSize.font2_size), fontWeight: 'bold' }}>Select Gender</Text>


                                <View style={{ padding: 10,paddingHorizontal:10, backgroundColor: Color.white, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 20,  borderWidth: 1, borderColor: Color.gray, width: '100%', }}>

                                    
                                    <TouchableOpacity style={{flexDirection:'row',alignItems:'center',gap:5}} onPress={()=>{setSel('Male')}}>
                                        <View style={{borderWidth:2,borderRadius:200,width:20,height:20,justifyContent:'center',alignItems:'center'}} >
                                            <View style={{backgroundColor:sel==='Male'?Color.background:Color.white,width:13,height:13,borderRadius:200,}}/>
                                        </View>
                                        <Text style={{ color: Color.black, fontSize: fontSize(FontSize.font2_size) }}>Male</Text>

                                    </TouchableOpacity>


                                    <TouchableOpacity style={{flexDirection:'row',alignItems:'center',gap:5}} onPress={()=>{setSel('Female')}}>
                                        <View style={{borderWidth:2,borderRadius:200,width:20,height:20,justifyContent:'center',alignItems:'center'}} >
                                            <View style={{backgroundColor:sel==='Female'?Color.background:Color.white,width:13,height:13,borderRadius:200,}}/>
                                        </View>
                                        <Text style={{ color: Color.black, fontSize: fontSize(FontSize.font2_size) }}>Female</Text>

                                    </TouchableOpacity>


                                    <TouchableOpacity style={{flexDirection:'row',alignItems:'center',gap:5}} onPress={()=>{setSel('Other')}}>
                                        <View style={{borderWidth:2,borderRadius:200,width:20,height:20,justifyContent:'center',alignItems:'center'}} >
                                            <View style={{backgroundColor:sel==='Other'?Color.background:Color.white,width:13,height:13,borderRadius:200,}}/>
                                        </View>
                                        <Text style={{ color: Color.black, fontSize: fontSize(FontSize.font2_size) }}>Other</Text>

                                    </TouchableOpacity>



                                </View>
                            </View>





                            <View style={{ marginTop: 20 }}>

                                <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.background, borderRadius: 10, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', elevation: 5, marginTop: 50 }]} onPress={() => { navigation.navigate('Signup1') }}>

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
export default Signup;
