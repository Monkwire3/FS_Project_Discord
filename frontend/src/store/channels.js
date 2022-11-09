import csrfFetch from "./csrfFetch";

const RECEIVE_CHANNEL = 'channels/receiveChannel';
const RECEIVE_CHANNELS = 'channels/receiveChannels';
const CREATE_CHANNEL = 'channels/createChannel';
const EDIT_SERVER = 'channels/editChannel';
const DELETE_CHANNEL = 'channels/deleteChannel';


const removeChannel = (channelId) => {
    return {
        type: DELETE_CHANNEL,
        channelId: channelId
    }
}

const editChannelAction = (channel) => {
    return {
        type: EDIT_SERVER,
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


export const getChannels = serverId => ({channels}) => channels ? Object.values(channels).filter((channel) => `${channel.serverId}` === `${serverId}`) : [];
export const getChannel = channelId => ({channels}) => channels ? channels[channelId]: null;


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
    console.log(data)
    dispatch(receiveChannel(Object.values(data)[0]))
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
    dispatch(receiveChannel(Object.values(data)[0]))


    return res;
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
        default:
            return state;
    }
}

export default channelsReducer;