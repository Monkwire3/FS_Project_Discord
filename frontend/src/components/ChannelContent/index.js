import './ChannelContent.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createChannelMessage, fetchChannel } from '../../store/channels';
import { useEffect, useState } from 'react';
import Message from '../Message';
import { createMessage, fetchMessages } from '../../store/messages';

function ChannelContent() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [messageBody, setMessageBody] = useState('')
    const sessionUser = useSelector(store => store.session.user);
    const channel = useSelector(store => store.channels[id]);
    const messages = useSelector(store => Object.values(store.messages));
    console.log('channelContent messages: ', messages)


    // useEffect(() => {
    //     dispatch(fetchMessages({channelId: id, chatId: 1}))
    //     document.querySelector('#bottom-div').scrollIntoView();
    // }, [])

    useEffect(() => {
        dispatch(fetchMessages({channelId: id, chatId: 1}))

    }, [id, messages.length])


    

    const sendMessage = (e) => {
        e.preventDefault();
        dispatch(createMessage({body: messageBody, senderId: sessionUser.id, channelId: id, chatId: 1}))
        setMessageBody('')
        document.querySelector('#bottom-div').scrollIntoView();
        dispatch(fetchMessages({channelId: id, chatId: 1}))
    }

    // useEffect(() => {
    //     dispatch(fetchMessages({channelId: id, chatId: 1}))

    // }, [sendMessage])


    // const messages = channel.messages ? channel.messages.map((m) => <Message message={m} />) : '';

    const formattedMessages = messages.length > 0 ? messages.map((m) => <Message key={m.id} message={m} />) : '';


    return (
        <>
        <div id='chat-box'>
            {formattedMessages}
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

export default ChannelContent