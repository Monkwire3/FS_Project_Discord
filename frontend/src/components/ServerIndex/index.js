import React, { useEffect } from 'react';
import * as serverActions from '../../store/servers';
import { useDispatch, useSelector } from 'react-redux';
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


    const serverListItems = servers.map((server) => <ServerIndexItem server={server} />)

    return (
        <div id='serverIndex'>
            {serverListItems}
            <div className='serverIndexItem'><NewServerFormModal /></div>
            <div className="serverListItem" id="join-server-button">
                <svg viewBox='0 0 24 24'>
                    <path fill='#3aa55d' d="M12 10.9C11.39 10.9 10.9 11.39 10.9 12C10.9 12.61 11.39 13.1 12 13.1C12.61 13.1 13.1 12.61 13.1 12C13.1 11.39 12.61 10.9 12 10.9ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM14.19 14.19L6 18L9.81 9.81L18 6L14.19 14.19Z"></path>
                </svg>
            </div>
            {/* <div className='serverIndexItem'><JoinServerFormModal /></div> */}
        </div>
    )
}

export default ServerIndex;