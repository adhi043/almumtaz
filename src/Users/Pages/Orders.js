import { View, Text, TextInput, Pressable, TouchableOpacity, StatusBar, ScrollView, Image, FlatList, Dimensions, Animated, PermissionsAndroid, Linking, Alert, PixelRatio } from "react-native";
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
import Cog8ToothIcon from "react-native-heroicons/solid/Cog8ToothIcon";
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
import MagnifyingGlassIcon from "react-native-heroicons/solid/MagnifyingGlassIcon";
import StarIcon from "react-native-heroicons/solid/StarIcon";



const Orders = ({ navigation }) => {


  const cat = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const cat1 = [1, 2, 3, 4]
  const [show, setShow] = useState(false)
  const [lateComeReas, setLateComeReas] = useState(null)
  const [checkInTime, setCheckInTime] = useState(null)
  const [checkOutTime, setCheckOutTime] = useState(null)
  const [search, setSearch] = useState(null)

  const [type, setType] = useState(null);
  const [msg, setMsg] = useState(null);
  const toastRef = useRef(null);

  const handleShowToast = () => {
    if (toastRef.current) {
      toastRef.current.show();
    }
  };




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

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', backgroundColor: Color.white, padding: 10, }}>
          <View style={{}}>
            <Image source={require('../../assets/map1.png')} style={{ width: width * 0.44, height: height * 0.06, padding: 0, margin: 0 }} resizeMode="contain" />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, }}>
            <TouchableOpacity style={{}} onPress={() => { }}>
              <Text style={{ color: Color.black, fontSize: fontSize(FontSize.font_size), fontWeight: '600', textAlign: 'center' }}>Get Offers</Text>
            </TouchableOpacity>

          </View>

        </View>


        <View style={{ padding: 10, }}>







          <View style={{ marginTop: 10 }}>






            {cat.map(i => {
              return (<>
                <View style={{ marginRight: 10, padding: 10, flexDirection: 'row', gap:10, alignItems: 'flex-end',  backgroundColor: Color.gray2, borderRadius: 15, elevation: 5, marginBottom: 15, width: '100%' }}>

                  <View style={{ borderWidth: 4, borderColor: Color.gray2, borderRadius: 15,  }}>
                    <Image source={require('../../assets/trial.jpg')} style={{ width: width * 0.27, height: height * 0.15, borderRadius: 15 }} resizeMode="cover" />
                  </View>

                  <View style={{width:'35%' }}>
                    <Text style={{ color: Color.black, fontSize: fontSize(FontSize.font2_size), fontWeight: 'bold' }}>AC Dismounting/Removal</Text>
                      <Text style={{ color: Color.black, fontSize: fontSize(FontSize.font1_size), fontWeight: '400' }}>Per AC (1 to 2.5 tons)</Text>
                    <Text style={{ color: Color.black, fontSize: fontSize(FontSize.font_size), fontWeight: '600' }}>I can perform your task in</Text>
                    <TouchableOpacity style={{ backgroundColor: Color.background, width: 115, paddingHorizontal: 10, borderRadius: 20, marginVertical: 10, padding: 5, justifyContent: 'center', alignItems: 'center', }} onPress={() => { navigation.navigate('AcceptOrders') }}>
                      <Text style={{ color: Color.white, fontSize: fontSize(FontSize.font2_size), fontWeight: '300' }}>Accept this offer</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ width:'35%'  }}>
                      <Text style={{ color: Color.black, fontSize: fontSize(FontSize.font1_size), fontWeight: '400',paddingHorizontal:10 }}>Seller Rating</Text>

                      <TouchableOpacity style={{ backgroundColor: Color.background, width: 80,  borderRadius: 5,  padding: 5, justifyContent: 'center', alignItems: 'center', }} onPress={() => {  }}>
                      <Text style={{ color: Color.white, fontSize: fontSize(FontSize.font2_size), fontWeight: '300' }}><StarIcon size={10} color={Color.orange} />
                          <StarIcon size={10} color={Color.orange} />
                          <StarIcon size={10} color={Color.orange} />
                          <StarIcon size={10} color={Color.orange} />
                          <StarIcon size={10} color={Color.gray2} />4.8</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: Color.colorGray_100, width: 80, paddingHorizontal: 10, borderRadius: 20, marginVertical: 10, padding: 5, justifyContent: 'center', alignItems: 'center', }} onPress={() => {  }}>
                      <Text style={{ color: Color.white, fontSize: fontSize(FontSize.font_size), fontWeight: '300' }}>Cancel</Text>
                    </TouchableOpacity>
                  </View>




                </View>
              </>)
            })}



          </View>






        </View>











      </ScrollView>










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
export default Orders;
