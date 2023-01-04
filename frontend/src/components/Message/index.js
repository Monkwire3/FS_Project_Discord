import { useDispatch, useSelector } from 'react-redux';
import { deleteChannelMessage } from '../../store/channels';
import { deleteMessage, editMessage } from '../../store/chat';
import './Message.css';
import { useState } from 'react';


function Message({ message }) {
    const sessionUser = useSelector(state => state.session.user);
    const [messageBody, setMessageBody] = useState(message.body)
    const [messageBodyClassList, setMessageBodyClassList] = useState('message-body')
    const [messageFormClassList, setMessageFormClassList] = useState('message-edit-form hidden')
    const [editingMessage, setEditingMessage] = useState(false);
    const [isEdited, setIsEdited] = useState(message.createdAt !== message.updatedAt)
    const dispatch = useDispatch();


    const handleDelete = () => {
        if (message.channelId || message.channel_id != 1) {
            dispatch(deleteChannelMessage(message))
        } else if (message.chatId) {
            dispatch(deleteMessage(message))
        }
    }

    const openEditForm = () => {
        if (editingMessage) {
            setMessageBodyClassList('message-body')
            setMessageFormClassList('message-edit-form hidden')
            setEditingMessage(false)

        } else {
            setMessageBodyClassList('hidden')
            setMessageFormClassList('message-edit-form')
            setEditingMessage(true)
        }
    }

    const closeEditForm = () => {
        setMessageBodyClassList('message-body')
        setMessageFormClassList('message-edit-form hidden')
        setEditingMessage(false)
    }

    const handleEditMessage = (e) => {
        e.preventDefault();
        if (messageBody != message.body) {
            setIsEdited(true)
            dispatch(editMessage({body: messageBody, id: message.id}))
        }
        closeEditForm();
    }

    let messageMenus;
    if (sessionUser.id === message.sender_id) {
        messageMenus = (
            <div className='message-menus'>
            <div className='edit-message' onClick={openEditForm}>
                <svg viewBox='0 -2 24 24'>
                    <path fill='#b9bbbe' d="M19.2929 9.8299L19.9409 9.18278C21.353 7.77064 21.353 5.47197 19.9409 4.05892C18.5287 2.64678 16.2292 2.64678 14.817 4.05892L14.1699 4.70694L19.2929 9.8299ZM12.8962 5.97688L5.18469 13.6906L10.3085 18.813L18.0201 11.0992L12.8962 5.97688ZM4.11851 20.9704L8.75906 19.8112L4.18692 15.239L3.02678 19.8796C2.95028 20.1856 3.04028 20.5105 3.26349 20.7337C3.48669 20.9569 3.8116 21.046 4.11851 20.9704Z"></path>
                </svg>
            </div>
            <div className='delete-message' onClick={handleDelete}>
                <svg viewBox=''>
                    <path fill='red' d="M15 3.999V2H9V3.999H3V5.999H21V3.999H15Z"></path>
                    <path fill='red' d='M5 6.99902V18.999C5 20.101 5.897 20.999 7 20.999H17C18.103 20.999 19 20.101 19 18.999V6.99902H5ZM11 17H9V11H11V17ZM15 17H13V11H15V17Z'></path>
                </svg>
            </div>

        </div>
        )
    } else {
        messageMenus = (
            <div className='message=menus'></div>
        )
    }


    return (
        <div className='message-container'>
            <div className='message'>
                <div className='message-left'>
                    <div className='icon'>
                        <svg viewBox='0 0 28 20'>
                            <path fill='#ffff' d='M23.0212 1.67671C21.3107 0.879656 19.5079 0.318797 17.6584 0C17.4062 0.461742 17.1749 0.934541 16.9708 1.4184C15.003 1.12145 12.9974 1.12145 11.0283 1.4184C10.819 0.934541 10.589 0.461744 10.3368 0.00546311C8.48074 0.324393 6.67795 0.885118 4.96746 1.68231C1.56727 6.77853 0.649666 11.7538 1.11108 16.652C3.10102 18.1418 5.3262 19.2743 7.69177 20C8.22338 19.2743 8.69519 18.4993 9.09812 17.691C8.32996 17.3997 7.58522 17.0424 6.87684 16.6135C7.06531 16.4762 7.24726 16.3387 7.42403 16.1847C11.5911 18.1749 16.408 18.1749 20.5763 16.1847C20.7531 16.3332 20.9351 16.4762 21.1171 16.6135C20.41 17.0369 19.6639 17.3997 18.897 17.691C19.3052 18.4993 19.7718 19.2689 20.3021 19.9945C22.6677 19.2689 24.8929 18.1364 26.8828 16.6466H26.8893C27.43 10.9731 25.9665 6.04728 23.0212 1.67671ZM9.68041 13.6383C8.39754 13.6383 7.34085 12.4453 7.34085 10.994C7.34085 9.54272 8.37155 8.34973 9.68041 8.34973C10.9893 8.34973 12.0395 9.54272 12.0187 10.994C12.0187 12.4453 10.9828 13.6383 9.68041 13.6383ZM18.3161 13.6383C17.0332 13.6383 15.9765 12.4453 15.9765 10.994C15.9765 9.54272 17.0124 8.34973 18.3161 8.34973C19.6184 8.34973 20.6751 9.54272 20.6543 10.994C20.6543 12.4453 19.6184 13.6383 18.3161 13.6383Z'></path>
                        </svg>

                    </div>
                </div>
                <div className='message-right'>
                    <div className='message-top'><div className='message-username'>{message.sender ? message.sender.username : message.sender_id === sessionUser.id ? sessionUser.username : ''}</div><div className='message-timestamp'></div></div>
                    <div className='message-bottom'>
                        <div className={messageBodyClassList}>{messageBody}</div>
                        <div className={messageFormClassList}>
                            <form onSubmit={handleEditMessage}>
                                <input value={messageBody} onChange={(e) => setMessageBody(e.target.value) }></input>
                                <div>escape to <a onClick={closeEditForm}>cancel</a> · enter to <a onClick={handleEditMessage}>save</a></div>
                            </form>
                        </div>
                        <div className='message-edited-tag'>{isEdited ? '(edited)' : ''}
                        </div>
                    </div>
                </div>

            </div>
            <div className='message-menus-container'>
                {messageMenus}
            </div>
            </div>
    )

}

export default Message;