import { useSelector } from 'react-redux';
import './Message.css';


function Message({message}) {
    const sessionUser = useSelector(store => store.session.user);

    return (
        <div className='message'>
            <div className='message-top'><div className='message-username'>{message.sender.username}</div><div className='message-timestamp'></div></div>
            <div className='message-bottom'>
                <div className='message-body'>{message.body}</div>
                <div className='message-edited-tag'>{message.created_at != message.updated_at ? '(edited)' : ''}
                </div>
            </div>
        </div>
    )

}

export default Message;