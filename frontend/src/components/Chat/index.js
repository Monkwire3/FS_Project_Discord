import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, fetchChat } from '../../store/chat';
import './Chat.css';
import Message from '../Message';

function Chat({ chatId, cable }) {
    const dispatch = useDispatch();
    const oldMessages = useSelector(state => state.chats.messages);
    const [outgoingMessage, setOutgoingMessage] = useState('');
    const sessionUser = useSelector(state => state.session.user);
    const chat = useSelector(state => state.chats)
    

    // Store messages sent and recieved through websockets
    const [messages, setMessages] = useState([]);


    useEffect(() => {

    }, [chat])

    // Load messages from database
    useEffect(() => {
        dispatch(fetchChat(chatId));
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


    // Send message
    const handleSubmit = (e) => {
        e.preventDefault();
        setOutgoingMessage("")
        dispatch(createMessage({ body: outgoingMessage, senderId: sessionUser.id, chatId: chatId }))
    }


    // Format messages from database
    const oldMessagesFormatted = oldMessages ? oldMessages.map((message) => <Message message={message} />) : '';

    return (
        <div id='chat'>
            <div id='chat-messages-container'>
                {oldMessagesFormatted}
                {messages}
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

