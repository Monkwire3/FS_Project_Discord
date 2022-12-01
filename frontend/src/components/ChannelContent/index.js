import './ChannelContent.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createChannelMessage } from '../../store/channels';
import { useEffect, useState } from 'react';
import Message from '../Message';

function ChannelContent() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [messageBody, setMessageBody] = useState('')
    const sessionUser = useSelector(store => store.session.user);
    const channel = useSelector(store => store.channels[id]);

    const sendMessage = (e) => {
        e.preventDefault();
        dispatch(createChannelMessage({body: messageBody, sender_id: sessionUser.id, channel_id: id}))
        setMessageBody('')
    }

    useEffect(() => {

    }, [sendMessage])


    const messages = channel ? channel.messages.map((m) => <Message message={m} />) : '';


    debugger
    return (
        <>
        <div id='chat-box'>{messages}</div>
        <div id='input-container'>
            <form onSubmit={sendMessage}>
                <input type='text' value={messageBody} onChange={(e) => setMessageBody(e.target.value)}></input>
            </form>
        </div>
        </>
    )

}

export default ChannelContent;