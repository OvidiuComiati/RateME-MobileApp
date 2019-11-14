import React from 'react'
import { FlatList, Platform } from 'react-native'
import { useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import UserListItem from '../components/UserListItem'
import HeaderButton from '../components/HeaderButton'

const FriendList = props => {
  const users = useSelector(state => state.users.friendUsers)
  return <FlatList
    data={users}
    keyExtractor={item => item.id}
    renderItem={itemData =>
      <UserListItem image={itemData.item.avatarURL}
        name={itemData.item.name}
        onViewProfile={() => {
          props.navigation.navigate({
            routeName: 'FriendProfile',
            params: {
              userId: itemData.item.id,
              userName: itemData.item.name
            }
          })
        }}
        
      />}
  />
}
FriendList.navigationOptions = navData => {
  return {
    headerTitle: 'Friends',
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

export default FriendList