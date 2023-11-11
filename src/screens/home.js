import React, { useCallback, useEffect, useState } from 'react';
import { Button, SafeAreaView, Text, View, FlatList, Image, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import * as SplashScreen from 'expo-splash-screen';
import { useAssets } from 'expo-asset'
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

SplashScreen.preventAutoHideAsync();


export default function Homescreen({navigation}) {
  const {width, height} = useWindowDimensions();
  const [fontsLoaded] = useFonts({
    'Hojas-De-Plata': require('../../assets/fonts/HojasDePlata-M5We.ttf'),
    'BoogieBoys': require('../../assets/fonts/BoogieBoysRegular.otf'),
  });

  const asset1 = require('../../assets/images/charging-station.png');
  const asset2 = require('../../assets/images/book-learn.png');

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
}

  const data = [
  {
    id : '1',
    title: 'Charge your EV',
    image: asset1,
    screen: 'ChargeEV'
  },
  {
    id : '2',
    title: 'Learn about EVs',
    image: asset2,
    screen: 'LearnEV'
  },

  ]

  const styles = StyleSheet.create({
    header:{
      backgroundColor: '#00EBD5',
      width: width,
      height: 100,
      alignItems: 'center',
      justifyContent: 'center'
    },
    container: {
      paddingLeft: 15,
      paddingRight: 15,
    },
    touchable: {
      width: 150,
      backgroundColor: '#DCECEB',
      margin: 15,
      height: 250,
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: 15,
      borderRadius: 15,
    },
    goTouchable: {
      width: 60,
      height: 60,
    },
    image: {
      width: 100,
      height: 100,
      marginLeft: 10,
      resizeMode: 'contain'
    },
    text: {
      marginTop: 8,
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold'
    }
  })
  return (
    <>
      <View style={styles.header}>
        <Text style={{fontFamily: 'Hojas-De-Plata', fontSize:36, color:'#fff', bottom: -20}}>EcoChargeHub</Text>
      </View>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <FlatList
          data={data}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <Shadow offset={[15,15]} distance={8}> 
              <TouchableOpacity style={styles.touchable}>
                <View>
                  <Image style={styles.image} source={item.image} />
                  <Text style={styles.text}>{item.title}</Text>
                  <TouchableOpacity style={styles.goTouchable}>
                    <Image style={styles.goTouchable} onPress={() => navigation.navigate(item.screen)} source={require('../../assets/images/right-arrow-btn.png')}/>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </Shadow>
          )}
        />
        <Text>Can you see this?</Text>
        <Button title='open drawer' onPress={() => navigation.openDrawer()}/>
      </View>
    </>
  );
}