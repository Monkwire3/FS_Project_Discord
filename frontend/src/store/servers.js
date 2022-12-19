import csrfFetch from "./csrfFetch";

const CREATE_SERVER = 'servers/createServer';
const DELETE_SERVER = 'servers/deleteServer';
const RECEIVE_SERVER = 'servers/receiveServer';
const RECEIVE_SERVERS = 'servers/recieveServer';
const RECEIVE_UNDISCOVERED_SERVERS = 'servers/recieveUndiscoveredServer';
const EDIT_SERVER = 'servers/editServer';

const createServer = (server) => {
    return {
        type: CREATE_SERVER,
        payload: server
    }
}

const removeServer = (serverId) => {
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

const receiveUndiscoveredServers = (servers) => {
    return {
        type: RECEIVE_UNDISCOVERED_SERVERS,
        payload: servers
    }
}

const receiverServer = (server) => {
    return {
        type: RECEIVE_SERVER,
        payload: server
    }
}

const editServerAction = (server, serverId) => {
    return {
        type: EDIT_SERVER,
        serverId: serverId,
        payload: server
    }
}

// export const getServer = serverId => ({servers}) => servers ? servers[serverId] : null;


export const getServer = serverId => ({servers}) => {
    if (servers.discovered) {
        return Object.values(servers.discovered).filter((server) => `${server.id}` === `${serverId}`)[0]
    }
    return null;
}


export const getServers = ({ servers }) => servers ? Object.values(servers) : [];

export const addServertoDatabase = (server) => async(dispatch) => {
    const {server_name, owner} = server;
    const res = await csrfFetch('/api/servers', {
        method: 'POST',
        body: JSON.stringify({
            server_name: server_name,
            owner
        })
    })

    const data = await res.json();
    dispatch(receiveServers(data))


    return res
}

export const editServer = (server) => async(dispatch) => {
    const {server_name} = server;
    const res = await csrfFetch(`/api/servers/${server.id}`, {
        method: 'PUT',
        body: JSON.stringify({
            server_name: server_name
        })
    })

    const data = await res.json();
    dispatch(editServerAction(data.server))
}

export const fetchServers = () => async(dispatch) => {
    const res = await csrfFetch('/api/servers');
    const data = await res.json();

    dispatch(receiveServers(data));

    return data;
}

export const fetchServer = (serverId) => async(dispatch) => {
    const res = await csrfFetch(`/api/servers/${serverId}`);
    const data = await res.json();

    dispatch(receiverServer(data));

    return data;
}

export const deleteServer = serverId => async dispatch => {
    const res = await csrfFetch(`/api/servers/${serverId}`, {
        method: 'DELETE'
    })

    dispatch(removeServer(serverId));
}

export const fetchUndiscovered = () => async dispatch => {
    const res = await csrfFetch(`/api/servers/undiscovered`)

    const data = await res.json();

    dispatch(receiveUndiscoveredServers(data));

    return data;
}

export const joinServer = ({serverId}) => async dispatch => {
    const res = await csrfFetch(`/api/servers/join`, {
        method: 'POST',
        body: JSON.stringify({serverId: serverId})});

    debugger
    const data = await res.json();
    dispatch(receiveServers(data));
    return data;
}


const serversReducer = (state = {}, action) => {
    const nextState = {...state};
    switch (action.type) {
        case CREATE_SERVER:
            // nextState[action.payload.id] = action.payload
            return nextState
        case RECEIVE_SERVERS:
            nextState['discovered'] = [...action.payload]
            return nextState;
        case RECEIVE_UNDISCOVERED_SERVERS:
            nextState['undiscovered'] = [...action.payload]
            return nextState;
        case EDIT_SERVER:
            nextState.filter((server) => server.id === action.serverId)[0] = action.payload
            return nextState
        case DELETE_SERVER:
            delete nextState[action.serverId]
            return nextState

        default:
            return state
    }
}

export default serversReducer;