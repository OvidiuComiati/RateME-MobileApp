import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'

import HeaderButton from '../components/HeaderButton'

import * as userActions from '../actions/user'

const EditProfileScreen = props => {
    const userId = props.navigation.getParam('userId')
    console.log(userId)
    const editedUser = useSelector(state => state.users.notFriendUsers.find(user => user.id === userId))

    const [name, setName] = useState(editedUser.name)
    const [avatarURL, setAvatarUrl] = useState(editedUser.avatarURL)
    const [bio, setBio] = useState(editedUser.bio)
    const dispatch = useDispatch()

    const submitHandler = useCallback(() => {
        dispatch(userActions.updateUser(userId, name, bio, avatarURL))
        props.navigation.goBack()
    },[dispatch, userId, name, bio, avatarURL])

    useEffect(() => {
        props.navigation.setParams({submit: submitHandler})
    },[submitHandler])

    return (
        <ScrollView>
            <View style={styles.formGeneral}>
                <View style={styles.formText}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={text => setName(text)}
                    />
                </View>
                <View style={styles.formText}>
                    <Text style={styles.label}>Avatar URL</Text>
                    <TextInput
                        style={styles.input}
                        value={avatarURL}
                        onChangeText={text => setAvatarUrl(text)}
                    />
                </View>
                <View style={styles.formText}>
                    <Text style={styles.label}>Bio</Text>
                    <TextInput
                        style={styles.input}
                        value={bio}
                        onChangeText={text => setAvatarUrl(text)}
                    />
                </View>
            </View>
        </ScrollView>
    )
}
EditProfileScreen.navigationOptions = navData => {
    const submitFunction = navData.navigation.getParam('submit')
    return {
        headerTitle: 'Edit Profile',
        headerRight: 
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Save"
                    iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                    onPress={submitFunction}
                />
            </HeaderButtons>
    }
}


const styles = StyleSheet.create({
    formGeneral: {
        margin: 20
    },
    formText: {
        width: '100%'
    },
    input: {
        paddingHorizontal: 3,
        paddingVertical: 3,
        borderBottomColor: '#ccc',
        borderBottomWidth: 2
    },
    label: {
        
        marginVertical: 10
    }
});

export default EditProfileScreen