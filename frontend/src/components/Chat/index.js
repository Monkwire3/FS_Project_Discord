import { useSelector } from 'react-redux';


function Chat({chatId}) {
    const chat = useSelector(state => state.chats[chatId]);

    const messages = chat.messages.map((message) => <div className='message'>{message.body}</div>)
    return (
        <div id='chat'>
            {messages}
        </div>
    )
}

export default Chat;

