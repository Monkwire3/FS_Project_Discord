import csrfFetch from "./csrfFetch";
import { storeCurrentUser } from "./session";

const RECIEVE_USERS = 'users/recieveUsers';
const RECIEVE_CHATS = 'users/receiveChats';
const RECIEVE_FRIENDS = 'users/receiveFriends';
const RECEIVE_FRIEND_REQUESTS = 'users/receiveFriendRequests';
 

const getUsers = (users) => {
    return {
        type: RECIEVE_USERS,
        payload: users
    }
}

const getFriends = (friends) => {
    return {
        type: RECIEVE_FRIENDS,
        payload: friends
    }
}

const getFriendRequests = (friendRequests) => {
    return {
        type: RECEIVE_FRIEND_REQUESTS,
        payload: friendRequests
    }
}

const getChats = (chats) => {
    return {
        type: RECIEVE_CHATS,
        payload: chats
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
    dispatch(getUsers(data));

    return res;
}

export const fetchAllUsers = () => async(dispatch) => {
    const res = await csrfFetch('/api/users');
    const data = await res.json();

    dispatch(getUsers(data));

    return data;
}

export const sendFriendRequest = ({requester_id, requestee_id}) => async(dispatch) => {
    const res = await csrfFetch('/api/friends/', {
    method: 'POST',
    body: JSON.stringify({
        requester_id: requester_id,
        requestee_id: requestee_id
        })
    })

    const data = await res.json();
    console.log('sendFriendRequest data: ', data)
    dispatch(getFriendRequests(data));

    return data;
}

export const acceptFriendRequest = ({requester_id, requestee_id}) => async(dispatch) => {
    const res = await csrfFetch(`/api/friends/`, {
    method: 'PATCH',
    body: JSON.stringify({
        requestee_id: requestee_id,
        requester_id: requester_id
    })
    })

    const data = await res.json();
    dispatch(getFriendRequests(data));

    return data;
}

export const removeFriend = ({id_a, id_b}) => async(dispatch) => {
    const res = await csrfFetch(`/api/friends/`, {
        method: 'DELETE',
        body: JSON.stringify({
            id_a: id_a,
            id_b: id_b
        })
    })

    const data = await res.json();
    dispatch(getFriends(data));
    return data;
}

export const deleteChat = chatId => async dispatch => {
    const res = await csrfFetch(`/api/chats/${chatId}`, {
        method: 'DELETE'
    })

    dispatch(getChats(chatId));
}

export const fetchPendingRequests = () => async(dispatch) => {
    const res = await csrfFetch('/api/friendRequests/')
    const data = await res.json();

    dispatch(getFriendRequests(data))
    return data
}

export const fetchFriends = () => async(dispatch)  => {
    const res = await csrfFetch('/api/friends');
    const data = await res.json();
    dispatch(getFriends(data));
    return data;
}



const usersReducer = (state = {}, action) => {
    let newState = {...state}
    switch (action.type) {
        case RECIEVE_USERS:
            newState['allUsers'] = action.payload
            return newState
        case RECIEVE_FRIENDS:
            newState['friends'] = action.payload
            return newState
        case RECEIVE_FRIEND_REQUESTS:
            newState['requests'] = action.payload
            return newState
        case RECIEVE_CHATS:
            newState['chats'] = action.payload
            return newState
        default:
            return state
    }
}

export default usersReducer;