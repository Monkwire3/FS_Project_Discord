import csrfFetch from "./csrfFetch";

const RECEIVE_CHANNEL = 'channels/receiveChannel';
const RECEIVE_CHANNELS = 'channels/receiveChannels';
const CREATE_CHANNEL = 'channels/createChannel';



const createChannel = (channel) => {
    return {
        type: CREATE_CHANNEL,
        payload: channel
    }
}

const receieveChannel = (channel) => {
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


export const getChannels = ({ channels }) => channels ? Object.values(channels) : [];
// export const getChannel = channelId => ({channeld}) => channels ? channels[channelId] : null;

export const fetchChannels = (serverId) => async(dispatch) => {
    const res = await csrfFetch(`/api/servers/${serverId}/channels/`);
    const data = await res.json();

    dispatch(receiveChannels(data));

    return data;
}

export const addChannelToDatabase = (channel) => async(dispatch) => {
    const {channel_name, server_id} = channel;
    const res = await csrfFetch(`/api/servers/${server_id}/channels`, {
        method: 'POST',
        body: JSON.stringify({
            channel_name: channel_name,
            server_id: server_id
        })
    })

    const data = await res.json();
    dispatch(createChannel(data.channel))

    return res

}

const channelsReducer = (state = {}, action) => {
    const nextState = {...state};
    switch (action.type) {
        case RECEIVE_CHANNELS:
            return {...state, ...action.payload}
        default:
            return state;
    }
}

export default channelsReducer;