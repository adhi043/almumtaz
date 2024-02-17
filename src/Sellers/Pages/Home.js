import * as React from "react";
import { View, Text, TextInput, Pressable, TouchableOpacity, StatusBar, ScrollView, Image, FlatList, Dimensions, Animated } from "react-native";
import { Color, FontSize } from "../../Global";
import tw from "twrnc";
import BellIcon from "react-native-heroicons/outline/BellIcon";
import BookmarkIcon from "react-native-heroicons/outline/BookmarkIcon";
import BookmarkIconS from "react-native-heroicons/solid/BookmarkIcon";
import ChatBubbleLeftEllipsisIcon from "react-native-heroicons/solid/ChatBubbleLeftEllipsisIcon";
import PaperAirplaneIcon from "react-native-heroicons/solid/PaperAirplaneIcon";
import HeartIcon from "react-native-heroicons/solid/HeartIcon";
import ArrowUpRightIcon from "react-native-heroicons/outline/ArrowUpRightIcon";
import PlusIconO from "react-native-heroicons/outline/PlusIcon";
import ShoppingCartIconS from "react-native-heroicons/solid/ShoppingCartIcon";
import CheckBadgeIcon from "react-native-heroicons/solid/CheckBadgeIcon";
import XMarkIcon from "react-native-heroicons/solid/XMarkIcon";
import Pagination from "../Components/Pagination";
import Modal from "react-native-modal";
import Share from 'react-native-share';
import ViewShot, { captureRef } from 'react-native-view-shot';



const Home = ({ navigation }) => {

  const cat = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const [show, setShow] = React.useState(false)




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

  return (
    <>
      <ScrollView style={{ backgroundColor: Color.background }} showsVerticalScrollIndicator={false}>
        <View style={{ padding: 20, }}>

          <View style={{width:270,height:270,borderRadius:200,backgroundColor:Color.background2,position:'absolute',left:-50,top:-50,zIndex:-1}}/>

          <View style={[tw`flex-row justify-between items-center`, { marginBottom: 20 }]}>
            <View style={tw`flex-row justify-between items-center gap-x-3`}>
              <Image source={require('../../assets/phot.png')} style={{ borderRadius: 20, width: 50, height: 50 }} />
              <View>
                <Text style={{ color: Color.colorwhite_100, fontSize: FontSize.font_size }}>Welcome Back</Text>
                <Text style={{ color: Color.white, fontSize: FontSize.size_mini, fontWeight: '600' }}>Murtaza Pharmacy</Text>
              </View>
            </View>
            <View style={tw`flex-row justify-between items-center gap-x-3`}>
              <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.colorGray_100, borderRadius: 20 }]}>
                <BellIcon size={25} color={Color.white} />
                <View style={{ height: 16, width: 16, borderRadius: 200, backgroundColor: Color.white, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 0, top: 0 }}>
                  <Text style={{ color: Color.black, fontSize: 10 }}>2</Text>
                </View>
              </TouchableOpacity>
            </View>

          </View>
















          <View>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 10 }}>


              <View style={{ padding: 15, borderRadius: 20, width: '48%', elevation: 5, backgroundColor: Color.white }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '600' }}>number of employes</Text>
                  <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.colorGray_100, borderRadius: 20 }]}>
                    <ArrowUpRightIcon size={20} color={Color.white} />
                  </TouchableOpacity>
                </View>
                <Text style={{ color: Color.black, fontSize: FontSize.headline2_size, fontWeight: '600' }}>8</Text>
              </View>


              <View style={{ padding: 15, borderRadius: 20, width: '48%', elevation: 5, backgroundColor: Color.white }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '600' }}>number of categorys</Text>
                  <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.colorGray_100, borderRadius: 20 }]}>
                    <ArrowUpRightIcon size={20} color={Color.white} />
                  </TouchableOpacity>
                </View>
                <Text style={{ color: Color.black, fontSize: FontSize.headline2_size, fontWeight: '600' }}>8</Text>
              </View>

            </View>



            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 10 }}>


              <View style={{ padding: 15, borderRadius: 20, width: '48%', elevation: 5, backgroundColor: Color.white }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '600' }}>number of products</Text>
                  <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.colorGray_100, borderRadius: 20 }]}>
                    <ArrowUpRightIcon size={20} color={Color.white} />
                  </TouchableOpacity>
                </View>
                <Text style={{ color: Color.black, fontSize: FontSize.headline2_size, fontWeight: '600' }}>8</Text>
              </View>


              <View style={{ padding: 15, borderRadius: 20, width: '48%', elevation: 5, backgroundColor: Color.white }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '600' }}>number of suppliers</Text>
                  <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.colorGray_100, borderRadius: 20 }]}>
                    <ArrowUpRightIcon size={20} color={Color.white} />
                  </TouchableOpacity>
                </View>
                <Text style={{ color: Color.black, fontSize: FontSize.headline2_size, fontWeight: '600' }}>8</Text>
              </View>
            </View>
          </View>













          <View style={{ marginVertical: 10 }}>
            <View style={{ padding: 15, borderRadius: 20, width: '100%', elevation: 5, backgroundColor: Color.white }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%',marginBottom:10 }}>
                <Text style={{ color: Color.black, fontSize: FontSize.headline3_size, fontWeight: 'bold' }}>Today Attendance</Text>
                <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.colorGray_100, borderRadius: 20 }]}>
                  <ArrowUpRightIcon size={20} color={Color.white} />
                </TouchableOpacity>
              </View>


              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%',marginBottom:7 }}>
                <TouchableOpacity style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }} onPress={()=>{navigation.navigate('Sellers')}}>
                  <View>
                    <Image source={require('../../assets/phot.png')} style={{ borderRadius: 20, width: 45, height: 45 }} />
                  </View>
                  <View>
                    <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '600' }}>Muhammad Adnan</Text>
                    <Text style={{ color: Color.gray2, fontSize: FontSize.font_size }}>9:15 AM - 7:15 PM</Text>
                    <Text style={{ color: Color.colorGray_100, fontSize: FontSize.font_size }}>Manager</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.colorMediumseagreen, borderRadius: 20,flexDirection:'row',alignItems:'center',justifyContent:'center',width:70 }]}>
                <Text style={{ color: Color.white, fontSize: FontSize.font1_size}}>Present</Text>
                </TouchableOpacity>
              </View>


              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%',marginBottom:7 }}>
                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                  <View>
                    <Image source={require('../../assets/phot.png')} style={{ borderRadius: 20, width: 45, height: 45 }} />
                  </View>
                  <View>
                    <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '600' }}>Asad</Text>
                    <Text style={{ color: Color.gray2, fontSize: FontSize.font_size }}>Not In - Not Out</Text>
                    <Text style={{ color: Color.colorGray_100, fontSize: FontSize.font_size }}>Supervisor</Text>
                  </View>
                </View>
                <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.danger, borderRadius: 20,flexDirection:'row',alignItems:'center',justifyContent:'center',width:70 }]}>
                <Text style={{ color: Color.white, fontSize: FontSize.font1_size, }}>Absent</Text>
                </TouchableOpacity>
              </View>



            </View>
          </View>












          <View style={{ marginVertical: 10 }}>
            <View style={{ padding: 15, borderRadius: 20, width: '100%', elevation: 5, backgroundColor: Color.white }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%',marginBottom:10 }}>
                <Text style={{ color: Color.black, fontSize: FontSize.headline3_size, fontWeight: 'bold' }}>Pending Leaves</Text>
                <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.colorGray_100, borderRadius: 20 }]}>
                  <ArrowUpRightIcon size={20} color={Color.white} />
                </TouchableOpacity>
              </View>


              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%',marginBottom:7 }}>
                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                  <View>
                    <Image source={require('../../assets/phot.png')} style={{ borderRadius: 20, width: 45, height: 45 }} />
                  </View>
                  <View>
                    <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '600' }}>Muhammad Adnan</Text>
                    <Text style={{ color: Color.colorGray_100, fontSize: FontSize.font_size }}>21-10-2024</Text>
                  </View>
                </View>
                <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.danger, borderRadius: 20,flexDirection:'row',alignItems:'center',justifyContent:'center',width:70 }]}>
                <Text style={{ color: Color.white, fontSize: FontSize.font1_size, }}>Pending</Text>
                </TouchableOpacity>
              </View>


              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%',marginBottom:7 }}>
                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                  <View>
                    <Image source={require('../../assets/phot.png')} style={{ borderRadius: 20, width: 45, height: 45 }} />
                  </View>
                  <View>
                    <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '600' }}>Muhammad Adnan</Text>
                    <Text style={{ color: Color.colorGray_100, fontSize: FontSize.font_size }}>21-10-2024</Text>
                  </View>
                </View>
                <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.danger, borderRadius: 20,flexDirection:'row',alignItems:'center',justifyContent:'center',width:70 }]}>
                <Text style={{ color: Color.white, fontSize: FontSize.font1_size, }}>Pending</Text>
                </TouchableOpacity>
              </View>



            </View>
          </View>
















          <View style={{ marginVertical: 10 }}>
            <View style={{ padding: 15, borderRadius: 20, width: '100%', elevation: 5, backgroundColor: Color.white }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%',marginBottom:10 }}>
                <Text style={{ color: Color.black, fontSize: FontSize.headline3_size, fontWeight: 'bold' }}>Today Complaints</Text>
                <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.colorGray_100, borderRadius: 20 }]}>
                  <ArrowUpRightIcon size={20} color={Color.white} />
                </TouchableOpacity>
              </View>


              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%',marginBottom:7 }}>
                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                  <View>
                    {/* <Image source={require('../../assets/phot.png')} style={{ borderRadius: 20, width: 45, height: 45 }} /> */}
                  </View>
                  <View>
                    <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '600' }}>My PC is not working...</Text>
                    <Text style={{ color: Color.colorGray_100, fontSize: FontSize.font_size,fontWeight:'600' }}>Urgent</Text>
                  </View>
                </View>
                <TouchableOpacity style={[tw`p-2 px-4`, { backgroundColor: Color.colorMediumseagreen, borderRadius: 20,flexDirection:'row',alignItems:'center',justifyContent:'center',width:70 }]}>
                <Text style={{ color: Color.white, fontSize: FontSize.font1_size, }}>View</Text>
                </TouchableOpacity>
              </View>


              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%',marginBottom:7 }}>
                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                  <View>
                    {/* <Image source={require('../../assets/phot.png')} style={{ borderRadius: 20, width: 45, height: 45 }} /> */}
                  </View>
                  <View>
                    <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '600' }}>Solve my issue to resolve...</Text>
                    <Text style={{ color: Color.colorGray_100, fontSize: FontSize.font_size,fontWeight:'600' }}>Low</Text>
                  </View>
                </View>
                <TouchableOpacity style={[tw`p-2 px-4`, { backgroundColor: Color.colorMediumseagreen, borderRadius: 20,flexDirection:'row',alignItems:'center',justifyContent:'center',width:70 }]}>
                <Text style={{ color: Color.white, fontSize: FontSize.font1_size, }}>View</Text>
                </TouchableOpacity>
              </View>



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


      <Modal isVisible={show} backdropColor={Color.background} backdropOpacity={0.4}  >
        <View style={{ backgroundColor: Color.white, borderRadius: 20, padding: 20, paddingHorizontal: 40, justifyContent: 'center', alignItems: 'center' }}>

          <TouchableOpacity style={[tw`flex-row gap-x-3 items-center`, { position: 'absolute', top: 10, right: 10 }]} onPress={() => { setShow(false) }}>
            <XMarkIcon size={18} color={Color.gray2} />
          </TouchableOpacity>
          <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.primary, borderRadius: 20 }]}>
            <CheckBadgeIcon size={25} color={Color.white} />
          </TouchableOpacity>
          <Text style={{ color: Color.black, fontSize: FontSize.headline3_size, fontWeight: '800' }}>Successfully</Text>
          <Text style={{ color: Color.gray2, marginVertical: 10, marginBottom: 30, textAlign: 'center' }}>Your product has been successfully added for promotion!</Text>
          <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.background, borderRadius: 20, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' }]}>

            <Text style={{ color: Color.white, fontSize: FontSize.font_size }}>View Post</Text>


          </TouchableOpacity>
        </View>
      </Modal>


      <Modal isVisible={show} backdropColor={Color.background} backdropOpacity={0.4}
        style={{ margin: 0, justifyContent: 'flex-end' }}  >
        <View style={{ backgroundColor: Color.white, borderRadius: 20, padding: 20, justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
          <View style={{ width: 50, height: 4, backgroundColor: Color.colorGray_100, borderRadius: 20 }} />
          <TouchableOpacity style={[tw`flex-row gap-x-3 items-center`, { position: 'absolute', top: 10, right: 10 }]} onPress={() => { setShow(false) }}>
            <XMarkIcon size={18} color={Color.gray2} />
          </TouchableOpacity>
          {/* <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.primary, borderRadius: 20 }]}>
            <CheckBadgeIcon size={25} color={Color.white} />
          </TouchableOpacity> */}
          <Text style={{ color: Color.gray2, fontSize: FontSize.headline3_size, fontWeight: '800', marginVertical: 15 }}><Text style={{ color: Color.black, fontSize: FontSize.headline3_size, fontWeight: '800', marginTop: 15 }}>143</Text> Comments</Text>

          <View style={{ height: (height / 2) - 30 }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ width: width, paddingHorizontal: 10, height: '100%' }}>
              <View style={{ marginBottom: 50, height: '100%' }}>
                {cat.map(i => {
                  return (<>
                    <View style={[tw`mb-3`, { position: 'relative' }]}>
                      <View style={{ width: '100%', borderRadius: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                        <View style={{ flexDirection: 'row', gap: 7, alignItems: 'center' }}>
                          <TouchableOpacity style={[tw``, { borderRadius: 20 }]}>
                            <Image source={require('../../assets/phot.png')} style={{ borderRadius: 20, width: 50, height: 50 }} />
                          </TouchableOpacity>
                          <View style={{ width: '75%' }}>
                            <Text style={{ color: Color.gray2, textAlign: 'left' }}><Text style={{ color: Color.black, fontWeight: '800' }}>Muhammad Adnan </Text>Your product has been success for promotion😄</Text>
                            <View style={[tw` gap-x-3`, { flexDirection: 'row', alignItems: 'center' }]}>
                              <Text style={{ color: Color.gray2, fontSize: FontSize.font1_size, fontWeight: '600', textAlign: 'left' }}>12 h</Text>
                              <TouchableOpacity style={[tw`p-1 flex-row`, { borderRadius: 20 }]} onPress={() => {
                                setShow(false)
                                navigation.navigate('Replies')
                              }}>
                                <Text style={{ color: Color.gray2, fontSize: FontSize.font1_size, fontWeight: '600', textAlign: 'left' }}>Reply</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                        <TouchableOpacity style={[tw`p-1`, { borderRadius: 20 }]} onPress={() => { setShow(true) }}>
                          <HeartIcon size={25} color={Color.error} />
                          <Text style={{ color: Color.gray2, fontSize: FontSize.size_3xs, textAlign: 'left' }}>4.2k</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>)
                })}
              </View>
            </ScrollView>
          </View>

          <View style={{ backgroundColor: Color.prgray, borderRadius: 20, flexDirection: 'row', width: width, position: 'absolute', bottom: 0, padding: 5, alignItems: 'center', paddingHorizontal: 10, gap: 5, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
            <TouchableOpacity style={[tw``, { borderRadius: 20 }]}>
              <Image source={require('../../assets/phot.png')} style={{ borderRadius: 200, width: 40, height: 40 }} />
            </TouchableOpacity>
            <TextInput placeholderTextColor={Color.colorGray_100} placeholder="Send a message" style={{ color: Color.black, width: '75%' }} multiline={true} />
            <TouchableOpacity style={[tw`p-3`,]}>
              <PaperAirplaneIcon size={20} color={Color.black} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </>
  );
};
export default Home;
