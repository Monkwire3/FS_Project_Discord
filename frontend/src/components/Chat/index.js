import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChat } from '../../store/chat';


function Chat({chatId}) {
    const dispatch = useDispatch();
    const chat = useSelector(state => state.chats);

    useEffect(() => {
        dispatch(fetchChat(chatId));
    },[])


    const messages = Object.values(chat).length > 0 ? chat.messages.map((message) => <div className='message'>{message.body}</div>) : 'messages loading';

    return (
        <div id='chat'>
            <div id='chat-messages-container'>
                {messages}
            </div>
            <div id='chat-input-container'>
                <form>
                    <input type='text'></input>
                    <button></button>
                </form>
            </div>
        </div>
    )
}

export default Chat;

