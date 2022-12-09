import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteChat } from "../../store/users";

function ChatIndexItem({ chat }) {
    const dispatch = useDispatch();

    const handleDelete = (e) => {
        e.stopPropagation();
        dispatch(deleteChat(chat.id))
    }



    return (
        <a href={`/channels/@me/${chat.id}`}>
            <div className="chat-index-item">
                <div className="chat-index-item-left">
                    <div className="icon"></div>
                    <div className="chat-index-item-content">{chat.title}</div>
                </div>
                <div className="chat-index-x" onClick={handleDelete}>
                    <svg viewBox="0 0 24 24">
                        <path fill="#babbbe" d='M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z'></path>
                    </svg>
                </div>
            </div>
        </a>
    )


}

export default ChatIndexItem;