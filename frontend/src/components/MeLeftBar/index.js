import { useDispatch, useSelector } from 'react-redux';
import './MeLeftBar.css';
import Link, { useEffect } from 'react'
import * as sessionActions from '../../store/session';
import { Redirect } from 'react-router-dom';
import ChatIndexItem from './ChatIndexItem';
import UserSettingsModal from '../UserSettingsModal';
import { fetchChats } from '../../store/chat';

function MeLeftBar() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const chats = useSelector(state => state.chats)

    useEffect(() => {
        dispatch(fetchChats())
    }, [])

    useEffect(() => {


    }, [chats])

    const logout = () =>  {
        return dispatch(sessionActions.logout());
    }


    const directMessages = chats.length > 0 ? chats.map((chat) => <ChatIndexItem key={`chat_index_item_${chat.id}`} chat={chat} />) : '';



    return (
        <div id='me-left-bar-container'>
            <div id='me-left-bar-search-container'>
                <input type='text'></input>
            </div>
            <div id='me-left-bar-middle-container'>
                <div id='me-left-bar-direct-messages'>
                    {directMessages}
                </div>
            </div>
            <div id='userBar'>
                <div id='nameTag'><div id='userIcon'></div><div id='nameDisplay'>{sessionUser ? sessionUser.username : <Redirect to='/login' />}</div></div>

                <div id='userMenus'>
                    <UserSettingsModal />
                </div>
            </div>
        </div>
    )
}

export default MeLeftBar