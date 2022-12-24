import csrfFetch from "./csrfFetch";

const RECEIVE_CHAT = 'chats/receiveChat';
const RECEIVE_MESSAGE = 'chats/receieveMessage';
const DELETE_MESSAGE = 'chats/deleteMessage';


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

const deleteMessageAction = (messageId) => {
    return {
    type: DELETE_MESSAGE,
    payload: messageId
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

export const deleteMessage = (message) => async(dispatch) => {
    const res = await csrfFetch(`/api/messages/${message.id}`, {method: 'DELETE'})
    const data = await res.json();

    dispatch(deleteMessageAction(message.id));

}

const chatsReducer = (state = {}, action) => {
    const nextState = {...state};

    switch (action.type) {
        case RECEIVE_CHAT:
            return {...action.payload}
        case RECEIVE_MESSAGE:
            nextState['messages'].push(action.payload)
            return nextState; 
        case DELETE_MESSAGE:
            return nextState['messages'].filter((m) => m.id != action.payload)
        default:
            return state;
    }
}

export default chatsReducer