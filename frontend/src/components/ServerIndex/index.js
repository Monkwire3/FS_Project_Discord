import React, { useEffect } from 'react';
import * as serverActions from '../../store/servers';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ServerIndexItem from '../serverIndexItem';
import { useState } from 'react';
import './ServerIndex.css'
import { Link } from 'react-router-dom';
import NewServerFormModal from '../newServerFormModal';
import ServerDiscoverModal from '../ServerDiscoverModal';



function ServerIndex() {
    const dispatch = useDispatch();


    // const servers = useSelector(serverActions.getServers);
    const servers = useSelector(state => state.servers);


    useEffect(() => {
        dispatch(serverActions.fetchServers());

    }, [])

    useEffect(() => {}, [servers])


    const serverListItems = servers ? servers.discovered ? servers.discovered.map((server) => <ServerIndexItem server={server} />) : '' : ''

    return (
        <div id='serverIndex'>
            <Link to='/@'>
                <div className='serverListItem' id='direct-messages-server-index-link'>
                    <svg viewBox='0 0 28 20'>
                        <path fill='white' d='M23.0212 1.67671C21.3107 0.879656 19.5079 0.318797 17.6584 0C17.4062 0.461742 17.1749 0.934541 16.9708 1.4184C15.003 1.12145 12.9974 1.12145 11.0283 1.4184C10.819 0.934541 10.589 0.461744 10.3368 0.00546311C8.48074 0.324393 6.67795 0.885118 4.96746 1.68231C1.56727 6.77853 0.649666 11.7538 1.11108 16.652C3.10102 18.1418 5.3262 19.2743 7.69177 20C8.22338 19.2743 8.69519 18.4993 9.09812 17.691C8.32996 17.3997 7.58522 17.0424 6.87684 16.6135C7.06531 16.4762 7.24726 16.3387 7.42403 16.1847C11.5911 18.1749 16.408 18.1749 20.5763 16.1847C20.7531 16.3332 20.9351 16.4762 21.1171 16.6135C20.41 17.0369 19.6639 17.3997 18.897 17.691C19.3052 18.4993 19.7718 19.2689 20.3021 19.9945C22.6677 19.2689 24.8929 18.1364 26.8828 16.6466H26.8893C27.43 10.9731 25.9665 6.04728 23.0212 1.67671ZM9.68041 13.6383C8.39754 13.6383 7.34085 12.4453 7.34085 10.994C7.34085 9.54272 8.37155 8.34973 9.68041 8.34973C10.9893 8.34973 12.0395 9.54272 12.0187 10.994C12.0187 12.4453 10.9828 13.6383 9.68041 13.6383ZM18.3161 13.6383C17.0332 13.6383 15.9765 12.4453 15.9765 10.994C15.9765 9.54272 17.0124 8.34973 18.3161 8.34973C19.6184 8.34973 20.6751 9.54272 20.6543 10.994C20.6543 12.4453 19.6184 13.6383 18.3161 13.6383Z'></path>
                    </svg>

                </div>
            </Link>
            {serverListItems}
            <NewServerFormModal />
            <ServerDiscoverModal />
            
            <a href='https://github.com/Monkwire3' target='none'>
                <div className='serverListItem'>
                    <svg viewBox='0 0 15 15'>
                        <path fill='white' d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z'></path>
                    </svg>
                </div>
            </a>

            <a href='https://www.linkedin.com/in/clide-stefani-5772431a7/' target='none'>
                <div className='serverListItem'>
                    in
{/* 
                <svg viewBox=''>
                    <path fill='white' d='m81.3 0h-17.9c-0.8 0-1.5 0.7-1.6 1.5v18c0 0.8 0.7 1.5 1.6 1.5h17.9c0.8 0 1.5-0.7 1.6-1.5v-18c0-0.8-0.7-1.5-1.6-1.5zm-13.2 17.9h-3.1v-10h3.1v10zm-1.6-11.4c-1 0-1.8-0.8-1.8-1.8s0.8-1.8 1.8-1.8 1.8 0.8 1.8 1.8-0.8 1.8-1.8 1.8zm13.3 11.4h-3.1v-4.9c0-1.2 0-2.7-1.6-2.7s-1.9 1.3-1.9 2.6v5h-3.1v-10h3v1.4c0.6-1 1.7-1.7 2.9-1.6 3.2 0 3.7 2.1 3.7 4.8l0.1 5.4z'></path>
                    <path fill='white' d='m 261.8728,37.749 0,33.794 -11.2325,0 0,-33.794 11.2325,0 z m -5.6163,38.408 c 3.917,0 6.355,2.595 6.355,5.838 -0.073,3.316 -2.438,5.839 -6.2807,5.839 -3.8423,0 -6.3545,-2.523 -6.3545,-5.839 0,-3.243 2.4375,-5.838 6.207,-5.838 l 0.073,0 z'></path>
                    <path fill='white' d='m 239.3298,95.036 c 0,2.96 2.4604,5.361 5.4956,5.361 l 63.376,0 c 3.0351,0 5.4956,-2.401 5.4956,-5.361 l 0,-64.117 c 0,-2.961 -2.4605,-5.361 -5.4956,-5.361 l -63.376,0 c -3.0352,0 -5.4956,2.4 -5.4956,5.361 l 0,64.117 z'></path>
                </svg> */}

                </div>
            </a>
            {/* <div className='serverIndexItem'><JoinServerFormModal /></div> */}
        </div>
    )
}

export default ServerIndex;