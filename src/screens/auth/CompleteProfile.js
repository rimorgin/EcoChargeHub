import React, {useState, useRef, useEffect, useCallback} from 'react'
import { 
    Pressable, 
    StyleSheet, 
    Text, useWindowDimensions, 
    Image, 
    View, 
    TouchableWithoutFeedback, 
    Keyboard, 
    TextInput, 
    TouchableOpacity, 
    SafeAreaView
} from 'react-native'
import { Shadow } from 'react-native-shadow-2';
import { Ionicons } from '@expo/vector-icons';
import { updateCurrentUser, updateEmail, updateProfile, verifyBeforeUpdateEmail } from "firebase/auth"
import { auth } from '../../../firebaseConfig';
import Toast from 'react-native-toast-message';
import { AntDesign } from '@expo/vector-icons'; 
import * as SplashScreen from 'expo-splash-screen';
import UserDataService from '../../services/User.services';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from 'react-native-dropdown-picker';


// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function CompleteProfile({navigation}) {
    const {width, height} = useWindowDimensions();
    const [fullname, setFullname] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('')
    const [uid, setUID] = useState('');
    const [btnDisabled, setDisabled] = useState(true);
    const [birthdate, setBirthDate] = useState('MM/DD/YYYY');
    const [sex, setSex] = useState('');
    const [openPicker, setOpenPicker] = useState(false);
    const [items, setItems] = useState([
        {label: 'Male', value: 'male'},
        {label: 'Female', value: 'female'},
        {label: 'Prefer not to say', value: 'others'}
    ]);

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
        },
        //fill 3/5 of the screen
        TextEditContainer: {
            flex: 3,
            alignItems: 'left',
            left: 15
        },
        //fill 2/5
        buttoncontainer: {
            flexDirection:'row', 
            justifyContent:'space-between', 
            flex:2,
            padding: 15,
        },
        enterMobileText: {
            color: '#A9A9A9',
            fontSize: 18,
        },
        input: {
            minWidth: 280,
            height: 50,
            marginBottom: 30,
            borderRadius: 10,
            fontSize: 20,
            borderBottomWidth: 1, 
            borderRadius: 15, 
            borderColor: 'rgba(111, 202, 186, 1)',
            backgroundColor: '#fff',
            justifyContent:'center',
            paddingLeft: 15
        },

        desctiption: {
            justifyContent: 'flex-start',
            width: width/1.5,
            color: '#A9A9A9',
            fontSize: 18,
        },
        button: {
            width: 68,
            height: 70
        },
      });

    useEffect(() => {
        const checkUsername = auth?.currentUser?.displayName 
        const checkEmail = auth?.currentUser?.email
        const checkPhone = auth?.currentUser?.phoneNumber
        const checkUID = auth?.currentUser?.uid

        setPhoneNumber(checkPhone);
        setUID(checkUID);

        if (!checkUsername && !checkEmail){
            SplashScreen.hideAsync();
        } else {
            navigation.navigate('Root', {screen: 'Home'})
        }
    })


    const verifyEmail = async() => {
        await verifyBeforeUpdateEmail(auth.currentUser, email)
        alert('verification was sent to your email. Please check your mail to verify before you proceed!')
        setDisabled(false);
    }

    const updateUserProfile = async () => {
    try {
        // Update profile
        await updateProfile(auth.currentUser, {
        displayName: fullname,
        photoURL: null,
        });
    
        // Update email
        verifyEmail();

        //upload to firestore
        const newUser = {
            fullname,
            email,
            birthdate,
            sex,
            uid,
            phonenumber,
        }
        await UserDataService.addUser(newUser);
       

        Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Profile completion successful 👍✅',
        });
        
        navigation.navigate('Root', { screen: 'Home'})
    } catch (error) {
        if (error.code === 'auth/requires-recent-login') {
        // User needs to reauthenticate before updating email
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Please reauthenticate to update your email address.',
        });
        } else {
        // Handle other errors
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Problem occurred: ' + error.message,
        });
        console.log(error.message)
        }
    }
    };

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        // Convert the Date object to a string
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
        setBirthDate(formattedDate);
        hideDatePicker();
    };
      
      
  return (
    <>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.container}>
        <View style={{left: 15, marginBottom: 20}}>
            <Shadow style={{borderRadius: 35, width: 60, height:60}}>
                <TouchableOpacity id='sign-in-button' style={styles.button} onPress={() => auth.signOut()} >
                    <Ionicons name="arrow-back-circle" style={{left: -5, top: -10}} size={75} color={'rgba(111, 202, 186, 1)'} />              
                </TouchableOpacity>
            </Shadow>
        </View>
            
        <View style={styles.TextEditContainer}>
        <Text style={styles.enterMobileText} >Enter your full name</Text>
        <Shadow>
            <TouchableOpacity style={styles.input}>
            <TextInput
                style={{fontSize:20}}
                onChangeText={setFullname}
                value={fullname}
                placeholder='Enter your fullname'
                textContentType='name'
                placeholderTextColor={'#A9A9A9'}
            />
            </TouchableOpacity>
        </Shadow>
        <Text style={styles.enterMobileText} >Enter your email address</Text>
        <View style={{flexDirection: 'row'}}>
        <Shadow>
            <TouchableOpacity style={styles.input}>
            <TextInput
                style={{fontSize:20}}
                onChangeText={setEmail}
                value={email}
                placeholder='Enter your @email'
                textContentType='emailAddress'
                placeholderTextColor={'#A9A9A9'}
            />
            </TouchableOpacity>
        </Shadow>
        </View>
        <View style={{flexDirection: 'row'}}>
            <Text style={{color: '#A9A9A9', fontSize: 18, marginRight: 12, marginTop: 10}}>Enter your birthdate:</Text>
            <Shadow>
                <TouchableOpacity onPress={showDatePicker} style={{borderRadius: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: 'rgba(111, 202, 186, 1)'}}>
                    <Text style={{color: '#A9A9A9', fontSize: 18, width: 150, height:30, marginTop: 10, textAlign: 'center'}}>{birthdate}</Text>
                </TouchableOpacity>
            </Shadow>
        </View>
        <DateTimePickerModal
            maximumDate={new Date()}
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
        />
        <View style={{flexDirection: 'row', marginTop: 20}}>
            <Text style={{color: '#A9A9A9', fontSize: 18, marginRight: 12, marginTop: 10}}>Enter your sex:</Text>
            <Shadow>
            <DropDownPicker
                open={openPicker}
                value={birthdate}
                items={items}
                placeholder={sex ? sex : 'select sex'}
                setOpen={setOpenPicker}
                setValue={setSex}
                setItems={setItems}
                style={{borderRadius: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderTopWidth:0, borderLeftWidth:0, borderRightWidth: 0, borderColor: 'rgba(111, 202, 186, 1)', width: 150}}
                />
            </Shadow>
        </View>
  
        </View>    
        <View style={styles.buttoncontainer}>  

            <Text style={styles.desctiption} >Enter your complete details to complete your registration for the EcoChargeHub.</Text>
            <Shadow style={{borderRadius: 35, width: 60, height:60}}>
                <TouchableOpacity id='sign-in-button' style={styles.button} onPress={updateUserProfile} disabled={!email && btnDisabled && !fullname} >
                    <Ionicons name="ios-arrow-forward-circle" style={{left: -5, top: -10}} size={75} color={!email &&  btnDisabled && !fullname ? 'gray' : 'rgba(111, 202, 186, 1)'} />
                </TouchableOpacity>
            </Shadow>
        </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
    </>
  )
}


export default CompleteProfile