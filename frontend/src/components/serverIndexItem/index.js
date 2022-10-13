import React from 'react'
import { useDispatch } from 'react-redux'

function ServerIndexItem( { server }) {
    // const dispatch = useDispatch();

    return (
        <li key={server.serverName}>
            {server.serverName} - owned by: {server.owner.username}
        </li>
    )

}

export default ServerIndexItem;