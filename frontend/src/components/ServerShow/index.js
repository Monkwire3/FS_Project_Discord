import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as channelActions from '../../store/channels';
import './ServerShow.css'
import { useDispatch } from 'react-redux';
import ServerMembersList from '../ChannelMembersList';



function ServerShow({serverId}) {
    const dispatch = useDispatch();
    const { channelId } = useParams();
    const channel = useSelector(state => state.channels)[channelId];

    useEffect(() => {
        dispatch(channelActions.fetchChannel(channelId))
    }, [])

    useEffect(() => {
        dispatch(channelActions.fetchChannel(channelId))
    }, [channelId])



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