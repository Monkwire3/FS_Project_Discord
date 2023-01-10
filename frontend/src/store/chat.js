import csrfFetch from "./csrfFetch";

const RECEIVE_CHAT = 'chats/receiveChat';
const REMOVE_CHAT = 'chats/removeChat';
const RECEIVE_CHATS = 'chats/receiveChats';

const receiveChats = (chats) => {
    return {
        type: RECEIVE_CHATS,
        payload: chats
    }
}

const receiveChat = (chat) => {
    return {
        type: RECEIVE_CHAT,
        payload: chat
    }
}

const removeChat = (chatId) => {
    return {
        type: REMOVE_CHAT,
        payload: chatId
    }
}



export const fetchChats = () => async(dispatch) => {
    const res = await csrfFetch(`/api/chats`)
    const data = await res.json();
    dispatch(receiveChats(data))
    return res
}

export const fetchChat = (chatId) => async(dispatch) => {
    
    const res = await csrfFetch(`/api/chats/${chatId}`);
    const data = await res.json();

    dispatch(receiveChat(data));
    return res;
}

export const createChat = (chat) => async(dispatch) => {
    const res = await csrfFetch(`/api/chats`, {
        method: 'POST',
        body: JSON.stringify({
            chat: {
                title: chat.title,
                user_1: chat.user_1,
                user_2: chat.user_2
            }
        })
    })

    const data = await res.json()
    dispatch(receiveChat(data));
    return data;
}

export const deleteChat = (chatId) => async(dispatch) => {
    const res = await csrfFetch(`/api/chats/${chatId}`, {
        method: 'DELETE'
    })

    dispatch(removeChat(chatId));
    return res;
}


const chatsReducer = (state = {}, action) => {
    const nextState = {...state};

    switch (action.type) {
        case RECEIVE_CHATS:
            return {...action.payload}
        case RECEIVE_CHAT:
            nextState[action.payload.id] = action.payload
            return nextState
        case REMOVE_CHAT:
            delete nextState[action.payload.chatId]
            return nextState;
        default:
            return state;
    }
}

export default chatsReducer