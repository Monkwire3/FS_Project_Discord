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
    const [messages, setMessages] = useState([]);

    // const messages = Object.values(chat).length > 0 ? chat.messages.map((message) => <div className='message'>{message.body} -{message.sender.username}</div>) : 'messages loading';

    useEffect(() => {
        dispatch(fetchChat(chatId));
        setMessageHistory(chat.messages);
    }, [])

    useEffect(() => {
        Object.values(chat).length > 0 ? setMessages(chat.messages.map((message) => <div className='message'>{message.body} -{message.sender.username}</div>)) : setMessages('messages loading')


        
    }, [cable.subscriptions, chatId, setMessageHistory, messageHistory])

    useEffect(() => {
        cable.subscriptions.create(
            {
                channel: 'ChatsChannel',
                user_id: sessionUser.id,
                chat_id: chatId
            },
            {
                received: (message) => {
                    messageHistory.length > 0 ? setMessageHistory([...messageHistory, message]) : setMessageHistory([message]);
                }
            }
        )

    }, [cable.subscriptions, chatId, setMessageHistory, messageHistory])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createMessage({ body: outgoingMessage, senderId: sessionUser.id, chatId: chatId }))
        setOutgoingMessage("")
    }



    const historicalMessages = messageHistory ? messageHistory.map((m) => <div>{m.body} - {m.sender_id}</div>) : 'messages loading'
    console.log(historicalMessages)

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

