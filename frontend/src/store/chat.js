import csrfFetch from "./csrfFetch";

const RECEIVE_CHAT = 'chats/receiveChat';
const RECEIVE_MESSAGE = 'chats/receieveMessage'

const receiveMessage = (message) => {
    return {
        type: RECEIVE_MESSAGE,
        payload: message
    }
}

const receiveChat = (chat) => {
    return {
        type: RECEIVE_CHAT,
        payload: chat
    }
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
                title: chat.title
            }
        })
    })

    const data = await res.json()
    dispatch(receiveChat(data));
}

export const createMessage = (message) => async(dispatch) => {
    const res = await csrfFetch(`/api/messages`, {
        method: 'POST',
        body: JSON.stringify({
            message: {
                body: message.body,
                senderId: message.senderId,
                chatId: message.chatId
            }
        })
    })

    const data = await res.json()
    dispatch(receiveMessage(data));
}

const chatsReducer = (state = {}, action) => {
    const nextState = {...state};

    switch (action.type) {
        case RECEIVE_CHAT:
            return {...action.payload}
        case RECEIVE_MESSAGE:
            return nextState;
        default:
            return state;
    }
}

export default chatsReducer