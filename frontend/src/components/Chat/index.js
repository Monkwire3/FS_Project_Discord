import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, fetchChat } from '../../store/chat';
import './Chat.css';
import Message from '../Message';

function Chat({ chatId, cable }) {
    const dispatch = useDispatch();
    const chat = useSelector(state => state.chats);
    const oldMessages = useSelector(state => state.chats.messages);
    const [outgoingMessage, setOutgoingMessage] = useState('');
    const sessionUser = useSelector(state => state.session.user);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        dispatch(fetchChat(chatId));
        console.log('on load cable ', cable)
        console.log('on load messageHistory: ', oldMessages)

    }, [])


    useEffect(() => {
        console.log('messages', messages)

    }, [messages])

   // useEffect(() => {
    //     Object.values(chat).length > 0 ? setMessages(chat.messages.map((message) => <div className='message'>{message.body} -{message.sender.username}</div>)) : setMessages('messages loading')
    //     // messages.length > 0 ? setMessages([...messages]) : setMessages([]);
    //     console.log('cable: ', cable)

        
    // }, [cable.subscriptions, chatId, oldMessages, setOutgoingMessage])

    useEffect(() => {
        cable.subscriptions.create(
            {
                channel: 'ChatsChannel',
                user_id: sessionUser.id,
                chat_id: chatId
            },
            {
                received: (message) => {
                    messages.length > 0 ? setMessages([...messages, <Message message={message} />]) : setMessages([<Message  message={message} />]);
                    document.querySelector('#bottom-div').scrollIntoView();
                }
            }
        )
        console.log('above return: ', cable.subscriptions)

        return () => {
            if (cable.subscriptions) {
                let ws = cable.connection.webSocket;
                ws.onclose();
            }
        }



    }, [])
    //[cable.subscriptions, chatId, setMessageHistory, messageHistory] 

    const handleSubmit = (e) => {
        e.preventDefault();
        setOutgoingMessage("")
        dispatch(createMessage({ body: outgoingMessage, senderId: sessionUser.id, chatId: chatId }))
    }



    const oldMessagesFormatted = oldMessages ? oldMessages.map((message) => <Message message={message} />) : ''


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

