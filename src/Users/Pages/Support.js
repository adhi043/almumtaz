import { View, Text, TextInput, Pressable, TouchableOpacity, StatusBar, ScrollView, Image, FlatList, Dimensions, Animated, PermissionsAndroid, Linking, Alert, PixelRatio, ToastAndroid } from "react-native";
import { Color, FontSize, baseUrl } from "../../Global";
import tw from "twrnc";
import BellIcon from "react-native-heroicons/outline/BellIcon";
import RectangleStackIcon from "react-native-heroicons/solid/RectangleStackIcon";
import DocumentPlusIcon from "react-native-heroicons/solid/DocumentPlusIcon";
import Bars3Icon from "react-native-heroicons/solid/Bars3Icon";
import CogIcon from "react-native-heroicons/solid/CogIcon";
import CalendarDaysIcon from "react-native-heroicons/solid/CalendarDaysIcon";
import ArrowUpRightIcon from "react-native-heroicons/outline/ArrowUpRightIcon";
import ArrowLeftStartOnRectangleIcon from "react-native-heroicons/solid/ArrowLeftStartOnRectangleIcon";
import MapPinIcon from "react-native-heroicons/solid/MapPinIcon";
import PaperAirplaneIcon from "react-native-heroicons/solid/PaperAirplaneIcon";
import XMarkIcon from "react-native-heroicons/solid/XMarkIcon";
import Pagination from "../Components/Pagination";
import Modal from "react-native-modal";
import Share from 'react-native-share';
import { useCallback, useEffect, useRef, useState } from "react";
import GetLocation from 'react-native-get-location';
import Geocoder from 'react-native-geocoding';
import axios from "axios";
import moment from "moment";
import Noti from "../../Noti";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import SwiperFlatList from "react-native-swiper-flatlist";
import ArrowLeftIcon from "react-native-heroicons/solid/ArrowLeftIcon";
import PlusCircleIcon from "react-native-heroicons/solid/PlusCircleIcon";
import LottieView from "lottie-react-native";



const Support = ({ navigation }) => {



  const [cat, setCat] = useState([])


  // const cat = [
  //   {
  //     sender: 'user',
  //     message: 'Hii',
  //     date: '2024-10-10'
  //   },
  //   {
  //     sender: 'seller',
  //     message: 'Hii',
  //     date: '2024-10-10'
  //   },
  // ]



  const cat1 = [1, 2, 3, 4]
  const [show, setShow] = useState(false)
  const [lateComeReas, setLateComeReas] = useState(null)
  const [checkInTime, setCheckInTime] = useState(null)
  const [checkOutTime, setCheckOutTime] = useState(null)
  const [message, setMessage] = useState(null)

  const [type, setType] = useState(null);
  const [msg, setMsg] = useState(null);
  const toastRef = useRef(null);

  const handleShowToast = () => {
    if (toastRef.current) {
      toastRef.current.show();
    }
  };




  const sendMsg = () => {

    if (!message) {
      ToastAndroid.show('Must enter a message', 2000)
    } else {
      setCat((val) => [...val, 
        {
        sender: 'seller',
        message: message,
        date: moment().format('YYYY-MMM-DD   hh:mm:ss A'),
      }
    ])

    setMessage(null)
    }

  }




  const checkIndatetime = () => {
    setCheckInTime(Date.now());
  }




  const checkOutdatetime = () => {
    setCheckOutTime(Date.now());
    setShow(false)
  }




  const { width, height } = Dimensions.get('screen')





  const fontSize = (size) => {
    const fontScale = PixelRatio.getFontScale();
    return size / fontScale;
  }











  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);





  const [data, setData] = useState({})

  const slider = [
    require('../../assets/home1.png'),
    require('../../assets/home1.png'),
    require('../../assets/home1.png')
  ]




  // useFocusEffect(
  //   useCallback(async () => {
  //     const mydata = JSON.parse(await AsyncStorage.getItem('data'))



  //     axios.get(`${baseUrl}/employe/get/${mydata?.id}`).then(res => {
  //       if (res.data.status === 'ok') {
  //         setData(res.data.data);
  //       }
  //     }).catch(err => {
  //       setType('Error');
  //       setMsg(err.message);
  //       handleShowToast()
  //     })

  //   }, [])
  // )





  const submitCheckIn = () => {
    console.log(moment(checkInTime).format('hh:mm:ss'));
    const param = {
      employeId: data?.id,
      businessId: data?.businessId,
      workStartTime: data?.workStartTime,
      workEndTime: data?.workEndTime,
      hoursperDay: data?.hoursperDay,
      inDateTime: moment(checkInTime).format('hh:mm:ss').toString(),
      address: currentAddress,
      lat: currentLocation?.latitude,
      lng: currentLocation?.longitude,
      lateComingReason: lateComeReas,
      internet: true,
    }

    axios.post(`${baseUrl}/employeAttend/create`, param).then(res => {
      if (res.data.status === 'ok') {
        setType('Success');
        setMsg('Check In successfully');
        handleShowToast()
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



















  return (
    <>
      <ScrollView style={{ backgroundColor: Color.white }} showsVerticalScrollIndicator={false}>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', backgroundColor: Color.white, padding: 20, }}>
          <TouchableOpacity style={{}} onPress={() => { navigation.goBack() }}>
            <ArrowLeftIcon size={22} color={Color.black} />
          </TouchableOpacity>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, }}>
            <TouchableOpacity style={{}} onPress={() => { }}>
              <Text style={{ color: Color.black, fontSize: fontSize(FontSize.headline3_size), fontWeight: '600', textAlign: 'center' }}>Support</Text>
            </TouchableOpacity>

          </View>

        </View>


        <View style={{ padding: 10, }}>






          <View style={{ marginTop: 10,marginBottom:60 }}>





            {cat.length > 0 ? cat.map(i => {
              return (<>
                <TouchableOpacity style={{ elevation: 5, width: 'auto', alignSelf: i?.sender === 'user' ? 'flex-start' : 'flex-end', backgroundColor: i?.sender === 'user' ? Color.gray2 : Color.background, padding: 10, borderRadius: 10, marginBottom: 10, }}>
                  <Text style={{ color: i?.sender === 'user' ? Color.black : Color.white, fontSize: fontSize(FontSize.font_size) }}>{i?.message}</Text>
                  <Text style={{ color: i?.sender === 'user' ? Color.black : Color.white, fontSize: fontSize(FontSize.size_3xs), alignSelf: 'flex-end' }}>{i?.date}</Text>
                </TouchableOpacity>
              </>)
            }) : <>
              <View style={{ width: '100%', position: 'relative', justifyContent: 'center', alignItems: 'center', height: 400 }}>
                <LottieView source={require('../../assets/98356-please-wait-loading.json')} autoPlay loop style={{ width: 300, height: 150 }} />
                <Text style={{ color: Color.black, fontSize: fontSize(FontSize.headline2_size), fontWeight: '500', }}>How can we help you?</Text>
              </View>

            </>}



          </View>






        </View>











      </ScrollView>




      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingHorizontal: 10, backgroundColor: Color.white, position: 'absolute', bottom: 0, padding: 15 }}>
        <TouchableOpacity style={[tw``, { borderRadius: 20, }]} onPress={() => { }}>
          <PlusCircleIcon size={35} color={Color.background} />
        </TouchableOpacity>
        <TextInput style={{ width: '75%', padding: 0, color: Color.black, fontWeight: '600', fontSize: fontSize(FontSize.pxRegular_size) }} placeholderTextColor={Color.gray} placeholder="Send message" defaultValue={message} onChangeText={(value) => { setMessage(value) }} />
        <TouchableOpacity style={[tw``, { borderRadius: 20, }]} onPress={() => { sendMsg() }}>
          <PaperAirplaneIcon size={25} color={Color.background} />
        </TouchableOpacity>
      </View>






      <Modal isVisible={show}  >
        <View style={{ backgroundColor: Color.white, borderRadius: 20, padding: 20, paddingHorizontal: 40, justifyContent: 'center', alignItems: 'center' }}>

          <TouchableOpacity style={[tw`flex-row gap-x-3 items-center`, { position: 'absolute', top: 10, right: 10 }]} onPress={() => { setShow(false) }}>
            <XMarkIcon size={18} color={Color.black} />
          </TouchableOpacity>

          <Text style={{ color: Color.black, fontSize: fontSize(FontSize.headline3_size), fontWeight: '700', textAlign: 'center', marginVertical: 10, }}>The estimated price for this service is</Text>

          <View style={{ borderWidth: 1, borderColor: Color.gray, padding: 10, borderRadius: 10, marginVertical: 10, marginBottom: 30, paddingHorizontal: 20 }}>
            <Text style={{ color: Color.green1, fontSize: fontSize(FontSize.headline3_size), fontWeight: '800', textAlign: 'center' }}>600/-</Text>
          </View>


          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>


            <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.background, borderRadius: 10, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' }]} onPress={checkOutdatetime}>
              <Text style={{ color: Color.white, fontSize: fontSize(FontSize.headline3_size), fontWeight: '600' }}>Done</Text>
            </TouchableOpacity>


          </View>
        </View>
      </Modal>








    </>
  );
};
export default Support;
