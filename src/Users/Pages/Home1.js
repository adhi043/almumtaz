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



const Home1 = ({ navigation }) => {


  const cat = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const cat1 = [1, 2, 3, 4]
  const [show, setShow] = useState(false)
  const [lateComeModal, setLateComeModal] = useState(false)
  const [lateComeReas, setLateComeReas] = useState(null)
  const [checkIn, setCheckIn] = useState(false)
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












  const [locationPermission, setLocationPermission] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentCity, setCurrentCity] = useState(null);
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
            <Image source={require('../../assets/map1.png')} style={{ width: width*0.44, height: height*0.06, padding: 0, margin: 0 }} resizeMode="contain" />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, }}>
            <TouchableOpacity style={{}} onPress={() => { navigation.navigate('Support') }}>
              <Text style={{ color: Color.black, fontSize: fontSize(FontSize.font_size), fontWeight: '600', textAlign: 'center' }}>Call Us</Text>
            </TouchableOpacity>

          </View>

        </View>


        <View style={{ padding: 10, }}>


          <View style={{ padding: 0, paddingHorizontal: 10, backgroundColor: Color.white, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 2, borderWidth: 1, borderColor: Color.gray, width: '100%', }}>

            <TouchableOpacity style={[tw`p-2`, { borderRadius: 20, }]} onPress={() => { setHide(!hide) }}>
              <MagnifyingGlassIcon size={25} color={Color.black} />
            </TouchableOpacity>
            <TextInput style={{ width: '85%', padding: 5, color: Color.black }} placeholder="What are you looking for?" placeholderTextColor={Color.colorGray_100} defaultValue={search} onChangeText={(value) => { setSearch(value) }} />
          </View>


          <View style={{ marginTop: 10 }}>

            <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ color: Color.black, fontSize: fontSize(FontSize.pxRegular_size), fontWeight: '500' }}>Top Sellers</Text>
              <TouchableOpacity style={{ backgroundColor: Color.black, padding: 3, paddingHorizontal: 10, borderRadius: 20 }}>
                <Text style={{ color: Color.white, fontSize: fontSize(FontSize.font1_size), }}>View All</Text>
              </TouchableOpacity>
            </View>


            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>



              {cat.map(i => {
                return (<>
                  <View style={{ marginRight: 10, padding: 10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, backgroundColor: Color.background, borderRadius: 15, paddingRight: 10 }}>
                    <View>
                      <Image source={require('../../assets/trial.jpg')} style={{ width: width * 0.3, height: height * 0.12, borderRadius: 15 }} resizeMode="cover" />
                    </View>
                    <View>
                      <Text style={{ color: Color.white, fontSize: fontSize(FontSize.headline3_size), fontWeight: '700' }}>AC General Services</Text>
                      <Text style={{ color: Color.white, fontSize: fontSize(FontSize.font2_size), fontWeight: '400' }}>Each AC (1 to 2.5 tons)</Text>
                      <View style={{ backgroundColor: Color.white, width: 'auto', paddingHorizontal: 10, borderRadius: 20, marginVertical: 5, padding: 3 }}>
                        <Text style={{ color: Color.black, fontSize: fontSize(FontSize.size_3xs), fontWeight: '400' }}>Rating of the seller
                          (
                          <StarIcon size={10} color={Color.orange} />
                          <StarIcon size={10} color={Color.orange} />
                          <StarIcon size={10} color={Color.orange} />
                          <StarIcon size={10} color={Color.orange} />
                          <StarIcon size={10} color={Color.gray2} />
                          )
                          4.4
                        </Text>
                      </View>
                      <Text style={{ color: Color.white, fontSize: fontSize(FontSize.headline3_size), fontWeight: '700' }}>RS. 1800/-</Text>
                    </View>

                  </View>
                </>)
              })}

            </ScrollView>

          </View>




          <View style={{ marginTop: 10 }}>

            <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ color: Color.black, fontSize: fontSize(FontSize.pxRegular_size), fontWeight: '500' }}>Home Services</Text>
            </View>




            <View style={{ flexDirection: 'row',justifyContent:'flex-start',alignItems:'center',width:'100%',flexWrap:'wrap',gap:20 }}>
            {cat1.map(i => {
              return (<>
                  <TouchableOpacity style={{  padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.gray3, borderRadius: 30, elevation: 5, width: '47%' }} onPress={() => { navigation.navigate('Home2') }}>

                    <Image source={require('../../assets/trial.jpg')} style={{ width: width * 0.3, height: height * 0.12, borderRadius: 15 }} resizeMode="cover" />
                    <Text style={{ color: Color.black, fontSize: fontSize(FontSize.headline3_size), fontWeight: '600',marginVertical:10 }}>AC Services</Text>

                  </TouchableOpacity>
              </>)
            })}
            </View>



          </View>






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
export default Home1;
