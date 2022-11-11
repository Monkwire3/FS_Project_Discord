import FriendsList from '../FriendsList';
import './DirectMessagesMain.css';


function DirectMessagesMain() {

    return (
        <div id='direct-messages-main'>
            <div id='direct-messages-header'></div>
            <div id='direct-messages-bottom'>
                <div id='friends-list-container'>
                    <div id='friends-list-search'></div>
                    <FriendsList />
                </div>

            </div>

        </div>
    )
}


export default DirectMessagesMain;