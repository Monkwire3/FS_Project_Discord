import React, { useEffect } from 'react';
import * as serverActions from '../../store/servers';
import { useDispatch, useSelector  } from 'react-redux'; 
import { Redirect } from 'react-router-dom';
import ServerIndexItem from '../serverIndexItem';
import { useState } from 'react';
import './ServerIndex.css'
import { Link } from 'react-router-dom';
import NewServerFormModal from '../newServerFormModal';



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
            <div className='serverIndexItem'><NewServerFormModal /></div>
            {/* <Link to='/servers/new'><div className='serverListItem'>+</div></Link> */}

        </div>
    )
}

export default ServerIndex;