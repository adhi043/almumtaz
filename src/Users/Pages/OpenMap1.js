import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Alert, Image, PixelRatio, TextInput } from 'react-native';

import React, { useState, useRef, useEffect } from 'react';
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

const screen = Dimensions.get('window')

const OpenMap1 = ({ navigation, route }) => {


    const { currentLocation,selectedLocation } = route.params;


    const fontSize = (size) => {
        const fontScale = PixelRatio.getFontScale();
        return size / fontScale;
    }

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
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




    return (

        <View style={styles.container}>





            <View style={{ position: 'absolute', zIndex: 1, width: '90%', bottom: '5%', alignSelf: 'center', borderTopLeftRadius: 10, borderTopRightRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.background, borderRadius: 10, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', elevation: 5, marginTop: 10 }]} onPress={() => {
                    navigation.navigate('Home',{selectedLocation:selectedLocation})
                }}>

                    <Text style={{ color: Color.white, fontSize: fontSize(FontSize.headline3_size), fontWeight: '600' }}>Done</Text>

                </TouchableOpacity>
            </View>




            {/* <TouchableOpacity style={{ position: 'absolute', bottom: '27%', right: '5%', backgroundColor: Color.background, elevation: 5, width: 45, height: 45, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 5, borderRadius: 10, zIndex: 99999 }}>
                <Image source={require('../../assets/tar.png')} style={{ width: 35, height: 35 }} resizeMode="contain" />
            </TouchableOpacity> */}





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

export default OpenMap1;

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