import React, { useEffect } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import Pet from './components/Pets';
import { useSelector, useDispatch } from 'react-redux';
import { addPet } from '../redux/PetActions';
import { db } from '../firebase/config';
import { doc, setDoc, collection, query, getDocs } from 'firebase/firestore';


const StoreScreen = ( props ) => {
    const dispatch = useDispatch();
    const displayedpets = useSelector(state => state.displayed)
    const adoptedpets = useSelector(state => state.adopted)

    useEffect(() => {
        const q = query(collection(db, "pets"))
        getDocs(q).then(querySnap => 
            querySnap.forEach((doc) => {
                const pet = doc.data().name
                if (displayedpets.find(element => element == pet) )
                    dispatch(addPet(pet))
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
        <Text style={{
            fontWeight: 'bold', 
            alignSelf: 'center', 
            fontSize: 20,
            marginBottom: 15
            }}>{adoptedpets.length} pets have been adopted</Text>
        {
        displayedpets.map((pet, index) => (
            <TouchableOpacity 
            key={pet} 
            style={{
                width: 200,
                height: 200,
                marginRight: 190
                }}
                onPress={() => onAddPetPressed(pet)}>
                <Pet text={`Adopt ${ pet }`} type={pet}/>
            </TouchableOpacity>
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
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
})

export default StoreScreen;