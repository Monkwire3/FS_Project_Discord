import React, { useEffect } from 'react';
import * as serversActions from '../../store/servers';
import { useDispatch, useSelector  } from 'react-redux'; 
import { Redirect } from 'react-router-dom';
import ServerIndexItem from '../serverIndexItem';



function ServerIndex() {
    const dispatch = useDispatch();
    // const servers = useSelector((state) => state.servers ? Object.values(state.servers) : [])
    let servers = useSelector(serversActions.getServers);
    let serverListItems;

    useEffect(() => {
        dispatch(serversActions.fetchServers());

        const serverListItems = servers.map((server) => {
            // <ServerIndexItem server={server} />
        <li>{server.name}</li>

        })
    }, [])




    return (
        <div>
            <h1>Server Index</h1>
            <ServerIndexItem server={servers[0]} />
            <ul>{serverListItems}</ul>

        </div>
    )
}

export default ServerIndex;