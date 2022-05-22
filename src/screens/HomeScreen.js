import React, { useEffect, useState } from 'react';
import { FlatList, 
        Keyboard, 
        Text, 
        TextInput, 
        TouchableOpacity, 
        View,
        StyleSheet,
        Button 
    } from 'react-native';
import { auth } from '../firebase/config'
import { signOut } from 'firebase/auth'; 
import Pet from './components/Pets' 
import { useSelector } from 'react-redux';
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = ( props ) => {
    const navigation = useNavigation();
    const userID = props.extraData.id;
    const [pets, setPets] = useState([])

    const onLogOutPress = () => {
        signOut(auth)
        .catch((error) => {
            alert(error)
        });
        navigation.navigate('Login');
    }

    const onStorePress = () => {
        navigation.navigate('Store')
    }

    useEffect(() => {
        const q = query(collection(db, "pets"), where("owner", "==", userID))
        const newPets = []
        getDocs(q).then(querySnap => 
            querySnap.forEach((doc) => {
                const pet = doc.data().name
                newPets.push(pet)
                setPets(newPets)
            }))
    })

    
    const mypets = useSelector(state => state.adopted);

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => onStorePress()}
            >
                <Text style={styles.buttonTitle}>Go To Store</Text>
            </TouchableOpacity>

            {
                pets.map((pet, index) => (
                    <Button
                    key={ pet }
                    title={ `${ pet }` }
                    />))
            }
            
            <View style={styles.footerView}>
                    <Text onPress={onLogOutPress} style={styles.footerLink}>Log out</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
export default HomeScreen;