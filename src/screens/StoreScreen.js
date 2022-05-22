import React, { useEffect, useState } from 'react'
import { Button, FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import Pet from './components/Pets';
import { useSelector, useDispatch } from 'react-redux';
import { addPet } from '../redux/PetActions';
import { db } from '../firebase/config';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';


const StoreScreen = ( props ) => {
    const dispatch = useDispatch();
    const displayedpets = useSelector(state => state.displayed)

    useEffect(() => {
        console.log("Update firebase")
        const q = query(collection(db, "pets"))
        getDocs(q).then(querySnap => 
            querySnap.forEach((doc) => {
                const pet = doc.data().name
                if (displayedpets.find(element => element == pet) )
                    dispatch(addPet(pet))
                    console.log("add " + pet)
            }))
    })

    const onAddPetPressed = (pet) => {
        const data = {
            name: pet,
            owner: props.extraData.id
        }
        setDoc(doc(db, 'pets', pet), data)
        dispatch(addPet(pet))
    }
    return (
    <View style={styles.container}>
        <Text style={styles.title}>Adopt a Pet!</Text>
        {
        displayedpets.map((pet, index) => (
        <Button
        key={ pet }
        title={ `Adopt ${ pet }` }
        onPress={() => onAddPetPressed(pet)
        }
        />
        ))
        }
        <View style={styles.footerView}>
                
        </View>
    </View>
    ); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
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
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 10
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

export default StoreScreen;