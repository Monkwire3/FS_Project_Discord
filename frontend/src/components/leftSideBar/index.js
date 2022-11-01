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


function LeftSidebar() {
    const { id } = useParams();

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    // const servers = useSelector(serverActions.getServers)
    const channels = useSelector(channelActions.getChannels(id))

    const server = useSelector(serverActions.getServer(id));


    // On mount
    useEffect(() => {
        dispatch(channelActions.fetchChannels(id))
        dispatch(serverActions.fetchServer(id))
    }, [])

    // On currentServer change
    useEffect(() => {
        dispatch(channelActions.fetchChannels(id))
    }, [server, channels.length])


    useEffect(() => {
        serverActions.fetchServer(id)
    }, [id])

    // useEffect(() => {
    //     setCurrentServer(servers.filter(server => `${server.id}` === id)[0])
    // }, [id])

    const [dropDownDisplay, setDropDownDisplay] = useState(false);


    console.log('current server: ', server)

    function toggleDropDown() {
        if (dropDownDisplay) {
            setDropDownDisplay(false);
        } else {
            setDropDownDisplay(true);
        }
    }

    function logout() {
        return dispatch(sessionActions.logout())
    }
    const channelListItems = channels.map((channel) => <ChannelListItem channel={channel} />)


    return (
        <div id="leftSidebar">
            <div id='channels'>
                <div onClick={toggleDropDown} id='channelsHeader'>
                    <div>{server ? server.serverName : ''}</div>
                    <div id="dropDownToggle">
                        <svg className='dropIcon' width={18} height={18}>
                            <g fill='none' fillRule="evenodd">
                            <path d="M0 0h18v18H0"></path>
                            <path stroke="#d8d9da" d="M4.5 4.5l9 9" strokeLinecap="round"></path>
                            <path stroke="#d8d9da" d="M13.5 4.5l-9 9" strokeLinecap="round"></path>
                            </g>
                        </svg>
                    </div>
                    {dropDownDisplay ? <ServerDropDown /> : ''}



                    
           
                </div>
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
                    <div id='userSettings' onClick={logout}>
                        <svg aria-hidden='true' role='img'>
                            <path fill="white" d="M19.738 10H22V14H19.739C19.498 14.931 19.1 15.798 18.565 16.564L20 18L18 20L16.565 18.564C15.797 19.099 14.932 19.498 14 19.738V22H10V19.738C9.069 19.498 8.203 19.099 7.436 18.564L6 20L4 18L5.436 16.564C4.901 15.799 4.502 14.932 4.262 14H2V10H4.262C4.502 9.068 4.9 8.202 5.436 7.436L4 6L6 4L7.436 5.436C8.202 4.9 9.068 4.502 10 4.262V2H14V4.261C14.932 4.502 15.797 4.9 16.565 5.435L18 3.999L20 5.999L18.564 7.436C19.099 8.202 19.498 9.069 19.738 10ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z">

                            </path>

                        </svg>
                    </div>

                </div>
            </div>
        </div>
    )
}


export default LeftSidebar;