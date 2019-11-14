import React from 'react'
import { FlatList, Platform } from 'react-native'
import { useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import UserListItem from '../components/UserListItem'
import HeaderButton from '../components/HeaderButton'

const FindFriendList = props => {
  const users = useSelector(state => state.users.notFriendUsers)
  return <FlatList
    data={users}
    keyExtractor={item => item.id}
    renderItem={itemData =>
      <UserListItem
        image={itemData.item.avatarURL}
        name={itemData.item.name}
        onViewProfile={() => {
          props.navigation.navigate({
            routeName: 'UserProfile',
            params: {
              userId: itemData.item.id,
              userName: itemData.item.name
            }
          })

        }}
        onSendRequest={() => { }}
      />}
  />
}
FindFriendList.navigationOptions = navData => {
  return {
    headerTitle: 'Find Friends',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  }

}

export default FindFriendList