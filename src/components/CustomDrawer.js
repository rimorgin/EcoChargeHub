import React from 'react'
import { ImageBackground, StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { Avatar } from 'react-native-elements';

const CustomDrawer = (props) => {

    const styles = StyleSheet.create({
        imageBg: {
            height: 'auto',
            padding:20,
            flexDirection: 'row'
        },
        name:{
            marginTop: 10,
            color:'#fff',
            fontSize: 18,
            fontWeight: 'bold'
        },
        drawerItems: {
            flex: 1,
            backgroundColor: '#fff',
            paddingTop: 8
        }
    })
  return (
    <View style={{flex: 1}}>
        <DrawerContentScrollView {...props} 
            contentContainerStyle={{backgroundColor:'rgb(70, 217, 203)'}}>
            <ImageBackground source={require('../../assets/images/menubg.png')} style={styles.imageBg}>
               <Avatar size='large' rounded source={require('../../assets/images/otaku.png')}/>
               <View>
                <Text style={styles.name}>Stephanie Trish Fabico</Text>
                <Text style={styles.name}>Age: 19</Text>
               </View>
            </ImageBackground>
            <View style={styles.drawerItems}>
                <DrawerItemList {...props}/>
            </View>
        </DrawerContentScrollView>
        <View>  
        <Text>Log out</Text>
        </View>

    </View>
  )
}

export default CustomDrawer