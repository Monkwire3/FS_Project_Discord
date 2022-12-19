import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useParams } from 'react-router-dom';
import * as sessionActions from '../../store/session'
import './LeftSidebar.css'
import * as channelActions from '../../store/channels';
import ChannelListItem from '../channelListItem';
import * as serverActions from '../../store/servers';
import { useState } from 'react';
import ServerDropDown from '../ServerDropDown';
import CreateChannelForm from '../CreateChannelForm';
import CreateChannelFormModal from '../CreateChannelModal';
import ServerDropDownModal from '../serverDropDownModal/ServerDropDownModal';
import UserSettings from '../UserSettings';
import UserSettingsModal from '../UserSettingsModal';


function LeftSidebar({serverId}) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const channels = useSelector(channelActions.getChannels(serverId));
    const [channelsChanged, setChannelsChanged] = useState(false);
    const [serverChanged, setServerChanged] = useState(false)
    const server = useSelector(serverActions.getServer(serverId));


    // On mount
    useEffect(() => {
        dispatch(channelActions.fetchChannels(serverId))
        dispatch(serverActions.fetchServer(serverId))
    }, [])

    useEffect(() => {
        dispatch(channelActions.fetchChannels(serverId))
        dispatch(serverActions.fetchServer(serverId))
    }, [serverId])

    useEffect(() => {

    }, [channels, channelsChanged, setChannelsChanged, server])

  


    function logout() {
        return dispatch(sessionActions.logout())
    }


    const channelListItems =  channels.map((channel) => <ChannelListItem onChange={setChannelsChanged} channel={channel} server={server}/>)


    return (
        <div id="leftSidebar">
            <div id='channels'>
                <ServerDropDownModal onClick={() => setServerChanged(true) }setServerChanged={setServerChanged} serverId={serverId} />
                
                <div className='channelHeaderTextBox'>
                    <div>Text channels</div>
                    <div className='plusSvg'>
                        <CreateChannelFormModal server={server} />
                    </div>
                </div>

                {channelListItems}
            </div>
            <div id='userBar'>
                <div id='nameTag'><div id='userIcon'></div><div id='nameDisplay'>{sessionUser.username}</div></div>
                <div id='userMenus'>
                    <UserSettingsModal />
                </div>
            </div>
        </div>
    )
}


export default LeftSidebar;