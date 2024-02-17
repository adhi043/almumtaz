
import { View, Text, Pressable, TouchableOpacity, StatusBar, Image, Dimensions, ScrollView, TextInput, PixelRatio, StyleSheet } from "react-native";
import { Color, FontSize, baseUrl } from "../../Global";
import tw from "twrnc";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import UserCircleIcon from "react-native-heroicons/solid/UserCircleIcon";
import PencilSquareIcon from "react-native-heroicons/outline/PencilSquareIcon";
import EyeIcon from "react-native-heroicons/solid/EyeIcon";
import EyeSlashIcon from "react-native-heroicons/solid/EyeSlashIcon";
import Noti from "../../Noti";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import ProgressBar from 'react-native-animated-progress';


const CELL_COUNT = 4;

const PhoneVerify1 = ({ navigation }) => {



    const { width, height } = Dimensions.get('screen')
    const [hide, setHide] = useState(true)
    const [sel, setSel] = useState('Login')






    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const [seconds, setSeconds] = useState(60);
    const [myprog, setMyProg] = useState(60);

    const [displaysec, setdisplaysec] = useState(false)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds(prev => prev - 1);
            setMyProg((seconds / 59) * 100);
        }, 1000);

        // Clear the interval when the component is unmounted or when seconds reaches 0
        if (seconds === 0) {
            clearInterval(intervalId);
            setdisplaysec(true)
        }

        return () => {
            clearInterval(intervalId)
        };
    }, [seconds]);








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










    return (
        <>
            <Noti type={type} msg={msg} timeout={2000} ref={toastRef} />
            <View style={{ backgroundColor: Color.white, flexDirection: 'row',flex:1}}>

                <ScrollView style={{}} showsVerticalScrollIndicator={false}>
                    <View style={{ padding: 20, }}>


                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
                            <View>
                                <Image source={require('../../assets/slider11.png')} style={{ width: 120, height: 100 }} resizeMode="contain" />
                            </View>
                            <TouchableOpacity style={{  }} onPress={() => { navigation.goBack() }}>
                                <Text style={{ color: Color.gray, fontSize: fontSize(FontSize.pxRegular_size), fontWeight: '400', textAlign: 'center' }}>Back</Text>
                            </TouchableOpacity>
                        </View>


                        <Text style={{ color: Color.black, fontSize: fontSize(FontSize.pxRegular_size), fontWeight: 'bold' }}>Enter the 4 digit code send to your registered mobile number</Text>


                        <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', gap: 10, }}>

                            <Text style={{ color: Color.black, fontSize: fontSize(FontSize.font2_size), fontWeight: '400' }}>You will recieve SMS with the verification pin on +923411514046</Text>


                        </View>



                        <View>
                            <View style={{}}>



                                <CodeField
                                    ref={ref}
                                    {...props}
                                    // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                                    value={value}
                                    onChangeText={setValue}
                                    cellCount={CELL_COUNT}
                                    rootStyle={styles.codeFieldRoot}
                                    keyboardType="number-pad"
                                    textContentType="oneTimeCode"
                                    renderCell={({ index, symbol, isFocused }) => (
                                        <Text
                                            key={index}
                                            style={[styles.cell, isFocused && styles.focusCell]}
                                            onLayout={getCellOnLayoutHandler(index)}>
                                            {symbol || (isFocused ? <Cursor /> : null)}
                                        </Text>
                                    )}
                                />
                                {displaysec ?
                                    <View style={{ marginTop: 30 }}>
                                        <Text style={{ color: Color.black, fontSize: fontSize(FontSize.pxRegular_size), fontWeight: 'bold', textAlign: 'center' }}>Didn't receive a verification code?</Text>
                                        <TouchableOpacity >
                                            <Text style={{ color: Color.error, fontSize: fontSize(FontSize.headline2_size), fontWeight: 'bold', textAlign: 'center' }}>Resend code</Text>
                                        </TouchableOpacity>

                                    </View> :
                                    <View >

                                        <Text
                                            style={{
                                                alignSelf: 'center',
                                                marginTop: 30,
                                                fontSize: fontSize(FontSize.pxRegular_size),
                                                color: Color.black,
                                                fontWeight: 'bold'
                                            }}>
                                            Resend code 00:{seconds}
                                        </Text>



                                        <View
                                            style={{
                                                width: 130,
                                                alignSelf: 'center',
                                                marginTop: 5,
                                            }}>
                                            <ProgressBar
                                                progress={myprog}
                                                height={5}
                                                backgroundColor={Color.background}
                                            />
                                        </View>

                                    </View>}




                            </View>











                            



                        </View>


                    </View>
                </ScrollView>




                <View style={{ position:'absolute',bottom:'5%',width:'100%',paddingHorizontal:20 }}>

                                <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.gray2, borderRadius: 10, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', elevation: 5, marginTop: 50 }]} onPress={() => { navigation.navigate('Signup') }}>

                                    <Text style={{ color: Color.white, fontSize: fontSize(FontSize.headline3_size), fontWeight: '600' }}>Verify & Proceed</Text>

                                </TouchableOpacity>



                            </View>

            </View>
        </>
    );
};
export default PhoneVerify1;






const styles = StyleSheet.create({
    root: { flex: 1, padding: 25 },
    title: { textAlign: 'center', fontSize: 30, color: Color.black },
    codeFieldRoot: {
        width: '80%',
        alignSelf: 'flex-start',
        marginTop: 5,
    },
    cell: {
        width: 50,
        height: 60,
        lineHeight: 75,
        borderColor: Color.gray,
        borderBottomWidth: 2,
        textAlign: 'center',
        color: Color.black,
        overflow: 'hidden',
        fontSize: FontSize.headline2_size,
    },
    focusCell: {
        backgroundColor: 'white',
    },
});