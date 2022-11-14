import { useParams } from 'react-router-dom';
import FriendsList from '../FriendsList';
import './DirectMessagesMain.css';


function DirectMessagesMain() {
    const { chatId } = useParams();

    if ( !chatId ) {
        return (
            <div id='direct-messages-main'>
                <FriendsList />
            </div>
        )
    }

    return (
        <></>
    )
}


export default DirectMessagesMain;