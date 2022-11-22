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
        console.log('on load cable ', cable)

    }, [])

    useEffect(() => {
        Object.values(chat).length > 0 ? setMessages(chat.messages.map((message) => <div className='message'>{message.body} -{message.sender.username}</div>)) : setMessages('messages loading')

        console.log('cable: ', cable)

        
    }, [cable.subscriptions, chatId, setMessageHistory, messageHistory, setOutgoingMessage])

    useEffect(() => {
        cable.subscriptions.create(
            {
                channel: 'ChatsChannel',
                user_id: sessionUser.id,
                chat_id: chatId
            },
            {
                received: (message) => {
                    messageHistory ? setMessageHistory([...messageHistory, message]) : setMessageHistory([message]);
                    document.querySelector('#bottom-div').scrollIntoView();
                }
            }
        )
        console.log('above return: ', cable.subscriptions)

        return () => {
            if (cable.subscriptions) {
                let ws = cable.connection.webSocket;
                ws.onClose();
            }
        }



    }, [])
    //[cable.subscriptions, chatId, setMessageHistory, messageHistory] 

    const handleSubmit = (e) => {
        e.preventDefault();
        setOutgoingMessage("")
        for (let i = 0; i < chat.members.length; i++) {
            if (chat.members[i].id === sessionUser.id) {
                dispatch(createMessage({ body: outgoingMessage, senderId: sessionUser.id, chatId: chatId }))
            }
        }
    }



    let historicalMessages = messageHistory ? messageHistory.map((m) => <div>{m.body} - {m.sender_id}</div>) : 'messages loading'

    if (chat.members) {
        for (let i = 0; i < chat.members.length; i++) {
            if (chat.members[i].id === sessionUser.id) {
                return (
                    <div id='chat'>
                        <div id='chat-messages-container'>
                            {messages}
                            {historicalMessages}
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
        }
    }
    return (
        <div id='chat'>
            Either this chat does not exist, or you are not a member
        </div>
    )
}

export default Chat;

