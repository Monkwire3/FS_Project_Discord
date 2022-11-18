import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, fetchChat } from '../../store/chat';
import './Chat.css';

function Chat({ chatId, cable }) {
    const dispatch = useDispatch();
    const chat = useSelector(state => state.chats);
    const [messageHistory, setMessageHistory] = useState([]);
    const [outgoingMessage, setOutgoingMessage] = useState('');
    const sessionUser = useSelector(state => state.session.user);
    console.log(cable.subscriptions)

    useEffect(() => {
        dispatch(fetchChat(chatId));
    }, [])

    useEffect(() => {
        debugger
    }, [cable.subscriptions, chatId, setMessageHistory, messageHistory])

    useEffect(() => {
        cable.subscriptions.create(
            {
                channel: 'ChatsChannel',
                // user_id: sessionUser.id,
                chat_id: chatId
            },
            {
                received: (message) => {
                    setMessageHistory([...messages, message])

                }
            }
        )

    }, [cable.subscriptions, chatId, setMessageHistory, messageHistory])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createMessage({ body: outgoingMessage, senderId: sessionUser.id, chatId: chatId }))
        setOutgoingMessage("")
    }

    const messages = Object.values(chat).length > 0 ? chat.messages.map((message) => <div className='message'>{message.body} -{message.sender.username}</div>) : 'messages loading';


    const historicalMessages = messageHistory.map((m) => <div>messageHistory: {m.body} - {m.sender.username}</div>)

    return (
        <div id='chat'>
            <div id='chat-messages-container'>
                {messages}
                {historicalMessages}
            </div>
            <div id='chat-input-container'>
                <form onSubmit={handleSubmit}>
                    <input type='text' onChange={(e) => setOutgoingMessage(e.target.value)}></input>
                </form>
            </div>
        </div>
    )
}

export default Chat;

