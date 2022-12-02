import { useDispatch, useSelector } from 'react-redux';
import { sendFriendRequest } from '../../store/users';
import './AddFriendIndexItem.css';


function AddFriendIndexItem({user}) {
    const sessionUserId = useSelector(state => state.session.user.id);
    const dispatch = useDispatch();

    function requestFriend(requestee_id) {
        console.log(`friend request from ${sessionUserId} to ${requestee_id}`)
        dispatch(sendFriendRequest({requester_id: sessionUserId, requestee_id: requestee_id}));
    }



    return (
        <div className="add-friend-index-item">
            <div>
                <div>{user.username}</div>
                <div>{user.email}</div>
            </div>
            <div>
                <button onClick={() => requestFriend(user.id)}>Add Friend</button>
            </div>
        </div>
    )
}

export default AddFriendIndexItem;