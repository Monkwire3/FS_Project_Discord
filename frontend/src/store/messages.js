import csrfFetch from "./csrfFetch";

const RECEIVE_MESSAGES = 'messages/receiveMessages'
const ADD_MESSAGE = 'messages/addMessage'
const REMOVE_MESSAGE = 'messages/removeMessage'
const UPDATE_MESSAGE = 'messages/updateMessage'

const getMessages = (messages) => {
    return {
        type: RECEIVE_MESSAGES,
        payload: messages
    }
}

const addMessage = (messages) => {
    return {
        type: ADD_MESSAGE,
        payload: messages
    }
}

const removeMessage = (messageId) => {
    return {
        type: REMOVE_MESSAGE,
        payload: messageId
    }
}

const updateMessage = (message) => {
    return {
        type: UPDATE_MESSAGE,
        payload: message
    }
}



export const fetchMessages = ({channelId, chatId}) => async(dispatch) => {
    if (channelId === 1) {
        const res = await csrfFetch(`/api/chats/${chatId}`)
        const data = await res.json();

        dispatch(getMessages(data.messages));
        return res;
    } else if (chatId === 1) {
        const res = await csrfFetch(`/api/channels/${channelId}`);
        const data = await res.json();

        dispatch(getMessages(data.messages));
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
    dispatch(addMessage(data))
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
    dispatch(updateMessage(data))
}

const messagesReducer = (state = {}, action) => {
    const nextState = {...state};

    switch (action.type) {
        case RECEIVE_MESSAGES:
            return action.payload;
        case ADD_MESSAGE:
            return {...state, ...action.payload};
        case REMOVE_MESSAGE:
            delete nextState.action.payload.id;
            return nextState;
        case UPDATE_MESSAGE:
            nextState[action.payload.id] = action.payload;
            return nextState;
        default:
            return state
    }
}

export default messagesReducer;