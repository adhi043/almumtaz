
import { View, Text, Pressable, TouchableOpacity, StatusBar, Image, Dimensions, ScrollView, TextInput, PixelRatio, PermissionsAndroid } from "react-native";
import { Color, FontSize, baseUrl } from "../../Global";
import tw from "twrnc";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useRef, useState } from "react";
import UserCircleIcon from "react-native-heroicons/solid/UserCircleIcon";
import PhotoIcon from "react-native-heroicons/outline/PhotoIcon";
import ChevronDownIcon from "react-native-heroicons/solid/ChevronDownIcon";
import CheckCircleIcon from "react-native-heroicons/solid/CheckCircleIcon";
import Noti from "../../Noti";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImagePicker from 'react-native-image-crop-picker';

const Signup2 = ({ navigation }) => {

    const { width, height } = Dimensions.get('screen')
    const [hide, setHide] = useState(false)
    const [category, setCategory] = useState(null)
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





    const cat = [
        'Electrician', 'Plumber', 'Caterbury', 'AC Repair'
    ]




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

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ color: Color.black, fontSize: fontSize(FontSize.headline3_size), fontWeight: 'bold' }}>Choose Category</Text>
                                    <ChevronDownIcon size={20} color={Color.black} />
                                </View>


                                <TouchableOpacity style={{ padding: 5, paddingHorizontal: 10, backgroundColor: Color.white, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1, borderColor: Color.gray, width: '100%', }} onPress={() => { setHide(!hide) }}>

                                    <TextInput style={{ width: '80%', padding: 5, color: Color.black }} placeholder="Select Option" placeholderTextColor={Color.colorGray_100} defaultValue={category} editable={false} />
                                </TouchableOpacity>


                            </View>







                            {hide?<View style={{ elevation: 5, width: '100%', minHeight: 100, backgroundColor: Color.white, borderRadius: 10, padding: 10 }}>

                                {cat.map(i => {
                                    return (<>
                                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10,borderBottomWidth:1,borderBottomColor:Color.gray2,padding:5 }} onPress={()=>{
                                            setCategory(i)
                                            setHide(!hide)
                                        }}>
                                            <Text style={{ color: Color.black, fontSize: fontSize(FontSize.pxRegular_size) }}>{i}</Text>
                                            <CheckCircleIcon size={20} color={category===i?Color.colorMediumseagreen:Color.black} />
                                        </TouchableOpacity>

                                    </>)
                                })}


                            </View>:null}









                        </View>


                    </View>
                </ScrollView>

                <View style={{ position: 'absolute', bottom: '5%', width: '100%', paddingHorizontal: 20 }}>

                    <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.background, borderRadius: 10, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', elevation: 5, marginTop: 50 }]} onPress={() => { navigation.navigate('Signup3') }}>

                        <Text style={{ color: Color.white, fontSize: fontSize(FontSize.headline3_size), fontWeight: '600' }}>Continue</Text>

                    </TouchableOpacity>



                </View>

            </View>
        </>
    );
};
export default Signup2;
