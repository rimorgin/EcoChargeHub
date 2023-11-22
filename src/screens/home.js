import React, { useCallback, useEffect, useState } from 'react';
import { Button, SafeAreaView, Text, View, FlatList, Image, TouchableOpacity, StyleSheet, useWindowDimensions, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import * as SplashScreen from 'expo-splash-screen';
import { useAssets } from 'expo-asset'
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../../firebaseConfig';

export default function Homescreen({navigation}) {
  const {width, height} = useWindowDimensions();
  const [where, setWhere] = useState();
  const fullname = auth?.currentUser?.displayName


  const asset1 = require('../../assets/images/charging-station.png');
  const asset2 = require('../../assets/images/destinations.png');
  const asset3 = require('../../assets/images/book-learn.png');

  const data = [
  {
    id : '1',
    title: 'Charge your EV',
    image: asset1,
    screen: 'ChargeEV'
  },
  {
    id : '2',
    title: 'Get to Destination with charging stops',
    image: asset2,
    screen: 'LearnEV'
  },
  {
    id : '3',
    title: 'Learn about EVs',
    image: asset3,
    screen: 'LearnEV'
  },

  ]

  const styles = StyleSheet.create({
    header:{
      backgroundColor: '#fff',
      width: width,
      height: 130,
      borderRadius: 20,
      padding: 30,
    },
    container: {
      flex: 1,
      marginTop: 15,
      paddingLeft: 15,
      paddingRight: 15,
      borderBottomWidth: 1,
      borderBottomColor: "gray",
      borderRadius: 40
    },
    container2: {
      flex: 2,
      marginTop: 15,
      paddingLeft: 15,
      paddingRight: 15,
      borderBottomWidth: 1,
      
    },
    drawerbtn: {
      width: 50,
      height: 50
    },
    profilebtn: {
      width: 35,
      height: 35,
      marginTop: 8,
    },
    touchable: {
      width: 150,
      backgroundColor: '#C1D8D6',
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
    },
    whereInput: {
      width: width-30,
      fontSize: 20,
      height: 60,
      padding: 20,
      
    }
  })
  return (
    <>
    {/* 
    IMPLEMENT CHARGING STATIONS NEAR YOU, LEARN EV, WHAT ELECTRIC VEHICLE DO YOU OWN AND THEIR CHARGING PORT?
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container} >
      <Text style={{fontSize: 20, marginBottom: 20, color:'gray'}}>Are you charging your EV only?</Text>
      <Text style={{fontSize: 20, marginBottom: 20, color:'gray'}}>Make a charging stop, then book and reserve your spot</Text>
        <Shadow>
        <TouchableOpacity style={{backgroundColor:'#fff', borderRadius: 20}} >
          <TextInput 
            editable
            placeholder='Where are you going?'
            value={where}
            onChangeText={setWhere}
            style={styles.whereInput}
          />
        </TouchableOpacity>
        </Shadow>
      </View>
    </TouchableWithoutFeedback>
    */}
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container2} >
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <Shadow offset={[15,15]} distance={8}> 
              <TouchableOpacity style={styles.touchable} onPress={() => navigation.navigate(item.screen)}>
                <View>
                  <Image style={styles.image} source={item.image} />
                  <Text style={styles.text}>{item.title}</Text>
                  <TouchableOpacity style={styles.goTouchable} onPress={() => navigation.navigate(item.screen)}>
                    <Image style={styles.goTouchable} source={require('../../assets/images/right-arrow-btn.png')}/>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </Shadow>
          )}
        />
      </View>
    </TouchableWithoutFeedback>  
    </>
  );
}