import React, { useEffect } from 'react';
import * as serversActions from '../../store/servers';
import { useDispatch, useSelector  } from 'react-redux'; 
import { Redirect } from 'react-router-dom';
import ServerIndexItem from '../serverIndexItem';
import { useState } from 'react';
import './ServerIndex.css'



function ServerIndex() {
    const dispatch = useDispatch();


    const servers = useSelector(serversActions.getServers);


    useEffect(() => {
        dispatch(serversActions.fetchServers());
      
    }, [dispatch])

    const serverListItems = servers.map((server) => <ServerIndexItem server={server}/>)

    return (
        <div id='serverIndex'>
            <h1>Server Index</h1>
            <ul>{serverListItems}</ul>
            <form></form>

        </div>
    )
}

export default ServerIndex;