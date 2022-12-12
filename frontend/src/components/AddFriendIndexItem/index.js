import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendFriendRequest } from '../../store/users';
import './AddFriendIndexItem.css';


function AddFriendIndexItem({user}) {
    const sessionUserId = useSelector(state => state.session.user.id);
    const dispatch = useDispatch();
    const [buttonText, setButtonText] = useState('Add Friend')

    function requestFriend(requestee_id) {
        dispatch(sendFriendRequest({requester_id: sessionUserId, requestee_id: requestee_id}));
        setButtonText('Pending')
    }



    return (
        <div className="add-friend-index-item">
            <div>
                <div>{user.username}</div>
                <div>{user.email}</div>
            </div>
            <div>
                <button onClick={() => requestFriend(user.id)}>{buttonText}</button>
            </div>
        </div>
    )
}

export default AddFriendIndexItem;