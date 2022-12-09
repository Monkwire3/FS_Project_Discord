import { Link } from "react-router-dom";

function ChatIndexItem({chat}) {

    return (
        <Link to={`/@me/${chat.id}`}><div className="chat-index-item">{chat.title}</div></Link>
    )


}

export default ChatIndexItem;