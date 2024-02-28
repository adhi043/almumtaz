import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Alert, Image, PixelRatio, TextInput } from 'react-native';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import MapView, { Marker, Callout, Circle, } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import MapViewDirections from 'react-native-maps-directions';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import GetLocation from 'react-native-get-location';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Color, FontSize, googleKey } from '../../Global';
import MagnifyingGlassIcon from 'react-native-heroicons/outline/MagnifyingGlassIcon';
import MapPinIcon from 'react-native-heroicons/outline/MapPinIcon';
import tw from 'twrnc';
import axios from 'axios';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';



const OpenMap = ({ navigation }) => {
    const { width, height } = Dimensions.get('screen')


    const fontSize = (size) => {
        const fontScale = PixelRatio.getFontScale();
        return size / fontScale;
    }

    const [display, setDisplay] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);




    const [artime, setArtime] = useState(null)
    const [ardistance, setArdistance] = useState(null)




    const screen = Dimensions.get('window');
    const ASPECT_RATIO = screen.width / screen.height;
    const LATITUDE_DELTA = 0.04;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


    const [allAddress, setAllAddress] = useState('')

    console.log(allAddress, 'allAddress');

    console.log(allAddress?.structured_formatting?.background_text, 'all address');
    console.log(allAddress?.short_name, 'all address');



    const [formatted, setFormatAddress] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [latlug, getLatLug] = useState({})



    console.log(latlug?.lat);

    const latlugs = {
        lat: 31.5203696,
        lng: 74.35874729999999,
    };


    const [pickuplocation, setPickupLocation] = useState({
        latitude: 30.3753,
        longitude: 69.3451,
    });


    console.log(pickuplocation);


    const mapRef = useRef(null);





    useFocusEffect(
        React.useCallback(() => {
            GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 60000,
            })
                .then(location => {
                    Geocoder.init(googleKey);
                    Geocoder.from(location.latitude, location.longitude)
                        .then(json => {
                            console.log(json.results[0]?.formatted_address, 'json');
                            var addressComponent = json.results[0].formatted_address;
                            // setCurrentLocation(addressComponent.toString());
                            setAllAddress(JSON.stringify(json.results[0]?.formatted_address));
                            // console.log(addressComponent.toString());
                        })
                        .catch(error => console.warn(error));

                    setPickupLocation(location);

                    mapRef.current.animateToRegion({
                        latitude: pickuplocation.latitude,
                        longitude: pickuplocation.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    });


                    // onCenter();
                })
                .catch(error => {
                    const { code, message } = error;
                    console.warn(code, message);
                });


        }, [])
    );

    useEffect(() => {
        mapRef.current.animateToRegion({
            latitude: pickuplocation.latitude,
            longitude: pickuplocation.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        });
    }, [pickuplocation])


    const storeId = async (value, formatted_address) => {
        try {
            await AsyncStorage.setItem("currentLocations", JSON.stringify(value));
            await AsyncStorage.setItem("formatted_address", JSON.stringify(formatted_address));

        } catch (error) {
            console.log(error);
        }
    };


    const openMapsHandler = () => {

        storeId(pickuplocation, allAddress)
        navigation.goBack({ pickuplocation: pickuplocation, allAddress: allAddress })

    }



    const [selectedLocation, setSelectedLocation] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [showCurrentLocationData, setShowCurrentLocationData] = useState(false);
    const [load, setLoad] = useState(false);




    const getCurrentLocationData = async () => {
        try {
            const position = await GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 60000,
            }).then(
                (position) => {

                    // Use reverse geocoding to get address and city for current location
                    axios
                        .get(
                            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.latitude},${position.longitude}&key=${googleKey}`
                        )
                        .then((response) => {
                            const { results } = response.data;

                            console.log(results[0].address_components);

                            if (results && results.length > 0) {
                                const address = results[0].formatted_address;

                                // const city = extractCityFromDetails(results[0].address_components)

                                const currentLocationData = {
                                    name: 'Current Location',
                                    address,
                                    latitude: position?.latitude,
                                    longitude: position?.longitude,
                                };

                                if (mapRef.current) {
                                    mapRef.current.animateToRegion({
                                        latitude: position.latitude,
                                        longitude: position.longitude,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421,
                                    });
                                }

                                setSelectedLocation(currentLocationData);
                                setCurrentLocation({ latitude: position.latitude, longitude: position.longitude });
                                setShowCurrentLocationData(true);
                            }
                        })
                        .catch((error) => {
                            console.error('Error fetching reverse geocoding data:', error);
                        });
                },
                (error) => {
                    console.error('Error fetching current location:', error);
                }
            );
        } catch (error) {
            console.error('Error fetching current location:', error);
        }
    };




    return (

        <View style={styles.container}>

            <View style={{ position: 'absolute', zIndex: 1, width: '100%', top: '0%', }}>


                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', backgroundColor: Color.white, padding: 10 }}>

                    <TouchableOpacity style={{}} onPress={() => { navigation.goBack() }}>
                        <Text style={{ color: Color.gray, fontSize: fontSize(FontSize.pxRegular_size), fontWeight: '400', textAlign: 'center' }}>Back</Text>
                    </TouchableOpacity>
                    <View style={{}}>
                        <Image source={require('../../assets/map1.png')} style={{ width: 140, height: 40, padding: 0, margin: 0 }} resizeMode="stretch" />
                    </View>
                </View>


            </View>




            <View style={{ position: 'absolute', zIndex: 1, width: '97%', top: '10%', alignSelf: 'center', borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>

                <View style={{ elevation: 2, width: '100%', minHeight: 250, backgroundColor: Color.background, borderRadius: 10, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: 20, padding: 20 }} >

                    <View>
                        <Image source={require('../../assets/map2.png')} style={{ width: width*0.6, height: height*0.2 }} resizeMode="contain" />
                    </View>

                    <Text style={{ color: Color.white, fontSize: fontSize(FontSize.headline3_size), fontWeight: '600' }}>Everything you need now at your door step at your own price</Text>

                    <View style={{ padding: 5, backgroundColor: Color.white, width: '100%', borderRadius: 10, marginTop: 10, flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10 }}>
                        <View>
                            <MagnifyingGlassIcon size={30} color={Color.black} />
                        </View>
                        <View style={{ width: '75%', borderRightWidth: 1 }} onc>
                            {/* <GooglePlacesAutocomplete
                                placeholder='Search'
                                placeholderTextColor={Color.colorGray_100}
                                styles={{textInput:{color:Color.black},predefinedPlacesDescription:{color:Color.black}}}
                                onPress={(data, details = null) => {
                                    // 'details' is provided when fetchDetails = true
                                    console.log(data, details);
                                }}
                                query={{
                                    key: { googleKey },
                                    language: 'en',
                                }}
                            /> */}
                            <TextInput style={{ padding: 5, color: Color.black }} placeholder="Islamabad" placeholderTextColor={Color.colorGray_100} onFocus={() => { setDisplay(false) }} onBlur={() => { setDisplay(true) }} />
                        </View>
                        <View>
                            <MapPinIcon size={30} color={Color.black} />
                        </View>
                    </View>

                </View>
            </View>




            {display ? <View style={{ position: 'absolute', zIndex: 1, width: '100%', bottom: '0%', alignSelf: 'center', borderTopLeftRadius: 10, borderTopRightRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                <View style={{ elevation: 2, width: '100%', backgroundColor: Color.white, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20 }} >


                    <Text style={{ color: Color.black, fontSize: fontSize(FontSize.headline3_size), fontWeight: 'bold' }}>Please select your country</Text>

                    <View style={{ backgroundColor: Color.white, width: '100%', borderRadius: 10, marginTop: 10, flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, borderWidth: 1, borderColor: Color.gray }}>
                        <View>
                            <MapPinIcon size={25} color={Color.black} />
                        </View>
                        <View style={{ width: '85%', borderLeftWidth: 1 }}>
                            <TextInput style={{ padding: 10, color: Color.black, fontSize: fontSize(FontSize.pxRegular_size) }} placeholder="Islamabad" placeholderTextColor={Color.colorGray_100} value='Select your current location' editable={false} />
                        </View>

                    </View>


                    <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.background, borderRadius: 10, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', elevation: 5, marginTop: 10 }]} onPress={() => {
                        getCurrentLocationData()
                        navigation.navigate('OpenMap1', { currentLocation: currentLocation,selectedLocation:selectedLocation })
                    }}>

                        <Text style={{ color: Color.white, fontSize: fontSize(FontSize.headline3_size), fontWeight: '600' }}>Continue</Text>

                    </TouchableOpacity>

                </View>
            </View> : null}




            <TouchableOpacity style={{ position: 'absolute', bottom: height*0.3, right: '5%', backgroundColor: Color.background, elevation: 5, width: 45, height: 45, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 5, borderRadius: 10, zIndex: 99999 }} onPress={getCurrentLocationData}>
                <Image source={require('../../assets/tar.png')} style={{ width: 35, height: 35 }} resizeMode="contain" />
            </TouchableOpacity>





            <MapView

                ref={mapRef}
                showsUserLocation={false}
                style={StyleSheet.absoluteFill}
                // customMapStyle={mapDarkStyle}
                onRegionChange={text => { console.log(text) }}
                onPress={e => {
                    setPickupLocation(e.nativeEvent.coordinate)
                    console.log(e.nativeEvent.coordinate, 'my select point')
                }}
                initialRegion={{
                    latitude: pickuplocation.latitude,
                    longitude: pickuplocation.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}>



                {currentLocation && (
                    <Marker
                        coordinate={{
                            latitude: currentLocation.latitude,
                            longitude: currentLocation.longitude,
                        }}
                    >
                        <View style={{ position: 'relative', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                            <Image
                                source={require('../../assets/map3.png')}
                                style={{ width: 40, height: 40 }} resizeMode='contain'
                            />
                            <Image
                                source={require('../../assets/map4.png')}
                                style={{ width: 25, height: 25, position: 'absolute' }} resizeMode='contain'
                            />

                        </View>
                    </Marker>
                )}

                {/* <Marker
                    coordinate={{
                        latitude: pickuplocation.latitude,
                        longitude: pickuplocation.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                // draggable
                // onDragEnd={e => { console.log(e.nativeEvent.coordinate, 'dragend') }}
                /> */}


                {/* <Marker
                    coordinate={{
                        latitude: 32.2203696,
                        longitude: 72.05874729999999,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                >
                    <Image
                        source={require('../../assets/slider11.png')}
                        style={{ width: 50, height: 50 }} resizeMode='contain'
                    />
                </Marker> */}




                {/* <MapViewDirections
                    origin={{
                        latitude: pickuplocation.latitude,
                        longitude: pickuplocation.longitude,
                    }}
                    destination={{
                        latitude: 32.2203696,
                        longitude: 72.05874729999999,
                    }}
                    apikey={googleKey} // insert your API Key here
                    strokeWidth={4}
                    strokeColor={Color.background}
                    onReady={(result) => {
                        setArdistance(result?.distance)
                        setArtime(result?.duration)
                        console.log('Distance: ' + result.distance + ' km');
                        console.log('Duration: ' + result.duration + ' min');
                    }}
                /> */}



            </MapView>

        </View>
    );
};

export default OpenMap;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerStyle: {
        backgroundColor: Color.white,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        height: 50,

    },
    textInputStyle: {
        height: 40,
        color: Color.black,
        fontSize: 16,
        backgroundColor: '#f3f3f3',
    },
    textInput: {
        color: Color.black,
        placeholderTextColor: 'gray',

    },
    suggestionItem: {
        backgroundColor: Color.white,
        color: Color.black,
    },
    listView: {
        backgroundColor: Color.white,
        color: Color.black,
    },
    autocompleteContainer: {
        color: Color.black,

    },
    suggestionText: {
        color: 'gray', // Change this to your desired text color for suggestion descriptions
    },
});