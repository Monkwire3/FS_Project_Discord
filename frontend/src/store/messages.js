import csrfFetch from "./csrfFetch";

const RECIEVE_MESSAGES = 'messages/receiveMessages'
const ADD_MESSAGE = 'messages/addMessage'
const REMOVE_MESSAGE = 'messages/removeMessage'
const UPDATE_MESSAGE = 'messages/updateMessage'

const getMessages = (messages) => {
    return {
        type: RECIEVE_MESSAGES,
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
    const res = await csrfFetch(`/`)
}