import React, { useEffect } from 'react';
import * as serverActions from '../../store/servers';
import { useDispatch, useSelector  } from 'react-redux'; 
import { Redirect } from 'react-router-dom';
import ServerIndexItem from '../serverIndexItem';
import { useState } from 'react';
import './ServerIndex.css'
import { Link } from 'react-router-dom';



function ServerIndex() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);


    const servers = useSelector(serverActions.getServers);


    useEffect(() => {
        dispatch(serverActions.fetchServers());
      
    }, [])

    const serverListItems = servers.map((server) => <ServerIndexItem server={server}/>)

    return (
        <div id='serverIndex'>
            {serverListItems}
            <div className='serverListItem'><Link to='/servers/new'>+</Link></div>
            <form></form>

        </div>
    )
}

export default ServerIndex;