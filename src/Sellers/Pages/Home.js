import * as React from "react";
import { View, Text, TextInput, Pressable, TouchableOpacity, StatusBar, ScrollView, Image, FlatList, Dimensions, Animated, PixelRatio } from "react-native";
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
import LottieView from "lottie-react-native";
import Loader from "../../Loader";



const Home = ({ navigation }) => {

  const cat = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const [show, setShow] = React.useState(false)


  const fontSize = (size) => {
    const fontScale = PixelRatio.getFontScale();
    return size / fontScale;
  }







  const { width, height } = Dimensions.get('screen')

  return (
    <>


      <ScrollView style={{ backgroundColor: Color.white }} showsVerticalScrollIndicator={false}>


        <View style={{ padding: 20 }}>


          <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
            <View>
              <Image source={require('../../assets/slider11.png')} style={{ width: 90, height: 70 }} resizeMode="contain" />
            </View>
            <TouchableOpacity style={{}} onPress={() => { navigation.goBack() }}>
              <Text style={{ color: Color.black, fontSize: fontSize(FontSize.font_size), fontWeight: '600', textAlign: 'center' }}>Get Offers</Text>
            </TouchableOpacity>
          </View>






        </View>



      </ScrollView>


      
      <Loader/>


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
