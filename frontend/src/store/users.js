import csrfFetch from "./csrfFetch";
import { storeCurrentUser } from "./session";

const CREATE_USER = 'users/createUser';
const DELETE_USER = 'users/deleteUser';
const RECIEVE_USERS = 'users/recieveUsers';
const SEND_FRIEND_REQUEST = 'users/sendFriendRequest';

const requestFriend = (request) => {
    return {
        type: SEND_FRIEND_REQUEST,
        payload: request
    }
}

const recieveUsers = (users) => {
    return {
        type: RECIEVE_USERS,
        payload: users
    }
}

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

export const fetchAllUsers = () => async(dispatch) => {
    const res = await csrfFetch('/api/users');
    const data = await res.json();

    dispatch(recieveUsers(data));

    return data;
}

export const sendFriendRequest = ({request}) => async(dispatch) => {
    const res = await csrfFetch('/api/friends/', {
    method: 'POST',
    body: JSON.stringify({
        requester_id: request.requester_id,
        requestee_id: request.requestee_id
        })
    })

    const data = await res.json();
    dispatch(requestFriend(data));

    return data;
}

const usersReducer = (state = {}, action) => {
    switch (action.type) {
        case RECIEVE_USERS:
            return {...state, users: action.payload}
        case CREATE_USER:
            return {...state, user: action.payload}
        default:
            return state
    }
}

export default usersReducer;