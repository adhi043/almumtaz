import LottieView from 'lottie-react-native'
import React from 'react'
import { PixelRatio, Text, View } from 'react-native'
import { Color, FontSize } from './Global'

const Loader = ({}) => {

    const fontSize = (size) => {
        const fontScale = PixelRatio.getFontScale();
        return size / fontScale;
      }

    return (
        <>
            <View style={{ width: '100%', position: 'absolute', top: '40%', justifyContent: 'center', alignItems: 'center' }}>
                <LottieView source={require('./assets/98356-please-wait-loading.json')} autoPlay loop style={{ width: 300, height: 150 }} />
                <Text style={{ color: Color.black, fontSize: fontSize(FontSize.headline2_size), fontWeight: '500', }}>You have no offers yet</Text>
            </View>
        </>
    )
}

export default Loader
