import { View, Text, TextInput, Pressable, TouchableOpacity, StatusBar, ScrollView, Image, FlatList, Dimensions, Animated, PermissionsAndroid, Linking, Alert, PixelRatio, Platform } from "react-native";
import { Color, FontSize, baseUrl } from "../../Global";
import tw from "twrnc";
import BellIcon from "react-native-heroicons/outline/BellIcon";
import RectangleStackIcon from "react-native-heroicons/solid/RectangleStackIcon";
import DocumentPlusIcon from "react-native-heroicons/solid/DocumentPlusIcon";
import Bars3Icon from "react-native-heroicons/solid/Bars3Icon";
import CogIcon from "react-native-heroicons/solid/CogIcon";
import CalendarDaysIcon from "react-native-heroicons/outline/CalendarDaysIcon";
import EnvelopeIcon from "react-native-heroicons/outline/EnvelopeIcon";
import ArrowLeftStartOnRectangleIcon from "react-native-heroicons/solid/ArrowLeftStartOnRectangleIcon";
import MapPinIcon from "react-native-heroicons/outline/MapPinIcon";
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
import DateTimePicker from '@react-native-community/datetimepicker';
import UserIcon from "react-native-heroicons/outline/UserIcon";



const Profile = ({ navigation }) => {







  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [place, setPlace] = useState(null)
  const [email, setEmail] = useState(null)




  const [date, setDate] = useState(new Date());
  const [sdate, setSDate] = useState(null);
  const [dob, setDob] = useState(null);
  const [showPicker, setShowPicker] = useState(false);



  const handleDateChange = (event, selectedDate) => {
      setShowPicker(Platform.OS === 'ios');
      if (selectedDate) {

          const birthDate = new Date(selectedDate);
          setDob(birthDate.toLocaleDateString())
          setSDate(birthDate.toLocaleDateString());


      }
  };


  const showDatepicker = () => {
      setShowPicker(true);
  };





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

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', backgroundColor: Color.white, padding: 10, paddingHorizontal: 20, }}>
          <View style={{}}>
            <Image source={require('../../assets/map1.png')} style={{ width: width * 0.44, height: height * 0.06, padding: 0, margin: 0 }} resizeMode="contain" />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, }}>
            <TouchableOpacity style={{}} onPress={() => { }}>
              <Text style={{ color: Color.black, fontSize: fontSize(FontSize.font_size), fontWeight: '600', textAlign: 'center' }}>Profile</Text>
            </TouchableOpacity>

          </View>

        </View>


        <View style={{ padding: 10, }}>




          <View style={{ marginVertical: 20 }}>



            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 15, paddingHorizontal: 20, }}>
              <TouchableOpacity style={[tw``, { borderRadius: 20, }]} onPress={() => { }}>
                <UserIcon size={25} color={Color.gray} />
              </TouchableOpacity>
              <TextInput style={{ width: '75%', padding: 0, color: Color.black, fontWeight: '600', fontSize: fontSize(FontSize.pxRegular_size) }} placeholderTextColor={Color.gray} placeholder="First Name" defaultValue={firstName} onChangeText={(value) => { setFirstName(value) }} />
              <TouchableOpacity style={[tw``, { borderRadius: 20, }]} onPress={() => { }}>
                <PencilSquareIcon size={25} color={Color.black} />
              </TouchableOpacity>
            </View>






            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 15, paddingHorizontal: 20, }}>
              <TouchableOpacity style={[tw``, { borderRadius: 20, }]} onPress={() => { }}>
                <UserIcon size={25} color={Color.gray} />
              </TouchableOpacity>
              <TextInput style={{ width: '75%', padding: 0, color: Color.black, fontWeight: '600', fontSize: fontSize(FontSize.pxRegular_size) }} placeholderTextColor={Color.gray} placeholder="Last Name" defaultValue={lastName} onChangeText={(value) => { setLastName(value) }} />
              <TouchableOpacity style={[tw``, { borderRadius: 20, }]} onPress={() => { }}>
                <PencilSquareIcon size={25} color={Color.black} />
              </TouchableOpacity>
            </View>







            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 15, paddingHorizontal: 20, }} onPress={() => { showDatepicker() }}>
              <TouchableOpacity style={[tw``, { borderRadius: 20, }]}>
                <CalendarDaysIcon size={25} color={Color.gray} />
              </TouchableOpacity>
              <TextInput style={{ width: '75%', padding: 0, color: Color.black, fontWeight: '600', fontSize: fontSize(FontSize.pxRegular_size) }} placeholderTextColor={Color.gray} placeholder="Date of Birth" defaultValue={dob} onChangeText={(value) => { setDob(value) }} editable={false} />
              <TouchableOpacity style={[tw``, { borderRadius: 20, }]} onPress={() => { }}>
                <PencilSquareIcon size={25} color={Color.black} />
              </TouchableOpacity>
            </TouchableOpacity>




            {showPicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}









            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 15, paddingHorizontal: 20, }}>
              <TouchableOpacity style={[tw``, { borderRadius: 20, }]} onPress={() => { }}>
                <MapPinIcon size={25} color={Color.gray} />
              </TouchableOpacity>
              <TextInput style={{ width: '75%', padding: 0, color: Color.black, fontWeight: '600', fontSize: fontSize(FontSize.pxRegular_size) }} placeholderTextColor={Color.gray} placeholder="Place" defaultValue={place} onChangeText={(value) => { setPlace(value) }} />
              <TouchableOpacity style={[tw``, { borderRadius: 20, }]} onPress={() => { }}>
                <PencilSquareIcon size={25} color={Color.black} />
              </TouchableOpacity>
            </View>







            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 15, paddingHorizontal: 20, }}>
              <TouchableOpacity style={[tw``, { borderRadius: 20, }]} onPress={() => { }}>
                <EnvelopeIcon size={25} color={Color.gray} />
              </TouchableOpacity>
              <TextInput style={{ width: '75%', padding: 0, color: Color.black, fontWeight: '600', fontSize: fontSize(FontSize.pxRegular_size) }} placeholderTextColor={Color.gray} placeholder="Email" defaultValue={email} onChangeText={(value) => { setEmail(value) }} />
              <TouchableOpacity style={[tw``, { borderRadius: 20, }]} onPress={() => { }}>
                <PencilSquareIcon size={25} color={Color.black} />
              </TouchableOpacity>
            </View>







          </View>






          <View style={{ padding: 0, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: Color.gray2, borderRadius: 10, borderWidth: 1, borderColor: Color.gray, width: '100%', marginBottom: 20 }}>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Text style={{ color: Color.gray, fontSize: fontSize(FontSize.pxRegular_size), fontWeight: '500' }}>Your home Address</Text>
              <TouchableOpacity style={[tw`p-2`, { borderRadius: 20, }]} onPress={() => { }}>
                <PencilSquareIcon size={25} color={Color.black} />
              </TouchableOpacity>
            </View>

            <View>
              <Text style={{ color: Color.black, fontSize: fontSize(FontSize.headline3_size), fontWeight: 'bold' }}>Current Location</Text>
              <Text style={{ color: Color.black, fontSize: fontSize(FontSize.font2_size), fontWeight: '600' }}>Hayat Colony street no. 4 near 47 pull, Sargodha</Text>
            </View>

          </View>





          <View style={{ padding: 0, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: Color.gray2, borderRadius: 10, borderWidth: 1, borderColor: Color.gray, width: '100%', marginBottom: 20 }}>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Text style={{ color: Color.gray, fontSize: fontSize(FontSize.pxRegular_size), fontWeight: '500' }}>Your office Address</Text>
              <TouchableOpacity style={[tw`p-2`, { borderRadius: 20, }]} onPress={() => { }}>
                <PencilSquareIcon size={25} color={Color.black} />
              </TouchableOpacity>
            </View>

            <View>
              <Text style={{ color: Color.black, fontSize: fontSize(FontSize.headline3_size), fontWeight: 'bold' }}>Current Location</Text>
              <Text style={{ color: Color.black, fontSize: fontSize(FontSize.font2_size), fontWeight: '600' }}>Hayat Colony street no. 4 near 47 pull, Sargodha</Text>
            </View>

          </View>












          <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.background, borderRadius: 10, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' }]} onPress={() => { navigation.navigate('Cart') }}>
            <Text style={{ color: Color.white, fontSize: fontSize(FontSize.headline3_size), fontWeight: '600' }}>Update</Text>
          </TouchableOpacity>

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
export default Profile;
