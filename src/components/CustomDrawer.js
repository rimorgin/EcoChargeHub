import React from 'react'
import { ImageBackground, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { Avatar } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const CustomDrawer = (props) => {

    const styles = StyleSheet.create({
        header: {
            height: 'auto',
            padding:10,
            paddingTop: 20,
            paddingBottom: 20,
            flexDirection: 'row',
        },
        userview: {
            marginLeft: 5,
            marginTop: 10,
        },
        user:{
            color:'#fff',
            fontSize: 18,
            fontWeight: 'bold',
        },
        drawerItems: {
            flex: 1,
            backgroundColor: '#fff',
            paddingTop: 8
        },
        footer: {
            borderTopWidth: 1,
            borderTopColor: '#B4B4B4',
            backgroundColor: '#fff', //'rgb(112, 168, 254)'
            paddingBottom: 15,
            borderRadius: 30
        },
        footerItems: {
            paddingTop: 30,
            paddingBottom: 15,
            paddingLeft: 18,
            flexDirection: 'row'
        },
        footerText: {
            paddingTop: 5,
            paddingLeft: 18,
            fontSize: 18,
            color: '#000'
        }

    })
  return (
    <View style={{flex: 1}}>
        <DrawerContentScrollView {...props} 
            contentContainerStyle={{backgroundColor:'rgb(70, 217, 203)'}}>
            <ImageBackground source={require('../../assets/images/menubg.png')} style={styles.header}>
               <Avatar size='large' rounded source={require('../../assets/images/otaku.png')}/>
               <View style={styles.userview}>
                <Text style={styles.user}>Stephanie Trish Fabico</Text>
                <Text style={styles.user}>Age: 19</Text>
                <Text style={styles.user}>Sex: Female</Text>
               </View>
            </ImageBackground>
            <View style={styles.drawerItems}>
                <DrawerItemList {...props}/>
            </View>
        </DrawerContentScrollView>
        <View style={styles.footer}>  
            <TouchableOpacity style={styles.footerItems}>
                <MaterialIcons name="support-agent" size={30}  color={'rgb(46, 196, 182)'} />
                <Text style={styles.footerText}>Support</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerItems}>
                <AntDesign name="logout" size={30} color={'rgb(46, 196, 182)'} />
                <Text style={styles.footerText}>Log out</Text>
            </TouchableOpacity>
            
        </View>

    </View>
  )
}

export default CustomDrawer