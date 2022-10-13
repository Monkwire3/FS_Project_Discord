import csrfFetch from "./csrfFetch";
import { storeCurrentUser } from "./session";

const CREATE_SERVER = 'servers/createServer';
const DELETE_SERVER = 'servers/deleteServer';
const RECEIVE_SERVER = 'servers/receiveServer';
const RECEIVE_SERVERS = 'servers/recieveServer';

const createServer = (server) => {
    return {
        type: CREATE_SERVER,
        payload: server
    }
}

const deleteServer = (serverId) => {
    return {
        type: DELETE_SERVER,
        serverId: serverId
    }
}

const receiveServers = (servers) => {
    return {
        type: RECEIVE_SERVERS,
        payload: servers
    }
}

const receiverServer = (server) => {
    return {
        type: RECEIVE_SERVER,
        payload: server
    }
}

export const getServer = serverId => ({servers}) => servers ? servers[serverId] : null;
export const getServers = ({ servers }) => servers ? Object.values(servers) : [];

export const addServertoDatabase = (server) => async(dispatch) => {
    const {server_name, owner} = server;
    const res = await csrfFetch('/api/servers', {
        method: 'POST',
        body: JSON.stringify({
            server_name,
            owner
        })
    })

    const data = await res.json();
    dispatch(createServer(data))

    return res
}

export const fetchServers = () => async(dispatch) => {
    const res = await csrfFetch('/api/servers');
    const data = await res.json();

    return dispatch(receiveServers(data));
}


const serversReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_SERVER:
            return { ...state, server: action.payload }
        case RECEIVE_SERVERS:
            return {...state, ...action.payload}
        default:
            return state
    }
}

export default serversReducer;