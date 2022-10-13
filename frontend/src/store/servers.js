import csrfFetch from "./csrfFetch";

const CREATE_SERVER = 'servers/createServer';
const DELETE_SERVER = 'servers/deleteServer';

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

// export const addServertoDatabase = (server) => async(dispatch)