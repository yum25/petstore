import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { auth } from '../firebase/config'
import { signOut } from 'firebase/auth'; 
import Pet from './components/Pets' 
import { useSelector, useDispatch } from 'react-redux';
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config';
import { useNavigation } from '@react-navigation/native';
import { addPet } from '../redux/PetActions';


const HomeScreen = ( props ) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userID = props.extraData.id;
    const [pets, setPets] = useState([])
    const displayedpets = useSelector(state => state.displayed);
    
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
        const q = query(collection(db, "pets"))
        getDocs(q).then(querySnap => 
            querySnap.forEach((doc) => {
                const pet = doc.data().name
                if (displayedpets.find(element => element == pet) )
                    dispatch(addPet(pet))
            }))
    })

    useEffect(() => {
        const q = query(collection(db, "pets"), where("owner", "==", userID))
        getDocs(q).then(querySnap => {
            const newPets = []
            querySnap.forEach((doc) => {
                const pet = doc.data().name
                newPets.push(pet)
            })
            setPets(newPets)
        })
    }, [displayedpets])
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => onStorePress()}
            >
                <Text style={styles.buttonTitle}>Go To Store</Text>
            </TouchableOpacity>
            <Text style={styles.title}>You own {pets.length} pets</Text>
            {
                pets.map((pet, index) => (
                    <TouchableOpacity key={pet} style={{
                        width: 200,
                        height: 200,
                        }}>
                        <Pet text={pet} type={pet} />
                    </TouchableOpacity>
                    ))

            }
            <View style={styles.footerView}>
                    <Text onPress={onLogOutPress} style={styles.footerLink}>Log out</Text>
            </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 30,
        marginBottom: 15,
        justifyContent: 'center',
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