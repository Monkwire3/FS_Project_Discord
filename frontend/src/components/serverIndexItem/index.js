import React from 'react'
import { useDispatch } from 'react-redux'

function ServerIndexItem(server) {
    const dispatch = useDispatch();

    return (
        <li>
            <h2>ServerIndexItem placeholder</h2>
            {server.name} - owned by: {server.owner}
        </li>
    )

}

export default ServerIndexItem;