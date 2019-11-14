import React from 'react'
import {View, Text} from 'react-native'
import {useSelector} from 'react-redux'

import FriendProfileItem from '../components/FriendProfile'

const FriendProfile = props => {
    const userId = props.navigation.getParam('userId')
    const user = useSelector(state => state.users.friendUsers.find(user => user.id === userId))
    return  (
        <View>
            <FriendProfileItem image={user.avatarURL} 
                name={user.name} 
                bio={user.bio}
                rating={user.rating}
                //images={user.picturesURLs}
                onSendUnfriendRequest={() => {}}
            />
        </View>
    )
}

FriendProfile.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('userName')
    }
}

export default FriendProfile