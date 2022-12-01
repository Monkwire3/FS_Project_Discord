import './ChannelContent.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createChannelMessage } from '../../store/channels';
import { useState } from 'react';

function ChannelContent() {
    const channelId = useParams();
    const dispatch = useDispatch();
    const [messageBody, setMessageBody] = useState('')
    const sessionUser = useSelector(store => store.session.user);



    const sendMessage = (e) => {
        e.preventDefault();
        debugger
        dispatch(createChannelMessage({body: messageBody, sender_id: sessionUser.id, channel_id: channelId.id}))
    }

    return (
        <>
        <div id='chat-box'></div>
        <div id='input-container'>
            <form onSubmit={sendMessage}>
                <input type='text' value={messageBody} onChange={(e) => setMessageBody(e.target.value)}></input>
            </form>
        </div>
        </>
    )

}

export default ChannelContent;