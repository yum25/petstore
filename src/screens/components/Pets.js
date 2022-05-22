import React from 'react'
import { Image, View, Text, StyleSheet, } from 'react-native'

const Pet = (props) => {
    let png = ''
    props.type == 'Quagsire' ? png = require('../../../assets/Quagsire.png') : 
    (props.type == 'Darmanitan'? png = require('../../../assets/Darmanitan.png') : 
    png = require('../../../assets/Archeops.png'))
    
    return (
        <View style={styles.container}>
            <View style={styles.item}>
            <Image style={styles.image} source={png}/>
            <View style={styles.itemLeft}>
                <Image style={styles.icon} source={require('../../../assets/pokeball.png')}/>
                <Text style={styles.itemText}>{props.text}</Text>
            </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    image: {
        marginLeft: 40,
        height: 70,
        width: 70,
        alignSelf: 'center',
        margin: 30
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 15
    },
    item:{
        backgroundColor: '#FFF', 
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        width: '80%',
        marginLeft: 115
    },
    itemLeft: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#55BCF6',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15
    },
    itemText: {
        maxWidth: '80%',
        fontWeight: 'bold'
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#55BCF6',
        borderWidth: 2,
        borderRadius: 5
    },
})

export default Pet;