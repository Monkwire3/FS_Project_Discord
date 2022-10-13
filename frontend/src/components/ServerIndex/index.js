import React, { useEffect } from 'react';
import * as serversActions from '../../store/servers';
import { useDispatch, useSelector  } from 'react-redux'; 
import { Redirect } from 'react-router-dom';
import ServerIndexItem from '../serverIndexItem';
import { useState } from 'react';



function ServerIndex() {
    const dispatch = useDispatch();
    // const servers = useSelector((state) => state.servers ? Object.values(state.servers) : [])

    // const [severs, setSevers] = useState([])

    const servers = useSelector(serversActions.getServers);

    useEffect(() => {
        // const fetchData = serversActions.fetchServers()
        dispatch(serversActions.fetchServers());
      
    }, [])

    const serverListItems = servers.map((server) => <ServerIndexItem server={server} />)

    return (
        <div>
            <h1>Server Index</h1>
            <ul>{serverListItems}</ul>

            {/* <ServerIndexItem server={servers[0]} />
            <ul>{serverListItems}</ul> */}

        </div>
    )
}

export default ServerIndex;