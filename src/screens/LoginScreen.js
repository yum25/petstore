import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth';
import {doc, getDoc} from 'firebase/firestore'

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onFooterLinkPress = () => {
        navigation.navigate('Registration');
    }

    const onLoginPress = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((response) => {
            const uid = response.user.uid;
            getDoc(doc(db, 'users', uid))
            .then(firestoreDocument => {
                if (!firestoreDocument.exists) {
                    alert("User does not exist anymore.");
                    return;
                }
                const user = firestoreDocument.data();
                navigation.navigate('Home', {user});
            })
            .catch(error => {
                alert(error);
            })
        })
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView style={styles.keyboardView} keyboardShouldPersistTaps="always">
                <Image 
                    style={styles.logo} 
                    source={require('../../assets/icon.png')}/>
                <Text style={styles.title}>
                    React Native Pet Store 
                </Text>
                <Text style={styles.description}>
                    Login to get started
                </Text>
                <TextInput 
                    style={styles.input} 
                    placeholder='E-mail'
                    placeholderTextColor="#aaaa"
                    onChangeText={(text)=> setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput 
                    style={styles.input} 
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                 <TouchableOpacity 
                    style={styles.button}
                    onPress={() => onLoginPress()}
                 >
                     <Text style={styles.buttonTitle}>Log In</Text>
                 </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    keyboardView: {
        flex: 1,
        width: '100%'
    },
    logo: {
        flex: 1,
        height: 120,
        width: 140,
        alignSelf: 'center',
        margin: 30
    },
    title: {
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: "bold"
    },
    description: {
        alignSelf: 'center',
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10
    },
    button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    input: {
       height: 48,
       borderRadius: 5,
       overflow: 'hidden',
       backgroundColor: 'white',
       marginTop: 10,
       marginBottom: 10,
       marginLeft: 30,
       marginRight: 30,
       paddingLeft: 16
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16
    }
})
export default LoginScreen;