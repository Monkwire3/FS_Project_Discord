import './ChannelContent.css';
import { useParams } from 'react-router-dom';

function ChannelContent() {
    const channelId = useParams();
    console.log('channelId: ', channelId);


    const sendMessage = (e) => {
        e.preventDefault();
        console.log('sendMessage function')
    }

    return (
        <>
        <div id='chat-box'></div>
        <div id='input-container'>
            <form onSubmit={sendMessage}>
                <input type='text'></input>
            </form>
        </div>
        </>
    )

}

export default ChannelContent;