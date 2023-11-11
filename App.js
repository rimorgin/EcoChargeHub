import 'react-native-gesture-handler'
import React, { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer, DefaultTheme  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Homescreen from './src/screens/home';
import Profile from './src/screens/profile';
import Settings from './src/screens/settings';
import CustomDrawer from './src/components/CustomDrawer';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LoginAndRegis from './src/screens/auth/LoginRegis';
import GetStartedOTP from './src/screens/auth/GetStartedOTP';
import Toast from 'react-native-toast-message';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const NavTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgba(111, 202, 186, 1)',
  },
};

const screenOptions = {
  headerShown:false, 
  lazy: false,
  headerPressColor: 'rgba(111, 202, 186, 1)', 
  drawerLabelStyle: {
    marginLeft: -25,
    fontSize: 18,
    padding: 9,
  },
  drawerHideStatusBarOnOpen: true,
}

function Root() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props}/> } screenOptions={screenOptions} initialRouteName='Home'>
    <Drawer.Screen name='Home' component={Homescreen} options={{
      drawerIcon: () => (
        <MaterialCommunityIcons name="home-battery" size={24} color="'rgba(111, 202, 186, 1)'" />
      )
    }}/>
    <Drawer.Screen name='Profile' component={Profile} options={{
      drawerIcon: () => (
        <MaterialCommunityIcons name="face-man-profile" size={24} color="'rgb(46, 196, 182)" />
      )
    }}/>
    <Drawer.Screen name='Settings' component={Settings} options={{
      drawerIcon: () => (
        <Feather name="settings" size={24} color={'rgba(111, 202, 186, 1)'} />
      )
    }}/>
  </Drawer.Navigator>
  );
}

function App() {
  const [user, setUser] = useState(true);
  return (
    <>
    <SafeAreaProvider>
      <NavigationContainer theme={NavTheme}>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          {user ? (
          <Stack.Group>
            <Stack.Screen name="Root" component={Root} />
          </Stack.Group>
          ) : (
          <Stack.Group>
            <Stack.Screen name="Login/Register" component={LoginAndRegis} />
            <Stack.Screen name="OTP Login/Register" component={GetStartedOTP} options={{ headerShown: true}}/>
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
