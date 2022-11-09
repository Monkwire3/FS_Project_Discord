import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import csrfFetch from '../../store/csrfFetch';
import { deleteServer, fetchServers } from '../../store/servers';
import './ServerListItem.css';
import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { fetchChannels } from '../../store/channels';

function ServerIndexItem({server}) {



    return (
        <Link to={ server.channels.length > 0 ? `/channels/${server.channels[0].id}` : '/channels/@me'}>
            <div className='serverListItem' key={server.id}>
            <span>{server.serverName.slice(0, 1)}</span>
        </div>
        </Link>
    )

}

export default ServerIndexItem;