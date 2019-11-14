import { createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {Platform} from 'react-native'

import FindFriendList from '../screens/FindFriendList'
import FriendList from '../screens/FriendList'
import FriendProfileScreen from '../screens/FriendProfileScreen'
import UserProfile from '../screens/UserProfile'
import EditProfileScreen from '../screens/EditProfileScreen'
import AuthScreen from '../screens/AuthScreen'
import MyProfile from '../screens/MyProfile'

import Colors from '../constants/colors'

const UsersNavigator = createStackNavigator({
    FindFriends: FindFriendList,
    UserProfile: UserProfile
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android'? Colors.primary :''
        },
        headerTintColor: 'white'
    }
})
const FriendsNavigator = createStackNavigator({
    Friends: FriendList,
    FriendProfile: FriendProfileScreen
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android'? Colors.primary :''
        },
        headerTintColor: 'white'
    }
})
const MyNavigator = createStackNavigator({
    MyProfile: MyProfile,
    EditProfile: EditProfileScreen
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android'? Colors.primary :''
        },
        headerTintColor: 'white'
    }
})
const UserListNavigator = createDrawerNavigator({
    Main: MyNavigator,
    Friends: FriendsNavigator,
    Users: UsersNavigator
},{
    activeTintColor: Colors.primary
})

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
})

const AppNavigator = createSwitchNavigator({
    Auth: AuthNavigator,
    App: UserListNavigator
})
export default createAppContainer(AppNavigator)
