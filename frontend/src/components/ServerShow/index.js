import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as channelActions from '../../store/channels';
import './ServerShow.css'
import { useDispatch } from 'react-redux';



function ServerShow() {
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
            <div id='serverTop'>{channel ? channel.name : ''}</div>
            <div id='serverBottom'>
                <div id='serverLeft'></div>
                <div id='serverRight'></div>
            </div>
        </div>
    )
}

export default ServerShow;