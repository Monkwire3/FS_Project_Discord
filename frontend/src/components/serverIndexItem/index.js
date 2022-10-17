import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import csrfFetch from '../../store/csrfFetch';
import { deleteServer, fetchServers } from '../../store/servers';
import './ServerListItem.css';
import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

function ServerIndexItem({server}) {
    
    function handleClick(e) {
        console.log('clicked server')
        console.log(`Server ${e} clicked.`)
    }

    return (
        <Link to={`/servers/${server.id}`}>
            <div className='serverListItem' key={server.id}>
            <span>{server.serverName.slice(0, 1)}</span>
        </div>
        </Link>
    )

}

export default ServerIndexItem;