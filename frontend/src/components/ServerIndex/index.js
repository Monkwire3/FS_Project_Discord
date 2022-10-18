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


    const servers = useSelector(serverActions.getServers);


    useEffect(() => {
        dispatch(serverActions.fetchServers());
      
    }, [])




    const serverListItems = servers.map((server) => <ServerIndexItem server={server}/>)

    return (
        <div id='serverIndex'>
            {serverListItems}
            <Link to='/servers/new'><div className='serverListItem'>+</div></Link>

        </div>
    )
}

export default ServerIndex;