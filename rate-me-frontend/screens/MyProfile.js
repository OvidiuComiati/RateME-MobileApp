import React,{ useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, Dimensions, Platform, ScrollView, Button, Alert } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Card, Avatar } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import HeaderButton from '../components/HeaderButton'
import * as userActions from '../actions/user'


const MyProfile = props => {
    const userId= props.navigation.getParam('userId')
    const user = useSelector(state => state.users.notFriendUsers.find(user => user.id === userId))
    const dispatch = useDispatch()

    const submitHandler = useCallback(() => {
        
        props.navigation.navigate({
            routeName: 'EditProfile',
                        params: {
                          userId: user.id
                        }
        })
    },[])

    useEffect(() => {
        props.navigation.setParams({submit: submitHandler})
    },[submitHandler])

    return (
        <View style={styles.user} >
            <ScrollView >
                <ScrollView horizontal={true}>

                    <Avatar rounded style={styles.image} source={{ uri: user.avatarURL }} showEditButton />
                    <View>
                        <Text style={styles.name}>{user.name}</Text>
                        <Card title="RATING">
                            <Text >{user.rating}</Text>
                        </Card>

                    </View>

                </ScrollView>
                <Text style={styles.bio}>{user.bio}</Text>
                <View style={styles.actions}>
                    <Button title="View friends" onPress={() => {
                        props.navigation.navigate({
                            routeName: 'Friends'
                        })
                    }} />
                    <Button title="Find friends" onPress={() => {
                        props.navigation.navigate({
                            routeName: 'FindFriends'
                        })
                    }} />
                </View>
                <View style={styles.delete}>
                    <Button color="#ff5c5c" title="Delete Account" onPress={() => {
                        Alert.alert('Are you sure?', 'Do you really want to delete this account?', [
                            { text: 'NO', style: 'default' },
                            {
                                text: 'YES', style: 'destructive', onPress: () => {
                                    dispatch(userActions.deleteUser(user.id))
                                    props.navigation.navigate({
                                        routeName: 'Auth'
                                    })
                                }
                            }
                        ])
                    }} />
                </View>
            </ScrollView>
        </View>
    )
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
        height: Dimensions.get('window').height,
        margin: 20,
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
    },
    actions: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    delete: {
        flexDirection: 'row',

        marginTop: 25,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    card: {
        width: '80%',
        marginBottom: 10,
        flex: 1
    },

})
MyProfile.navigationOptions = navData => {
    const submitFunction = navData.navigation.getParam('submit')
    return {
        headerTitle: 'ME',//navData.navigation.getParam('userName') // asta primeste de la auth
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer()
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Edit Profile"
                    iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                    onPress={submitFunction}
                />
            </HeaderButtons>
        )
    }
}

export default MyProfile