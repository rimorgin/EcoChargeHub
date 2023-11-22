import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { NavigationContainer, DefaultTheme, DrawerActions  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Homescreen from './src/screens/home';
import Profile from './src/screens/Profile';
import Settings from './src/screens/Settings';
import CustomDrawer from './src/components/CustomDrawer';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import LoginAndRegis from './src/screens/auth/LoginRegis';
import GetStartedOTP from './src/screens/auth/GetStartedOTP';
import CompleteProfile from './src/screens/auth/CompleteProfile';
import Toast from 'react-native-toast-message';
import MapScreen from './src/screens/MapScreen';
import LearnScreen from './src/screens/LearnScreen';
import History from './src/screens/History';
import Annoucement from './src/screens/Annoucement';
import MyLocations from './src/screens/MyLocations';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import { Shadow } from 'react-native-shadow-2';

SplashScreen.preventAutoHideAsync();
SecureStore.AFTER_FIRST_UNLOCK;

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const NavTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgba(111, 202, 186, 1)',
  },
};




function Root({navigation}) {
  const dimensions = useWindowDimensions();

  const screenOptions = {
    headerShown:true, 
    lazy: false,
    headerPressColor: 'rgba(111, 202, 186, 1)', 
    drawerLabelStyle: {
      marginLeft: -25,
      fontSize: 18,
      padding: 9,
    },
    drawerActiveTintColor: 'blue',
    header: () => (
      <Shadow>
      <View style={{backgroundColor: '#fff', width: dimensions.width, height: 130, borderRadius: 20, padding: 30}}>
        <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
          <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }}> 
            <Image style={{width: 50, height: 50}} source={require('./assets/images/menu-btn.png')}/>
            <Text style={{fontSize:26, color:'#2EC4B6', fontWeight:'900', marginTop: 12, marginLeft: 10}}>EcoChargeHub</Text>
          </TouchableOpacity> 
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image style={{width: 35,height: 35,marginTop: 8,}} source={require('./assets/images/user-profile-btn.png')}/>
          </TouchableOpacity> 
        </View>
        <Text style={{fontSize:26, color:'#000', fontWeight:'900', marginTop: 5}}>Welcome !</Text>
      </View>
    </Shadow>
    ),
  }
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props}/> } 
      screenOptions={screenOptions} initialRouteName='Home'>
    <Drawer.Screen name='Home' component={Homescreen} options={{
      drawerIcon: () => (
        <MaterialCommunityIcons name="home-battery" size={24} color="'rgba(111, 202, 186, 1)'" />
      ),
      headerTitle:'',
    }}/>
    <Drawer.Screen name='History' component={History} options={{
      drawerIcon: () => (
        <MaterialCommunityIcons name="history" size={24} color={'rgba(111, 202, 186, 1)'} />
      ),
      headerTitle:''
    }}/>
    <Drawer.Screen name='Announcement' component={Annoucement} options={{
      drawerIcon: () => (
        <MaterialIcons name="announcement" size={24} color={'rgba(111, 202, 186, 1)'}/>
        ),
        headerTitle:''
    }}/>
    <Drawer.Screen name='MyLocations' component={MyLocations} options={{
      drawerIcon: () => (
        <Entypo name="location" size={24} color={'rgba(111, 202, 186, 1)'} />
        ),
        headerTitle:''
    }}/>
    <Drawer.Screen name='Settings' component={Settings} options={{
      drawerIcon: () => (
        <Feather name="settings" size={24} color={'rgba(111, 202, 186, 1)'} />
        ),
        headerTitle:''
    }}/>
    <Drawer.Screen name='Profile' component={Profile} options={{drawerItemStyle: { display: 'none' }}}/>
    <Drawer.Screen name='ChargeEV' component={MapScreen} options={{drawerItemStyle: { display: 'none' }}}/>
    <Drawer.Screen name='LearnEV' component={LearnScreen} options={{drawerItemStyle: { display: 'none' }}}/>
    
  </Drawer.Navigator>
  );
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getSession = async() => {
      try {
        const user = await SecureStore.getItemAsync('user_session');
        const parse = JSON.parse(user)
        console.log('current user: '+ parse?.username + ' uid: ' + parse?.uid + ' accessToken: ' + parse.accessToken)
        setUser(user);
        SplashScreen.hideAsync();
      } catch (error) {
        console.log('no existing user');
      }
    }
    getSession();
  },[user])

  useEffect(() => {
    const storeSessionData = async (uid, username, accessToken) => {
      try {
        const userSessionData = { uid, username, accessToken };
        const userSessionString = JSON.stringify(userSessionData);
        await SecureStore.setItemAsync('user_session', userSessionString);
        setUser(userSessionString);
      } catch (error) {
        console.error('Error storing session data:', error);
      }
    };
    
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = auth?.currentUser?.uid
        const displayName = auth?.currentUser?.displayName 
        const accessToken = await user?.getIdToken();
  
        if (!displayName) {
          setUser(true)
          SplashScreen.hideAsync();
        } else {
          storeSessionData(uid, displayName, accessToken);
          SplashScreen.hideAsync();
        }
      } else {
        // User signed out
        await SecureStore.deleteItemAsync('user_session');
        setUser(null);
      } 
    })
    
  }, []); // Empty dependency array means this effect runs once after the initial render
  
  return (
    <>
    <SafeAreaProvider>
      <NavigationContainer theme={NavTheme}>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          {!user ? (
          <Stack.Group>
            <Stack.Screen name="Login/Register" component={LoginAndRegis} />
            <Stack.Screen name="OTP Login/Register" component={GetStartedOTP} options={{ headerShown: true }}/>
           
          </Stack.Group>
          ) : (
          <Stack.Group>
              {user === true ? (
                <Stack.Screen name="CompleteProfile" component={CompleteProfile}/>
              ) : (
                <Stack.Screen name="Root" component={Root} />
              )}
          </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
      </SafeAreaProvider>
    </>
  );
}

export default App;
