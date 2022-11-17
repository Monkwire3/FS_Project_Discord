import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChat } from '../../store/chat';
import './Chat.css';

function Chat({chatId}) {
    const dispatch = useDispatch();
    const chat = useSelector(state => state.chats);

    useEffect(() => {
        dispatch(fetchChat(chatId));
    },[])

    const handleSubmit = () => {
        debugger
    }

    const messages = Object.values(chat).length > 0 ? chat.messages.map((message) => <div className='message'>{message.body} -{message.sender_id}</div>) : 'messages loading';
    debugger

    return (
        <div id='chat'>
            <div id='chat-messages-container'>
                {messages}
            </div>
            <div id='chat-input-container'>
                <form onSubmit={handleSubmit}>
                    <input type='text'></input>
                </form>
            </div>
        </div>
    )
}

export default Chat;

