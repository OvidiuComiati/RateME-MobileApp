import React from 'react'
import {View, Text, Image, StyleSheet, Button, Dimensions, ScrollView} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import {Card, Avatar} from 'react-native-elements'
import { AirbnbRating } from 'react-native-ratings'

const FriendProfile = props => {
    //const user = useSelector(state => state.users.notFriendUsers.find(user => user.id === userId))
    return (
        <View style={styles.user} >
        <ScrollView >
            <ScrollView horizontal={true}>
                
                    <Avatar rounded style={styles.image} source={{uri: props.image}} showEditButton/>
                    <View>
                        <Text style={styles.name}>{props.name}</Text> 
                        <Card title="RATING">
                            <Text >{props.rating}</Text>
                        </Card>
                    </View> 
                
            </ScrollView>
            <Text style={styles.bio}>{props.bio}</Text> 
            <AirbnbRating showRating={true}/>
            <View style={styles.actions}>
                <Button title="Unfriend" onPress={props.onSendUnfriendRequest}/>
            </View>
        </ScrollView>
        </View>
    )        
}

const styles = StyleSheet.create({
    user: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height:2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: Dimensions.get('window').height,
        margin:20,
        paddingBottom: 20
    },
    image: {
        width: 150,
        height: 200,
        margin: 10
    },
    name: {
        fontSize: 24,
        marginVertical: 4,
        paddingRight: 20,
        paddingLeft: 40,
        textAlign: 'right'
    },
    bio: {
        fontSize: 16,
        marginVertical: 10,
        textAlign: 'left',
        marginHorizontal: 20
        //color: '#888'
    },
    actions: {
        flexDirection: 'row',
        marginTop:20,
        justifyContent: 'space-around',
        alignItems: 'center'      
    },
    card: {
        width: '80%', 
        marginBottom: 10,
        flex: 1
    },

})

export default FriendProfile