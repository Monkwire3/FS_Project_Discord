import csrfFetch from "./csrfFetch";

const RECEIVE_MESSAGES = 'messages/receiveMessages';
const RECEIVE_MESSAGE = 'messages/receiveMessage';
const REMOVE_MESSAGE = 'messages/removeMessage';

const getMessages = (messages) => {
    return {
        type: RECEIVE_MESSAGES,
        payload: messages
    }
}

const receiveMessage = (message) => {
    return {
        type: RECEIVE_MESSAGE,
        payload: message
    }
}

const removeMessage = (messageId) => {
    return {
        type: REMOVE_MESSAGE,
        payload: messageId
    }
}


export const fetchMessages = ({channelId, chatId}) => async(dispatch) => {
    if (channelId === 1) {
        const res = await csrfFetch(`/api/messages/chat/${chatId}`)
        const data = await res.json();

        dispatch(getMessages(data));
        return res;
    } else if (chatId === 1) {
        const res = await csrfFetch(`/api/messages/channel/${channelId}`);
        const data = await res.json();

        dispatch(getMessages(data));
        return res
    }
}

export const createMessage = (message) => async(dispatch) => {
    // there may be a parsing issue with channelId (as opposed to channel_id)
    const res = await csrfFetch(`/api/messages`, {
        method: 'POST',
        body: JSON.stringify({
            message: {
                body: message.body,
                senderId: message.senderId,
                chatId: message.chatId,
                channelId: message.channelId
            }
        })
    })

    const data = await res.json();
    console.log('data inside create message: ', data)
    dispatch(receiveMessage(data))
    return res;
}

export const deleteMessage = (message) => async(dispatch) => {
    const res = await csrfFetch(`/api/messages/${message.id}`, {method: 'DELETE'});

    dispatch(removeMessage(message.id));
    return res;
}

export const editMessage = (message) => async(dispatch) => {
    const res = await csrfFetch(`/api/messages/${message.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            body: message.body
        })
    })

    const data = await res.json();
    dispatch(receiveMessage(data))
}

const messagesReducer = (state = {}, action) => {
    let nextState = {...state};

    switch (action.type) {
        case RECEIVE_MESSAGES:
            return action.payload;
        case RECEIVE_MESSAGE:
            nextState[action.payload.id] = action.payload
            return nextState
        case REMOVE_MESSAGE:
            delete nextState[action.payload.id]
            return nextState;
        default:
            return state
    }
}

export default messagesReducer;