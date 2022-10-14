import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import csrfFetch from '../../store/csrfFetch';
import { deleteServer } from '../../store/servers';

function ServerIndexItem({server}) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    

    function handleClick() {
        dispatch(deleteServer(server.id))
    }

    return (
        <li key={server.id}>
            {server.id} {server.serverName} - owned by: {server.owner.id} {server.owner.username}
            <span> {sessionUser.id === server.owner.id ? <button onClick={handleClick}>Delete Server</button> : ''}</span>
        </li>
    )

}

export default ServerIndexItem;