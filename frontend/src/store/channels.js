import csrfFetch from "./csrfFetch";

const RECEIVE_CHANNEL = 'channels/receiveChannel';
const RECEIVE_CHANNELS = 'channels/receiveChannels';


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