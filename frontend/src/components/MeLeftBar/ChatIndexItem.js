import { Link } from "react-router-dom";

function ChatIndexItem({chat}) {

    return (
        <a href={`/channels/@me/${chat.id}`}><div className="chat-index-item">{chat.title}</div></a>
    )


}

export default ChatIndexItem;