import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as channelActions from '../../store/channels';
import './ServerShow.css'
import { useDispatch } from 'react-redux';
import ServerMembersList from '../ServerMembersList';



function ServerShow({serverId}) {
    const dispatch = useDispatch();
    const { id } = useParams();
    const channel = useSelector(state => state.channels)[id];

    useEffect(() => {
        dispatch(channelActions.fetchChannel(id))
    }, [])

    useEffect(() => {
        dispatch(channelActions.fetchChannel(id))
    }, [id])



    return (
        <div id='serverShowContainer'>
            <div id='serverTop'>{channel ? channel.name : 'channel name unnavailable'}</div>
            <div id='serverBottom'>
                <div id='serverLeft'></div>
                <div id='serverRight'>
                    <ServerMembersList serverId={serverId} />
                </div>
            </div>
        </div>
    )
}

export default ServerShow;