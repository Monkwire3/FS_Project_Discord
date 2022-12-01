import './Message.css';


function Message({message}) {
    return (
        <div className='message'>
            {message.body}
        </div>
    )

}

export default Message;