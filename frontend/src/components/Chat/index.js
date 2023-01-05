import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChat } from '../../store/chat';
import './Chat.css';
import Message from '../Message';
import { createMessage, fetchMessages } from '../../store/messages';

function Chat({ chatId, cable }) {
    const dispatch = useDispatch();
    const [outgoingMessage, setOutgoingMessage] = useState('');
    const sessionUser = useSelector(state => state.session.user);
    const messages = useSelector(state => state.messages)
    
    // 

    useEffect(() => {
        document.querySelector('#bottom-div').scrollIntoView();
    }, [messages])

    // Load messages from database
    useEffect(() => {
        dispatch(fetchMessages({channelId: 1, chatId: chatId}))
    }, [])
    


    // Listen on websocket
    // useEffect(() => {
    //     cable.subscriptions.create(
    //         {
    //             channel: 'ChatsChannel',
    //             user_id: sessionUser.id,
    //             chat_id: chatId
    //         },
    //         {
    //             received: (message) => {
    //                 messages.length > 0 ? setMessages([...messages, <Message message={message} />]) : setMessages([<Message message={message} />]);
    //                 document.querySelector('#bottom-div').scrollIntoView();
    //             }
    //         }
    //     )

    //     return () => {
    //         if (cable.subscriptions) {
    //             let ws = cable.connection.webSocket;
    //             ws.onclose();
    //         }
    //     }



    // }, [])


    // Send message adsflkjads
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('in handle submit, e: ', e)
        setOutgoingMessage("")
        dispatch(createMessage({ body: outgoingMessage, senderId: sessionUser.id, chatId: chatId, channelId: 1 }))
    }

    useEffect(() => {}, [messages, handleSubmit, messages.length, outgoingMessage])

    // Format messages from database
    const formattedMessages = messages.length > 0 ? messages.map((message) => <Message message={message} />) : '';

    return (
        <div id='chat'>
            <div id='chat-messages-container'>
                {formattedMessages}
                <div id='bottom-div'></div>
            </div>
            <div id='chat-input-container'>
                <form onSubmit={handleSubmit}>
                    <input type='text' value={outgoingMessage} onChange={(e) => setOutgoingMessage(e.target.value)}></input>
                </form>
            </div>
        </div>
    )


}

export default Chat;

