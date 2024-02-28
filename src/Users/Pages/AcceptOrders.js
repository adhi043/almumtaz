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
import PencilSquareIcon from "react-native-heroicons/outline/PencilSquareIcon";
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
import ChevronDownIcon from "react-native-heroicons/solid/ChevronDownIcon";
import ChevronUpIcon from "react-native-heroicons/solid/ChevronUpIcon";
import CheckCircleIcon from "react-native-heroicons/solid/CheckCircleIcon";
import DatePicker from 'react-native-date-picker-light';
import ImagePicker from 'react-native-image-crop-picker';



const AcceptOrders = ({ navigation }) => {


  const cat = [
    '09:00 to 10:00 AM',
    '10:00 to 11:00 AM',
    '11:00 to 12:00 PM',
    '12:00 to 01:00 PM',
    '02:00 to 03:00 PM',
    '03:00 to 04:00 PM',
    '04:00 to 05:00 PM',
    '06:00 to 07:00 PM',
    '07:00 to 08:00 PM']
  const cat1 = [1, 2, 3, 4]







  const [sel, setSel] = useState(null)

  const [show, setShow] = useState(false)
  const [lateComeReas, setLateComeReas] = useState(null)
  const [checkInTime, setCheckInTime] = useState(null)
  const [checkOutTime, setCheckOutTime] = useState(null)


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
              <Text style={{ color: Color.black, fontSize: fontSize(FontSize.font_size), fontWeight: '600', textAlign: 'center' }}>Cancel Order</Text>
            </TouchableOpacity>

          </View>

        </View>


        <View style={{ padding: 10, }}>





          <View style={{ marginTop: 10, }}>

            <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ color: Color.black, fontSize: fontSize(FontSize.pxRegular_size), fontWeight: '700' }}>Services list</Text>

            </View>


            <View style={{ marginRight: 10, padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10, backgroundColor: Color.gray2, borderRadius: 10, paddingRight: 10, width: '100%', elevation: 5 }}>

              <View>
                <Text style={{ color: Color.black, fontSize: fontSize(FontSize.font2_size), fontWeight: 'bold' }}>AC Dismounting/Removal</Text>
                <Text style={{ color: Color.black, fontSize: fontSize(FontSize.font1_size), fontWeight: '400' }}>Per AC (1 to 2.5 tons)</Text>
                <Text style={{ color: Color.green1, fontSize: fontSize(FontSize.pxRegular_size), fontWeight: '500', marginTop: 5 }}>Settled Amount</Text>
                <TouchableOpacity style={{ backgroundColor: Color.background, width: 70, paddingHorizontal: 10, borderRadius: 20, marginVertical: 5, padding: 5, justifyContent: 'center', alignItems: 'center', }} onPress={() => { }}>
                  <Text style={{ color: Color.white, fontSize: fontSize(FontSize.font2_size), fontWeight: '300' }}>PKR 999</Text>
                </TouchableOpacity>
              </View>


              <View style={{ borderWidth: 2, borderColor: Color.colorGray_100, borderRadius: 20 }}>
                <Image source={require('../../assets/trial.jpg')} style={{ width: width * 0.3, height: height * 0.12, borderRadius: 20 }} resizeMode="cover" />
              </View>

            </View>




          </View>


          <View style={{ marginTop: 10, }}>

            <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ color: Color.black, fontSize: fontSize(FontSize.pxRegular_size), fontWeight: '700' }}>Seller Information</Text>

            </View>


            <View style={{ marginRight: 10, padding: 10, flexDirection: 'row', alignItems: 'flex-start', gap: 10, backgroundColor: Color.white, borderRadius: 10, paddingRight: 10, width: '100%', borderWidth: 1, borderColor: Color.gray }}>

              <View style={{}}>
                <Image source={require('../../assets/trial.jpg')} style={{ width: width * 0.22, height: height * 0.1, borderRadius: 30 }} resizeMode="cover" />
              </View>

              <View>
                <Text style={{ color: Color.black, fontSize: fontSize(FontSize.font2_size), fontWeight: 'bold' }}>Adnan Tufail</Text>
                <Text style={{ color: Color.black, fontSize: fontSize(FontSize.font1_size), fontWeight: '400' }}>Expert in AC fitting and dismounting/removal</Text>


                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 10 }}>
                  <TouchableOpacity style={{ backgroundColor: Color.background, width: 110, paddingHorizontal: 10, borderRadius: 20, marginVertical: 5, padding: 5, justifyContent: 'center', alignItems: 'center', }} onPress={() => { }}>
                    <Text style={{ color: Color.white, fontSize: fontSize(FontSize.font1_size), fontWeight: '700' }}>Contact Seller</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ backgroundColor: Color.background, width: 110, paddingHorizontal: 10, borderRadius: 20, marginVertical: 5, padding: 5, justifyContent: 'center', alignItems: 'center', }} onPress={() => { }}>
                    <Text style={{ color: Color.white, fontSize: fontSize(FontSize.font1_size), fontWeight: '700' }}>Check Location</Text>
                  </TouchableOpacity>

                </View>
              </View>




            </View>




          </View>




          <View style={{ padding: 0, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: Color.gray2, borderRadius: 10, borderWidth: 1, borderColor: Color.gray, width: '100%', marginTop: 10 }}>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Text style={{ color: Color.gray, fontSize: fontSize(FontSize.pxRegular_size), fontWeight: '500' }}>Your Address</Text>
              <TouchableOpacity style={[tw`p-2`, { borderRadius: 20, }]} onPress={() => { }}>
                <PencilSquareIcon size={25} color={Color.black} />
              </TouchableOpacity>
            </View>

            <View>
              <Text style={{ color: Color.black, fontSize: fontSize(FontSize.headline3_size), fontWeight: 'bold' }}>Current Location</Text>
              <Text style={{ color: Color.black, fontSize: fontSize(FontSize.font2_size), fontWeight: '600' }}>Hayat Colony street no. 4 near 47 pull, Sargodha</Text>
            </View>

          </View>












          <View style={{ marginTop: 20, padding: 5, backgroundColor: Color.gray2, borderRadius: 10, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: Color.gray, }}>
            <Text style={{ marginVertical: 5, padding: 0, color: Color.black, fontSize: fontSize(FontSize.pxRegular_size), fontWeight: '700' }} >Select Payment Method</Text>
          </View>




          <View style={{ marginVertical: 10 }}>
            <View style={{ padding: 10, paddingHorizontal: 10, backgroundColor: Color.white, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 20, width: '100%', }}>


              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }} onPress={() => { setSel('Cash') }}>
                <View style={{ borderWidth: 1, borderRadius: 200, width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }} >
                <CheckCircleIcon size={20} color={sel === 'Cash' ? Color.green1 : Color.white} />
                </View>
                <Text style={{ color: Color.black, fontSize: fontSize(FontSize.font1_size) }}>Cash Payment</Text>

              </TouchableOpacity>


              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }} onPress={() => { setSel('Online') }}>
                <View style={{ borderWidth: 1, borderRadius: 200, width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }} >
                  <CheckCircleIcon size={20} color={sel === 'Online' ? Color.green1 : Color.white} />
                </View>
                <Text style={{ color: Color.black, fontSize: fontSize(FontSize.font1_size) }}>Online payment through easypaisa</Text>

              </TouchableOpacity>




            </View>
          </View>


          <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.background, borderRadius: 10, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' }]} onPress={() => { navigation.navigate('OrderStatus') }}>
            <Text style={{ color: Color.white, fontSize: fontSize(FontSize.headline3_size), fontWeight: '600' }}>Check Order Status</Text>
          </TouchableOpacity>

        </View>











      </ScrollView>





      {/* <View style={{ position: 'absolute', bottom: '0%', paddingHorizontal: 10, backgroundColor: Color.white, paddingBottom: 10 }}>


        <View style={{ marginRight: 10, padding: 10, flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: Color.background, borderRadius: 15, paddingRight: 10,  marginBottom: 15, }}>

          <View style={{ borderRadius: 15 }}>
            <Image source={require('../../assets/trial.jpg')} style={{ width: width * 0.3, height: height * 0.12, borderRadius: 15 }} resizeMode="cover" />
          </View>

          <View>
            <Text style={{ color: Color.green2, fontSize: fontSize(FontSize.pxRegular_size), fontWeight: 'bold' }}>Added to cart successfully</Text>
            <Text style={{ color: Color.white, fontSize: fontSize(FontSize.headline3_size), fontWeight: 'bold' }}>AC Dismounting/Removal</Text>
            <Text style={{ color: Color.white, fontSize: fontSize(FontSize.font2_size), fontWeight: '400' }}>Per AC (1 to 2.5 tons)</Text>
          </View>




        </View>


        <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.black, borderRadius: 10, flexDirection: 'row', width: '96%', justifyContent: 'center', alignItems: 'center' }]} onPress={checkOutdatetime}>
          <Text style={{ color: Color.white, fontSize: fontSize(FontSize.headline3_size), fontWeight: '600' }}>Continue to Checkout</Text>
        </TouchableOpacity>
      </View> */}






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
export default AcceptOrders;
