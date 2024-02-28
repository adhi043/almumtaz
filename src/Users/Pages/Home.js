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



const Home = ({ navigation, route }) => {

  const { selectedLocation } = route.params;

  const cat = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const [show, setShow] = useState(false)
  const [lateComeModal, setLateComeModal] = useState(false)
  const [lateComeReas, setLateComeReas] = useState(null)
  const [checkIn, setCheckIn] = useState(false)
  const [checkInTime, setCheckInTime] = useState(null)
  const [checkOutTime, setCheckOutTime] = useState(null)
  const [timeElapsed, setTimeElapsed] = useState(null);
  const [isFingerprintSupported, setIsFingerprintSupported] = useState(false);

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












  const [locationPermission, setLocationPermission] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentCity, setCurrentCity] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);





  const [data, setData] = useState({})

  const slider=[
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
      <Noti type={type} msg={msg} timeout={2000} ref={toastRef} />
      <ScrollView style={{ backgroundColor: Color.white }} showsVerticalScrollIndicator={false}>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', backgroundColor: Color.white, padding: 10, }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, width: '40%' }}>
            <TouchableOpacity style={{}} onPress={() => {  }}>
              <Bars3Icon size={25} color={Color.black} />
            </TouchableOpacity>
            <View>
              <Text style={{ color: Color.black, fontSize: fontSize(FontSize.size_mini), fontWeight: '700', marginBottom: 0 }}>Current Location</Text>
              <Text style={{ color: Color.black, fontSize: fontSize(7) }}>{selectedLocation?.address}</Text>
            </View>
          </View>
          <View style={{}}>
            <Image source={require('../../assets/map1.png')} style={{ width: 150, height: 45, padding: 0, margin: 0 }} resizeMode="contain" />
          </View>
        </View>


        <View style={{ padding: 10, paddingTop: 30 }}>


          <View style={[{ marginBottom: 10, paddingHorizontal: 20 }]}>
            <View style={{}}>
              <View>
                <Text style={{ color: Color.black, fontSize: fontSize(FontSize.headline2_size), fontWeight: '600' }}>Welcome to Al-Mumtaz, <Text style={{ color: Color.black, fontSize: fontSize(FontSize.headline2_size), fontWeight: 'bold' }}>Adnan</Text></Text>
                <Text style={{ color: Color.gray, fontSize: fontSize(FontSize.font2_size) }}>Any work any task you'll get everything here</Text>
              </View>
            </View>

          </View>







          <View style={{ marginVertical: 10 }}>
            <View style={{ height: 106, width: width }}>
              <SwiperFlatList
                paginationStyleItem={{ width: 10, height: 10,borderRadius:200 }}
                // showPagination
                autoplay
                autoplayDelay={2}
                autoplayLoop
                paginationActiveColor={Color.black}
                data={slider}
                renderItem={({ item }) => (
                  <>

                    <Image
                      source={item}
                      style={{ height: '100%', width: width }}
                      resizeMode={'cover'}
                    />

                  </>
                )}

              />



            </View>

          </View>













          <View style={{ marginTop: 20 }}>




            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 10 }}>


              <TouchableOpacity style={{ padding: 0, borderRadius: 20, width: '58%', elevation: 5, backgroundColor: Color.white }} onPress={()=>{navigation.navigate('Home1')}}>
                <Image source={require('../../assets/home2.png')} style={{ width: '100%', height: 250, padding: 0, margin: 0, borderRadius: 20, }} resizeMode="cover" />

              </TouchableOpacity>


              <TouchableOpacity style={{ borderRadius: 20, width: '40%', }}  onPress={()=>{navigation.navigate('Home1')}}>
                <Image source={require('../../assets/home3.png')} style={{ width: '100%', height: 125, padding: 0, margin: 0, borderRadius: 20, marginBottom: 5, }} resizeMode="cover" />
                <Image source={require('../../assets/home4.png')} style={{ width: '100%', height: 125, padding: 0, margin: 0, borderRadius: 20, }} resizeMode="cover" />
              </TouchableOpacity>

            </View>



            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 10 }}>


              <TouchableOpacity style={{ borderRadius: 20, width: '100%', elevation: 5, backgroundColor: Color.white }}  onPress={()=>{navigation.navigate('Home1')}}>
                <Image source={require('../../assets/home5.png')} style={{ width: '100%', height: 80, padding: 0, margin: 0, borderRadius: 20, }} resizeMode="cover" />
              </TouchableOpacity>




            </View>



          </View>




















          {/*<View style={[tw`flex-row justify-between items-center mb-4`, { paddingHorizontal: 20, }]}>
            <Text style={{ color: Color.white, fontSize: FontSize.headline2_size, fontWeight: '600' }}>Categories</Text>
            <TouchableOpacity style={tw`flex-row gap-x-3 items-center`}>
              <Text style={{ color: Color.colorwhite_100, fontSize: FontSize.font_size }}>See All</Text>
              <ArrowLongRightIcon size={25} color={Color.colorwhite_100} />
            </TouchableOpacity>
  </View>*/}



        </View>











      </ScrollView>







      <Modal isVisible={lateComeModal}  >
        <View style={{ backgroundColor: Color.white, borderRadius: 20, padding: 20, justifyContent: 'center', alignItems: 'center' }}>

          <TouchableOpacity style={[tw`flex-row gap-x-3 items-center`, { position: 'absolute', top: 10, right: 10 }]} onPress={() => { setLateComeModal(false) }}>
            <XMarkIcon size={18} color={Color.gray2} />
          </TouchableOpacity>
          <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.background2, borderRadius: 20 }]}>
            <DocumentPlusIcon size={25} color={Color.white} />
          </TouchableOpacity>
          <Text style={{ color: Color.black, fontSize: FontSize.headline3_size, fontWeight: '800' }}>Late Coming Reason</Text>

          <View style={{ padding: 5, backgroundColor: Color.white, elevation: 5, borderRadius: 20, flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginTop: 10, minHeight: 170, width: '100%' }}>

            <TextInput style={{ width: '80%', padding: 10, color: Color.black }} placeholder="Enter Late Coming Reason" placeholderTextColor={Color.colorGray_100} multiline defaultValue={lateComeReas} onChangeText={(value) => { setLateComeReas(value) }} />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 10 }}>

            <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.colorGray_100, borderRadius: 20, flexDirection: 'row', width: '47%', justifyContent: 'center', alignItems: 'center' }]} onPress={() => { setLateComeModal(false) }}>
              <Text style={{ color: Color.white, fontSize: FontSize.font_size }}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.background2, borderRadius: 20, flexDirection: 'row', width: '47%', justifyContent: 'center', alignItems: 'center' }]} onPress={() => {
              if (!lateComeReas) {
                setType('Error');
                setMsg('Must Enter late coming reason!');
                handleShowToast()
              } else {
              }
            }}>
              <Text style={{ color: Color.white, fontSize: FontSize.font_size }}>Check In</Text>
            </TouchableOpacity>


          </View>
        </View>
      </Modal>








      <Modal isVisible={show}  >
        <View style={{ backgroundColor: Color.white, borderRadius: 20, padding: 20, paddingHorizontal: 40, justifyContent: 'center', alignItems: 'center' }}>

          <TouchableOpacity style={[tw`flex-row gap-x-3 items-center`, { position: 'absolute', top: 10, right: 10 }]} onPress={() => { setShow(false) }}>
            <XMarkIcon size={18} color={Color.gray2} />
          </TouchableOpacity>
          <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.background2, borderRadius: 20 }]}>
            <ArrowLeftStartOnRectangleIcon size={25} color={Color.white} />
          </TouchableOpacity>
          <Text style={{ color: Color.black, fontSize: FontSize.headline3_size, fontWeight: '800' }}>Check Out</Text>
          <Text style={{ color: Color.gray2, marginVertical: 10, marginBottom: 30, textAlign: 'center' }}>Do you really want to checkout?</Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>

            <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.colorGray_100, borderRadius: 20, flexDirection: 'row', width: '47%', justifyContent: 'center', alignItems: 'center' }]} onPress={() => { setShow(false) }}>
              <Text style={{ color: Color.white, fontSize: FontSize.font_size }}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.background2, borderRadius: 20, flexDirection: 'row', width: '47%', justifyContent: 'center', alignItems: 'center' }]} onPress={checkOutdatetime}>
              <Text style={{ color: Color.white, fontSize: FontSize.font_size }}>Check Out</Text>
            </TouchableOpacity>


          </View>
        </View>
      </Modal>








    </>
  );
};
export default Home;
