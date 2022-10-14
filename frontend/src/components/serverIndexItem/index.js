import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import csrfFetch from '../../store/csrfFetch';
import { deleteServer } from '../../store/servers';
import './ServerListItem.css';

function ServerIndexItem({server}) {
    

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    
    console.log('server index: ', server)

    function handleClick() {
        dispatch(deleteServer(server.id))
    }

    return (
        <li key={server.id}>
            <span className='serverListItem'>{server.serverName}</span> - owned by: {server.owner.username}
            <span> {sessionUser.id === server.owner.id? <button onClick={handleClick}>Delete Server </button> : ""}</span>
        </li>
    )

}

export default ServerIndexItem;