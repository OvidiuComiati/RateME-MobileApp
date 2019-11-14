export const DELETE_USER = 'DELETE_USER'
export const CREATE_USER = 'CREATE_USER'
export const UPDATE_USER = 'UPDATE_USER'

export const deleteUser = userId => {
    return {type:DELETE_USER, uid: userId }
}
export const createUser = ( name, bio, avatarURL) => {
    return {
        type: CREATE_USER,
        userData: {
            name,
            bio,
            avatarURL
        }
    }
}
export const updateUser = (id, name, bio, avatarURL) => {
    return {
        type: UPDATE_USER,
        uid: id,
        userData: {
            name,
            bio,
            avatarURL
        }
    }
}