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



const Checkout = ({ navigation }) => {


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






  const [image1, setImage1] = useState(null);

  const getImage1 = async () => {

    ImagePicker.openPicker({
      mediaType: 'photo', // Specify that you want to capture a photo
    }).then(image => {
      console.log(image?.path, 'imgs loaded');
      setImage1(image?.path);
    });


  }


  const [image2, setImage2] = useState(null);

  const getImage2 = async () => {

    ImagePicker.openPicker({
      mediaType: 'photo', // Specify that you want to capture a photo
    }).then(image => {
      console.log(image?.path, 'imgs loaded');
      setImage2(image?.path);
    });


  }



  const [image3, setImage3] = useState(null);

  const getImage3 = async () => {

    ImagePicker.openPicker({
      mediaType: 'photo', // Specify that you want to capture a photo
    }).then(image => {
      console.log(image?.path, 'imgs loaded');
      setImage3(image?.path);
    });


  }



  const [image4, setImage4] = useState(null);

  const getImage4 = async () => {

    ImagePicker.openPicker({
      mediaType: 'photo', // Specify that you want to capture a photo
    }).then(image => {
      console.log(image?.path, 'imgs loaded');
      setImage4(image?.path);
    });


  }









  const [selectDate, setSelectDate] = useState('');

  const [showPromo, setShowPromo] = useState(false)
  const [promo, setPromo] = useState(null)
  const [info, setInfo] = useState(null)


  const [hide, setHide] = useState(false)
  const [category, setCategory] = useState(null)



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
              <Text style={{ color: Color.black, fontSize: fontSize(FontSize.font_size), fontWeight: '600', textAlign: 'center' }}>Checkout</Text>
            </TouchableOpacity>

          </View>

        </View>


        <View style={{ padding: 10, }}>


          <View style={{ padding: 0, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: Color.gray2, borderRadius: 10, borderWidth: 1, borderColor: Color.gray, width: '100%', }}>


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




          <View style={{ marginTop: 10, }}>

            <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ color: Color.black, fontSize: fontSize(FontSize.pxRegular_size), fontWeight: '700' }}>Services list</Text>

            </View>


            <View style={{ marginRight: 10, padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10, backgroundColor: Color.background, borderRadius: 10, paddingRight: 10, width: '100%' }}>

              <View>
                <Text style={{ color: Color.white, fontSize: fontSize(FontSize.pxRegular_size), fontWeight: 'bold' }}>AC Dismounting/Removal</Text>
                <Text style={{ color: Color.white, fontSize: fontSize(FontSize.font2_size), fontWeight: '400' }}>Per AC (1 to 2.5 tons)</Text>
                <Text style={{ color: Color.yellow, fontSize: fontSize(FontSize.pxRegular_size), fontWeight: '500' }}>PKR 600</Text>
              </View>


              <View style={{ borderWidth: 4, borderColor: Color.gray2, borderRadius: 30 }}>
                <Image source={require('../../assets/trial.jpg')} style={{ width: width * 0.3, height: height * 0.12, borderRadius: 30 }} resizeMode="cover" />
              </View>

            </View>




          </View>



          <View style={{ marginTop: 10, }}>

            {/* <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ color: Color.black, fontSize: fontSize(FontSize.headline3_size), fontWeight: '800' }}>Select Day</Text>

            </View> */}


            <View style={{}}>

              <DatePicker
                pressedColor={Color.white}
                pressedBackgroundColor={Color.background}
                depressedColor={Color.black}
                locale={'es-mx'}
                selected={date => {
                  setSelectDate(date);
                }}
                iconSize={20}
                initialDate={new Date()}
              />



            </View>




          </View>

          <View>



            <View style={{ flexDirection: 'column', gap: 5, }}>



              <TouchableOpacity style={{ padding: 5, paddingHorizontal: 10, backgroundColor: Color.gray2, borderRadius: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10, borderWidth: 1, borderColor: Color.gray, width: '100%', }} onPress={() => { setHide(!hide) }}>

                <TextInput style={{ width: '80%', padding: 0, color: Color.black, fontSize: fontSize(FontSize.pxRegular_size), fontWeight: '600' }} placeholder="Select time" placeholderTextColor={Color.black} defaultValue={category} editable={false} />
                {hide ? <ChevronUpIcon size={20} color={Color.black} /> : <ChevronDownIcon size={20} color={Color.black} />}
              </TouchableOpacity>


            </View>







            {hide ? <View style={{ width: '100%', minHeight: 100, backgroundColor: Color.white, borderRadius: 0, paddingVertical: 0, borderWidth: 1, borderTopWidth: 0, borderBottomWidth: 0 }}>

              {cat.map(i => {
                return (<>
                  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 0, borderBottomWidth: 1, borderBottomColor: Color.gray, padding: 10 }} onPress={() => {
                    setCategory(i)
                    setHide(!hide)
                  }}>
                    <Text style={{ color: Color.black, fontSize: fontSize(FontSize.pxRegular_size) }}>{i}</Text>
                    <CheckCircleIcon size={20} color={category === i ? Color.colorMediumseagreen : Color.black} />
                  </TouchableOpacity>

                </>)
              })}


            </View> : null}









          </View>




          <View style={{ marginTop: 10, padding: 10, backgroundColor: Color.gray2, borderRadius: 5, width: '100%', }}>
            <TouchableOpacity style={{ marginBottom: 5 }} onPress={() => { setShowPromo(!showPromo) }}>

              <Text style={{ padding: 0, color: Color.black, fontSize: fontSize(FontSize.font2_size), fontWeight: '700' }} >Apply Promo Code</Text>


            </TouchableOpacity>

            {showPromo ? <TextInput style={{ width: '100%', padding: 10, color: Color.black, }} placeholder="Enter promo code here..." placeholderTextColor={Color.colorGray_100} defaultValue={promo} onChangeText={(value) => { setPromo(value) }} /> : null}

          </View>








          <View style={{ marginTop: 5 }}>
            <Text style={{ marginVertical: 5, padding: 0, color: Color.black, fontSize: fontSize(FontSize.font2_size), fontWeight: '700' }} >Additional Information <Text style={{ padding: 0, color: Color.colorGray_100, fontSize: fontSize(FontSize.font2_size), fontWeight: '400' }} >(Optional)</Text></Text>


            <View style={{ padding: 10, backgroundColor: Color.gray2, borderRadius: 10, width: '100%', minHeight: 140 }}>

              <TextInput style={{ width: '100%', padding: 0, color: Color.black }} placeholderTextColor={Color.colorGray_100} defaultValue={info} onChangeText={(value) => { setInfo(value) }} multiline={true} />

            </View>



          </View>







          <View style={{ marginTop: 5 }}>
            <Text style={{ marginVertical: 5, padding: 0, color: Color.black, fontSize: fontSize(FontSize.font2_size), fontWeight: '700' }} >Add Image <Text style={{ padding: 0, color: Color.colorGray_100, fontSize: fontSize(FontSize.font2_size), fontWeight: '400' }} >(Optional)</Text></Text>


            <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>

              <TouchableOpacity style={{ padding: 5, backgroundColor: Color.gray2, borderRadius: 10, width: '24%', minHeight: 80, justifyContent: 'center', alignItems: 'center' }} onPress={getImage1}>
                {image1 ? <Image source={{ uri: image1 }} style={{ width: width * 0.2, height: 75, borderRadius: 10 }} resizeMode='cover' /> : <Image source={require('../../assets/checkout.png')} style={{ width: width * 0.15, height: 75, borderRadius: 10 }} resizeMode='contain' />}


                {image1 ? <TouchableOpacity style={{ padding: 5, borderRadius: 200, backgroundColor: Color.black, width: 20, height: 20, position: 'absolute', justifyContent: 'center', alignItems: 'center', right: 0 }} onPress={() => { setImage1(null) }}>
                  <XMarkIcon size={18} color={Color.white} />
                </TouchableOpacity> : null}

              </TouchableOpacity>





              <TouchableOpacity style={{ padding: 5, backgroundColor: Color.gray2, borderRadius: 10, width: '24%', minHeight: 80, justifyContent: 'center', alignItems: 'center' }} onPress={getImage2}>
                {image2 ? <Image source={{ uri: image2 }} style={{ width: width * 0.2, height: 75, borderRadius: 10 }} resizeMode='cover' /> : <Image source={require('../../assets/checkout.png')} style={{ width: width * 0.15, height: 75, borderRadius: 10 }} resizeMode='contain' />}


                {image2 ? <TouchableOpacity style={{ padding: 5, borderRadius: 200, backgroundColor: Color.black, width: 20, height: 20, position: 'absolute', justifyContent: 'center', alignItems: 'center', right: 0 }} onPress={() => { setImage2(null) }}>
                  <XMarkIcon size={18} color={Color.white} />
                </TouchableOpacity> : null}

              </TouchableOpacity>




              <TouchableOpacity style={{ padding: 5, backgroundColor: Color.gray2, borderRadius: 10, width: '24%', minHeight: 80, justifyContent: 'center', alignItems: 'center' }} onPress={getImage3}>
                {image3 ? <Image source={{ uri: image3 }} style={{ width: width * 0.2, height: 75, borderRadius: 10 }} resizeMode='cover' /> : <Image source={require('../../assets/checkout.png')} style={{ width: width * 0.15, height: 75, borderRadius: 10 }} resizeMode='contain' />}


                {image3 ? <TouchableOpacity style={{ padding: 5, borderRadius: 200, backgroundColor: Color.black, width: 20, height: 20, position: 'absolute', justifyContent: 'center', alignItems: 'center', right: 0 }} onPress={() => { setImage3(null) }}>
                  <XMarkIcon size={18} color={Color.white} />
                </TouchableOpacity> : null}

              </TouchableOpacity>




              <TouchableOpacity style={{ padding: 5, backgroundColor: Color.gray2, borderRadius: 10, width: '24%', minHeight: 80, justifyContent: 'center', alignItems: 'center' }} onPress={getImage4}>
                {image4 ? <Image source={{ uri: image4 }} style={{ width: width * 0.2, height: 75, borderRadius: 10 }} resizeMode='cover' /> : <Image source={require('../../assets/checkout.png')} style={{ width: width * 0.15, height: 75, borderRadius: 10 }} resizeMode='contain' />}


                {image4 ? <TouchableOpacity style={{ padding: 5, borderRadius: 200, backgroundColor: Color.black, width: 20, height: 20, position: 'absolute', justifyContent: 'center', alignItems: 'center', right: 0 }} onPress={() => { setImage4(null) }}>
                  <XMarkIcon size={18} color={Color.white} />
                </TouchableOpacity> : null}

              </TouchableOpacity>




            </View>



          </View>




          <View style={{ marginTop: 10, padding: 10, backgroundColor: Color.gray2, borderRadius: 10, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ marginVertical: 5, padding: 0, color: Color.black, fontSize: fontSize(FontSize.font2_size), fontWeight: '700' }} >Total Price</Text>
            <Text style={{ marginVertical: 5, padding: 0, color: Color.black, fontSize: fontSize(FontSize.font2_size), fontWeight: '700' }} >Rs.950</Text>
          </View>




          <View style={{marginVertical:10}}>
          <Text style={{ padding: 0, color: Color.colorGray_100, fontSize: fontSize(FontSize.font2_size), fontWeight: '500' }} >Payment method is cash please pay cash to the seller</Text>
          </View>


          <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.background, borderRadius: 10, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' }]} onPress={()=>{navigation.navigate('Cart')}}>
              <Text style={{ color: Color.white, fontSize: fontSize(FontSize.headline3_size), fontWeight: '600' }}>Offer Now</Text>
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
export default Checkout;
