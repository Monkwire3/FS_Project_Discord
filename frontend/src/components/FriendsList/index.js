import './FriendsList.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import FriendsListIndexItem from './FriendsListIndexItem';
import { fetchAllUsers, fetchFriends, fetchPendingRequests } from '../../store/users';
import AddFriendIndexItem from '../AddFriendIndexItem';
import PendingRequestItem from './PendingRequestItem';
import { Redirect } from 'react-router-dom';

function FriendsList() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const allUsers = useSelector(state => state.users.allUsers);
    const friends = useSelector(state => state.users.friends);
    const pendingRequests = useSelector(state => state.users.requests)

    let [friendSelection, setFriendSelection] = useState('all')

    useEffect(() => {
        dispatch(fetchPendingRequests());
        dispatch(fetchFriends());
    }, [])

    useEffect(() => {
        dispatch(fetchPendingRequests())
    }, [friends])

    useEffect(() => {
        dispatch(fetchFriends())
        dispatch(fetchPendingRequests())

    }, [setFriendSelection])

    useEffect(() => {
        dispatch(fetchAllUsers())
        dispatch(fetchPendingRequests())
        dispatch(fetchFriends())
    }, [friendSelection])

    useEffect(() => {
        applySelectionClasses();

    }, [friendSelection, setFriendSelection])

    const applySelectionClasses = () => {
        console.log('in apply selection classes')
        for (let child of document.querySelector('#friends-list-options').children) {
            if (child.textContent.toLowerCase() === friendSelection) {
                child.className = 'selected'
            } else {
                child.className = '';
            }
        }
    }

    let friendsList;
    switch (friendSelection) {
        case 'online':
            friendsList = ''
            break
        case 'all':
            if (!sessionUser) {
                friendsList = ''
            } else {
                friendsList = friends ? friends.length > 0 ? friends.map((friend) => <FriendsListIndexItem friend={friend} />) : '' : ''
                // friendsList = sessionUser.friends.map((friend) => <FriendsListIndexItem friend={friend} />)
            }
            break
        case 'pending':
            if (!sessionUser) {
                friendsList = ''
            } else {
                const incommingRequests = pendingRequests.length > 0 ? pendingRequests.map((req) => <PendingRequestItem request={req} incoming={true} />) : ''
                // const outgoingRequests = sessionUser.sentFriendRequests.map((req) => <PendingRequestItem request={req} incoming={false} />)
                friendsList = [];
                friendsList.push(incommingRequests);
                // friendsList.push(outgoingRequests);
            }
            break
        default:
            friendsList = '';
    }

    // const friendsList = friendSelection === 'all' ? friends.map((friend) => <FriendsListIndexItem friend={friend} />) : '';

    const usersList = allUsers ? allUsers.length > 0 ? allUsers.map((u) => <AddFriendIndexItem user={u} />) : 'loading...' : '';



    return (
        <>
        {sessionUser ? '' : <Redirect to='/login' />}
            <div id='direct-messages-header'>
                <div id='direct-messages-header-left'>
                    <div id='friends-icon'>
                        <svg width='24' height='24' viewBox="0 0 24 24">
                            <g>
                                <path fill='#8e9298' d="M0.5,0 L0.5,1.5 C0.5,5.65 2.71,9.28 6,11.3 L6,16 L21,16 L21,14 C21,11.34 15.67,10 13,10 C13,10 12.83,10 12.75,10 C8,10 4,6 4,1.5 L4,0 L0.5,0 Z M13,0 C10.790861,0 9,1.790861 9,4 C9,6.209139 10.790861,8 13,8 C15.209139,8 17,6.209139 17,4 C17,1.790861 15.209139,0 13,0 Z"></path>
                            </g>
                        </svg>
                        <div>Friends</div>
                    </div>
                    <div id='friends-list-options'>
                        <div onClick={() => setFriendSelection('online')}>Online</div>
                        <div onClick={() => setFriendSelection('all')}>All</div>
                        <div onClick={() => setFriendSelection('pending')}>Pending</div>
                        <div onClick={() => setFriendSelection('blocked')}>Blocked</div>
                        <div onClick={() => setFriendSelection('addfriend')}>Add Friend</div>
                    </div>
                </div>
                <div id='direct-messages-header-right'>
                    <div className='icon-group'>
                        <svg width='24' height='24' viewBox='0 0 24 24'>
                            <path fill='#8e9298' d='M20.998 0V3H23.998V5H20.998V8H18.998V5H15.998V3H18.998V0H20.998ZM2.99805 20V24L8.33205 20H14.998C16.102 20 16.998 19.103 16.998 18V9C16.998 7.896 16.102 7 14.998 7H1.99805C0.894047 7 -0.00195312 7.896 -0.00195312 9V18C-0.00195312 19.103 0.894047 20 1.99805 20H2.99805Z'></path>
                        </svg>
                    </div>
                    <div className='icon-group'>
                        <svg width='24' height='24' viewBox='0 0 24 24'>
                            <path fill='#8e9298' d='M19 3H4.99C3.88 3 3.01 3.89 3.01 5L3 19C3 20.1 3.88 21 4.99 21H19C20.1 21 21 20.1 21 19V5C21 3.89 20.1 3 19 3ZM19 15H15C15 16.66 13.65 18 12 18C10.35 18 9 16.66 9 15H4.99V5H19V15Z'></path>
                        </svg>
                        <svg width='24' height='24' viewBox='0 0 24 24'>
                            <path fill='#8e9298' d='M12 2C6.486 2 2 6.487 2 12C2 17.515 6.486 22 12 22C17.514 22 22 17.515 22 12C22 6.487 17.514 2 12 2ZM12 18.25C11.31 18.25 10.75 17.691 10.75 17C10.75 16.31 11.31 15.75 12 15.75C12.69 15.75 13.25 16.31 13.25 17C13.25 17.691 12.69 18.25 12 18.25ZM13 13.875V15H11V12H12C13.104 12 14 11.103 14 10C14 8.896 13.104 8 12 8C10.896 8 10 8.896 10 10H8C8 7.795 9.795 6 12 6C14.205 6 16 7.795 16 10C16 11.861 14.723 13.429 13 13.875Z'></path>

                        </svg>

                    </div>

                </div>

            </div>
            <div id='friends-list'>
                <div id='friends-list-search-bar'></div>
                <div id='friends-list-main'>
                    <div></div>
                    <div>
                        {friendsList}
                        {friendSelection === 'addfriend' ? usersList : ''}
                    </div>
                </div>
            </div>
        </>
    )

}

export default FriendsList;