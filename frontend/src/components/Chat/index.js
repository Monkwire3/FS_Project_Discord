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
    const messages = useSelector(state => Object.values(state.messages))
    const chat = useSelector(state => state.chats[chatId])
    
    // 

    useEffect(() => {
        document.querySelector('#bottom-div').scrollIntoView();
    }, [messages])

    // Load messages from database
    useEffect(() => {
        // dispatch(fetchChat(chatId));
        dispatch(fetchMessages({channelId: 1, chatId: chatId}))
    }, [])

    useEffect(() => {
        dispatch(fetchMessages({channelId: 1, chatId: chatId}))
    }, [messages.length])
    


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

    //

    // Send message adsflkjads
    const  handleSubmit = async(e) => {
        e.preventDefault();
        console.log('in handle submit, e: ', e)
        setOutgoingMessage("")
        await dispatch(createMessage({ body: outgoingMessage, senderId: sessionUser.id, chatId: chatId, channelId: 1 }))
        dispatch(fetchMessages({channelId: 1, chatId: chatId}))
    }

    useEffect(() => {}, [messages, handleSubmit, messages.length, outgoingMessage])

    // Format messages from database
    const formattedMessages = messages.length > 0 ? messages.map((message) => <Message key={`message_${message.id}`} message={message} />) : '';

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

