import React from 'react'
import { ScrollView, StyleSheet,Button,KeyboardAvoidingView, TextInput} from 'react-native'
import { useSelector } from 'react-redux'
import {LinearGradient} from 'expo-linear-gradient'

import Input from '../components/Input'
import Card from '../components/Card'
import Colors from '../constants/colors'


const AuthScreen = props => {
    const user = useSelector(state => state.users.notFriendUsers.find(user => user.name === 'name'))
    console.log(user)
    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={50} style={styles.screen}>
            <LinearGradient colors={['blue','aqua'] } style={styles.gradient}>
        <Card style={styles.card}>
            <ScrollView >
                <Input 
                id="name"  
                label="name"
                keyboardType='default' 
                required  
                autoCapitalize="none" 
                errorMessage="wrong name"
                onInputChange={() => {}}
                initialValue=""
                />
                <Input 
                id="password" 
                label="password" 
                keyboardType='default' 
                required 
                minlength={5} 
                autoCapitalize="none" 
                errorMessage="wrong password"
                onInputChange={() => {}}
                initialValue=""
                />
                <Button 
                title="Login" 
                color={Colors.primary}
                onPress={() => {
                    props.navigation.navigate({
                        routeName: 'MyProfile',
                        params: {
                          userId: user.id
                        }
                    })
                }}/>
                <Button 
                title="Sign up" 
                color={Colors.primary}
                onPress={() => {}}/>
            </ScrollView>
        </Card>
        </LinearGradient>
        </KeyboardAvoidingView>
    )
}
AuthScreen.navigationOptions = {
    headerTitle: 'LOGIN'
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    card: {
        marginRight: '10%',
        marginLeft: '10%',
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    gradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignContent: 'center'
    }
})

export default AuthScreen