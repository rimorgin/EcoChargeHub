import React from 'react'
import { Pressable, StyleSheet, Text, useWindowDimensions, Image, View } from 'react-native'
import { Shadow } from 'react-native-shadow-2';

function GetStartedOTP() {
    const {width, height} = useWindowDimensions();
    const styles = StyleSheet.create({
        container: {
            width: width,
            height: height,
            padding: 15
        },
        enterMobileText: {
            paddingBottom: 15,
            color: '#A9A9A9',
            fontSize: 18,
            alignItems: 'center'
        },
        phLogo: {
            width: 45,
            height: 45   
        },
        countryCode: {
            borderColor: '#A9A9A9',
            alignContent: 'flex-start',
            flexDirection: 'row'
        }
    })
  return (
    <>
    <View style={styles.container}>
        <Text style={styles.enterMobileText} >Enter your mobile number to login or register</Text>
        <Shadow>
            <Pressable style={styles.countryCode}>
                <Image 
                    source={require('../../../assets/images/philippines.png')}
                    style={styles.phLogo}
                />
            </Pressable>
        </Shadow>
    </View>
    </>
  )
}

export default GetStartedOTP