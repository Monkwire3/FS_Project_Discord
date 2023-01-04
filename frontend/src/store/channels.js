import { deleteMessage } from "./chat";
import csrfFetch from "./csrfFetch";

const RECEIVE_CHANNEL = 'channels/receiveChannel';
const RECEIVE_CHANNELS = 'channels/receiveChannels';
const CREATE_CHANNEL = 'channels/createChannel';
const EDIT_CHANNEL = 'channels/editChannel';
const DELETE_CHANNEL = 'channels/deleteChannel';
const ADD_CHANNEL_MESSAGE = 'channels/addMessage';
const REMOVE_CHANNEL_MESSAGE = 'channels/removeMessage  '


const addMessageToChannel = (message) => {
    return {
        type: ADD_CHANNEL_MESSAGE,
        message: message
    }
}

const removeChannel = (channelId) => {
    return {
        type: DELETE_CHANNEL,
        channelId: channelId
    }
}

const editChannelAction = (channel) => {
    return {
        type: EDIT_CHANNEL,
        payload: channel
    }
}

const createChannel = (channel) => {
    return {
        type: CREATE_CHANNEL,
        payload: channel
    }
}

const receiveChannel = (channel) => {
    return {
        type: RECEIVE_CHANNEL,
        payload: channel
    }
}

const receiveChannels = (channels) => {
    return {
        type: RECEIVE_CHANNELS,
        payload: channels
    }
}

const deleteMessageAction = (message) => {
    return {
        type: REMOVE_CHANNEL_MESSAGE,
        payload: message
    }
}


export const getChannels = serverId => ({channels}) => channels ? Object.values(channels).filter((channel) => `${channel.serverId}` === `${serverId}`) : [];
export const getChannel = channelId => ({channels}) => channels ? channels[channelId]: null;

export const createChannelMessage = (message) => async (dispatch) => {
    const res = await csrfFetch(`/api/messages/`, {
        method: 'POST',
        body: JSON.stringify ({
            body: message.body,
            sender_id: message.sender_id,
            channel_id: message.channel_id
        })
    })

    const data = await res.json();

    dispatch(addMessageToChannel(data));
}


export const fetchChannels = (serverId) => async(dispatch) => {
    const res = await csrfFetch(`/api/servers/${serverId}/channels/`);
    const data = await res.json();

    dispatch(receiveChannels(data));


    return data;
}

export const fetchChannel = (channelId) => async(dispatch) => {
    const res = await csrfFetch(`/api/channels/${channelId}`);
    const data = await res.json();

    dispatch(receiveChannel(data));

    return data;
}


export const addChannelToDatabase = (channel) => async(dispatch) => {
    const {channel_name, server_id} = channel;
    const res = await csrfFetch(`/api/channels/`, {
        method: 'POST',
        body: JSON.stringify({
            channel: {
            channel_name: channel_name,
            server_id: server_id
            }
        })
    })



    const data = await res.json();
    dispatch(receiveChannel(data))
}

export const deleteChannel = channelId => async dispatch => {
    const res = await csrfFetch(`/api/channels/${channelId}`, {
        method: 'DELETE'
    })

    dispatch(removeChannel(channelId));
}

export const editChannel = (channel) => async(dispatch) => {
    const res = await csrfFetch(`/api/channels/${channel.id}`, {
        method: 'PUT',
        body: JSON.stringify({
            channel_name: channel.channel_name,
            server_id: channel.serverId
        })
    })

    const data = await res.json();


    // dispatch(receieveChannel(data.channel))
    dispatch(receiveChannel(data))


    return res;
}

export const deleteChannelMessage = (message) => async(dispatch) => {
    const res = await csrfFetch(`/api/messages/${message.id}`, {method: 'DELETE'})
    const data = await res.json();
    dispatch(deleteMessageAction(message))
    return(data)
}

const channelsReducer = (state = {}, action) => {


    const nextState = {...state};

    switch (action.type) {
        case RECEIVE_CHANNELS:
            return {...state, ...action.payload}
        case CREATE_CHANNEL:
            nextState[action.payload.id] = action.payload
            return nextState
        case RECEIVE_CHANNEL:
            nextState[action.payload.id] = action.payload
            return nextState;
        case DELETE_CHANNEL:
            delete nextState[action.channelId]
            return nextState
        case ADD_CHANNEL_MESSAGE:
            nextState[action.message.channel_id].messages.push(action.message)
            return nextState;
        case REMOVE_CHANNEL_MESSAGE:
            if (action.payload.channel_id) {
                nextState[action.payload.channel_id]['messages'] = nextState[action.payload.channel_id]['messages'].filter((m) => m.id != action.payload.id)
            } else {
                nextState[action.payload.channelId]['messages'] = nextState[action.payload.channelId]['messages'].filter((m) => m.id != action.payload.id)
            }
            return nextState
        default:
            return state;
    }
}

export default channelsReducer;