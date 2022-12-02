import { useSelector } from 'react-redux';
import './AddFriendIndexItem.css';


function AddFriendIndexItem({user}) {
    const sessionUserId = useSelector(state => state.session.user.id);

    function sendFriendRequest(friendId) {
        console.log(`friend request from ${sessionUserId} to ${friendId}`)
    }



    return (
        <div className="add-friend-index-item">
            <div>
                <div>{user.username}</div>
                <div>{user.email}</div>
            </div>
            <div>
                <button onClick={() => sendFriendRequest(user.id)}>Add Friend</button>
            </div>
        </div>
    )
}

export default AddFriendIndexItem;