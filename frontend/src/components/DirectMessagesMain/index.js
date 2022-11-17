import { useParams } from 'react-router-dom';
import DirectChatMain from '../DirectChatMain';
import FriendsList from '../FriendsList';
import './DirectMessagesMain.css';


function DirectMessagesMain({cable}) {
    const { chatId } = useParams();

    if (chatId) {
        return (
            <div id='direct-messages-main'>
                <DirectChatMain chatId={chatId} cable={cable}/>
            </div>
        )

    }


    return (
        <div id='direct-messages-main'>
            <FriendsList />
        </div>
    )
}


export default DirectMessagesMain;