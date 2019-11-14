import React from 'react'
import { View, Text, Image, StyleSheet, Button, Dimensions, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native'

const UserListItem = props => {
    let TouchableCmp = TouchableOpacity
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback
    }
    return (
        <View style={styles.user}>
            <TouchableCmp onPress={props.onViewProfile} useForeground>
                <View style={styles.touchable}>

                    <Image style={styles.image} source={{ uri: props.image }} />
                    <Text style={styles.name}>{props.name}</Text>
                    <View style={styles.actions}>
                        <Button title="Go to profile" onPress={props.onViewProfile} />
                        <Button title="Send request" onPress={props.onSendRequest} />
                    </View>

                </View>
            </TouchableCmp>
        </View>)
}

const styles = StyleSheet.create({
    user: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: Dimensions.get('window').height / 2,
        margin: 20,
        paddingBottom: 2
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '60%'
    },
    name: {
        fontSize: 18,
        marginVertical: 4,
        textAlign: 'center'
    },
    bio: {
        fontSize: 14,
        color: '#888'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }

})

export default UserListItem