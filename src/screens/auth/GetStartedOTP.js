import React, {useState, useRef} from 'react'
import { 
    Pressable, 
    StyleSheet, 
    Text, useWindowDimensions, 
    Image, 
    View, 
    TouchableWithoutFeedback, 
    Keyboard, 
    TextInput, 
    TouchableOpacity 
} from 'react-native'
import { Shadow } from 'react-native-shadow-2';
import { Ionicons } from '@expo/vector-icons';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';
import Toast from 'react-native-toast-message';


function GetStartedOTP({navigation}) {
    const {width, height} = useWindowDimensions();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationId, setVerificationId] = useState()

    const [btnDisabled, setDisabled] = useState(true)
    const [visible, setVisible] = useState(false);
    const [verificationCode, setValue] = useState('');
    const ref = useBlurOnFulfill({verificationCode, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        verificationCode,
        setValue,
    });


    const formatPhoneNumber = (input) => {
        const cleaned = input.replace(/\D/g, '');
       // Limit the phone number to 9 digits
        const limited = cleaned.substring(0, 10);

        if (input.length == 11) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }

        if (limited.length > 0) {
            // Use regular expression to add hyphens every three characters, except the last group
            const formatted = limited.replace(/(\d{3})(?=\d{4})/g, '$1-');
            setPhoneNumber(formatted);
        } else {
          // If the input is empty, reset the phone number
            setPhoneNumber('');
        }
    };
    
    const verifyPhone = async() => {
        setVisible(true);
        try {
            const phoneProvider = new PhoneAuthProvider(auth)
            const verificationId = await phoneProvider.verifyPhoneNumber('+63 '+phoneNumber,recaptchaVerifier.current)
            setVerificationId(verificationId)
            setVisible(false);
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Verification code has been sent to your phone ✅'
              });
        } catch (err) {
            setVisible(false);
            Toast.show({
                type: 'error',
                text1: 'Oops!',
                text2: err.message + ' ❌'
              });
        }
    }

    const isPhoneNumberValid = () => {
        if (phoneNumber.length == 12) {
            console.log('valid')
            verifyPhone()
        } else {
            Toast.show({
                type: 'error',
                text1: 'Oops!',
                text2: "You have entered invalid phone number ❌"
              });
        }
    }
    const verifyCode = async() => {
        setVisible(true);
        console.log('code ' + verificationCode)
        /*
        try {
            const credential = PhoneAuthProvider.credential(
                verificationId,
                verificationCode
            )

            await signInWithCredential(auth, credential)
            
            const user = auth.currentUser
            const userName = user.displayName
            await updateProfile(user)
            setVisible(false);
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Phone authentication successful 👍✅'
              });
            
            navigation.navigate('Homescreen');

        } catch (err) {
            setVisible(false);
            Toast.show({
                type: 'error',
                text1: 'Oops!',
                text2: "Couldn't sign in, bad verification code ❌"
              });
        }
        */
    }
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: width,
            height: height,
            padding: 15
        },
        //fill 3/5 of the screen
        TextEditContainer: {
            flex: 3,
        },
        //fill 2/5
        buttoncontainer: {
            flexDirection:'row', 
            justifyContent:'space-between', 
            flex:2
        },
        enterMobileText: {
            paddingBottom: 15,
            color: '#A9A9A9',
            fontSize: 18,
            alignItems: 'center'
        },
        
        phLogo: {
            width: 35,
            height: 35   
        },
        countryCode: {
            width:90,
            height: 45,
            paddingLeft: 5,
            paddingRight: 5,
            borderColor: '#A9A9A9',
            alignContent: 'flex-start',
            flexDirection: 'row',
            alignItems:'center',
            justifyContent:'space-between',
            borderRadius: 10
        },
        input: {
            marginLeft: 35, 
            minWidth: 150,
            maxWidth: 250,
            height: 40,
            margin: 12,
            borderBottomWidth: 1,
            padding: 10,
            fontSize: 20,
        },
        inputCode: {
            width: 150.5,
            height: 80,
            padding: 10,
            fontSize: 40,
        },

        desctiption: {
            left: 0,
            justifyContent: 'flex-start',
            width: width/1.5,
            color: '#A9A9A9',
            fontSize: 18,
        },
        button: {
            width: 68,
            height: 70
        },
        codeFieldRoot: {marginTop: 0},
        cell: {
          width: 45,
          height: 45,
          lineHeight: 38,
          fontSize: 24,
          borderWidth: 2,
          borderColor: '#00000030',
          textAlign: 'center',
          margin: 3
        },
        focusCell: {
          borderColor: '#000',
        },
      });
      
      const CELL_COUNT = 6;
  return (
    <>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container} >
        {!verificationId ? (
        <>
            <View style={styles.TextEditContainer}>
            <Text style={styles.enterMobileText} >Enter your mobile number to login or register</Text>
            <Shadow>
                <Pressable style={styles.countryCode}>
                    <Image 
                        source={require('../../../assets/images/philippines.png')}
                        style={styles.phLogo}
                    />
                    <Text style={{fontSize:20, paddingLeft: 5}}>+63</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {formatPhoneNumber(text)}}
                        value={phoneNumber}
                        placeholder='123-456-7890'
                        keyboardType='numeric'
                        inputMode='tel'
                        textContentType='telephoneNumber'
                    />
                </Pressable>
            </Shadow>
            </View>    
            <View style={styles.buttoncontainer}>  
                <Text style={styles.desctiption} >We're sending you a verification PIN to your mobile number. We use your mobile number to allow the stations to contact you about your booking.</Text>
                <Shadow style={{borderRadius: 35, width: 60, height:60}}>
                    <TouchableOpacity id='sign-in-button' style={styles.button} onPress={isPhoneNumberValid} disabled={btnDisabled} >
                        <Ionicons name="ios-arrow-forward-circle" style={{left: -5, top: -10}} size={75} color={btnDisabled ? 'gray' : 'rgba(111, 202, 186, 1)'} />
                    </TouchableOpacity>
                </Shadow>
            </View>
        </>
        ) : (
        <>
        <View style={styles.TextEditContainer}>
            <Text style={styles.enterMobileText} >Enter your verification code</Text>
            <View style={{alignItems:'center', justifyContent:'center', margin: 10}}>
            <Shadow>
            <CodeField
                ref={ref}
                {...props}
                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                value={verificationCode}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({index, symbol, isFocused}) => (
                <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor/> : null)}
                </Text>
                )}
            />
            </Shadow>
            </View>
        </View>
            <View style={styles.buttoncontainer}>  
                <Text style={styles.desctiption} >Please check your message box for the verification PIN. Enter the PIN to complete your login.</Text>
                <Shadow style={{borderRadius: 35, width: 60, height:60}}>
                    <TouchableOpacity id='sign-in-button' style={styles.button} onPress={verifyCode} disabled={!verificationCode}>
                        <Ionicons name="ios-arrow-forward-circle" style={{left: -5, top: -10}} size={75} color={!verificationCode ? 'gray' : 'rgba(111, 202, 186, 1)'} />
                    </TouchableOpacity>
                </Shadow>
            </View>
        
        </>    
        )}
    </View>
    </TouchableWithoutFeedback>
    </>
  )
}


export default GetStartedOTP