import { View, Text, TextInput, Pressable, TouchableOpacity, StatusBar, ScrollView, Image, FlatList, Dimensions, Animated, PermissionsAndroid, Linking, Alert } from "react-native";
import { Color, FontSize, baseUrl } from "../../Global";
import tw from "twrnc";
import BellIcon from "react-native-heroicons/outline/BellIcon";
import RectangleStackIcon from "react-native-heroicons/solid/RectangleStackIcon";
import DocumentPlusIcon from "react-native-heroicons/solid/DocumentPlusIcon";
import FingerPrintIcon from "react-native-heroicons/solid/FingerPrintIcon";
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
import ViewShot, { captureRef } from 'react-native-view-shot';
import { useCallback, useEffect, useRef, useState } from "react";
import GetLocation from 'react-native-get-location';
import Geocoder from 'react-native-geocoding';
import axios from "axios";
import moment from "moment";
import TouchID from 'react-native-touch-id';
import Noti from "../../Noti";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";



const Home = ({ navigation }) => {

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



  const shareImage = async () => {
    try {
      // console.log(viewRef.current);
      const uri = await captureRef(viewRef, {
        format: 'jpg',
        quality: 0.8,
      });
      // console.log('uri', uri);
      const shareResponse = await Share.open({ url: uri });
      console.log('shareResponse', shareResponse);
    } catch (error) {
      console.log('error', error);
    }
  };








  const { width, height } = Dimensions.get('screen')













  const [locationPermission, setLocationPermission] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentCity, setCurrentCity] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);


  console.log(currentAddress);




  const openLocationSettings = () => {
    // You can open the device's location settings here, depending on the platform.
    // For Android, you can use the following code:
    Linking.openSettings();

    // For iOS, you can use the following code:
    // Linking.openURL('app-settings:');
  };


  const checkLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
      );

      console.log(granted);

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setLocationPermission('granted');
        // If permission is granted, get the user's location and address
        getCurrentLocation();
      } else {
        setLocationPermission('denied');
      }
    } catch (err) {
      console.error(err);
      setLocationPermission('denied');
    }
  };

  const getCurrentLocation = () => {

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        // Toast.show({
        //     type: ALERT_TYPE.SUCCESS,
        //     title: 'Success',
        //     textBody: 'Thanks for turn on location.',
        // });
        console.log(location);

        axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${location.latitude}&lon=${location.longitude}&format=json&accept-language=en`).then(res => {
          setCurrentAddress(res.data.display_name)
          // console.log(res.data.display_name);
        }).catch(err => {
          console.log(err);
        })

        setCurrentLocation({ latitude: location.latitude, longitude: location.longitude });
      })
      .catch(error => {
        const { code, message } = error;
        console.log(message, code);
        Alert.alert(
          'Permission Request',
          'USS Pharma requires access to your location in the background to ensure accurate and on-time attendance location even when the app is closed or not. Please grant location access in your device settings to use this feature.',
          [
            {
              text: 'Open Settings',
              onPress: () => openLocationSettings(),
            },
            {
              text: 'OK',
              onPress: () => checkLocationPermission(),
            },
          ]
        );
        setCurrentLocation(null);
      })
  };




  useEffect(() => {
    checkLocationPermission();
  }, [currentAddress]);




  useEffect(() => {
    if (checkIn && !checkOutTime) {
      const timer = setInterval(() => {
        // Calculate time difference between check-in time and current time
        const currentTime = Date.now();
        const elapsedTime = moment.duration(currentTime - checkInTime);

        // Update the state with the elapsed time
        setTimeElapsed(elapsedTime);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [checkOutTime ? null : checkIn, checkOutTime ? null : checkInTime]);







  // Check if fingerprint is supported
  const checkFingerprintSupport = () => {
    TouchID.isSupported()
      .then(supported => {
        setIsFingerprintSupported(supported);
      })
      .catch(error => {
        console.error('Touch ID check error: ', error);
      });
  };

  // Authenticate with fingerprint
  const authenticateWithFingerprint = () => {
    TouchID.authenticate('Authenticate with your fingerprint')
      .then(success => {
        console.log(success);
        setLateComeModal(false)
        setCheckIn(true);
        checkIndatetime();
        submitCheckIn()
      })
      .catch(error => {

        // Fingerprint authentication failed
        console.log('cancel');
        setType('Error');
        setMsg('Fingerprint authentication failed!');
        handleShowToast()


      });
  };


  useEffect(() => {
    checkFingerprintSupport()
  }, []);


  console.log(isFingerprintSupported);


  const [data, setData] = useState({})




  useFocusEffect(
    useCallback(async () => {
      const mydata = JSON.parse(await AsyncStorage.getItem('data'))



      axios.get(`${baseUrl}/employe/get/${mydata?.id}`).then(res => {
        if (res.data.status === 'ok') {
          setData(res.data.data);
        }
      }).catch(err => {
        setType('Error');
        setMsg(err.message);
        handleShowToast()
      })

    }, [])
  )





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





  function compareCheckInTime(comingTime) {
    // Get current time
    const now = new Date();

    // Parse the coming time string into a Date object
    const [hours, minutes, seconds] = comingTime.split(':').map(Number);
    const comingDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, seconds);

    // Compare current time with coming time
    if (now.getTime() > comingDateTime.getTime()) {
      return "late";
    } else if (now.getTime() < comingDateTime.getTime()) {
      return "early";
    } else {
      return "on time";
    }
  }



















  return (
    <>
      <Noti type={type} msg={msg} timeout={2000} ref={toastRef} />
      <ScrollView style={{ backgroundColor: Color.background }} showsVerticalScrollIndicator={false}>
        <View style={{ padding: 20, paddingTop: 40 }}>

          <View style={{ width: 270, height: 270, borderRadius: 200, backgroundColor: Color.background2, position: 'absolute', left: -50, top: -50, zIndex: -1 }} />

          <View style={[tw`flex-row justify-between items-center`, { marginBottom: 20 }]}>
            <View style={tw`flex-row justify-between items-center gap-x-3`}>
              <Image source={require('../../assets/phot.png')} style={{ borderRadius: 20, width: 50, height: 50 }} />
              <View>
                <Text style={{ color: Color.colorwhite_100, fontSize: FontSize.font_size }}>Welcome Back</Text>
                <Text style={{ color: Color.white, fontSize: FontSize.size_mini, fontWeight: '600' }}>{data?.firstName}</Text>
              </View>
            </View>
            <View style={tw`flex-row justify-between items-center gap-x-3`}>
              <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.colorGray_100, borderRadius: 20 }]} onPress={() => { navigation.navigate('Notification') }}>
                <BellIcon size={25} color={Color.white} />
                <View style={{ height: 16, width: 16, borderRadius: 200, backgroundColor: Color.white, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 0, top: 0 }}>
                  <Text style={{ color: Color.black, fontSize: 10 }}>2</Text>
                </View>
              </TouchableOpacity>
            </View>

          </View>















          <View style={{ marginVertical: 10 }}>
            <View style={{ padding: 15, borderRadius: 20, width: '100%', elevation: 5, backgroundColor: Color.white, minHeight: 130, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>



              {checkIn ?
                <View>
                  <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ elevation: 5, padding: 15, backgroundColor: Color.background2, borderRadius: 20 }}>
                      <Text style={{ color: Color.white, fontSize: FontSize.headline3_size, fontWeight: '600', textAlign: 'center' }}>{timeElapsed
                        ? `${timeElapsed.hours()}`
                        : "00"}</Text>
                      <Text style={{ color: Color.white, fontSize: FontSize.font1_size, textAlign: 'center' }}>HH</Text>
                    </View>
                    <View style={{ padding: 5, borderRadius: 20 }}>
                      <Text style={{ color: Color.black, fontSize: FontSize.headline3_size, fontWeight: '600' }}>:</Text>
                    </View>
                    <View style={{ elevation: 5, padding: 15, backgroundColor: Color.background2, borderRadius: 20 }}>
                      <Text style={{ color: Color.white, fontSize: FontSize.headline3_size, fontWeight: '600', textAlign: 'center' }}>{timeElapsed
                        ? `${timeElapsed.minutes()}`
                        : "00"}</Text>
                      <Text style={{ color: Color.white, fontSize: FontSize.font1_size, textAlign: 'center' }}>MM</Text>
                    </View>
                    <View style={{ padding: 5, borderRadius: 20 }}>
                      <Text style={{ color: Color.black, fontSize: FontSize.headline3_size, fontWeight: '600' }}>:</Text>
                    </View>
                    <View style={{ elevation: 5, padding: 15, backgroundColor: Color.background2, borderRadius: 20 }}>
                      <Text style={{ color: Color.white, fontSize: FontSize.headline3_size, fontWeight: '600' }}>{timeElapsed
                        ? `${timeElapsed.seconds()}`
                        : "00"}</Text>
                      <Text style={{ color: Color.white, fontSize: FontSize.font1_size, textAlign: 'center' }}>SS</Text>
                    </View>


                  </View>




                  <View style={{ marginVertical: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <FingerPrintIcon size={18} color={Color.black} />
                        <Text style={{ color: Color.black, fontSize: FontSize.font2_size, fontWeight: "600" }}>Check In:</Text>
                      </View>

                      <Text style={{ color: Color.black, fontSize: FontSize.font2_size }}>{moment(checkInTime).format('hh:mm:ss A')}</Text>

                    </View>


                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <ArrowLeftStartOnRectangleIcon size={18} color={Color.black} />
                        <Text style={{ color: Color.black, fontSize: FontSize.font2_size, fontWeight: "600" }}>Check Out:</Text>
                      </View>

                      <Text style={{ color: Color.black, fontSize: FontSize.font2_size }}>{checkOutTime ? moment(checkOutTime).format('hh:mm:ss A') : 'Not Out'}</Text>

                    </View>


                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginTop: 10 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <MapPinIcon size={18} color={Color.black} />
                        <Text style={{ color: Color.black, fontSize: FontSize.font2_size, fontWeight: "600" }}>Location:</Text>
                      </View>

                      <Text style={{ color: Color.black, fontSize: FontSize.font2_size, width: '70%' }}>{currentAddress}</Text>

                    </View>

                  </View>


                  <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.danger, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 70, alignSelf: 'flex-end' }]} onPress={() => { setShow(true) }}>
                    <Text style={{ color: Color.white, fontSize: FontSize.font1_size, }}>Check Out</Text>
                  </TouchableOpacity>


                </View>

                : <View>
                  <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.background2, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minWidth: 70, gap: 5 }]} onPress={() => {
                    compareCheckInTime(data?.workStartTime) === 'late' ? setLateComeModal(true) : authenticateWithFingerprint()
                  }}>
                    <FingerPrintIcon size={20} color={Color.white} />
                    <Text style={{ color: Color.white, fontSize: FontSize.font1_size }}>Check In</Text>
                  </TouchableOpacity>
                  <Text style={{ color: Color.black, fontSize: FontSize.font1_size }}>Must check in before start your work.</Text>
                </View>
              }


            </View>
          </View>













          <View style={{ marginTop: 20 }}>

            <Text style={{ color: Color.black, fontSize: FontSize.headline3_size, fontWeight: 'bold', marginBottom: 10 }}>All Services</Text>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 10 }}>


              <View style={{ padding: 15, borderRadius: 20, width: '48%', elevation: 5, backgroundColor: Color.white }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                  <View style={{ width: '70%', }}>
                    <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '600', marginBottom: 10 }}>Apply For Leave</Text>
                    <CalendarDaysIcon size={30} color={Color.background2} />
                  </View>
                  <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.colorGray_100, borderRadius: 20 }]} onPress={() => { navigation.navigate('ApplyLeave') }}>
                    <ArrowUpRightIcon size={20} color={Color.white} />
                  </TouchableOpacity>
                </View>

              </View>


              <View style={{ padding: 15, borderRadius: 20, width: '48%', elevation: 5, backgroundColor: Color.white }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                  <View style={{ width: '70%', }}>
                    <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '600', marginBottom: 10 }}>Admin Complaint</Text>
                    <Cog8ToothIcon size={30} color={Color.background2} />
                  </View>
                  <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.colorGray_100, borderRadius: 20 }]} onPress={() => { navigation.navigate('AdminComplaint') }}>
                    <ArrowUpRightIcon size={20} color={Color.white} />
                  </TouchableOpacity>
                </View>
              </View>

            </View>



            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 10 }}>


              <View style={{ padding: 15, borderRadius: 20, width: '48%', elevation: 5, backgroundColor: Color.white }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                  <View style={{ width: '70%', }}>
                    <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '600', marginBottom: 10 }}>System Support</Text>
                    <CogIcon size={30} color={Color.background2} />
                  </View>
                  <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.colorGray_100, borderRadius: 20 }]}>
                    <ArrowUpRightIcon size={20} color={Color.white} />
                  </TouchableOpacity>
                </View>
              </View>




            </View>



          </View>













          <View style={{ marginTop: 20 }}>

            <Text style={{ color: Color.black, fontSize: FontSize.headline3_size, fontWeight: 'bold', marginBottom: 10 }}>All Reports</Text>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 10 }}>


              <View style={{ padding: 15, borderRadius: 20, width: '48%', elevation: 5, backgroundColor: Color.white }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                  <View style={{ width: '70%', }}>
                    <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '600', marginBottom: 10 }}>Attendance Report</Text>
                    <DocumentPlusIcon size={30} color={Color.background2} />
                  </View>
                  <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.colorGray_100, borderRadius: 20 }]}>
                    <ArrowUpRightIcon size={20} color={Color.white} />
                  </TouchableOpacity>
                </View>

              </View>


              <View style={{ padding: 15, borderRadius: 20, width: '48%', elevation: 5, backgroundColor: Color.white }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                  <View style={{ width: '70%', }}>
                    <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '600', marginBottom: 10 }}>Assign Tasks</Text>
                    <RectangleStackIcon size={30} color={Color.background2} />
                  </View>
                  <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.colorGray_100, borderRadius: 20 }]}>
                    <ArrowUpRightIcon size={20} color={Color.white} />
                  </TouchableOpacity>
                </View>
              </View>

            </View>



            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 10 }}>


              <View style={{ padding: 15, borderRadius: 20, width: '48%', elevation: 5, backgroundColor: Color.white }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                  <View style={{ width: '70%', }}>
                    <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '600', marginBottom: 10 }}>System Support</Text>
                    <CogIcon size={30} color={Color.background2} />
                  </View>
                  <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.colorGray_100, borderRadius: 20 }]}>
                    <ArrowUpRightIcon size={20} color={Color.white} />
                  </TouchableOpacity>
                </View>
              </View>


              <View style={{ padding: 15, borderRadius: 20, width: '48%', elevation: 5, backgroundColor: Color.white }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                  <View style={{ width: '70%', }}>
                    <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '600', marginBottom: 10 }}>Pharmacy Support</Text>
                    <CalendarDaysIcon size={30} color={Color.background2} />
                  </View>
                  <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.colorGray_100, borderRadius: 20 }]}>
                    <ArrowUpRightIcon size={20} color={Color.white} />
                  </TouchableOpacity>
                </View>
              </View>



            </View> */}



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
              if(!lateComeReas){
                setType('Error');
                setMsg('Must Enter late coming reason!');
                handleShowToast()
              } else{
                authenticateWithFingerprint()
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
