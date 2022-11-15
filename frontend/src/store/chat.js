import csrfFetch from "./csrfFetch";

const RECEIVE_CHAT = 'chats/receiveChat';

const receiveChat = (chat) => {
    return {
        type: RECEIVE_CHAT,
        payload: chat
    }
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

const chatsReducer = (state = {}, action) => {
    const nextState = {...state};

    switch (action.type) {
        case RECEIVE_CHAT:
            return {...state, ...action.payload}
        default:
            return state;
    }
}

export default chatsReducer