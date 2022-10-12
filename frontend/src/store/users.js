import csrfFetch from "./csrfFetch";
import { storeCurrentUser } from "./session";

const CREATE_USER = 'users/createUser';
const DELETE_USER = 'users/c'

const createUser = (user) => {
    return {
        type: CREATE_USER,
        payload: user
    }
}

const deleteUser = (userId) => {
    return {
        type: DELETE_USER,
        userId: userId
    }
}



export const addUserToDatabase = (user) => async(dispatch) => {
    const {username, email, password} = user;
    const res = await csrfFetch('/api/users/', {
        method: 'POST',
        body: JSON.stringify({
            username,
            email,
            password
        })
    })

    const data = await res.json();
    storeCurrentUser(data.user)
    dispatch(createUser(data));

    return res;
}

const usersReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_USER:
            return {...state, user: action.payload}
        default:
            return state
    }
}

export default usersReducer;