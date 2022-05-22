import React from 'react'
import { Image, View, Text, StyleSheet } from 'react-native'

const Pet = (props) => {
    const png = ''
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={png}/>
            <Text style={styles.itemText}> 
                {props.text}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF', 
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    image: {
        flex: 1,
        height: 120,
        width: 140,
        alignSelf: 'center',
        margin: 30
    },
    itemText: {
        maxWidth: '80%',
        fontWeight: 'bold'
    }
})

export default Pet;