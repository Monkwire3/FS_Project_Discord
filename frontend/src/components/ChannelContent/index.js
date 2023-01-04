import './ChannelContent.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createChannelMessage, fetchChannel } from '../../store/channels';
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
        document.querySelector('#bottom-div').scrollIntoView();
    }

    useEffect(() => {
        dispatch(fetchChannel)

    }, [sendMessage, channel])


    const messages = channel.messages ? channel.messages.map((m) => <Message message={m} />) : '';


    return (
        <>
        <div id='chat-box'>
            {messages}
            <div id='bottom-div'></div>
        </div>
        <div id='input-container'>
            <form onSubmit={sendMessage}>
                <input type='text' value={messageBody} onChange={(e) => setMessageBody(e.target.value)}></input>
            </form>
        </div>
        </>
    )

}

export default ChannelContent;