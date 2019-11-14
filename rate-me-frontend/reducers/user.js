import Users from '../data-dummy/dummy'
import { DELETE_USER, CREATE_USER, UPDATE_USER } from '../actions/user'
import User from '../models/user'
const initialState = {
    friendUsers: Users.filter((user) => {
        return user.name === 'name2'
    }),
    notFriendUsers: Users
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_USER:
            const newUser = new User(new Date().toString(), action.userData.name, action.userData.bio, action.userData.avatarURL, 1)
            return {
                ...state,
                notFriendUsers: state.notFriendUsers.concat(newUser)
            }
        case UPDATE_USER:
            const userIndex = state.notFriendUsers.findIndex(user => user.id === action.uid)
            const updatedUser = new User(action.uid, action.userData.name, action.userData.bio, action.userData.avatarURL, 1)
            const updatedNotFriendUsers = [...state.notFriendUsers]
            updatedNotFriendUsers[userIndex] = updatedUser
            return {
                ...state,
                notFriendUsers: updatedNotFriendUsers
            }
        case DELETE_USER:
            return {
                ...state,
                notFriendUsers: state.notFriendUsers.filter(user => user.id !== action.uid)
            }
    }
    return state
}