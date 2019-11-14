import React from 'react'
import {View, Text} from 'react-native'
import {useSelector} from 'react-redux'

import UserProfileItem from '../components/UserProfile'

const UserProfile = props => {
    const userId = props.navigation.getParam('userId')
    const user = useSelector(state => state.users.notFriendUsers.find(user => user.id === userId))
    return  (
        <View>
            <UserProfileItem image={user.avatarURL} 
                name={user.name} 
                bio={user.bio}
                rating={user.rating}
                //images={user.picturesURLs}
                onSendRequest={() => {}}
            />
        </View>
    )
}

UserProfile.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('userName')
    }
}

export default UserProfile